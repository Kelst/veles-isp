import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Логін", type: "text" },
        password: { label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        // Перевіряємо облікові дані
        if (
          credentials?.username === 'veles' && 
          credentials?.password === 'Veles2025Intelekt'
        ) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@velesnet.com',
            role: 'admin'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 години
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'veles-nextauth-secret',
};