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
  metadataBase: new URL('https://veles-net.com'), // Make sure this is your actual domain
  title: {
    default: 'Veles ISP - Інтернет-провайдер у Чернівцях',
    template: '%s | Veles ISP'
  },
  description: 'Високошвидкісний інтернет для дому та бізнесу в Чернівцях та області. Швидке підключення, стабільне з\'єднання та професійна підтримка 24/7.',
  keywords: [
    'інтернет провайдер', 
    'Чернівці', 
    'швидкісний інтернет', 
    'оптоволокно',
    'домашній інтернет', 
    'інтернет для бізнесу',
    'підключення інтернету',
    'Veles ISP',
    'зарезервоване живлення'
  ],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://veles.cv.ua/',
    siteName: 'Veles ISP',
    title: 'Veles ISP - Інтернет-провайдер у Чернівцях',
    description: 'Високошвидкісний інтернет для дому та бізнесу в Чернівцях та області. Швидке підключення, стабільне з\'єднання та професійна підтримка 24/7.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Veles ISP - Інтернет провайдер'
      }
    ]
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
    google: 'your-google-site-verification-code', // Add your actual verification code
  },
  alternates: {
    canonical: 'https://veles.cv.ua/',
  },
}

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