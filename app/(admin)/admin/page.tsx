import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Адміністративна панель</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Link href="/admin/dashboard" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Панель управління</h2>
          <p>Загальна статистика та інформація.</p>
        </Link>
        
        <Link href="/admin/tariffs" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Тарифи</h2>
          <p>Управління тарифними планами.</p>
        </Link>
        
        <Link href="/admin/news" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Новини</h2>
          <p>Управління новинами та оголошеннями.</p>
        </Link>
        
        <Link href="/admin/contacts" className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Контакти</h2>
          <p>Управління контактною інформацією.</p>
        </Link>
      </div>
    </div>
  );
}