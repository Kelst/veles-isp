'use client';

import { useState, useEffect } from 'react';
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import SettingForm from "../../../../components/admin/SettingForm";

interface Setting {
  _id: string;
  key: string;
  value: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<Setting | null>(null);
  const [telegramSettings, setTelegramSettings] = useState({
    botToken: '',
    chatId: ''
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings');
      if (!response.ok) {
        throw new Error('Помилка завантаження налаштувань');
      }
      const data = await response.json();
      setSettings(data.settings || []);

      // Оновлюємо стан Telegram налаштувань
      const botToken = data.settings.find((s: Setting) => s.key === 'TELEGRAM_BOT_TOKEN')?.value || '';
      const chatId = data.settings.find((s: Setting) => s.key === 'TELEGRAM_CHAT_ID')?.value || '';
      setTelegramSettings({
        botToken: botToken,
        chatId: chatId
      });

      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити налаштування. Спробуйте пізніше.');
      console.error('Помилка завантаження налаштувань:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleAddSetting = () => {
    setCurrentSetting(null);
    setIsFormOpen(true);
  };

  const handleEditSetting = (setting: Setting) => {
    setCurrentSetting(setting);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentSetting(null);
  };

  const handleSubmitForm = async (data: any) => {
    try {
      let response;
      
      if (data._id) {
        // Оновлення налаштування
        response = await fetch(`/api/admin/settings/${data._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Створення нового налаштування
        response = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        throw new Error('Помилка збереження налаштування');
      }
      
      fetchSettings();
      handleCloseForm();
    } catch (err) {
      console.error('Помилка збереження налаштування:', err);
      setError('Не вдалося зберегти налаштування. Спробуйте пізніше.');
    }
  };

  const handleDeleteSetting = async (id: string) => {
    if (!window.confirm('Ви дійсно хочете видалити це налаштування?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/settings/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Помилка видалення налаштування');
      }
      
      fetchSettings();
    } catch (err) {
      console.error('Помилка видалення налаштування:', err);
      setError('Не вдалося видалити налаштування. Спробуйте пізніше.');
    }
  };

  // Функція для обробки змін в полях Telegram
  const handleTelegramChange = (field: 'botToken' | 'chatId', value: string) => {
    setTelegramSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Функція для збереження налаштувань Telegram
  const handleSaveTelegramSettings = async () => {
    setLoading(true);
    try {
      // Знаходимо ID налаштувань, якщо вони існують
      const botTokenSetting = settings.find(s => s.key === 'TELEGRAM_BOT_TOKEN');
      const chatIdSetting = settings.find(s => s.key === 'TELEGRAM_CHAT_ID');
      
      // Створюємо або оновлюємо налаштування токену бота
      const botTokenResponse = await fetch(botTokenSetting 
        ? `/api/admin/settings/${botTokenSetting._id}` 
        : '/api/admin/settings', 
      {
        method: botTokenSetting ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: botTokenSetting?._id,
          key: 'TELEGRAM_BOT_TOKEN',
          value: telegramSettings.botToken,
          description: 'Токен Telegram бота для відправки повідомлень'
        }),
      });
      
      if (!botTokenResponse.ok) {
        throw new Error('Помилка збереження токену бота');
      }
      
      // Створюємо або оновлюємо налаштування ID чату
      const chatIdResponse = await fetch(chatIdSetting 
        ? `/api/admin/settings/${chatIdSetting._id}` 
        : '/api/admin/settings', 
      {
        method: chatIdSetting ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: chatIdSetting?._id,
          key: 'TELEGRAM_CHAT_ID',
          value: telegramSettings.chatId,
          description: 'ID чату або групи Telegram для відправки повідомлень'
        }),
      });
      
      if (!chatIdResponse.ok) {
        throw new Error('Помилка збереження ID чату');
      }
      
      setError(null);
      fetchSettings();
      alert('Налаштування Telegram успішно збережені!');
    } catch (err) {
      console.error('Помилка збереження налаштувань Telegram:', err);
      setError('Не вдалося зберегти налаштування Telegram. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  };
  
  // Функція для перевірки з'єднання з Telegram API
  const testTelegramConnection = async () => {
    try {
      setLoading(true);
      
      if (!telegramSettings.botToken || !telegramSettings.chatId) {
        setError('Для перевірки з\'єднання потрібні дійсний токен бота та ID чату');
        return;
      }
      
      // Відправляємо тестове повідомлення через API
      const response = await fetch(
        `https://api.telegram.org/bot${telegramSettings.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: telegramSettings.chatId,
            text: '✅ Тестове повідомлення від Veles ISP. Налаштування з\'єднання успішне!',
          }),
        }
      );
      
      const data = await response.json();
      
      if (data.ok) {
        alert('З\'єднання встановлено успішно! Тестове повідомлення відправлено.');
      } else {
        setError(`Помилка з'єднання: ${data.description}`);
      }
    } catch (err) {
      console.error('Помилка тестування Telegram API:', err);
      setError('Не вдалося встановити з\'єднання з Telegram API. Перевірте налаштування.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Налаштування системи</h1>
        <Button variant="primary" onClick={handleAddSetting}>Додати налаштування</Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {/* Секція для налаштувань Telegram */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Налаштування Telegram</h2>
        <p className="text-gray-600 mb-4">
          Ці налаштування використовуються для відправки повідомлень в Telegram.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Токен бота
              </label>
              <input
                type="text"
                value={telegramSettings.botToken}
                onChange={(e) => handleTelegramChange('botToken', e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">Токен Telegram бота для відправки повідомлень</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID чату/групи
              </label>
              <input
                type="text"
                value={telegramSettings.chatId}
                onChange={(e) => handleTelegramChange('chatId', e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">ID чату або групи Telegram для відправки повідомлень</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={testTelegramConnection}
            disabled={loading}
          >
            Перевірити з'єднання
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveTelegramSettings}
            disabled={loading}
          >
            Зберегти налаштування Telegram
          </Button>
        </div>
      </Card>
      
      {isFormOpen ? (
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {currentSetting ? 'Редагувати налаштування' : 'Додати нове налаштування'}
          </h2>
          <SettingForm
            initialData={currentSetting || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCloseForm}
          />
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6">
              <p className="text-gray-500">Завантаження налаштувань...</p>
            </div>
          ) : settings.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500">Ще немає налаштувань для відображення.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ключ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Значення
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Опис
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {settings.map((setting) => (
                    <tr key={setting._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {setting.key}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {setting.key.includes('TOKEN') || setting.key.includes('KEY') 
                            ? `${setting.value.substring(0, 6)}...` 
                            : setting.value}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{setting.description || '—'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditSetting(setting)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => handleDeleteSetting(setting._id)}
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