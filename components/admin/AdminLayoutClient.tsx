'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AuthProvider from '@/lib/auth/auth-provider';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Якщо це сторінка входу, відображаємо тільки дітей
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Бічна панель */}
      <aside className="bg-gray-800 text-white w-64 p-4 hidden md:block">
        <div className="mb-6">
          <Link href="/admin" className="text-2xl font-bold">
            Велес Адмін
          </Link>
        </div>
        
        <nav className="space-y-2">
          <Link 
            href="/admin/dashboard" 
            className={`block px-4 py-2 rounded transition ${
              pathname === '/admin/dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700'
            }`}
          >
            Панель управління
          </Link>
          <Link 
            href="/admin/tariffs" 
            className={`block px-4 py-2 rounded transition ${
              pathname === '/admin/tariffs' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700'
            }`}
          >
            Тарифи
          </Link>
          <Link 
            href="/admin/news" 
            className={`block px-4 py-2 rounded transition ${
              pathname === '/admin/news' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700'
            }`}
          >
            Новини
          </Link>
          <Link 
            href="/admin/contacts" 
            className={`block px-4 py-2 rounded transition ${
              pathname === '/admin/contacts' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700'
            }`}
          >
            Контакти
          </Link>
          <div className="border-t border-gray-700 my-4"></div>
          <Link 
            href="/" 
            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            На сайт
          </Link>
          <button 
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition text-red-300 hover:text-red-200"
          >
            Вийти
          </button>
        </nav>
      </aside>
      
      {/* Основний контент */}
      <div className="flex-1">
        {/* Верхня панель */}
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center md:hidden">
              <button className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="ml-2 font-semibold">Велес Адмін</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">
                {session?.user?.name || 'Адміністратор'}
              </span>
              <button 
                onClick={handleSignOut}
                className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
              >
                Вийти
              </button>
            </div>
          </div>
        </header>
        
        {/* Контент сторінки */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}