import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PromoConnectModal from './PromoConnectModal';




interface SpecialOfferSectionProps {
  promoRef: React.RefObject<HTMLDivElement>;
}

const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ promoRef }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={promoRef} className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Спеціальна пропозиція для нових абонентів!</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Підключайтесь до мережі Veles та отримуйте надшвидкісний інтернет безкоштовно
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Переваги акційної пропозиції</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Безкоштовне підключення</h4>
                  <p className="text-blue-100">Для нових абонентів підключення абсолютно безкоштовне</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">2 місяці безкоштовно</h4>
                  <p className="text-blue-100">Тариф 500 Мбіт/с протягом 2 місяців абсолютно безкоштовно</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Швидкість 500 Мбіт/с</h4>
                  <p className="text-blue-100">Надшвидкісний інтернет для роботи, навчання та розваг</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-xl text-blue-900"
          >
            <div className="text-center mb-6">
              <span className="inline-block bg-yellow-400 text-blue-800 font-bold px-4 py-2 rounded-full text-sm mb-4">
                Обмежена пропозиція
              </span>
              <h3 className="text-3xl font-bold">500 Мбіт/с</h3>
              <div className="flex justify-center items-baseline my-4">
                <span className="text-5xl font-extrabold">0</span>
                <span className="text-xl ml-1">грн/міс</span>
              </div>
              <p className="text-gray-600 mb-2">протягом перших 2 місяців</p>
              <p className="text-gray-600">далі за ціною тарифного плану</p>
            </div>
            
            <ul className="mb-8 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Швидкість до 500 Мбіт/с</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Безліміт трафіку</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Цілодобова підтримка</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Безкоштовне підключення</span>
              </li>
            </ul>
            
            <button
              onClick={handleOpenModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Замовити акційне підключення
            </button>
          </motion.div>
        </div>
      </div>
      
      <PromoConnectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SpecialOfferSection;