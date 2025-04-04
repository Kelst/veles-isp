import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Setting } from '@/lib/db/models/Setting';

// GET /api/admin/settings
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const settings = await Setting.find();
    
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання налаштувань:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}

// POST /api/admin/settings
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Отримані дані для створення:", data);
    
    // Валідація даних
    if (!data.key || !data.value) {
      return NextResponse.json(
        { error: 'Ключ та значення налаштування є обов\'язковими' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Перевіряємо, чи існує налаштування з таким ключем
    const existingSetting = await Setting.findOne({ key: data.key });
    
    if (existingSetting) {
      console.log(`Налаштування з ключем ${data.key} вже існує, оновлюємо`);
      // Оновлюємо існуюче налаштування
      existingSetting.value = data.value;
      existingSetting.description = data.description;
      await existingSetting.save();
      
      return NextResponse.json({ setting: existingSetting }, { status: 200 });
    } else {
      console.log(`Створюємо нове налаштування з ключем ${data.key}`);
      // Створюємо нове налаштування
      const newSetting = new Setting({
        key: data.key,
        value: data.value,
        description: data.description,
      });
      
      await newSetting.save();
      console.log("Нове налаштування створено:", newSetting);
      
      return NextResponse.json({ setting: newSetting }, { status: 201 });
    }
  } catch (error) {
    console.error('Помилка створення налаштування:', error);
    return NextResponse.json({ 
      error: 'Внутрішня помилка сервера при створенні налаштування',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}