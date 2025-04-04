'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CompanyTimeline from '@/components/site/CompanyTimeline';

interface Contact {
  _id: string;
  type: 'address' | 'phone' | 'email' | 'social';
  value: string;
  label?: string;
}

export default function AboutPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/public/contacts');
        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts || []);
        }
      } catch (error) {
        console.error('Помилка завантаження контактів:', error);
      }
    };
    
    fetchContacts();
  }, []);
  
  // Отримання контактних даних за типом
  const getContactByType = (type: 'address' | 'phone' | 'email') => {
    return contacts.find(c => c.type === type)?.value || '';
  };
  
  // Отримання всіх телефонів
  const getPhones = () => {
    return contacts.filter(c => c.type === 'phone').map(c => ({
      value: c.value,
      label: c.label
    }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Про компанію "Велес"</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Інтернет-провайдер "Велес" — це сучасна телекомунікаційна компанія, яка надає послуги високошвидкісного доступу до мережі Інтернет у Чернівцях та області. Ми працюємо з 2004 року і за цей час завоювали довіру багатьох клієнтів завдяки відмінній якості зв'язку та високому рівню обслуговування.
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Наша місія — забезпечити кожну домівку та бізнес якісним підключенням до глобальної мережі, використовуючи сучасні технології та індивідуальний підхід до потреб клієнтів.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Наші переваги:</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700"><strong>Надійність:</strong> Ми використовуємо сучасне обладнання та технології, що забезпечують стабільне з'єднання та високу швидкість передачі даних.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700"><strong>Швидкість:</strong> Пропонуємо різні тарифні плани з високими швидкостями передачі даних — від 100 Мбіт/с до 1 Гбіт/с.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700"><strong>Підтримка 24/7:</strong> Наша технічна підтримка працює цілодобово, щоб оперативно вирішувати будь-які питання наших клієнтів.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700"><strong>Вигідні тарифи:</strong> Ми пропонуємо гнучкі тарифні плани, які задовольнять потреби як домашніх користувачів, так і бізнес-клієнтів.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700"><strong>Сучасна інфраструктура:</strong> Мережа побудована з використанням оптоволоконних технологій, що забезпечує максимальну якість сигналу.</span>
            </li>
          </ul>
        </div>
        
        <div className="relative h-[300px] md:h-auto rounded-lg overflow-hidden shadow-md">
          <Image 
            src="/network-center.png" 
            alt="Центр керування мережею Велес" 
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      </div>
      
    
      
      {/* Додаємо таймлайн історії компанії */}
      <CompanyTimeline />
      
      <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-12 mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Наша історія</h2>
        <div className="space-y-4 text-gray-700">
         <p> Сьогодні "Велес" — це стабільно працююча компанія з професійною командою і сучасним технічним оснащенням.</p>
          <p>Ми постійно розширюємо мережу та покращуємо якість послуг, щоб забезпечити наших клієнтів надійним та високошвидкісним інтернетом. Наші пріоритети — це висока якість надання послуг та індивідуальний підхід до кожного клієнта.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Контактна інформація</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-1">Адреса</h3>
                <p className="text-gray-700">{getContactByType('address') || 'м. Чернівці, вул. Пилипа Орлика 9А'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-2">Телефони</h3>
                {getPhones().length > 0 ? (
                  <div className="space-y-1">
                    {getPhones().map((phone, index) => (
                      <p key={index} className="text-gray-700">
                        <a href={`tel:${phone.value.replace(/\D/g, '')}`} className="hover:text-blue-600 transition-colors">
                          {phone.value}
                        </a>
                        {phone.label && <span className="text-sm text-gray-500 ml-2">({phone.label})</span>}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <a href="tel:+380992244227" className="hover:text-blue-600 transition-colors">
                        +38 (099) 22 44 227
                      </a>
                      <span className="text-sm text-gray-500 ml-2">(Технічна підтримка)</span>
                    </p>
                    <p className="text-gray-700">
                      <a href="tel:+380972244227" className="hover:text-blue-600 transition-colors">
                        +38 (097) 22 44 227
                      </a>
                      <span className="text-sm text-gray-500 ml-2">(Технічна підтримка)</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-1">Email</h3>
                <p className="text-gray-700">
                  <a 
                    href={`mailto:${getContactByType('email') || 'veles.cv@gmail.com'}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {getContactByType('email') || 'veles.cv@gmail.com'}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-700 mb-1">Режим роботи</h3>
                <p className="text-gray-700">Пн-Пт: 9:00 - 18:00</p>
                <p className="text-gray-700">Сб: 10:00 - 15:00</p>
                <p className="text-gray-700">Нд: Вихідний</p>
                <p className="text-gray-700 mt-1"><strong>Технічна підтримка:</strong> 24/7</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Карта Google Maps */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[500px]">
          <div className="h-full w-full relative">
            <Image 
              src="/map-location.png" 
              alt="Карта розташування офісу Велес" 
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="font-semibold text-blue-800">ТОВ "Велес ІСП"</h3>
                <p className="text-gray-700">м. Чернівці, вул. Пилипа Орлика 9А</p>
                <a 
                  href="https://maps.google.com/?q=48.26398402813865, 25.93718308582787" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Відкрити в Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      
      <div className="bg-blue-700 text-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Приєднуйтесь до нашої мережі!</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Ми завжди раді новим клієнтам! Замовте підключення вже сьогодні та отримайте стабільний, швидкісний інтернет від "Велес".
        </p>
        <a 
          href="/tariffs"
          className="inline-block bg-white text-blue-700 px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-1"
        >
          Переглянути тарифи
        </a>
      </div>
    </div>
  );
}