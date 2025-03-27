export default function AdminDashboardPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Панель управління</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-700">Активні тарифи</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-700">Опубліковані новини</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-700">Контакти</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-700">Адміністратори</h2>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Останні дії</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <p className="text-gray-500">Ще немає даних для відображення.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }