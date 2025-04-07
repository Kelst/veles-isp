import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TariffCard from './TariffCard';

// Типи для тарифів
interface Tariff {
  _id: string;
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isActive: boolean;
  category: 'home' | 'business';
}

interface TariffRecommendationProps {
  onSelectTariff: (tariffName: string) => void; // Додаємо prop для обробки замовлення тарифу
}

const TariffRecommendation: React.FC<TariffRecommendationProps> = ({ onSelectTariff }) => {
  // Стани для форми
  const [step, setStep] = useState(1);
  const [deviceCount, setDeviceCount] = useState<number>(0);
  const [usageType, setUsageType] = useState<string[]>([]);
  const [needsStaticIp, setNeedsStaticIp] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Стани для рекомендації
  const [allTariffs, setAllTariffs] = useState<Tariff[]>([]);
  const [recommendedTariff, setRecommendedTariff] = useState<Tariff | null>(null);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  
  // Завантаження тарифів
  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const response = await fetch('/api/public/tariffs');
        if (response.ok) {
          const data = await response.json();
          setAllTariffs(data.tariffs || []);
        }
      } catch (error) {
        console.error('Помилка завантаження тарифів:', error);
      }
    };
    
    fetchTariffs();
  }, []);
  
  // Варіанти використання інтернету
  const usageOptions = [
    { id: 'browsing', label: 'Веб-серфінг', icon: '🌐', weight: 1 },
    { id: 'email', label: 'Електронна пошта', icon: '📧', weight: 1 },
    { id: 'social', label: 'Соціальні мережі', icon: '👥', weight: 2 },
    { id: 'streaming', label: 'Перегляд відео (YouTube, Netflix)', icon: '📺', weight: 4 },
    { id: 'gaming', label: 'Онлайн-ігри', icon: '🎮', weight: 5 },
    { id: 'work', label: 'Віддалена робота', icon: '💼', weight: 3 },
    { id: 'video-calls', label: 'Відеодзвінки', icon: '📹', weight: 3 },
    { id: 'downloads', label: 'Завантаження файлів', icon: '📥', weight: 4 },
    { id: 'streaming-4k', label: 'Стрімінг 4K відео', icon: '🎬', weight: 6 },
  ];
  
  // Типи пристроїв 
  const deviceTypes = [
    { id: 'phone', label: 'Смартфон', icon: '📱', example: '1-2' },
    { id: 'tablet', label: 'Планшет', icon: '📱', example: '1-2' },
    { id: 'laptop', label: 'Ноутбук/ПК', icon: '💻', example: '1-3' },
    { id: 'tv', label: 'Smart TV', icon: '📺', example: '1-2' },
    { id: 'console', label: 'Ігрова консоль', icon: '🎮', example: '0-2' },
    { id: 'smart-home', label: 'Розумний дім', icon: '🏠', example: '0-10+' },
  ];
  
  // Обробка переходу до наступного кроку
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Останній крок
      findRecommendedTariff();
    }
  };
  
  // Обробка переходу до попереднього кроку
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Обробка вибору типу використання
  const handleUsageToggle = (id: string) => {
    if (usageType.includes(id)) {
      setUsageType(usageType.filter(type => type !== id));
    } else {
      setUsageType([...usageType, id]);
    }
  };
  
  // Функція для розрахунку рекомендованого тарифу
  const findRecommendedTariff = () => {
    setIsSubmitting(true);
    
    // Визначаємо необхідну швидкість на основі кількості пристроїв та типу використання
    let requiredSpeed = 0;
    
    // Базова швидкість залежно від кількості пристроїв (приблизно 10-15 Мбіт/с на пристрій)
    requiredSpeed += deviceCount * 15;
    
    // Додаємо швидкість залежно від типу використання
    usageType.forEach(usage => {
      const option = usageOptions.find(opt => opt.id === usage);
      if (option) {
        requiredSpeed += option.weight * 10; // Множимо вагу на базовий коефіцієнт
      }
    });
    
    // Якщо є відеострімінг або ігри, додаємо додатковий запас
    if (usageType.includes('streaming-4k') || usageType.includes('gaming')) {
      requiredSpeed += 50;
    }
    
    // Сортуємо тарифи за швидкістю
    const sortedTariffs = [...allTariffs]
      .filter(tariff => tariff.isActive && tariff.category === 'home')
      .sort((a, b) => {
        // Отримуємо числове значення швидкості (наприклад, з "100/100 Мбіт/с" отримуємо 100)
        const speedA = parseInt(a.speed.split('/')[0]);
        const speedB = parseInt(b.speed.split('/')[0]);
        return speedA - speedB;
      });
    
    // Знаходимо тариф, який відповідає або перевищує необхідну швидкість
    let recommended = sortedTariffs.find(tariff => {
      const tariffSpeed = parseInt(tariff.speed.split('/')[0]);
      return tariffSpeed >= requiredSpeed;
    });
    
    // Якщо не знайдено відповідного тарифу, пропонуємо найшвидший
    if (!recommended && sortedTariffs.length > 0) {
      recommended = sortedTariffs[sortedTariffs.length - 1];
    }
    
    // Встановлюємо рекомендований тариф
    setRecommendedTariff(recommended || null);
    setIsFormCompleted(true);
    setIsSubmitting(false);
  };
  
  // Функція для скидання форми і початку знову
  const resetForm = () => {
    setStep(1);
    setDeviceCount(0);
    setUsageType([]);
    setNeedsStaticIp(null);
    setRecommendedTariff(null);
    setIsFormCompleted(false);
  };
  
  // Функція для відправки форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Підберіть оптимальний тариф
        </h2>
        
        {!isFormCompleted ? (
          <>
            {/* Індикатор прогресу */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3].map(stepNumber => (
                  <div
                    key={stepNumber}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {stepNumber}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">
                      Скільки пристроїв буде підключено до інтернету?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Враховуйте всі пристрої, які можуть використовуватися одночасно: смартфони, планшети, ноутбуки, телевізори тощо.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(count => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setDeviceCount(count)}
                          className={`p-4 rounded-lg border-2 transition-all hover:bg-blue-50 ${
                            deviceCount === count
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="text-2xl mb-2">
                            {count === 10 ? '10+' : count}
                          </div>
                          <div className="text-sm text-gray-600">
                            {count === 1 ? 'пристрій' : count < 5 ? 'пристрої' : 'пристроїв'}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex flex-wrap gap-3 mb-3">
                        {deviceTypes.map(device => (
                          <div key={device.id} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <span className="mr-1">{device.icon}</span>
                            <span>{device.label}</span>
                            <span className="ml-1 text-gray-500 text-xs">
                              ({device.example})
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        * Вказані приклади типових пристроїв та їх кількість у домогосподарстві
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">
                      Для чого переважно використовуватиметься інтернет?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Оберіть всі варіанти, які відповідають вашим потребам.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {usageOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleUsageToggle(option.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all hover:bg-blue-50 ${
                            usageType.includes(option.id)
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{option.icon}</span>
                            <span className="text-lg">{option.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">
                      Чи потрібна вам статична IP-адреса?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Статична IP-адреса потрібна для віддаленого доступу до мережевих ресурсів, хостингу серверів, відеоспостереження тощо.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <button
                        type="button"
                        onClick={() => setNeedsStaticIp(true)}
                        className={`p-6 rounded-lg border-2 text-left transition-all hover:bg-blue-50 ${
                          needsStaticIp === true
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">✅</span>
                          <div>
                            <span className="text-lg font-medium">Так, потрібна</span>
                            <p className="text-sm text-gray-600 mt-1">
                              Додаткова оплата 50 грн/місяць
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setNeedsStaticIp(false)}
                        className={`p-6 rounded-lg border-2 text-left transition-all hover:bg-blue-50 ${
                          needsStaticIp === false
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">❌</span>
                          <div>
                            <span className="text-lg font-medium">Ні, не потрібна</span>
                            <p className="text-sm text-gray-600 mt-1">
                              Динамічна IP-адреса підійде для звичайного користування
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-blue-800 mb-2">Коли може знадобитись статична IP-адреса:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Віддалений доступ до домашніх пристроїв</li>
                        <li>• Хостинг серверів (веб, пошта, ігрові)</li>
                        <li>• Системи відеоспостереження з віддаленим доступом</li>
                        <li>• Підключення до корпоративних VPN</li>
                        <li>• Онлайн-ігри з виділеним сервером</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={`px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    step === 1 ? 'invisible' : ''
                  }`}
                >
                  Назад
                </button>
                
                <button
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={step < 3 ? handleNextStep : undefined}
                  disabled={
                    (step === 1 && deviceCount === 0) ||
                    (step === 2 && usageType.length === 0) ||
                    (step === 3 && needsStaticIp === null) ||
                    isSubmitting
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {step < 3 ? 'Далі' : isSubmitting ? 'Підбір...' : 'Підібрати тариф'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800">
                Ми підібрали для вас оптимальний тариф
              </h3>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Ваші параметри:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Кількість пристроїв: <span className="font-medium">{deviceCount}</span></li>
                <li>• Використання: <span className="font-medium">
                  {usageType.map(type => usageOptions.find(opt => opt.id === type)?.label).join(', ')}
                </span></li>
                <li>• Статична IP-адреса: <span className="font-medium">{needsStaticIp ? 'Так' : 'Ні'}</span></li>
              </ul>
            </div>
            
            {recommendedTariff ? (
              <div className="mx-auto max-w-md">
                <div className="text-center mb-4">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Рекомендований тариф
                  </span>
                </div>
                
                <div className="transform transition hover:scale-105">
                  <TariffCard
                    name={recommendedTariff.name}
                    description={recommendedTariff.description}
                    price={recommendedTariff.price + (needsStaticIp ? 50 : 0)} // Додаємо вартість статичної IP якщо потрібно
                    speed={recommendedTariff.speed}
                    features={[
                      ...recommendedTariff.features,
                      ...(needsStaticIp ? ['Статична IP-адреса'] : [])
                    ]}
                    isPopular={true}
                    onSelect={() => onSelectTariff(recommendedTariff.name)}
                  />
                </div>
                
                {/* Додаємо окрему кнопку для замовлення для більшої видимості
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => onSelectTariff(recommendedTariff.name)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
                  >
                    Замовити підключення
                  </button>
                </div> */}
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600 mb-2">
                    {needsStaticIp && 'Вартість тарифу включає додаткову послугу "Статична IP-адреса" (50 грн/міс)'}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Почати знову
                    </button>
                    <button
                      onClick={() => window.location.href = '/tariffs'}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Переглянути всі тарифи
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-600 mb-4">
                  На жаль, наразі не вдалося підібрати відповідний тариф. Будь ласка, спробуйте змінити параметри.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Почати знову
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffRecommendation;