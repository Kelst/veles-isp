import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Tariff } from '@/lib/db/models/Tariff';

// GET /api/public/tariffs
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category'); // Додаємо опцію фільтрації за категорією
    
    let query: any = { isActive: true };
    
    // Додаємо фільтр за категорією, якщо вона вказана
    if (category && ['home', 'business'].includes(category)) {
      query = { ...query, category };
    }
    
    // Повертаємо тільки активні тарифи для публічного API з фільтрацією за категорією
    const tariffs = await Tariff.find(query).sort({ price: 1 });
    
    return NextResponse.json({ tariffs }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання тарифів:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}