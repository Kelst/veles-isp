'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ServicesPage() {
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  // Запускаємо анімацію після завантаження сторінки
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (error) setError(null);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    if (error) setError(null);
  };

  const handleOrderClick = (serviceName) => {
    setService(serviceName);
    setIsModalOpen(true);
  };

  const validatePhone = (value) => {
    // Базова перевірка - номер має містити не менше 10 цифр
    const numberOnly = value.replace(/\D/g, '');
    return numberOnly.length >= 10;
  };

  const handleSubmit = async (e) => {
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
    setTimeout(() => {
      setSuccess(false);
      setError(null);
    }, 300); // Затримка для завершення анімації
  };

  // Компонент карточки послуги для мобільних пристроїв з покращеною анімацією
  const ServiceCard = ({ title, price, buttonText, onClick, index }) => (
    <div 
      className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm transform transition-all duration-500 hover:shadow-md hover:translate-y-[-2px] ${
        animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
      <div className="flex justify-between items-center mt-3">
        <span className={`font-semibold ${price === 'Безкоштовно' ? 'text-green-600' : ''}`}>
          {price}
        </span>
        {buttonText && (
          <button 
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 relative overflow-hidden after:content-[''] after:absolute after:w-24 after:h-1 after:bg-blue-500 after:left-0 after:bottom-[-5px] after:rounded-full">
        Наші послуги
      </h1>
      
      <div 
        className={`bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8 transition-all duration-700 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-gray-700 mb-6 leading-relaxed">
          Компанія "Велес" пропонує широкий спектр послуг для забезпечення стабільного та 
          якісного інтернет-з'єднання. Наші спеціалісти допоможуть вам з налаштуванням обладнання 
          та прокладанням кабелів для створення надійної мережі у вашому домі чи офісі.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-blue-800 relative inline-block">
          Вартість додаткових послуг, пов'язаних з доступом до мережі Інтернет
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform scale-x-100 origin-left transition-transform duration-300"></span>
        </h2>
        
        {/* Таблиця для десктопів */}
        <div 
          className={`hidden md:block mb-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <table className="min-w-full bg-white border border-gray-200 overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-blue-800">Послуга</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 whitespace-nowrap">Вартість</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 w-28">Замовити</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">Налаштування роутерів, ТВ-приставок в офісах провайдера Veles</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold text-green-600">Безкоштовно</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center"></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">Налаштування основного роутера технічним спеціалістом з виїздом до абонента</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">300 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Налаштування роутера з виїздом')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105">
                    Замовити
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом (при новому підключенні абонента або при виконанні інших робіт у абонента)</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold text-green-600">Безкоштовно</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center"></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом з виїздом до абонента (виїзд до абонента саме виключно по цій заявці)</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">300 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Підключення кабелем з окремим виїздом')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105">
                    Замовити
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Карточки для мобільних */}
        <div className="md:hidden mb-6">
          <ServiceCard 
            title="Налаштування роутерів, ТВ-приставок в офісах провайдера Veles" 
            price="Безкоштовно"
            index={0}
          />
          
          <ServiceCard 
            title="Налаштування основного роутера технічним спеціалістом з виїздом до абонента" 
            price="300 грн"
            buttonText="Замовити"
            onClick={() => handleOrderClick('Налаштування роутера з виїздом')}
            index={1}
          />
          
          <ServiceCard 
            title="Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом (при новому підключенні абонента або при виконанні інших робіт у абонента)" 
            price="Безкоштовно"
            index={2}
          />
          
          <ServiceCard 
            title="Підключення кабелем (до 10 м.) та налаштування ТВ-приставок, телевізорів технічним спеціалістом з виїздом до абонента (виїзд до абонента саме виключно по цій заявці)" 
            price="300 грн"
            buttonText="Замовити"
            onClick={() => handleOrderClick('Підключення кабелем з окремим виїздом')}
            index={3}
          />
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-blue-800 relative inline-block mt-6">
          Побудова та обслуговування внутрішніх локальних мереж зв'язку абонента (кабельних та радіо)
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform scale-x-100 origin-left transition-transform duration-300"></span>
        </h2>
        
        <h3 className="text-lg font-medium mb-3 text-blue-700">м. Чернівці</h3>
        
        {/* Таблиця для десктопів */}
        <div 
          className={`hidden md:block mb-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <table className="min-w-full bg-white border border-gray-200 overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-blue-800">Послуга</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800">Вартість</th>
                <th className="py-3 px-4 text-center border-b border-gray-200 font-semibold text-blue-800 w-28">Замовити</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">
                  <p>Перша година</p>
                  <p className="text-sm text-gray-600">Оплата за транспортні витрати, компенсація оплати часу монтажників у дорозі, робота монтажників – у вартість включається робота монтажників від 1 хв. до 60 хв. у абонента</p>
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">600 грн</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center">
                  <button 
                    onClick={() => handleOrderClick('Побудова мережі - перша година')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105">
                    Замовити
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200">Друга та наступні години</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center font-semibold">500 грн/година</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Карточки для мобільних */}
        <div className="md:hidden mb-6">
          <div 
            className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm transform transition-all duration-500 hover:shadow-md hover:translate-y-[-2px] ${
              animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="font-medium text-gray-800 mb-2">Перша година</h3>
            <p className="text-sm text-gray-600 mb-3">
              Оплата за транспортні витрати, компенсація оплати часу монтажників у дорозі, робота монтажників – у вартість включається робота монтажників від 1 хв. до 60 хв. у абонента
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">600 грн</span>
              <button 
                onClick={() => handleOrderClick('Побудова мережі - перша година')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105">
                Замовити
              </button>
            </div>
          </div>
          
          <ServiceCard 
            title="Друга та наступні години" 
            price="500 грн/година"
            index={5}
          />
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-blue-800 relative inline-block mt-6">
          Основний перелік робіт
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform scale-x-100 origin-left transition-transform duration-300"></span>
        </h2>
        
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 transition-all duration-700 ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <ul className="space-y-2">
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Налаштування додаткових роутерів та іншого комунікаційного обладнання</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Прокладання кабелю зв'язку (витої пари, ВОК)</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Обжим витої пари та спаювання волоконно-оптичних кабелів</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж кабельних каналів</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Штроблення під кабель чи кабель-канал</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Вирізання отворів для кабелю, під комп'ютерні розетки та розподільні коробки, їх монтаж</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж допоміжних опорних кріплень для кабелю та телекомунікаційного обладнання</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Монтаж телекомунікаційного обладнання</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Кросування кабелів зв'язку</span>
            </li>
            <li className="flex items-start p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Демонтаж кабелю зв'язку, телекомунікаційного обладнання</span>
            </li>
          </ul>
        </div>
        
        <div 
          className={`bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform ${
            animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0 shadow-sm transform transition-transform duration-300 hover:scale-110">
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
            className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
          >
            Замовити консультацію
          </button>
        </div>
      </div>
      
      {/* Модальне вікно для замовлення послуги */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          style={{
            backgroundImage: 'url("/wheat-field.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={closeModal}
        >
          <div 
            className={`relative bg-white rounded-lg p-5 w-full max-w-md mx-auto shadow-xl transition-all duration-300 ${
              isModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200"
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
                    className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 ${
                      error ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600 animate-pulse">{error}</p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Скасувати
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Відправка...
                      </span>
                    ) : 'Замовити'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4 animate-bounce">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  Дякуємо за вашу заявку! Наш спеціаліст зв'яжеться з вами найближчим часом для уточнення деталей.
                </p>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={closeModal}
                >
                  Закрити
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Додамо анімацію скролу до верху сторінки */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 transform hover:scale-110 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '500ms' }}
        aria-label="Прокрутити вгору"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>

      {/* Додамо стилі анімацій */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}