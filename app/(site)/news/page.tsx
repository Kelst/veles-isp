'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/helpers';

interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/news?page=${pagination.page}&limit=${pagination.limit}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження новин');
        }
        const data = await response.json();
        setNews(data.news || []);
        setPagination(data.pagination || pagination);
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження новин:', err);
        setError('Не вдалося завантажити новини. Спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [pagination.page, pagination.limit]);

  const handleChangePage = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  // Функція для обрізання тексту до певної кількості слів
  const truncateContent = (content: string, maxWords: number = 30) => {
    const words = content.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return content;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Новини та оголошення</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">Наразі немає опублікованих новин.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 mb-8">
          {news.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in">
              <div className="md:flex">
                {item.image && (
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                  </div>
                )}
                <div className={`p-6 ${item.image ? 'md:w-2/3' : 'w-full'}`}>
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(item.createdAt)}
                  </div>
                  <h2 className="text-xl font-bold text-blue-900 mb-3">
                    <Link href={`/news/${item.slug}`} className="hover:text-blue-700 transition-colors">
                      {item.title}
                    </Link>
                  </h2>
                  <div className="text-gray-600 mb-4 whitespace-pre-line">
                    {truncateContent(item.content)}
                  </div>
                  <Link 
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Читати далі
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Пагінація */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <button
              onClick={() => handleChangePage(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`px-4 py-2 rounded-md ${
                pagination.page === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Попередня
            </button>
            
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleChangePage(page)}
                className={`px-4 py-2 rounded-md ${
                  pagination.page === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handleChangePage(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className={`px-4 py-2 rounded-md ${
                pagination.page === pagination.pages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Наступна
            </button>
          </div>
        </div>
      )}
    </div>
  );
}