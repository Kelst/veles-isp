import React, { useState } from 'react';
import Link from 'next/link';
import TariffsList from './TariffsList';
import TariffTabs from './TariffTabs';
import ConnectModal from './ConnectModal';

const HomeTariffsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'business'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  
  const handleOpenModal = (tariffName: string) => {
    setSelectedTariff(tariffName);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTariff(null), 300);
  };
  
  const handleTabChange = (tab: 'home' | 'business') => {
    setActiveTab(tab);
  };
  
  return (
    <section className="section bg-gray-50" id="tariffs">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Наші тарифи</h2>
        <p className="section-subtitle">
          Оберіть оптимальний тарифний план для ваших потреб
        </p>
        
        {/* Додаємо компонент табів */}
        <TariffTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="mt-12">
          <TariffsList 
            onSelectTariff={handleOpenModal}
            limit={3} // Показуємо тільки 3 тарифи на головній сторінці
            showPopular={true}
            category={activeTab}
          />
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/tariffs"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Всі тарифи
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
        
        {/* Модальне вікно для замовлення підключення */}
        <ConnectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          tariffName={selectedTariff || undefined}
        />
      </div>
    </section>
  );
};

export default HomeTariffsSection;