'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AbonentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Інформація для абонентів</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg text-gray-700 mb-6">
          Компанія "Велес" пропонує зручні інструменти для керування вашим інтернет-підключенням. 
          Ви можете керувати своїм акаунтом через особистий кабінет і Telegram-бот.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-blue-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Особистий кабінет користувача</h2>
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image 
                src="/abonent-dashboard.png" 
                alt="Скріншот особистого кабінету"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-gray-700 mb-4">
              В особистому кабінеті ви можете:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Перевіряти баланс і статус рахунку</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Переглядати деталі тарифу</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Відслідковувати використання трафіку</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Подавати заявки на зміну тарифу</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Встановлювати кредит при відсутності коштів</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Відімкнути/замовити статичну IP-адресу</span>
              </li>
            </ul>
            <a 
              href="https://veles-client.pp.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Увійти до особистого кабінету
            </a>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Telegram-бот для управління аккаунтом</h2>
            <div className="flex justify-center mb-4">
              <div className="relative h-68 w-68 rounded-lg overflow-hidden">
                <Image 
                  src="/telegram.png" 
                  alt="QR-код Telegram бота"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Наш Telegram-бот дозволяє зручно керувати вашим акаунтом прямо з месенджера. 
              За допомогою бота ви можете:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Перевіряти баланс акаунту</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Отримувати інформацію про тариф</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Бачити поточний стан підключення</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Отримувати повідомлення про зміну статусу</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Оформляти кредит при нестачі коштів</span>
              </li>
            </ul>
            <a 
              href="https://t.me/VelesISP_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Перейти до Telegram-бота
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Можливості управління підключенням</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="border border-gray-200 rounded-lg p-5 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-700">Миттєва статистика</h3>
            </div>
            <p className="text-gray-600">
              Отримуйте актуальну інформацію про стан з'єднання, оплати та використання трафіку в реальному часі.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-700">Гнучкі налаштування</h3>
            </div>
            <p className="text-gray-600">
              Змінюйте параметри свого підключення, налаштовуйте додаткові функції та сервіси за потреби.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-700">Кредитна функція</h3>
            </div>
            <p className="text-gray-600">
              При відсутності коштів на рахунку встановіть кредитний період, щоб продовжити користуватися інтернетом.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Часті запитання</h2>
        
        <div className="space-y-4">
          <div className="border-b border-blue-100 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Як отримати доступ до особистого кабінету?</h3>
            <p className="text-gray-700">
              Дані для входу в особистий кабінет (логін та пароль) надаються при підключенні. Якщо ви втратили ці дані, зверніться до нашої служби підтримки для відновлення доступу.
            </p>
          </div>
          
          <div className="border-b border-blue-100 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Як змінити тариф?</h3>
            <p className="text-gray-700">
              Зміна тарифу доступна через особистий кабінет у розділі "Мій тариф" або при зверненні до служби підтримки. Зміна тарифу відбувається з 1-го числа наступного місяця.
            </p>
          </div>
          
          <div className="border-b border-blue-100 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Що робити, якщо немає доступу до інтернету?</h3>
            <p className="text-gray-700">
              Спочатку перевірте баланс рахунку через Telegram-бот або зателефонуйте до служби підтримки. Якщо на рахунку є кошти, але інтернет не працює, зверніться до технічної підтримки для діагностики проблеми.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-blue-700 mb-2">Як працює кредитна функція?</h3>
            <p className="text-gray-700">
              При нестачі коштів на рахунку ви можете активувати кредитну функцію в особистому кабінеті або через Telegram-бот. Це дозволить продовжити користуватися інтернетом протягом 5 днів. Послуга доступна 1 раз на місяць.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-700 text-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Потрібна допомога?</h2>
        <p className="text-lg mb-6">
          Якщо у вас виникли питання щодо використання особистого кабінету або Telegram-бота, зверніться до нашої служби підтримки.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 rounded-md font-medium transition-all duration-300 hover:bg-blue-50"
          >
            Контакти
          </Link>
          <a 
            href="tel:+380992244227"
            className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-600"
          >
            Зателефонувати
          </a>
        </div>
      </div>
    </div>
  );
}