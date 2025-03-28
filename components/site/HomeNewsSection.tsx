import React from 'react';
import Link from 'next/link';
import NewsList from './NewsList';

const HomeNewsSection: React.FC = () => {
  return (
    <section className="section bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Останні новини</h2>
        <p className="section-subtitle">
          Будьте в курсі останніх оновлень та акцій
        </p>
        
        <div className="mt-12">
          <NewsList limit={3} />
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/news"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Всі новини
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsSection;