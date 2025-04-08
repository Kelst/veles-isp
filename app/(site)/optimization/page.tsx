'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Keep Link if you plan to use internal navigation later
import Image from 'next/image';

const OptimizationPage = () => {
  // State to track the open section
  const [openSection, setOpenSection] = useState<string | null>('router');

  // Handler to toggle sections
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Рекомендації щодо оптимізації використання інтернету</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Наша мета — забезпечити вам максимально якісний інтернет-зв'язок. Скористайтеся цими рекомендаціями,
          щоб покращити швидкість, надійність та безпеку вашого підключення.
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {[
          { id: 'router', name: 'Розташування роутера' },
          { id: 'wifi', name: 'Wi-Fi налаштування' },
          { id: 'security', name: 'Безпека в мережі' },
          { id: 'traffic', name: 'Оптимізація трафіку' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => toggleSection(section.id)}
            // Added transform, focus styles, and active:scale-95
            className={`px-5 py-2.5 rounded-full transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:scale-95 ${
              openSection === section.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:shadow-sm'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Router Placement */}
        {/* This div already has the collapse/expand animation */}
        <div className={`mb-8 transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'router' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Оптимальне розташування роутера</h2>
                <p className="text-gray-700 mb-6">
                  Правильне розташування маршрутизатора (роутера) може значно покращити якість сигналу Wi-Fi у вашому домі.
                </p>

                <h3 className="text-lg font-semibold text-blue-700 mb-2">Основні рекомендації:</h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Центральне розташування</strong> — розмістіть роутер у центрі вашого дому для рівномірного покриття.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Високе положення</strong> — встановіть роутер на відкритій підвищеній поверхні, наприклад, на шафі або полиці.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Уникайте перешкод</strong> — тримайте роутер подалі від товстих стін, металевих предметів, водяних резервуарів та інших електронних пристроїв (мікрохвильовки, Bluetooth-пристрої).</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>Орієнтація антен</strong> (якщо є зовнішні) — експериментуйте з напрямком; часто допомагає направити одну вертикально, а іншу горизонтально.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-blue-700 mb-2">Чого варто уникати:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Не ховайте роутер у закритій шафі, шухляді або позаду великих меблів.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Уникайте розміщення поруч з мікрохвильовими печами, бездротовими телефонами та іншими джерелами радіоперешкод.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Не розміщуйте роутер на підлозі або біля великих металевих поверхонь (наприклад, системного блоку комп'ютера).</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                <Image
                  src="/router-placement.png" // Ensure this image exists in /public
                  alt="Оптимальне розташування роутера"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-r-lg md:rounded-l-none"
                />
                 {/* Gradient for better text transition */}
                 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wi-Fi Settings */}
        {/* This div also has the collapse/expand animation */}
        <div className={`mb-8 transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'wifi' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            {/* Content for Wi-Fi Settings goes here... */}
             <h2 className="text-2xl font-bold text-blue-800 mb-4">Налаштування Wi-Fi мережі для максимальної швидкості</h2>
             <p className="text-gray-700 mb-6">
              Правильне налаштування вашого Wi-Fi покращить швидкість і стабільність інтернет-з'єднання.
              Ось декілька порад, які допоможуть досягти оптимальної продуктивності.
             </p>
             {/* ... rest of the Wi-Fi section content */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Вибір частотного діапазону</h3>
                <p className="text-gray-700 mb-4">
                  Сучасні роутери підтримують два частотні діапазони: 2.4 ГГц і 5 ГГц.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2 w-16 flex-shrink-0">2.4 ГГц:</span>
                    <span>Краще проникає крізь стіни, має більший радіус дії, але нижчу швидкість та більше схильний до перешкод. Підходить для базових задач та пристроїв, що далеко від роутера.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2 w-16 flex-shrink-0">5 ГГц:</span>
                    <span>Вища швидкість, менше перешкод, але менший радіус дії та гірше проходить крізь перепони. Ідеально для HD/4K-стрімінгу, онлайн-ігор та швидких завантажень біля роутера.</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm mt-3"><i>Порада: Назвіть мережі 2.4 ГГц і 5 ГГц по-різному (напр., "MyHome_2.4" і "MyHome_5"), щоб обирати потрібну вручну.</i></p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Вибір каналу та ширини каналу</h3>
                <p className="text-gray-700 mb-4">
                  Wi-Fi канали можуть перекриватися, особливо в багатоквартирних будинках, що спричиняє інтерференцію і знижує швидкість.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Для 2.4 ГГц використовуйте канали 1, 6 або 11, оскільки вони не перекриваються. Перевірте завантаженість каналів за допомогою спеціальних програм (напр., Wi-Fi Analyzer).</span>
                  </li>
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Для 5 ГГц вибір каналів ширший і перекриття менш імовірне. Автоматичний вибір часто працює добре.</span>
                   </li>
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Ширина каналу (20/40/80/160 МГц): ширший канал дає вищу швидкість, але може бути менш стабільним при перешкодах. Для 2.4 ГГц краще використовувати 20 МГц, для 5 ГГц можна 40 або 80 МГц.</span>
                   </li>
                </ul>
              </div>
            </div>

             <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Оновлення прошивки роутера</h3>
                <p className="text-gray-700">
                  Виробники регулярно випускають оновлення програмного забезпечення (прошивки) для роутерів, які виправляють помилки, покращують продуктивність та додають нові функції безпеки. Перевіряйте наявність
                  оновлень в адміністративному інтерфейсі вашого роутера (зазвичай доступний за адресою 192.168.0.1 або 192.168.1.1) або на сайті виробника.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Захист мережі (Безпека = Швидкість)</h3>
                <p className="text-gray-700 mb-3">
                  Незахищена мережа може використовуватися сторонніми особами, що сповільнить ваше з'єднання та створить ризики безпеки.
                </p>
                <ul className="space-y-2 text-gray-700">
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Використовуйте найнадійніший стандарт шифрування, який підтримує ваш роутер та пристрої: WPA3 є найкращим, WPA2 - хороший мінімум. Уникайте застарілих WEP та WPA.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Створіть довгий (12+ символів) та складний пароль для Wi-Fi мережі, використовуючи літери, цифри та символи. Не використовуйте особисту інформацію.</span>
                  </li>
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Вимкніть функцію WPS (Wi-Fi Protected Setup), оскільки вона має відомі вразливості. Налаштовуйте підключення вручну за допомогою пароля.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Додаткові поради для покращення Wi-Fi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-blue-600 mb-2">Розширення покриття</h4>
                    <p className="text-gray-700 text-sm">
                      Якщо у вас великий будинок або є "мертві зони", розгляньте використання Wi-Fi репітерів (підсилювачів), Powerline-адаптерів або Mesh-систем для стабільного сигналу всюди.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-blue-600 mb-2">Регулярне перезавантаження</h4>
                    <p className="text-gray-700 text-sm">
                      Періодичне перезавантаження роутера (наприклад, раз на тиждень) може вирішити тимчасові проблеми, очистити кеш та покращити стабільність роботи.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-blue-600 mb-2">Контроль підключених пристроїв</h4>
                    <p className="text-gray-700 text-sm">
                      Перевіряйте список підключених пристроїв в налаштуваннях роутера. Відключайте невідомі пристрої. Використовуйте MAC-фільтрацію для додаткового захисту (хоча це не панацея).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-blue-600 mb-2">Налаштування QoS</h4>
                    <p className="text-gray-700 text-sm">
                      Функція Quality of Service (QoS) дозволяє пріоритезувати трафік для певних програм або пристроїв (наприклад, для відеодзвінків, ігор), щоб вони працювали стабільніше при завантаженій мережі.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Security */}
         {/* This div also has the collapse/expand animation */}
         <div className={`mb-8 transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'security' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            {/* Content for Network Security goes here... */}
             <h2 className="text-2xl font-bold text-blue-800 mb-4">Безпечне використання інтернету</h2>
            <p className="text-gray-700 mb-6">
              Безпека в інтернеті — це не лише захист від вірусів, але й комплексний підхід до захисту ваших даних, приватності та пристроїв.
              Дотримуйтесь цих рекомендацій для мінімізації ризиків.
            </p>
            {/* ... rest of the security section content */}
             <div className="bg-blue-50 p-5 rounded-lg mb-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Основні правила онлайн-безпеки</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                 <div className="flex items-start">
                   <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                   </svg>
                   <span><strong>Надійні, унікальні паролі:</strong> Використовуйте складні паролі (різні регістри, цифри, символи) для кожного важливого сервісу. Використовуйте менеджер паролів.</span>
                 </div>
                 <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.753 20.571M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4" />
                    </svg>
                    <span><strong>Двофакторна автентифікація (2FA):</strong> Активуйте 2FA (через SMS, додаток-автентифікатор або ключ безпеки) всюди, де це можливо (пошта, соцмережі, банк).</span>
                 </div>
                 <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 00-15.357-2m15.357 2H15" />
                    </svg>
                    <span><strong>Оновлення ПЗ:</strong> Регулярно оновлюйте операційну систему, браузер, антивірус та інші програми. Оновлення часто містять виправлення безпеки.</span>
                 </div>
                 <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span><strong>Обережно з фішингом:</strong> Не переходьте за підозрілими посиланнями та не відкривайте вкладення у листах чи повідомленнях від невідомих відправників. Перевіряйте адресу відправника.</span>
                 </div>
                 <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span><strong>Безпечне завантаження:</strong> Завантажуйте програми та файли лише з офіційних та перевірених джерел.</span>
                 </div>
                 <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                    <span><strong>Перевірка URL:</strong> Перед введенням логіна/пароля або платіжних даних, переконайтеся, що сайт використовує HTTPS (замочок в адресному рядку) та адреса сайту правильна.</span>
                 </div>
              </div>
            </div>
            {/* ... rest of security content */}
             <h3 className="text-lg font-semibold text-blue-700 mb-3">Захист домашньої мережі та пристроїв</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div>
                 <h4 className="font-medium text-blue-600 mb-2">Налаштування роутера (додатково до Wi-Fi)</h4>
                 <ul className="space-y-2 text-gray-700">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Змініть логін/пароль адміністратора:</strong> Не залишайте стандартні `admin/admin`, `admin/password` тощо.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Вимкніть віддалений доступ:</strong> Якщо вам не потрібне керування роутером ззовні вашої мережі, вимкніть цю функцію.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Гостьова мережа:</strong> Якщо роутер підтримує, налаштуйте окрему гостьову Wi-Fi мережу для відвідувачів, щоб ізолювати їх від ваших основних пристроїв.</span>
                   </li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-medium text-blue-600 mb-2">Програмне забезпечення для безпеки</h4>
                 <ul className="space-y-2 text-gray-700">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                     </svg>
                     <span><strong>Антивірус та Anti-Malware:</strong> Використовуйте надійне антивірусне ПЗ на комп'ютерах та смартфонах і регулярно оновлюйте його бази.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                     <span><strong>Брандмауер (Firewall):</strong> Переконайтеся, що брандмауер увімкнено (в ОС та/або на роутері) для контролю мережевих з'єднань.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.904 10.236-3.904 14.141 0M1.394 9.343c5.857-5.857 15.355-5.857 21.213 0" />
                     </svg>
                     <span><strong>VPN (Віртуальна приватна мережа):</strong> Використовуйте VPN при підключенні до публічних Wi-Fi мереж для шифрування трафіку. Може бути корисним і вдома для приватності.</span>
                   </li>
                 </ul>
               </div>
            </div>
            {/* ... child safety content ... */}
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">Безпека дітей в інтернеті</h3>
              <p className="text-gray-700 mb-3">
                Захист дітей онлайн потребує особливої уваги та спілкування. Ось декілька технічних та освітніх рекомендацій:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  <span><strong>Батьківський контроль:</strong> Використовуйте вбудовані функції ОС або спеціалізовані програми для фільтрації контенту, обмеження часу та моніторингу активності.</span>
                </li>
                <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  <span><strong>Спілкування:</strong> Говоріть з дітьми про ризики в інтернеті (кібербулінг, неприйнятний контент, шахрайство, спілкування з незнайомцями). Навчіть їх критично мислити.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                  <span><strong>Розташування пристроїв:</strong> Розміщуйте комп'ютери та планшети у спільних кімнатах, а не в дитячих спальнях, для кращого нагляду.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2h2v-2h2v-3H9m7-5a2 2 0 00-2-2M3 7a2 2 0 012-2m14 0a6 6 0 00-7.743 5.743L11 17H9" />
                  </svg>
                  <span><strong>Приватність:</strong> Навчіть дітей не ділитися особистою інформацією (повне ім'я, адреса, школа, фото) з незнайомцями або на публічних платформах.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Traffic Optimization */}
        {/* This div also has the collapse/expand animation */}
        <div className={`mb-8 transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'traffic' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            {/* Content for Traffic Optimization goes here... */}
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Оптимізація інтернет-трафіку</h2>
            <p className="text-gray-700 mb-6">
              Навіть при швидкому з'єднанні, неефективне використання трафіку може призводити до сповільнень, особливо коли мережу використовують кілька пристроїв одночасно. Оптимізація допоможе раціонально розподілити ресурси.
            </p>
             {/* ... rest of the traffic section content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Визначте "пожирачів" трафіку</h3>
                 <ul className="space-y-2 text-gray-700">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                     </svg>
                     <span><strong>Відеострімінг:</strong> Сервіси типу YouTube, Netflix, Megogo у високій якості (HD, 4K) споживають багато даних.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm12 3l-4 4-4-4" />
                     </svg>
                     <span><strong>Онлайн-ігри:</strong> Хоча самі ігри не завжди потребують багато трафіку, їх завантаження та оновлення можуть бути дуже об'ємними.</span>
                   </li>
                   <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                     </svg>
                     <span><strong>Великі завантаження/вивантаження:</strong> Торренти, завантаження великих файлів, синхронізація з хмарними сховищами (Google Drive, Dropbox).</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 00-15.357-2m15.357 2H15" />
                     </svg>
                     <span><strong>Автоматичні оновлення:</strong> Оновлення ОС, програм та ігор у фоновому режимі.</span>
                   </li>
                 </ul>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Способи оптимізації</h3>
                 <ul className="space-y-2 text-gray-700">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Налаштування якості відео:</strong> Зменшуйте якість відео (з 4K/1080p до 720p або 480p), якщо максимальна якість не є критичною.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Обмеження фонових даних:</strong> В налаштуваннях ОС (Windows, macOS, Android, iOS) можна обмежити використання даних програмами у фоновому режимі.</span>
                   </li>
                    <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Планування завантажень:</strong> Запускайте великі завантаження/оновлення/синхронізацію в години найменшого навантаження (наприклад, вночі).</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Закривайте зайве:</strong> Закривайте непотрібні вкладки браузера та програми, які можуть використовувати інтернет у фоні.</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span><strong>Використовуйте QoS:</strong> Якщо ваш роутер підтримує Quality of Service, налаштуйте пріоритети для найважливіших для вас завдань (див. розділ Wi-Fi).</span>
                   </li>
                 </ul>
              </div>
            </div>

             <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Перевірка на шкідливе ПЗ</h3>
              <p className="text-gray-700">
                Деякі види шкідливого програмного забезпечення (malware) можуть непомітно використовувати ваше інтернет-з'єднання для своїх цілей (наприклад, розсилки спаму або участі в DDoS-атаках). Регулярно скануйте свої пристрої на наявність вірусів та шпигунського ПЗ за допомогою надійного антивірусу.
              </p>
            </div>

          </div>
        </div>

      </div> {/* End max-w-4xl */}

       {/* Link to support or contact page */}
      <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Не знайшли вирішення проблеми? Наша служба підтримки завжди готова допомогти.</p>
          <Link href="/contacts" legacyBehavior>
              <a className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 shadow-md active:scale-95"> {/* Added active effect here too */}
                  Зв'язатися з підтримкою
              </a>
          </Link>
      </div>

    </div> // End container
  );
};

export default OptimizationPage;