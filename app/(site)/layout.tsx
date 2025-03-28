import React from 'react';
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      {/* Header */}
      <Header />
      
      {/* Main content - with padding for the fixed header */}
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}