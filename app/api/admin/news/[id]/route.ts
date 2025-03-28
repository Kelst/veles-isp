import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import { News } from '@/lib/db/models/News';

// GET /api/admin/news/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав

    await dbConnect();
    const news = await News.findById(params.id);
    
    if (!news) {
      return NextResponse.json(
        { error: 'Новину не знайдено' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання новини:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/news/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    const data = await request.json();
    
    // Валідація даних
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Не всі обов\'язкові поля заповнені' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Перевірка чи існує новина
    const existingNews = await News.findById(params.id);
    if (!existingNews) {
      return NextResponse.json(
        { error: 'Новину не знайдено' },
        { status: 404 }
      );
    }
    
    // Створення slug з заголовка, якщо не надано
    const slug = data.slug || 
      data.title
        .toLowerCase()
        .replace(/[^\wа-яіїєґ\s]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/[іїєґ]/g, char => {
          const translitMap: Record<string, string> = {
            'і': 'i',
            'ї': 'yi',
            'є': 'ye',
            'ґ': 'g'
          };
          return translitMap[char] || char;
        })
        .replace(/[а-я]/g, char => {
          const translitMap: Record<string, string> = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
            'ж': 'zh', 'з': 'z', 'и': 'y', 'й': 'i', 'к': 'k', 'л': 'l',
            'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
            'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ь': '', 'ю': 'yu', 'я': 'ya'
          };
          return translitMap[char] || char;
        });
    
    // Перевірка унікальності slug, якщо він змінився
    if (slug !== existingNews.slug) {
      const newsWithSameSlug = await News.findOne({ slug, _id: { $ne: params.id } });
      if (newsWithSameSlug) {
        return NextResponse.json(
          { error: 'Новина з таким slug вже існує' },
          { status: 400 }
        );
      }
    }
    
    // Оновлення новини
    const updatedNews = await News.findByIdAndUpdate(
      params.id,
      {
        title: data.title,
        slug,
        content: data.content,
        image: data.image,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
      },
      { new: true }
    );
    
    return NextResponse.json({ news: updatedNews }, { status: 200 });
  } catch (error) {
    console.error('Помилка оновлення новини:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/news/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Перевірка авторизації (заглушка)
    // В реальному додатку потрібно додати перевірку прав
    
    await dbConnect();
    
    // Перевірка чи існує новина
    const existingNews = await News.findById(params.id);
    if (!existingNews) {
      return NextResponse.json(
        { error: 'Новину не знайдено' },
        { status: 404 }
      );
    }
    
    // Видалення новини
    await News.findByIdAndDelete(params.id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Помилка видалення новини:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}