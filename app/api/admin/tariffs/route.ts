import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Tariff } from '@/lib/db/models/Tariff';

// GET /api/admin/tariffs
export async function GET(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const tariffs = await Tariff.find().sort({ price: 1 });
    
    return NextResponse.json({ tariffs }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання тарифів:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}

// POST /api/admin/tariffs
export async function POST(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    const data = await request.json();
    
    // Валідація даних
    if (!data.name || !data.description || !data.price || !data.speed) {
      return NextResponse.json(
        { error: 'Не всі обов\'язкові поля заповнені' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const newTariff = new Tariff({
      name: data.name,
      description: data.description,
      price: data.price,
      speed: data.speed,
      features: data.features || [],
      isActive: data.isActive !== undefined ? data.isActive : true,
      category: data.category || 'home', // Додаємо категорію з даних форми або за замовчуванням
    });
    
    await newTariff.save();
    
    return NextResponse.json({ tariff: newTariff }, { status: 201 });
  } catch (error) {
    console.error('Помилка створення тарифу:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}