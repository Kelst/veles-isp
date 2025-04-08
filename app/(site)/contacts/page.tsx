'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Contact {
  _id: string;
  type: 'address' | 'phone' | 'email' | 'social';
  value: string;
  label?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/public/contacts');
        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts || []);
        }
      } catch (error) {
        console.error('Помилка завантаження контактів:', error);
      } finally {
        setLoading(false);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (error) setError(null);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (error) setError(null);
  };

  const validateForm = () => {
    // Базова перевірка - номер має містити не менше 10 цифр
    const numberOnly = phone.replace(/\D/g, '');
    if (numberOnly.length < 10) {
      setError('Будь ласка, введіть коректний номер телефону');
      return false;
    }
    
    if (!message.trim()) {
      setError('Будь ласка, введіть ваше повідомлення');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
          service: message, // Використовуємо поле message як service
          type: 'feedback' // Вказуємо тип запиту як "feedback" (звернення абонента)
        }),
      });
      
      if (!response.ok) {
        throw new Error('Помилка відправки запиту');
      }
      
      setSuccess(true);
      setPhone('');
      setMessage('');
    } catch (err) {
      setError('Не вдалося відправити повідомлення. Спробуйте пізніше або зв\'яжіться з нами за телефоном.');
      console.error('Помилка відправки повідомлення:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Контакти</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Контактна інформація */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-6 text-blue-800">Наші контакти</h2>
          
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
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
          )}
        </div>
        
        {/* Карта та форма звернення */}
        <div className="lg:col-span-2 space-y-6">
          {/* Карта Google Maps */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[300px]">
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
          
          {/* Форма звернення */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Надіслати повідомлення</h2>
            <p className="text-gray-600 mb-4">
              Заповніть форму нижче, і ми зв'яжемося з вами якнайшвидше.
            </p>
            
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваш телефон*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+380 XX XXX XX XX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше повідомлення*
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Опишіть ваше питання або проблему..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Відправка...' : 'Надіслати'}
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Ваше повідомлення успішно надіслано! Ми зв'яжемося з вами найближчим часом.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Додаткова інформація */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800">Технічна підтримка</h3>
          </div>
          <p className="text-gray-600 mb-3">
            Наша команда технічної підтримки працює цілодобово, щоб забезпечити стабільне з'єднання.
          </p>
          <a href="tel:+380992244227" className="text-blue-600 hover:text-blue-800 font-medium">Зателефонувати</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800">Клієнтський сервіс</h3>
          </div>
          <p className="text-gray-600 mb-3">
            Маєте питання щодо тарифів чи послуг? Наші консультанти допоможуть вам обрати оптимальний варіант.
          </p>
          <Link href="/abonent" className="text-blue-600 hover:text-blue-800 font-medium">Детальніше</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800">Підключення</h3>
          </div>
          <p className="text-gray-600 mb-3">
            Хочете підключитися до нашої мережі? Ознайомтеся з тарифами та заповніть форму замовлення.
          </p>
          <Link href="/tariffs" className="text-blue-600 hover:text-blue-800 font-medium">Переглянути тарифи</Link>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-700 text-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Приєднуйтесь до нашої мережі!</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Ми завжди раді новим клієнтам! Замовте підключення вже сьогодні та отримайте стабільний, швидкісний інтернет від "Велес".
        </p>
        <Link 
          href="/tariffs"
          className="inline-block bg-white text-blue-700 px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-1"
        >
          Переглянути тарифи
        </Link>
      </div>
    </div>
  );
}