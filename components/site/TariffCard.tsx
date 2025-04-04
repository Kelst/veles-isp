import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl shadow-2xl 
        ${isPopular ? 'ring-4 ring-blue-500/50' : 'hover:ring-2 hover:ring-blue-300'}
        transform transition-all duration-300 ease-in-out
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Популярний бейдж з анімацією */}
      {isPopular && (
        <motion.div 
          initial={{ rotate: -45, x: '-50%', y: '-50%' }}
          animate={{ 
            rotate: [-45, -35, -45],
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
          className="absolute top-0 right-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 
            text-white px-6 py-2 text-sm font-bold transform rotate-45 origin-top-left"
        >
          Популярний
        </motion.div>
      )}

      {/* Фон з градієнтом та анімованими хвилями */}
      <div 
        className={`absolute inset-0 opacity-10 
          ${isPopular ? 'bg-gradient-to-br from-blue-200 to-blue-400' : 'bg-gradient-to-br from-gray-100 to-gray-200'}
        `}
        style={{
          backgroundImage: `
            radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(circle at bottom left, rgba(0,0,255,0.1) 0%, transparent 50%)
          `,
          backgroundBlendMode: 'overlay'
        }}
      />

      {/* Контент картки */}
      <div className="relative z-10 bg-white">
        <div className={`p-5 text-white 
          ${isPopular ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-blue-700 to-blue-600'}
        `}>
          <h3 className="text-xl font-bold tracking-wider">{name}</h3>
        </div>

        <div className="p-6 relative">
          {/* Анімований цінник */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <span className="text-4xl font-extrabold text-blue-900">{price}</span>
            <span className="text-gray-600 ml-1"> грн/міс</span>
            <p className="text-blue-700 font-semibold mt-2 tracking-wider">{speed}</p>
          </motion.div>

          {/* Опис та особливості */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4 italic">{description}</p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg 
                    className="w-6 h-6 text-green-500 mr-3 animate-pulse" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Кнопка замовлення з інтерактивним ефектом */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(name)}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold tracking-wider transform transition-all duration-300 
              ${isPopular 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              } 
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
          >
            Замовити підключення
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TariffCard;