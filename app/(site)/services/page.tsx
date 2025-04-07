'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Послуги | Veles ISP Чернівці',
  description: 'Додаткові послуги інтернет-провайдера Veles - налаштування обладнання, встановлення мережевого устаткування, прокладка кабелів та технічне обслуговування.',
  keywords: ['послуги інтернет провайдера', 'налаштування роутера', 'прокладка мережевих кабелів', 'статична IP'],
  openGraph: {
    title: 'Послуги | Veles ISP Чернівці',
    description: 'Додаткові послуги інтернет-провайдера Veles - налаштування обладнання, встановлення мережевого устаткування, прокладка кабелів та технічне обслуговування.'
  }
};
export default function ServicesPage() {
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (error) setError(null);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setService(e.target.value);
    if (error) setError(null);
  };

  const handleOrderClick = (serviceName: string) => {
    setService(serviceName);
    setIsModalOpen(true);
  };

  const validatePhone = (value: string) => {
    // Базова перевірка - номер має містити не менше 10 цифр
    const numberOnly = value.replace(/\D/g, '');
    return numberOnly.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      setError('Будь ласка, введіть коректний номер телефону');
      return;
    }

    if (!service) {
      setError('Будь ласка, виберіть послугу');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Відправка запиту до API для надсилання повідомлення в Telegram
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone, 
          service,
          type: 'service' // Вказуємо тип запиту як "послуга"
        }),
      });
      
      if (!response.ok) {
        throw new Error('Помилка відправки запиту');
      }
      
      setSuccess(true);
      setPhone('');
      setService('');
    } catch (err) {
      setError('Не вдалося відправити заявку. Спробуйте пізніше або зв\'яжіться з нами за телефоном.');
      console.error('Помилка відправки заявки:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Наші послуги</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 mb-6">
          Компанія "Велес" пропонує широкий спектр послуг для забезпечення стабільного та 
          якісного інтернет-з'єднання. Наші спеціалісти допоможуть вам з налаштуванням обладнання 
          та прокладанням кабелів для створення надійної мережі у вашому домі чи офісі.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Вартість додаткових послуг, пов'язаних з доступом до мережі Інтернет
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mb-6">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-blue-800">Послуга</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 whitespace-nowrap">Вартість</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 w-28">Замовити</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">Налаштування роутерів, ТВ-приставок в офісах провайдера Veles</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold text-green-600">Безкоштовно</td>
              
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">Налаштування основного роутера технічним спеціалістом з виїздом до абонента</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">300 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Налаштування роутера з виїздом')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-colors">
                    Замовити
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом (при новому підключенні абонента або при виконанні інших робіт у абонента)</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold text-green-600">Безкоштовно</td>
                
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом з виїздом до абонента (виїзд до абонента саме виключно по цій заявці)</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">300 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Підключення кабелем з окремим виїздом')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-colors">
                    Замовити
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Побудова та обслуговування внутрішніх локальних мереж зв'язку абонента (кабельних та радіо)
        </h2>
        
        <h3 className="text-lg font-medium mb-3 text-blue-700">м. Чернівці</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mb-6">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-blue-800">Послуга</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800">Вартість</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 w-28">Замовити</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">
                  <p>Перша година</p>
                  <p className="text-sm text-gray-600">Оплата за транспортні витрати, компенсація оплати часу монтажників у дорозі, робота монтажників – у вартість включається робота монтажників від 1 хв. до 60 хв. у абонента</p>
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">600 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Побудова мережі - перша година')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-colors">
                    Замовити
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">Друга та наступні години</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">500 грн/година</td>
               
              </tr>
            
            </tbody>
          </table>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Основний перелік робіт</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Налаштування додаткових роутерів та іншого комунікаційного обладнання</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Прокладання кабелю зв'язку (витої пари, ВОК)</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Обжим витої пари та спаювання волоконно-оптичних кабелів</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж кабельних каналів</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Штроблення під кабель чи кабель-канал</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Вирізання отворів для кабелю, під комп'ютерні розетки та розподільні коробки, їх монтаж</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж допоміжних опорних кріплень для кабелю та телекомунікаційного обладнання</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж телекомунікаційного обладнання</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Кросування кабелів зв'язку</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Демонтаж кабелю зв'язку, телекомунікаційного обладнання</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800">Потрібна консультація?</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Замовте дзвінок консультанта, і ми допоможемо підібрати оптимальне рішення для ваших потреб.
          </p>
          <button 
            onClick={() => {
              setService('Консультація щодо послуг');
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Замовити консультацію
          </button>
        </div>
      </div>
      
      {/* Модальне вікно для замовлення послуги */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl animate-fade-in">
            <button 
              onClick={closeModal} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Закрити"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              {success ? 'Заявку відправлено!' : 'Замовлення послуги'}
            </h3>
            
            {!success ? (
              <form onSubmit={handleSubmit}>
                <p className="mb-4 text-gray-700">
                  Послуга: <span className="font-medium">{service}</span>
                </p>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваш номер телефону
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+380 XX XXX XX XX"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      error ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Скасувати
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Відправка...' : 'Замовити'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  Дякуємо за вашу заявку! Наш спеціаліст зв'яжеться з вами найближчим часом для уточнення деталей.
                </p>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                  onClick={closeModal}
                >
                  Закрити
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}