"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'Про нас', path: '/about', icon: 'Info' },
    { name: 'Послуги', path: '/services', icon: 'Settings' },
    { name: 'Тарифи', path: '/tariffs', icon: 'Tag' },
    { name: 'Оплата', path: '/payments', icon: 'CreditCard' },
    { name: 'Новини', path: '/news', icon: 'Newspaper' },
    { name: 'Абоненту', path: '/abonent', icon: 'User' },
    { name: 'Поради', path: '/optimization', icon: 'HelpCircle' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white bg-opacity-95 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-36">
            <Image 
              src="/logo.jpg" 
              alt="Veles ISP" 
              fill
              style={{objectFit: "contain"}}
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {menuItems.map((item) => {
            const IconComponent = require('lucide-react')[item.icon];
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="relative px-4 py-2 text-blue-900 font-medium hover:text-blue-600 transition-colors duration-300 group flex items-center"
              >
                <IconComponent className="mr-2 w-5 h-5 text-blue-500" />
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-blue-900 flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-3">
          {menuItems.map((item) => {
            const IconComponent = require('lucide-react')[item.icon];
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="text-blue-900 font-medium py-2 border-b border-gray-100 hover:text-blue-600 transition-colors duration-200 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IconComponent className="mr-3 w-5 h-5 text-blue-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;