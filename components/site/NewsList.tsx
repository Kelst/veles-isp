import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

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

interface NewsListProps {
  limit?: number;
  isCompact?: boolean;
  className?: string;
}

const NewsList: React.FC<NewsListProps> = ({ 
  limit = 3, 
  isCompact = false,
  className = ''
}) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/news?limit=${limit}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження новин');
        }
        const data = await response.json();
        setNews(data.news || []);
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження новин:', err);
        setError('Не вдалося завантажити новини');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 rounded-md ${className}`}>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-md text-center ${className}`}>
        <p className="text-gray-500">Немає новин для відображення</p>
      </div>
    );
  }

  if (isCompact) {
    return (
      <div className={`space-y-4 ${className}`}>
        {news.map((item) => (
          <NewsCard
            key={item._id}
            _id={item._id}
            title={item.title}
            slug={item.slug}
            content={item.content}
            image={item.image}
            createdAt={item.createdAt}
            isCompact={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {news.map((item) => (
        <NewsCard
          key={item._id}
          _id={item._id}
          title={item.title}
          slug={item.slug}
          content={item.content}
          image={item.image}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default NewsList;