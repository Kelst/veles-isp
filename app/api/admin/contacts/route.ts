import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/db/connection';
import { Contact } from '@/lib/db/models/Contact';

// GET /api/admin/contacts
export async function GET(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const contacts = await Contact.find().sort({ order: 1 });
    
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання контактів:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}

// POST /api/admin/contacts
export async function POST(request: NextRequest) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    const data = await request.json();
    
    // Валідація даних
    if (!data.type || !data.value) {
      return NextResponse.json(
        { error: 'Не всі обов\'язкові поля заповнені' },
        { status: 400 }
      );
    }
    
    // Перевірка типу
    const validTypes = ['address', 'phone', 'email', 'social'];
    if (!validTypes.includes(data.type)) {
      return NextResponse.json(
        { error: 'Недійсний тип контакту' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Отримання максимального порядку для нового контакту
    const maxOrderContact = await Contact.findOne().sort({ order: -1 });
    const newOrder = maxOrderContact ? maxOrderContact.order + 1 : 0;
    
    const newContact = new Contact({
      type: data.type,
      value: data.value,
      label: data.label,
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order !== undefined ? data.order : newOrder,
    });
    
    await newContact.save();
    
    return NextResponse.json({ contact: newContact }, { status: 201 });
  } catch (error) {
    console.error('Помилка створення контакту:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}