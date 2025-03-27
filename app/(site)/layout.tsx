import React from 'react';
import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Шапка сайту */}
      <header className="bg-blue-800 text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Велес
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/about" className="hover:text-blue-200 transition">
                Про нас
              </Link>
              <Link href="/services" className="hover:text-blue-200 transition">
                Послуги
              </Link>
              <Link href="/tariffs" className="hover:text-blue-200 transition">
                Тарифи
              </Link>
              <Link href="/payments" className="hover:text-blue-200 transition">
                Оплата
              </Link>
              <Link href="/news" className="hover:text-blue-200 transition">
                Новини
              </Link>
              <Link href="/contacts" className="hover:text-blue-200 transition">
                Контакти
              </Link>
            </nav>

            {/* Мобільне меню (заглушка) */}
            <div className="md:hidden">
              <button className="text-white">
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
            </div>
          </div>
        </div>
      </header>

      {/* Основний контент */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Підвал сайту */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Контактна інформація</h3>
              <p className="mb-2">Телефон: +380 XX XXX XX XX</p>
              <p className="mb-2">Email: info@veles.example.com</p>
              <p>Адреса: м. Київ, вул. Прикладу, 123</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="hover:text-blue-300 transition">
                    Послуги
                  </Link>
                </li>
                <li>
                  <Link href="/tariffs" className="hover:text-blue-300 transition">
                    Тарифи
                  </Link>
                </li>
                <li>
                  <Link href="/payments" className="hover:text-blue-300 transition">
                    Оплата
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Документи</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-300 transition">
                    Умови надання послуг
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-300 transition">
                    Політика конфіденційності
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} Велес. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}