import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Tariff } from '@/lib/db/models/Tariff';

// GET /api/admin/tariffs/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const tariff = await Tariff.findById(params.id);
    
    if (!tariff) {
      return NextResponse.json(
        { error: 'Тариф не знайдено' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ tariff }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання тарифу:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/tariffs/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Перевірка чи існує тариф
    const existingTariff = await Tariff.findById(params.id);
    if (!existingTariff) {
      return NextResponse.json(
        { error: 'Тариф не знайдено' },
        { status: 404 }
      );
    }
    
    // Оновлення тарифу
    const updatedTariff = await Tariff.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        speed: data.speed,
        features: data.features || [],
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
      { new: true }
    );
    
    return NextResponse.json({ tariff: updatedTariff }, { status: 200 });
  } catch (error) {
    console.error('Помилка оновлення тарифу:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/tariffs/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    await dbConnect();
    
    // Перевірка чи існує тариф
    const existingTariff = await Tariff.findById(params.id);
    if (!existingTariff) {
      return NextResponse.json(
        { error: 'Тариф не знайдено' },
        { status: 404 }
      );
    }
    
    // Видалення тарифу
    await Tariff.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Помилка видалення тарифу:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}