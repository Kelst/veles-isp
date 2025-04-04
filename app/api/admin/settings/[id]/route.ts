import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Setting } from '@/lib/db/models/Setting';

// GET /api/admin/settings/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const setting = await Setting.findById(params.id);
    
    if (!setting) {
      return NextResponse.json(
        { error: 'Налаштування не знайдено' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ setting }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання налаштування:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    console.log("Отримані дані для оновлення:", data);
    console.log("ID для оновлення:", params.id);
    
    // Валідація даних
    if (!data.value) {
      return NextResponse.json(
        { error: 'Значення налаштування є обов\'язковим' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Перевірка чи існує налаштування
    const existingSetting = await Setting.findById(params.id);
    if (!existingSetting) {
      console.error(`Налаштування з ID ${params.id} не знайдено`);
      return NextResponse.json(
        { error: 'Налаштування не знайдено' },
        { status: 404 }
      );
    }
    
    console.log("Знайдене налаштування:", existingSetting);
    
    // Оновлення тільки дозволених полів
    existingSetting.value = data.value;
    if (data.description !== undefined) {
      existingSetting.description = data.description;
    }
    
    // Зберігаємо зміни
    await existingSetting.save();
    console.log("Налаштування оновлено");
    
    return NextResponse.json({ setting: existingSetting }, { status: 200 });
  } catch (error) {
    console.error('Помилка оновлення налаштування:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при оновленні налаштування' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/settings/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Перевірка чи існує налаштування
    const existingSetting = await Setting.findById(params.id);
    if (!existingSetting) {
      return NextResponse.json(
        { error: 'Налаштування не знайдено' },
        { status: 404 }
      );
    }
    
    // Видалення налаштування
    await Setting.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Помилка видалення налаштування:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}