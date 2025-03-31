import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromoConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoConnectModal: React.FC<PromoConnectModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Валідація номера телефону
  const validatePhone = (value: string) => {
    // Базова перевірка - номер має містити не менше 10 цифр
    const numberOnly = value.replace(/\D/g, '');
    return numberOnly.length >= 10;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (error) setError(null);
  };
  
  const handleSubmit = async () => {
    if (!validatePhone(phone)) {
      setError('Будь ласка, введіть коректний номер телефону');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Формуємо дані запиту
      const requestData = { 
        phone, 
        tariff: "Акційне підключення 500 на 2 місяці безкоштовне",
        type: 'promo' // Спеціальний тип для акційного підключення
      };
      
      // Відправка запиту до API для надсилання повідомлення в Telegram
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error('Помилка відправки запиту');
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Не вдалося відправити заявку. Спробуйте пізніше або зв\'яжіться з нами за телефоном.');
      console.error('Помилка відправки заявки:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Якщо модальне вікно закрите, не відображаємо його
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Закрити"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-2">
              <div className="inline-block bg-yellow-400 text-blue-800 font-bold px-4 py-2 rounded-full text-sm mb-4">
                Спеціальна пропозиція
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
              {success ? 'Заявку відправлено!' : 'Акційне підключення'}
            </h3>
            
            {!success ? (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Ви отримаєте:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-blue-800">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Безкоштовне підключення</span>
                    </li>
                    <li className="flex items-center text-blue-800">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Інтернет 500 Мбіт/с</span>
                    </li>
                    <li className="flex items-center text-blue-800">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>2 місяці безкоштовно</span>
                    </li>
                  </ul>
                </div>
                
                <p className="mb-4 text-gray-700">
                  Залиште свій номер телефону, і наш оператор зв'яжеться з вами для уточнення деталей підключення за акційними умовами.
                </p>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваш номер телефону
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+380 XX XXX XX XX"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      error ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Скасувати
                  </button>
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Відправка...' : 'Замовити акційне підключення'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  Дякуємо за вашу заявку! Наш оператор зв'яжеться з вами найближчим часом для уточнення деталей акційного підключення.
                </p>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                  onClick={onClose}
                >
                  Закрити
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoConnectModal;