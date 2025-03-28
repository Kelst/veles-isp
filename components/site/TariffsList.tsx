import React, { useState, useEffect } from 'react';
import TariffCard from './TariffCard';

interface Tariff {
  _id: string;
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isActive: boolean;
  category: 'home' | 'business';
}

interface TariffsListProps {
  onSelectTariff: (tariffName: string) => void;
  className?: string;
  limit?: number;
  showPopular?: boolean;
  category: 'home' | 'business';
}

const TariffsList: React.FC<TariffsListProps> = ({
  onSelectTariff,
  className = '',
  limit,
  showPopular = true,
  category = 'home',
}) => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTariffs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/public/tariffs?category=${category}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження тарифів');
        }
        const data = await response.json();
        let sortedTariffs = data.tariffs || [];
        
        // Сортування за ціною
        sortedTariffs.sort((a: Tariff, b: Tariff) => a.price - b.price);
        
        // Обмеження кількості тарифів, якщо вказано limit
        if (limit && sortedTariffs.length > limit) {
          sortedTariffs = sortedTariffs.slice(0, limit);
        }
        
        setTariffs(sortedTariffs);
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження тарифів:', err);
        setError('Не вдалося завантажити тарифи');
      } finally {
        setLoading(false);
      }
    };

    fetchTariffs();
  }, [limit, category]);

  // Функція для визначення "популярного" тарифу
  // За замовчуванням вибираємо другий тариф, якщо є два або більше тарифів
  const getPopularTariffIndex = (tariffs: Tariff[]): number => {
    if (tariffs.length <= 1) return -1;
    // Беремо другий або середній тариф
    return Math.min(1, tariffs.length - 1);
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
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

  if (tariffs.length === 0) {
    return (
      <div className={`p-6 bg-gray-50 rounded-md text-center ${className}`}>
        <p className="text-gray-500">Наразі немає доступних тарифів</p>
      </div>
    );
  }

  const popularIndex = showPopular ? getPopularTariffIndex(tariffs) : -1;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {tariffs.map((tariff, index) => (
        <TariffCard
          key={tariff._id}
          name={tariff.name}
          description={tariff.description}
          price={tariff.price}
          speed={tariff.speed}
          features={tariff.features}
          isPopular={index === popularIndex}
          onSelect={onSelectTariff}
        />
      ))}
    </div>
  );
};

export default TariffsList;