'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/helpers';
import { Metadata } from 'next';

// Add this function to generate dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch the news article data
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://veles-net.com'}/api/public/news?slug=${params.slug}`);
  
  if (!response.ok) {
    return {
      title: 'Новина не знайдена | Veles ISP',
      description: 'Запитана новина не знайдена на сайті інтернет-провайдера Veles.',
    };
  }
  
  const data = await response.json();
  const news = data.news;
  
  if (!news) {
    return {
      title: 'Новина не знайдена | Veles ISP',
      description: 'Запитана новина не знайдена на сайті інтернет-провайдера Veles.',
    };
  }
  
  // Create excerpt from content for description (first 160 characters)
  const excerpt = news.content.substring(0, 157) + '...';
  
  return {
    title: `${news.title} | Новини Veles ISP`,
    description: excerpt,
    openGraph: {
      title: news.title,
      description: excerpt,
      type: 'article',
      publishedTime: news.createdAt,
      modifiedTime: news.updatedAt,
      images: news.image ? [{ url: news.image }] : undefined,
    },
  };
}
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

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Розпаковуємо параметри за допомогою React.use
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/news?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження новини');
        }
        const data = await response.json();
        
        if (data.news) {
          setNews(data.news);
          setError(null);
        } else {
          setError('Новину не знайдено');
        }
      } catch (err) {
        console.error('Помилка завантаження новини:', err);
        setError('Не вдалося завантажити новину. Спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNewsDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error || 'Новину не знайдено'}</p>
        </div>
        <Link 
          href="/news"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Повернутися до списку новин
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/news"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          До всіх новин
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
        {news.image && (
          <div className="w-full h-64 md:h-96 relative">
            <Image
              src={news.image}
              alt={news.title}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="text-sm text-gray-500 mb-3">
            {formatDate(news.createdAt)}
          </div>
          
          <h1 className="text-3xl font-bold text-blue-900 mb-6">{news.title}</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-line">
            {news.content}
          </div>
        </div>
      </article>
      
      <div className="mt-8 text-center">
        <Link 
          href="/news"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Всі новини
        </Link>
      </div>
    </div>
  );
}