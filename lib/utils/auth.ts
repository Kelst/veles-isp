import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../db/models/User';
import dbConnect from '../db/connection';

/**
 * Перевіряє, чи користувач авторизований і має роль адміністратора
 */
export async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

/**
 * Middleware для перевірки авторизації в API ендпоінтах
 */
export async function authMiddleware(req: NextRequest) {
  const session = await getServerSession();
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Необхідна авторизація' },
      { status: 401 }
    );
  }
  
  // Якщо потрібна перевірка ролі адміністратора
  if (session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Недостатньо прав' },
      { status: 403 }
    );
  }
  
  return null; // Немає помилки, користувач авторизований
}

/**
 * Створює користувача адміністратора, якщо він не існує
 */
export async function createAdminUser() {
  try {
    await dbConnect();
    
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // В реальному проекті використовуйте надійний пароль
        role: 'admin',
        isActive: true
      });
      
      await admin.save();
      console.log('Адміністратор створений успішно');
    }
  } catch (error) {
    console.error('Помилка створення адміністратора:', error);
  }
}

/**
 * Генерує функцію хешування для текстового рядка
 */
export function hashString(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Конвертація в 32-бітне ціле
  }
  return hash.toString(16);
}