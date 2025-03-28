'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { log } from 'console';

const Footer = () => {
  const [contacts, setContacts] = useState({
    address: '',
    phones: [],
    email: ''
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/public/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        
        const data = await response.json();
        const contactsData = data.contacts || [];
        
        const contactsObj = {
          address: contactsData.find(c => c.type === 'address')?.value || '',
          phones: contactsData
            .filter(c => c.type === 'phone')
            .map(c => c.value) || [],
          email: contactsData.find(c => c.type === 'email')?.value || ''
        };
        console.log(contactsObj);
        
        setContacts(contactsObj);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    
    fetchContacts();
  }, []);
  
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Контактна інформація</h3>
            <div className="flex flex-col space-y-2">
              {contacts.address && (
                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{contacts.address}</span>
                </p>
              )}
              
              {contacts.phones.map((phone, index) => (
                <p key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a href={`tel:${phone}`} className="hover:text-blue-300 transition-colors duration-200">
                    {phone}
                  </a>
                </p>
              ))}
              
              {contacts.email && (
                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a href={`mailto:${contacts.email}`} className="hover:text-blue-300 transition-colors duration-200">
                    {contacts.email}
                  </a>
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-blue-300 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Послуги
                </Link>
              </li>
              <li>
                <Link href="/tariffs" className="hover:text-blue-300 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Тарифи
                </Link>
              </li>
              <li>
                <Link href="/payments" className="hover:text-blue-300 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Оплата
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-300 transition-colors duration-200 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Новини
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Документи</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="/docs/public-offer.pdf" 
                download 
                className="flex items-center text-white hover:text-blue-300 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Публічна оферта
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Велес. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;