'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConnectModal from '@/components/site/ConnectModal';
import TariffsList from '@/components/site/TariffsList';
import TariffTabs from '@/components/site/TariffTabs';

export default function TariffsPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'business'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const handleOpenModal = (tariffName: string) => {
    setSelectedTariff(tariffName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Скидаємо вибраний тариф з невеликою затримкою,
    // щоб уникнути видимого зникнення назви при закритті
    setTimeout(() => setSelectedTariff(null), 300);
  };
  
  const handleTabChange = (tab: 'home' | 'business') => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Тарифи на інтернет</h1>
        <p className="text-gray-600 max-w-3xl">
          Ми пропонуємо вигідні тарифи на швидкісний інтернет для Чернівців та області. 
          Оберіть тариф, який підходить саме вам, та подайте заявку на підключення.
        </p>
      </div>

      {/* Додаємо компонент табів */}
      <TariffTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Передаємо обрану категорію в TariffsList */}
      <TariffsList 
        onSelectTariff={handleOpenModal}
        category={activeTab}
        showPopular={true}
      />

      {/* Секція переваг */}
      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">Чому обирають нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Швидкість</h3>
            <p className="text-gray-600">Високошвидкісне підключення із стабільним пінгом для комфортного користування інтернетом</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Надійність</h3>
            <p className="text-gray-600">Сучасне обладнання та технічна підтримка 24/7 гарантують стабільний інтернет</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Доступна ціна</h3>
            <p className="text-gray-600">Вигідні тарифи та відсутність прихованих платежів роблять інтернет доступним для всіх</p>
          </div>
        </div>
      </div>

      {/* Додаткові послуги */}
      <div className="mt-16 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Додаткові послуги</h2>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Статична IP-адреса</h3>
              <p className="text-gray-600 mt-1">Виділена статична IP-адреса для стабільного з'єднання та доступу до мережевих ресурсів</p>
            </div>
            <div className="text-xl font-bold text-blue-900">50 грн/міс</div>
          </div>
          <p className="text-sm text-gray-500">Для замовлення додаткових послуг зверніться до нашої служби підтримки або вкажіть при оформленні заявки на підключення.</p>
        </div>
      </div>

      {/* Часті запитання */}
      <div className="mt-16 mb-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">Часті запитання</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Як підключити інтернет?</h3>
            <p className="text-gray-600">Для підключення послуг інтернету виберіть тариф і натисніть кнопку "Замовити підключення". Наш оператор зв'яжеться з вами для уточнення деталей і призначення дати підключення.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Які способи оплати доступні?</h3>
            <p className="text-gray-600">Ми пропонуємо різні способи оплати: через термінали самообслуговування, онлайн-платежі, банківські перекази та інші. Детальніше про способи оплати можна дізнатися у розділі "Оплата".</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Чи є плата за підключення?</h3>
            <p className="text-gray-600">Підключення для нових клієнтів безкоштовне при умові внесення передоплати за перший місяць користування послугами. Детальні умови уточнюйте у нашого оператора.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Скільки коштує статична IP-адреса?</h3>
            <p className="text-gray-600">Вартість послуги "Статична IP-адреса" складає 50 грн/місяць додатково до вашого основного тарифу. Замовити послугу можна при підключенні або звернувшись до служби підтримки.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-blue-700 text-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Готові підключитися до швидкісного інтернету?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Замовте підключення зараз та отримайте спеціальні умови для нових клієнтів</p>
          <button
            onClick={() => handleOpenModal('Не вказано')}
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-1"
          >
            Замовити підключення
          </button>
        </div>
      </div>

      {/* Модальне вікно для замовлення підключення */}
      <ConnectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tariffName={selectedTariff || undefined}
      />
    </div>
  );
}