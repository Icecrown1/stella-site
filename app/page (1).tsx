import { NextRequest, NextResponse } from 'next/server';

// Заявки с формы записи падают сюда и пересылаются в Telegram-чат
// администраторов через Telegram Bot API. Это временное MVP-решение —
// пока нет прямой интеграции с Altegio/amoCRM.
//
// Настройка (в Replit — вкладка Secrets, не в коде!):
// 1. Создать бота через @BotFather, получить TELEGRAM_BOT_TOKEN
// 2. Добавить бота в чат/группу администраторов
// 3. Узнать TELEGRAM_CHAT_ID (например через @getidsbot либо через
//    getUpdates после того как кто-то напишет боту)
// 4. Задать оба значения в Secrets проекта в Replit

export async function POST(req: NextRequest) {
  try {
    const { name, phone, zone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: 'Укажите имя и телефон' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error(
        'TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы — заявка не отправлена в Telegram'
      );
      console.log('Новая заявка (не доставлена):', { name, phone, zone });
      return NextResponse.json(
        { ok: false, error: 'Форма пока не подключена к уведомлениям' },
        { status: 500 }
      );
    }

    const text = [
      '📝 Новая заявка с сайта STELLA',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Зона: ${zone || 'не указана'}`
    ].join('\n');

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
      }
    );

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      console.error('Telegram API error:', errText);
      return NextResponse.json(
        { ok: false, error: 'Не удалось отправить уведомление' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Booking route error:', err);
    return NextResponse.json(
      { ok: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
