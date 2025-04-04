import React, { useEffect, useState } from 'react';
import { Clock, Award, Network, Users, ZapOff, Star, Zap } from 'lucide-react';

// CSS для анімацій (додайте це в глобальний CSS файл)
const animationStyles = `
.animate-slide-right {
  animation: slideRight 0.8s ease-out forwards;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out forwards;
}

.animate-pop {
  animation: pop 0.5s ease-out forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

interface TimelineItemProps {
  year: number;
  title: string;
  description: string;
  icon: React.ElementType;
  isVisible: boolean;
  position?: 'left' | 'right';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  icon, 
  isVisible, 
  position = 'left' 
}) => {
  const Icon = icon;
  
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center mb-8 md:mb-12 space-y-4 md:space-y-0">
      <div 
        className={`w-full md:w-5/12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transition: 'all 0.8s ease-out',
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        }}
      >
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 h-full">
          <div className="flex flex-col md:flex-row justify-between items-start mb-2">
            <h3 className="font-bold text-base md:text-lg text-blue-800 mb-2 md:mb-0">{title}</h3>
            <span className="text-xs md:text-sm font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{year}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <div 
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center mx-4 z-10 ${isVisible ? 'animate-pop' : 'opacity-0'}`}
        style={{
          transition: 'all 0.5s ease-out',
          transitionDelay: '0.3s',
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </div>
      
      <div className="hidden md:block w-5/12"></div>
    </div>
  );
};

const CompanyTimeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Додаємо стилі для анімацій
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);

    // Функція для відстеження скролу і показу елементів
    const handleScroll = () => {
      const items = document.querySelectorAll('.timeline-item');
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Якщо елемент в видимій області екрану
        if (rect.top <= windowHeight * 0.8) {
          setVisibleItems(prev => ({ ...prev, [index]: true }));
        }
      });
    };
    
    // Ініціалізація для відображення перших елементів
    setTimeout(handleScroll, 300);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const timelineData = [
    {
      year: 2004,
      title: "Заснування компанії",
      description: "Інтернет-провайдер 'Велес' починає свою роботу на ринку телекомунікаційних послуг України.",
      icon: Star
    },
    {
      year: 2007,
      title: "Перший великий проект",
      description: "Забезпечення інтернетом багатоквартирних будинків у центральних районах м. Чернівці.",
      icon: Network
    },
    {
      year: 2010,
      title: "Розширення зони покриття",
      description: "Вихід на ринок приватного сектору та початок активного розширення мережі по всьому місту.",
      icon: Users
    },
    {
      year: 2013,
      title: "Впровадження оптоволокна",
      description: "Початок прокладання оптоволоконних ліній зв'язку, що дозволило суттєво підвищити швидкість інтернету.",
      icon: Zap
    },
    {
      year: 2015,
      title: "Запуск технічної підтримки 24/7",
      description: "Створення цілодобової служби підтримки клієнтів для оперативного вирішення технічних питань.",
      icon: Clock
    },
    {
      year: 2018,
      title: "Подолання труднощів",
      description: "Успішне подолання технічних та економічних викликів, модернізація обладнання та інфраструктури.",
      icon: ZapOff
    },
    {
      year: 2020,
      title: "Гігабітні швидкості",
      description: "Запуск тарифів з гігабітними швидкостями для приватних та бізнес-клієнтів по всьому місту.",
      icon: Network
    },
    {
      year: 2024,
      title: "Енергетична автономність",
      description: "Забезпечення вузлів безперебійним живленням",
      icon: Award
    },
    {
      year: 2025,
      title: "Сьогодення і плани",
      description: "Продовження модернізації мережі та запуск нових сервісів для наших клієнтів.",
      icon: Star
    }
  ];

  return (
    <div className="bg-blue-50 py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Історія розвитку компанії Велес</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Пройдіть з нами шлях від початку до сьогодення і дізнайтеся, як ми стали лідером на ринку інтернет-послуг у Чернівцях та області.
          </p>
        </div>
        
        <div className="relative">
          {/* Вертикальна лінія */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
          
          {/* Елементи таймлайну */}
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-item">
              <TimelineItem 
                year={item.year}
                title={item.title}
                description={item.description}
                icon={item.icon}
                position={index % 2 === 0 ? 'left' : 'right'}
                isVisible={visibleItems[index]}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <div className="inline-block bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm md:text-base">
            Станьте частиною нашої історії - підключіться до Велес
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTimeline;