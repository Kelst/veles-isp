import React from 'react';

interface TariffTabsProps {
  activeTab: 'home' | 'business';
  onTabChange: (tab: 'home' | 'business') => void;
}

const TariffTabs: React.FC<TariffTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          className={`px-8 py-3 text-lg font-medium transition-colors ${
            activeTab === 'home'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onTabChange('home')}
        >
          Для дому
        </button>
        <button
          className={`px-8 py-3 text-lg font-medium transition-colors ${
            activeTab === 'business'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onTabChange('business')}
        >
          Для бізнесу
        </button>
      </div>
    </div>
  );
};

export default TariffTabs;