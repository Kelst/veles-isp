'use client';

import { useState, useEffect } from 'react';
import Card from "../../../../components/ui/Card";

interface DashboardStats {
  tariffs: number;
  news: number;
  contacts: number;
  admins: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    tariffs: 0,
    news: 0,
    contacts: 0,
    admins: 1, // За замовчуванням 1 адміністратор
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        // Завантаження кількості тарифів
        const tariffsResponse = await fetch('/api/admin/tariffs');
        const tariffsData = await tariffsResponse.json();
        
        // Завантаження кількості новин
        const newsResponse = await fetch('/api/admin/news');
        const newsData = await newsResponse.json();
        
        // Завантаження кількості контактів
        const contactsResponse = await fetch('/api/admin/contacts');
        const contactsData = await contactsResponse.json();
        
        // Оновлення статистики
        setStats({
          tariffs: tariffsData.tariffs?.length || 0,
          news: newsData.news?.length || 0,
          contacts: contactsData.contacts?.length || 0,
          admins: 1, // За замовчуванням 1 адміністратор
        });
        
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження статистики:', err);
        setError('Не вдалося завантажити статистику. Спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Панель управління</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-700">Активні тарифи</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? '...' : stats.tariffs}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-700">Опубліковані новини</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? '...' : stats.news}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-700">Контакти</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? '...' : stats.contacts}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-700">Адміністратори</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? '...' : stats.admins}
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Останні дії</h2>
        <Card>
          <div className="p-6">
            <p className="text-gray-500">Ще немає даних для відображення.</p>
            <p className="text-sm text-gray-400 mt-2">Історія дій буде додана в наступних оновленнях.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}