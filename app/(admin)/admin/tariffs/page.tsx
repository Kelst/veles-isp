'use client';

import { useState, useEffect } from 'react';
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import TariffForm from "../../../../components/admin/TariffForm";

interface Tariff {
  _id: string;
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTariffsPage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTariff, setCurrentTariff] = useState<Tariff | null>(null);

  const fetchTariffs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/tariffs');
      if (!response.ok) {
        throw new Error('Помилка завантаження тарифів');
      }
      const data = await response.json();
      setTariffs(data.tariffs || []);
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити тарифи. Спробуйте пізніше.');
      console.error('Помилка завантаження тарифів:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTariffs();
  }, []);

  const handleAddTariff = () => {
    setCurrentTariff(null);
    setIsFormOpen(true);
  };

  const handleEditTariff = (tariff: Tariff) => {
    setCurrentTariff(tariff);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentTariff(null);
  };

  const handleSubmitForm = async (data: any) => {
    try {
      let response;
      
      if (data._id) {
        // Оновлення тарифу
        response = await fetch(`/api/admin/tariffs/${data._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Створення нового тарифу
        response = await fetch('/api/admin/tariffs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        throw new Error('Помилка збереження тарифу');
      }
      
      fetchTariffs();
      handleCloseForm();
    } catch (err) {
      console.error('Помилка збереження тарифу:', err);
      setError('Не вдалося зберегти тариф. Спробуйте пізніше.');
    }
  };

  const handleDeleteTariff = async (id: string) => {
    if (!window.confirm('Ви дійсно хочете видалити цей тариф?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/tariffs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Помилка видалення тарифу');
      }
      
      fetchTariffs();
    } catch (err) {
      console.error('Помилка видалення тарифу:', err);
      setError('Не вдалося видалити тариф. Спробуйте пізніше.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управління тарифами</h1>
        <Button variant="primary" onClick={handleAddTariff}>Додати тариф</Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {isFormOpen ? (
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {currentTariff ? 'Редагувати тариф' : 'Додати новий тариф'}
          </h2>
          <TariffForm
            initialData={currentTariff || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCloseForm}
          />
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6">
              <p className="text-gray-500">Завантаження тарифів...</p>
            </div>
          ) : tariffs.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500">Ще немає тарифів для відображення.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Назва
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Швидкість
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ціна
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tariffs.map((tariff) => (
                    <tr key={tariff._id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{tariff.name}</div>
                        <div className="text-sm text-gray-500">
                          {tariff.description.length > 50 
                            ? `${tariff.description.substring(0, 50)}...` 
                            : tariff.description
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{tariff.speed}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{tariff.price} грн/міс</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tariff.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tariff.isActive ? 'Активний' : 'Неактивний'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditTariff(tariff)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => handleDeleteTariff(tariff._id)}
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