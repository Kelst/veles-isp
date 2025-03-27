import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Tariff } from '@/lib/db/models/Tariff';

// GET /api/public/tariffs
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Повертаємо тільки активні тарифи для публічного API
    const tariffs = await Tariff.find({ isActive: true }).sort({ price: 1 });
    
    return NextResponse.json({ tariffs }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання тарифів:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}