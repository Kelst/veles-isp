import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Перевіряємо сесію на стороні сервера
  const session = await getServerSession(authOptions);

  // Якщо немає сесії і це не сторінка входу, перенаправляємо
  const isLoginPage = children.props?.childProp?.segment === 'login';
  
//   if (!session && !isLoginPage) {
//     redirect('/admin/login');
//   }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}