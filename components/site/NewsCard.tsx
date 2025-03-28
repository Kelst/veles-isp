import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/helpers';

interface NewsCardProps {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  createdAt: string;
  isCompact?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  _id,
  title,
  slug,
  content,
  image,
  createdAt,
  isCompact = false,
}) => {
  // Функція для обрізання тексту до певної кількості слів
  const truncateContent = (text: string, maxWords: number = isCompact ? 15 : 30) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  if (isCompact) {
    // Компактна версія картки для бічної панелі або віджетів
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="text-xs text-gray-500 mb-1">
          {formatDate(createdAt)}
        </div>
        <h3 className="text-md font-semibold text-blue-900 mb-2 line-clamp-2">
          <Link href={`/news/${slug}`} className="hover:text-blue-700 transition-colors">
            {title}
          </Link>
        </h3>
        <div className="text-sm text-gray-600 mb-2 line-clamp-2">
          {truncateContent(content)}
        </div>
        <Link 
          href={`/news/${slug}`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
        >
          Детальніше
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    );
  }

  // Повна версія картки для сторінки новин
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="md:flex">
        {image && (
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
        )}
        <div className={`p-6 ${image ? 'md:w-2/3' : 'w-full'}`}>
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(createdAt)}
          </div>
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            <Link href={`/news/${slug}`} className="hover:text-blue-700 transition-colors">
              {title}
            </Link>
          </h2>
          <div className="text-gray-600 mb-4 whitespace-pre-line">
            {truncateContent(content)}
          </div>
          <Link 
            href={`/news/${slug}`}
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
  );
};

export default NewsCard;