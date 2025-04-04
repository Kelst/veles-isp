import type { Metadata } from "next";
import { Inter,Roboto } from 'next/font/google';
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto'
})
export const metadata: Metadata = {
  metadataBase: new URL('https://veles-net.com'), // Замініть на ваш домен
  title: {
    default: 'Veles ISP - Інтернет-провайдер у Чернівцях',
    template: '%s | Veles ISP'
  },
  description: 'Високошвидкісний інтернет для дому та бізнесу в Чернівцях та області. Stable, reliable, and fast internet connection.',
  keywords: [
    'інтернет', 
    'провайдер', 
    'чернівці', 
    'інтернет-послуги', 
    'високошвидкісний інтернет', 
    'домашній інтернет', 
    'інтернет для бізнесу'
  ],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://veles.cv.ua',
    siteName: 'Veles ISP',
    title: 'Veles ISP - Інтернет-провайдер у Чернівцях',
    description: 'Високошвидкісний інтернет для дому та бізнесу в Чернівцях та області.',
    images: [
      {
        url: '/og-image.png', // створіть цей файл у public
        width: 1200,
        height: 630,
        alt: 'Veles ISP - Інтернет провайдер'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veles ISP - Інтернет-провайдер у Чернівцях',
    description: 'Високошвидкісний інтернет для дому та бізнесу в Чернівцях та області.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification-code', // Додайте код верифікації Google Search Console
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://veles-net.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}