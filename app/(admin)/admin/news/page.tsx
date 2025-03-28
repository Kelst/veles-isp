'use client';

import { useState, useEffect } from 'react';
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import NewsForm from "../../../../components/admin/NewsForm";

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

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/news');
      if (!response.ok) {
        throw new Error('Помилка завантаження новин');
      }
      const data = await response.json();
      setNews(data.news || []);
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити новини. Спробуйте пізніше.');
      console.error('Помилка завантаження новин:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddNews = () => {
    setCurrentNews(null);
    setIsFormOpen(true);
  };

  const handleEditNews = (news: News) => {
    setCurrentNews(news);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentNews(null);
  };

  const handleSubmitForm = async (data: any) => {
    try {
      let response;
      
      if (data._id) {
        // Оновлення новини
        response = await fetch(`/api/admin/news/${data._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Створення нової новини
        response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        throw new Error('Помилка збереження новини');
      }
      
      fetchNews();
      handleCloseForm();
    } catch (err) {
      console.error('Помилка збереження новини:', err);
      setError('Не вдалося зберегти новину. Спробуйте пізніше.');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('Ви дійсно хочете видалити цю новину?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Помилка видалення новини');
      }
      
      fetchNews();
    } catch (err) {
      console.error('Помилка видалення новини:', err);
      setError('Не вдалося видалити новину. Спробуйте пізніше.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управління новинами</h1>
        <Button variant="primary" onClick={handleAddNews}>Додати новину</Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {isFormOpen ? (
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {currentNews ? 'Редагувати новину' : 'Додати нову новину'}
          </h2>
          <NewsForm
            initialData={currentNews || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCloseForm}
          />
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6">
              <p className="text-gray-500">Завантаження новин...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500">Ще немає новин для відображення.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Заголовок
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата створення
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title.length > 50 
                            ? `${item.title.substring(0, 50)}...` 
                            : item.title
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.slug}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isPublished ? 'Опубліковано' : 'Чернетка'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {formatDate(item.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditNews(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}