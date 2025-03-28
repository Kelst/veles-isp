import React from 'react';

interface TariffCardProps {
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isPopular?: boolean;
  onSelect: (tariffName: string) => void;
}

const TariffCard: React.FC<TariffCardProps> = ({
  name,
  description,
  price,
  speed,
  features,
  isPopular = false,
  onSelect,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative ${isPopular ? 'border-2 border-blue-500' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold">
          Популярний
        </div>
      )}
      
      <div className={`p-4 text-white ${isPopular ? 'bg-blue-600' : 'bg-blue-700'}`}>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-blue-900">{price}</span>
          <span className="text-gray-600"> грн/міс</span>
          <p className="text-blue-700 font-medium mt-2">{speed}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={() => onSelect(name)}
          className={`block w-full text-center py-2 px-4 rounded-md transition-colors duration-300 ${
            isPopular 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Замовити підключення
        </button>
      </div>
    </div>
  );
};

export default TariffCard;