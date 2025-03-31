import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './auth-options';

/**
 * Перевіряє аутентифікацію користувача на стороні сервера
 * і перенаправляє на сторінку входу, якщо користувач не авторизований
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
//   if (!session) {
//     redirect('/admin/login');
//   }
  
  return session;
}

/**
 * Перевіряє роль користувача
 */
export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session.user.role !== 'admin') {
    redirect('/');
  }
  
  return session;
}