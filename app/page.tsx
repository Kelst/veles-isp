import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">Інтернет-провайдер "Велес"</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <Link href="/services" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Послуги</h2>
            <p>Ознайомтеся з нашими послугами підключення та сервісами.</p>
          </Link>
          
          <Link href="/tariffs" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Тарифи</h2>
            <p>Перегляньте наші вигідні тарифні плани для домашнього та бізнес-інтернету.</p>
          </Link>
          
          <Link href="/payments" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Оплата</h2>
            <p>Зручні способи оплати наших послуг.</p>
          </Link>
          
          <Link href="/news" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Новини</h2>
            <p>Останні новини та оновлення нашої компанії.</p>
          </Link>
          
          <Link href="/about" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Про нас</h2>
            <p>Інформація про компанію, нашу історію та цінності.</p>
          </Link>
          
          <Link href="/contacts" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Контакти</h2>
            <p>Зв'яжіться з нами для отримання додаткової інформації.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}