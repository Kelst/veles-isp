import React, { useState } from 'react';
import Button from '../ui/Button';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariffName?: string;
  serviceName?: string; // Додаємо опціональне поле для назви послуги
}

const ConnectModal: React.FC<ConnectModalProps> = ({ 
  isOpen, 
  onClose,
  tariffName,
  serviceName
}) => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Перевіряємо тип заявки
  const isServiceRequest = !!serviceName;
  
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
      // Формуємо дані запиту залежно від типу заявки
      const requestData = isServiceRequest 
        ? { 
            phone, 
            service: serviceName,
            type: 'service' // Для замовлення послуги
          } 
        : { 
            phone, 
            tariff: tariffName || 'Не вказано'
            // Тип не вказуємо для сумісності зі старим API
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
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
      backgroundImage: 'url("/wheat-field.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl animate-fade-in">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Закрити"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          {success ? 'Заявку відправлено!' : isServiceRequest ? 'Замовлення послуги' : 'Замовити підключення'}
        </h3>
        
        {!success ? (
          <>
            {tariffName && !isServiceRequest && (
              <p className="mb-4 text-gray-700">
                Тариф: <span className="font-medium">{tariffName}</span>
              </p>
            )}
            
            {serviceName && isServiceRequest && (
              <p className="mb-4 text-gray-700">
                Послуга: <span className="font-medium">{serviceName}</span>
              </p>
            )}
            
            <p className="mb-4 text-gray-700">
              {isServiceRequest 
                ? 'Залиште свій номер телефону, і наш спеціаліст зв\'яжеться з вами для уточнення деталей.'
                : 'Залиште свій номер телефону, і наш оператор зв\'яжеться з вами для уточнення деталей підключення.'
              }
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
                className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                disabled={isSubmitting}
              >
                Скасувати
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Відправка...' : 'Подати заявку'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4">
                Дякуємо за вашу заявку! {isServiceRequest ? 'Спеціаліст' : 'Оператор'} зв'яжеться з вами найближчим часом для уточнення деталей.
              </p>
            </div>
            
            <div className="text-center">
              <Button type="button" variant="primary" onClick={onClose}>
                Закрити
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectModal;