import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/connection';
import { News } from '@/lib/db/models/News';

// GET /api/admin/news
export async function GET(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const news = await News.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання новин:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}

// POST /api/admin/news
export async function POST(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    const data = await request.json();
    
    // Валідація даних
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Не всі обов\'язкові поля заповнені' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Створення slug з заголовка
    const slug = data.slug || 
      data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    
    // Перевірка унікальності slug
    const existingNews = await News.findOne({ slug });
    if (existingNews) {
      return NextResponse.json(
        { error: 'Новина з таким slug вже існує' },
        { status: 400 }
      );
    }
    
    const newNews = new News({
      title: data.title,
      slug,
      content: data.content,
      image: data.image,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
    });
    
    await newNews.save();
    
    return NextResponse.json({ news: newNews }, { status: 201 });
  } catch (error) {
    console.error('Помилка створення новини:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}