'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Оплата послуг | Veles ISP',
  description: 'Зручні способи оплати послуг інтернет-провайдера Veles. Оплата через Приват24, термінали самообслуговування та інші варіанти.',
  keywords: ['оплата інтернету', 'поповнити рахунок', 'способи оплати інтернету', 'оплата Veles'],
  openGraph: {
    title: 'Оплата послуг | Veles ISP',
    description: 'Зручні способи оплати послуг інтернет-провайдера Veles. Оплата через Приват24, термінали самообслуговування та інші варіанти.'
  }
};

export default function PaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Оплата послуг</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Способи оплати</h2>
        <p className="text-gray-700 mb-6">
          Компанія "Велес" пропонує зручні способи оплати наших послуг, щоб Ви могли вибрати найбільш підходящий для Вас варіант.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-4">
              <a href="https://next.privat24.ua/payments/dashboard" target="_blank" rel="noopener noreferrer">
                <Image 
                  src="/privat24.png" 
                  alt="Приват Банк" 
                  width={120} 
                  height={40} 
                  className="mr-4"
                />
              </a>
              <h3 className="text-lg font-medium text-blue-700">Оплата через Приват24</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Швидка та зручна оплата через інтернет-банкінг Приват24.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium mb-2">Реквізити для оплати:</p>
              <p className="text-gray-700 mb-1">Отримувач: Велес ІСП ТОВ</p>
              <p className="text-gray-700 mb-1">Код ЄДРПОУ: 45588414</p>
              <p className="text-gray-700 mb-1">р/р: UA053052990000026009001810022</p>
              <p className="text-gray-700 mb-1">Банк: ЧФ ПАТ КБ "ПриватБанк"</p>
              <p className="text-gray-700">МФО: 305299</p>
            </div>
            <div className="mt-4 text-red-600 font-medium">
              <p>В коментарі до платежу обов'язково вкажіть свій логін, або номер абонентського договору.</p>
            </div>
            <div className="mt-6">
              <a 
                href="https://next.privat24.ua/payments/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Перейти до оплати
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-700">Оплата через термінали самообслуговування</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Ви можете здійснити оплату послуг через термінали самообслуговування ПриватБанку, EasyPay, City24 та інші.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="mb-2"><span className="font-medium">Інструкція для оплати:</span></p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                <li>Оберіть розділ "Інтернет"</li>
                <li>Знайдіть провайдера "Велес ІСП"</li>
                <li>Введіть номер договору або логін</li>
                <li>Введіть суму платежу</li>
                <li>Перевірте дані та підтвердіть оплату</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Часті запитання щодо оплати</h2>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Коли необхідно оплачувати послуги?</h3>
            <p className="text-gray-700">
              Оплату за послуги інтернет-доступу необхідно здійснювати до 1 числа поточного місяця.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Скільки часу займає зарахування платежу?</h3>
            <p className="text-gray-700">
              При оплаті через Приват24 кошти зараховуються протягом кількох хвилин. При оплаті через термінали самообслуговування чи інші банки - до 3 банківських днів.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-blue-700 mb-2">Що робити, якщо я не можу оплатити вчасно?</h3>
            <p className="text-gray-700">
              Якщо у вас виникли тимчасові фінансові труднощі,Ви можете скористатись безкоштовною послугою Встановити кредит з особистого кабінету користувача.
              Одноразово продовжте свій Інтернет на цілих 5 днів за місяць, щоб завжди бути на зв'язку, коли це найбільше потрібно.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-blue-700 mb-2">Чи можливо здійснити оплату наперед за декілька місяців?</h3>
            <p className="text-gray-700">
              Так, ви можете здійснити оплату за кілька місяців наперед. Для цього вкажіть відповідну суму при оплаті.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">Потрібна допомога?</h3>
            <p className="text-gray-700 mb-4">
              Якщо у вас виникли питання щодо оплати послуг, звертайтесь до нашої служби підтримки.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contacts" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                Перейти до контактів
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}