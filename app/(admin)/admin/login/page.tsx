'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  
  // Якщо користувач вже автентифікований, перенаправляємо на панель
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Будь ласка, введіть логін та пароль');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl,
      });
      
      if (result?.error) {
        setError('Невірний логін або пароль');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Помилка входу:', error);
      setError('Помилка аутентифікації. Спробуйте пізніше.');
    } finally {
      setIsLoading(false);
    }
  };

  // Показуємо заглушку під час завантаження сесії
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-48">
              <Image 
                src="/logo.jpg" 
                alt="Veles ISP" 
                fill 
                style={{objectFit: "contain"}}
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Вхід в адмін-панель</h1>
          <p className="text-gray-600 mt-2">Введіть свої дані для входу</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Логін
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введіть ваш логін"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введіть ваш пароль"
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Вхід...' : 'Увійти'}
          </Button>
        </form>
      </Card>
    </div>
  );
}