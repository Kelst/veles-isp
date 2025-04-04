import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);

  // Функція для обрізання тексту до певної кількості слів
  const truncateContent = (text: string, maxWords: number = isCompact ? 15 : 30) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  // Анімація для компактної версії
  if (isCompact) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`bg-white rounded-lg shadow-sm overflow-hidden 
          transition-all duration-300 ease-in-out
          ${isHovered ? 'shadow-md -translate-y-1' : 'shadow-sm'}
          transform`}
      >
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">
            {formatDate(createdAt)}
          </div>
          
          <h3 className="text-md font-semibold text-blue-900 mb-2 line-clamp-2">
            <Link 
              href={`/news/${slug}`} 
              className={`transition-colors duration-300 
                ${isHovered ? 'text-blue-700' : 'text-blue-900'}`}
            >
              {title}
            </Link>
          </h3>
          
          <div className="text-sm text-gray-600 mb-2 line-clamp-2">
            {truncateContent(content)}
          </div>
          
          <Link 
            href={`/news/${slug}`}
            className={`text-sm flex items-center transition-all duration-300 
              ${isHovered ? 'text-blue-800 pl-1' : 'text-blue-600'}`}
          >
            Детальніше
            <motion.svg 
              animate={{ 
                x: isHovered ? [0, 3, 0] : 0,
                transition: { repeat: Infinity, duration: 0.6 }
              }}
              className="w-3 h-3 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </motion.svg>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Повна версія картки з розширеними анімаціями
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-lg shadow-md overflow-hidden 
        transition-all duration-300 ease-in-out
        ${isHovered ? 'shadow-xl -translate-y-1' : 'shadow-md'}
        transform`}
    >
      <div className="md:flex">
        {image && (
          <motion.div 
            className="md:w-1/3 h-48 md:h-auto relative overflow-hidden"
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              style={{ 
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
              className="w-full h-full"
            />
          </motion.div>
        )}
        
        <div className={`p-6 ${image ? 'md:w-2/3' : 'w-full'}`}>
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(createdAt)}
          </div>
          
          <h2 className="text-xl font-bold mb-3">
            <Link 
              href={`/news/${slug}`} 
              className={`transition-colors duration-300 
                ${isHovered ? 'text-blue-700' : 'text-blue-900'}`}
            >
              {title}
            </Link>
          </h2>
          
          <div className="text-gray-600 mb-4 whitespace-pre-line line-clamp-3">
            {truncateContent(content)}
          </div>
          
          <Link 
            href={`/news/${slug}`}
            className={`inline-flex items-center font-medium transition-all duration-300 
              ${isHovered ? 'text-blue-800 pl-1' : 'text-blue-600'}`}
          >
            Читати далі
            <motion.svg 
              animate={{ 
                x: isHovered ? [0, 3, 0] : 0,
                transition: { repeat: Infinity, duration: 0.6 }
              }}
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;