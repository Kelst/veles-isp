import React from 'react';

const FiberOpticAnimation: React.FC = () => {
  return (
    <div className="w-full flex justify-center my-8">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full max-w-4xl">
        {/* Фон */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#C9E9F6" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#A67C00" />
          </linearGradient>
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A6787" />
            <stop offset="100%" stopColor="#283747" />
          </linearGradient>
          <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5D76E" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          <linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E4319" />
            <stop offset="100%" stopColor="#8B5A2B" />
          </linearGradient>
          <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
            <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
            <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
            <feFlood floodColor="#00BBFF" result="glowColor" />
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
            <feMerge>
              <feMergeNode in="softGlow_colored"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Небо */}
        

        {/* Земля */}
       
        {/* Інтернет-провайдер (будівля) */}
        <g>
          <rect x="50" y="100" width="150" height="200" rx="5" fill="url(#buildingGradient)" />
          <text x="125" y="170" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Інтернет-провайдер</text>
          <text x="125" y="190" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Велес</text>
          {/* Антена */}
          <line x1="125" y1="100" x2="125" y2="60" stroke="#555" strokeWidth="4" />
          <circle cx="125" cy="50" r="10" fill="#777" />
          
          {/* Вікна будівлі */}
          <rect x="70" y="130" width="30" height="30" fill="#3498DB" />
          <rect x="150" y="130" width="30" height="30" fill="#3498DB" />
          <rect x="70" y="200" width="30" height="30" fill="#3498DB" />
          <rect x="150" y="200" width="30" height="30" fill="#3498DB" />
          
          {/* Двері будівлі */}
          <rect x="110" y="250" width="30" height="50" fill="#34495E" />
        </g>

        {/* Стовпи для кабелю */}
        {/* Стовп 1 */}
        <g>
          <rect x="250" y="140" width="10" height="160" fill="url(#poleGradient)" />
          {/* Поперечна балка */}
          <rect x="230" y="145" width="50" height="8" fill="#5D4037" />
          {/* Ізолятори */}
          <circle cx="240" cy="145" r="4" fill="#D7CCC8" />
          <circle cx="270" cy="145" r="4" fill="#D7CCC8" />
        </g>

        {/* Стовп 2 */}
        <g>
          <rect x="400" y="140" width="10" height="160" fill="url(#poleGradient)" />
          {/* Поперечна балка */}
          <rect x="380" y="145" width="50" height="8" fill="#5D4037" />
          {/* Ізолятори */}
          <circle cx="390" cy="145" r="4" fill="#D7CCC8" />
          <circle cx="420" cy="145" r="4" fill="#D7CCC8" />
        </g>

        {/* Стовп 3 */}
        <g>
          <rect x="550" y="140" width="10" height="160" fill="url(#poleGradient)" />
          {/* Поперечна балка */}
          <rect x="530" y="145" width="50" height="8" fill="#5D4037" />
          {/* Ізолятори */}
          <circle cx="540" cy="145" r="4" fill="#D7CCC8" />
          <circle cx="570" cy="145" r="4" fill="#D7CCC8" />
        </g>

        {/* Будинок клієнта */}
        <g>
          <polygon points="600,190 700,190 650,130" fill="#C03A2B" /> {/* Дах */}
          <rect x="610" y="190" width="80" height="110" fill="url(#houseGradient)" /> {/* Основна будівля */}
          <rect x="635" y="240" width="30" height="60" fill="#5D6D7E" /> {/* Двері */}
          <rect x="620" y="210" width="20" height="20" fill="#AED6F1" /> {/* Ліве вікно */}
          <rect x="660" y="210" width="20" height="20" fill="#AED6F1" /> {/* Праве вікно */}
          <text x="650" y="320" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle">Ваш дім</text>
        </g>

        {/* Шлях оптичного кабелю, що йде по стовпах */}
        <path id="cablePath" d="M200,145 C220,135 230,145 255,145 C280,155 320,155 345,145 C370,135 380,145 405,145 C430,155 470,155 495,145 C520,135 530,145 555,145 C580,155 590,145 610,155" 
              fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />

        {/* Додаткові кріплення до стовпів */}
        <line x1="255" y1="145" x2="255" y2="155" stroke="#444" strokeWidth="2" />
        <line x1="405" y1="145" x2="405" y2="155" stroke="#444" strokeWidth="2" />
        <line x1="555" y1="145" x2="555" y2="155" stroke="#444" strokeWidth="2" />

        {/* Анімація світлових сигналів - тепер за новим шляхом */}
        <circle id="lightSignal1" cx="0" cy="0" r="5" fill="#3498DB" filter="url(#glow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M200,145 C220,135 230,145 255,145 C280,155 320,155 345,145 C370,135 380,145 405,145 C430,155 470,155 495,145 C520,135 530,145 555,145 C580,155 590,145 610,155"
          />
        </circle>

        <circle id="lightSignal2" cx="0" cy="0" r="5" fill="#3498DB" filter="url(#glow)">
          <animateMotion
            begin="1s"
            dur="3s"
            repeatCount="indefinite"
            path="M200,145 C220,135 230,145 255,145 C280,155 320,155 345,145 C370,135 380,145 405,145 C430,155 470,155 495,145 C520,135 530,145 555,145 C580,155 590,145 610,155"
          />
        </circle>

        <circle id="lightSignal3" cx="0" cy="0" r="5" fill="#3498DB" filter="url(#glow)">
          <animateMotion
            begin="2s"
            dur="3s"
            repeatCount="indefinite"
            path="M200,145 C220,135 230,145 255,145 C280,155 320,155 345,145 C370,135 380,145 405,145 C430,155 470,155 495,145 C520,135 530,145 555,145 C580,155 590,145 610,155"
          />
        </circle>

        {/* Інформаційні блоки */}
        <g>
          {/* Переваги оптоволоконного підключення */}
          <rect x="50" y="330" width="200" height="60" rx="10" fill="#3498DB" opacity="0.9" />
          <text x="150" y="350" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">ПЕРЕВАГИ:</text>
          <text x="150" y="370" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Швидкість до 1 Гбіт/с</text>
          <text x="150" y="385" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Стабільне з'єднання без перешкод</text>
          
          {/* Процес передачі даних */}
          <rect x="300" y="330" width="200" height="60" rx="10" fill="#27AE60" opacity="0.9" />
          <text x="400" y="350" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">ПРОЦЕС:</text>
          <text x="400" y="370" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Світлові імпульси по оптоволокну</text>
          <text x="400" y="385" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Миттєва передача на великі відстані</text>
          
          {/* Додаткові переваги */}
          <rect x="550" y="330" width="200" height="60" rx="10" fill="#9B59B6" opacity="0.9" />
          <text x="650" y="350" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">ДОДАТКОВО:</text>
          <text x="650" y="370" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Висока надійність та безпека</text>
          <text x="650" y="385" fontFamily="Arial" fontSize="10" fill="white" textAnchor="middle">Одночасний доступ для всіх пристроїв</text>
        </g>

        {/* Маршрутизатор у будинку */}
        <g transform="translate(610, 230) scale(0.6)">
          <rect x="0" y="0" width="60" height="20" rx="3" fill="#333" />
          <circle cx="15" cy="10" r="3" fill="#27AE60">
            <animate attributeName="fill" values="#27AE60;#2ECC71;#27AE60" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="10" r="3" fill="#3498DB">
            <animate attributeName="fill" values="#3498DB;#5DADE2;#3498DB" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="45" cy="10" r="3" fill="#F39C12">
            <animate attributeName="fill" values="#F39C12;#F1C40F;#F39C12" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Хмара для інтернет сигналу */}
        <g transform="translate(650, 200)">
          <path d="M-15,0 C-15,-10 -5,-15 5,-15 C15,-15 20,-5 15,5 C25,0 35,10 25,15 C20,25 0,25 -5,15 C-20,15 -25,5 -15,0" fill="#3498DB" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2s" repeatCount="indefinite" />
          </path>
          {/* WiFi сигнал */}
          <path d="M0,10 C10,5 20,5 30,10" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M5,5 C15,0 25,0 35,5" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
          </path>
          <path d="M10,0 C20,-5 30,-5 40,0" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </g>

        {/* З'єднувальний кабель до будинку */}
        <path d="M610,155 C615,165 620,180 625,190" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" />

        {/* Логотип компанії */}
        <g transform="translate(80, 30)">
          <rect x="5" y="0" width="80" height="30" rx="5" fill="#2980B9" />
          <text x="44" y="20" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white" textAnchor="middle">VELES</text>
        </g>
      </svg>
    </div>
  );
};

export default FiberOpticAnimation;