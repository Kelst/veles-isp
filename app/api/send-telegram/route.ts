import { NextRequest, NextResponse } from 'next/server';
import { log } from 'node:console';

// Константи для Telegram API
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN||'7614086944:AAE2lQoKOitG6dxQAVXAe7fVbOK9mmPhjeA';

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID||'-1002508731323';
log(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)

export async function POST(request: NextRequest) {
  try {
    // Отримуємо дані з запиту
    const data = await request.json();
    const { phone, tariff, service, type } = data;
    
    // Перевірка наявності номера телефону
    if (!phone) {
      return NextResponse.json(
        { error: 'Номер телефону є обов\'язковим' },
        { status: 400 }
      );
    }
    
    // Перевірка наявності конфігурації Telegram
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Відсутні налаштування Telegram бота');
      return NextResponse.json(
        { error: 'Помилка конфігурації сервера' },
        { status: 500 }
      );
    }
    
    // Формування повідомлення для Telegram в залежності від типу запиту
    let message;
    
    if (type === 'service') {
      // Для замовлення додаткової послуги
      message = `🔔 Замовлена додаткова послуга!\n\n📱 Телефон: ${phone}\n🔧 Послуга: ${service}\n⏰ Дата і час: ${new Date().toLocaleString('uk-UA')}`;
    } else if (type === 'promo') {
      // Для акційного підключення
      message = `🎁 Акційне підключення!\n\n📱 Телефон: ${phone}\n🔥 Тариф: Акційне підключення 500 на 2 місяці безкоштовне\n⏰ Дата і час: ${new Date().toLocaleString('uk-UA')}`;
    } else if (type === 'feedback') {
      // Для звернення абонента з форми зворотного зв'язку
      message = `📞 Звернення абонента!\n\n📱 Телефон: ${phone}\n💬 Повідомлення: ${service}\n⏰ Дата і час: ${new Date().toLocaleString('uk-UA')}`;
    } else {
      // Для звичайного замовлення підключення (за замовчуванням)
      message = `🔔 Нова заявка на підключення!\n\n📱 Телефон: ${phone}\n📊 Тариф: ${tariff || 'Не вказано'}\n⏰ Дата і час: ${new Date().toLocaleString('uk-UA')}`;
    }
    
    // Відправка повідомлення в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );
    
    // Перевірка відповіді від Telegram API
    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Помилка відправки в Telegram:', errorData);
      throw new Error('Не вдалося відправити повідомлення в Telegram');
    }
    
    // Успішна відповідь
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Помилка обробки запиту:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}