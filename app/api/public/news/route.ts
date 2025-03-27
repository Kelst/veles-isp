import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { News } from '@/lib/db/models/News';

// GET /api/public/news
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    
    if (slug) {
      // Якщо вказано slug, повертаємо одну новину
      const news = await News.findOne({ 
        slug: slug,
        isPublished: true 
      });
      
      if (!news) {
        return NextResponse.json({ error: 'Новину не знайдено' }, { status: 404 });
      }
      
      return NextResponse.json({ news }, { status: 200 });
    } else {
      // Інакше повертаємо список опублікованих новин
      const limit = parseInt(searchParams.get('limit') || '10');
      const page = parseInt(searchParams.get('page') || '1');
      const skip = (page - 1) * limit;
      
      const news = await News.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await News.countDocuments({ isPublished: true });
      
      return NextResponse.json({ 
        news,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Помилка отримання новин:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}