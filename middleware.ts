import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Функція, яка виконується до рендерингу запитаного маршруту
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Якщо користувач намагається отримати доступ до адмін-панелі
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Перевіряємо, чи є у користувача необхідні cookies для авторизації
    const authCookie = request.cookies.get('next-auth.session-token')?.value || 
                      request.cookies.get('__Secure-next-auth.session-token')?.value;
    
    // Якщо немає cookies, перенаправляємо на сторінку входу
    if (!authCookie) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Вказуємо, для яких шляхів буде викликатися middleware
export const config = {
  matcher: [
    '/admin/:path*'
  ],
};