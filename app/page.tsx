// app/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectModal from '../components/site/ConnectModal';
import HomeNewsSection from '@/components/site/HomeNewsSection';
import HomeTariffsSection from '@/components/site/HomeTariffsSection';

import SpecialOfferSection from '@/components/site/SpecialOfferSection';
import FloatingPromoPopup from '@/components/site/FloatingPromoPopup';
import FiberOpticAnimation from '@/components/site/FiberOpticAnimation';
import Footer from '@/components/site/Footer';
import Header from '@/components/site/Header';
//SEO

interface Tariff {
  _id: string;
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isActive: boolean;
}

interface Contact {
  _id: string;
  type: 'address' | 'phone' | 'email' | 'social';
  value: string;
  label?: string;
}

export default function HomePage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const promoSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tariffs
        const tariffsRes = await fetch('/api/public/tariffs');
        if (tariffsRes.ok) {
          const tariffsData = await tariffsRes.json();
          setTariffs(tariffsData.tariffs || []);
        }
        
        // Fetch contacts
        const contactsRes = await fetch('/api/public/contacts');
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData.contacts || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const scrollToTariffs = () => {
    const tariffsSection = document.getElementById('tariffs');
    if (tariffsSection) {
      tariffsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToPromo = () => {
    if (promoSectionRef.current) {
      promoSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  
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
  
  return (
    <div className="min-h-screen">
      
      {/* Floating Promo Popup */}
      <FloatingPromoPopup scrollToPromo={scrollToPromo} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Dynamic background with animated overlay */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/wheat-field.png"
      alt="Wheat field"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 animate-pulse-slow"></div>
    
    {/* Animated particles */}
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: 'float 15s infinite linear'
          }}
        ></div>
      ))}
    </div>
  </div>
  
  <div className="container mx-auto px-4 z-10 text-center">
    <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-8 rounded-2xl backdrop-blur-md inline-block border border-white/10 shadow-2xl transform transition-all duration-700 hover:scale-105">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            Інтернет провайдер
          </h1>
          <div className="transform transition-all duration-500 hover:rotate-3 hover:scale-110">
            <Image 
              src="/logo.png" 
              alt="Veles" 
              width={180} 
              height={48} 
              className="drop-shadow-xl filter brightness-110" 
            />
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up drop-shadow-md">
          Швидкісний та стабільний інтернет для вашого комфорту
        </p>
        
        <button 
          onClick={scrollToTariffs}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg animate-pulse-subtle group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center">
            Підключити
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        </button>
      </div>
    </div>
  </div>
  
  {/* Animated wave at bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
      <path fill="#ffffff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,154.7C672,128,768,96,864,101.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</section>
      
      {/* Special Offer Section */}
      <SpecialOfferSection promoRef={promoSectionRef} />
      
      {/* Tariffs Section */}
      <FiberOpticAnimation/>

      <HomeTariffsSection/>
      {/* About Us Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Про компанію Veles</h2>
              <p className="text-gray-700 mb-4">
                Компанія Veles надає послуги швидкісного доступу до мережі Інтернет на території Чернівців та області.
              </p>
              <p className="text-gray-700 mb-4">
                Ми постійно розширюємо мережу та покращуємо якість послуг, щоб забезпечити наших клієнтів надійним та високошвидкісним інтернетом.
              </p>
              <p className="text-gray-700 mb-4">
                Наші пріоритети - це висока якість надання послуг та індивідуальний підхід до кожного клієнта.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
              >
                Дізнатися більше
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            <div className="lg:w-1/2 relative h-64 md:h-96 w-full">
              <Image
                src="/networking.png"
                alt="Networking equipment"
                fill
                style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/*News Section */}
      <HomeNewsSection/>
      {/* Contact Section */}
      <section className="section bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Контактна інформація</h2>
          <p className="section-subtitle">
            Зв'яжіться з нами для отримання додаткової інформації
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Наша адреса</h3>
              </div>
              <p className="text-gray-700">
                {contacts.find(c => c.type === 'address')?.value || 'м. Чернівці, вул. Пилипа Орлика 9А'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Телефони</h3>
              </div>
              <div className="space-y-2">
                {contacts
                  .filter(c => c.type === 'phone')
                  .map((contact, index) => (
                    <p key={index} className="text-gray-700">
                      <a href={`tel:${contact.value.replace(/\D/g, '')}`} className="hover:text-blue-600 transition-colors duration-200">
                        {contact.value}
                      </a>
                      {contact.label && <span className="text-sm text-gray-500 ml-2">({contact.label})</span>}
                    </p>
                  ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Email</h3>
              </div>
              <p className="text-gray-700">
                <a 
                  href={`mailto:${contacts.find(c => c.type === 'email')?.value || 'veles.cv@gmail.com'}`} 
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {contacts.find(c => c.type === 'email')?.value || 'veles.cv@gmail.com'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="section bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Готові підключитися до швидкісного інтернету?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Замовте підключення зараз та отримайте спеціальні умови для нових клієнтів
          </p>
          <button 
            onClick={() => scrollToPromo()}
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-1"
          >
            Дізнатись про акцію
          </button>
        </div>
      </section>
      <Footer/>
      {/* Модальне вікно для замовлення підключення */}
      <ConnectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        tariffName={selectedTariff || undefined}
      />
    </div>
  );
}