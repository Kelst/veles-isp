import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Contact } from '@/lib/db/models/Contact';

// GET /api/public/contacts
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Получаем только активные контакты для публичного API
    const contacts = await Contact.find({ isActive: true }).sort({ order: 1 });
    
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання контактів:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}