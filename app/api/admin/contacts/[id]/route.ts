import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { Contact } from '@/lib/db/models/Contact';

// GET /api/admin/contacts/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const contact = await Contact.findById(params.id);
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Контакт не знайдено' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ contact }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання контакту:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/contacts/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Перевірка чи існує контакт
    const existingContact = await Contact.findById(params.id);
    if (!existingContact) {
      return NextResponse.json(
        { error: 'Контакт не знайдено' },
        { status: 404 }
      );
    }
    
    // Оновлення контакту
    const updatedContact = await Contact.findByIdAndUpdate(
      params.id,
      {
        type: data.type,
        value: data.value,
        label: data.label,
        isActive: data.isActive !== undefined ? data.isActive : true,
        order: data.order !== undefined ? data.order : existingContact.order,
      },
      { new: true }
    );
    
    return NextResponse.json({ contact: updatedContact }, { status: 200 });
  } catch (error) {
    console.error('Помилка оновлення контакту:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contacts/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    await dbConnect();
    
    // Перевірка чи існує контакт
    const existingContact = await Contact.findById(params.id);
    if (!existingContact) {
      return NextResponse.json(
        { error: 'Контакт не знайдено' },
        { status: 404 }
      );
    }
    
    // Видалення контакту
    await Contact.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Помилка видалення контакту:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}