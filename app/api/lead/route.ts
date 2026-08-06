import { NextResponse } from 'next/server';

// Простой rate limit в памяти процесса: до 5 заявок в час с одного IP.
// На autoscale-инстансах память не разделяется между репликами — это
// осознанный компромисс (мягкая защита без внешних зависимостей).
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= 5) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: боты заполняют скрытое поле — молча принимаем и выбрасываем
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limit' }, { status: 429 });
  }

  const phone = String(body.phone ?? '');
  if (!/^\+99[26] \d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: 'bad_phone' }, { status: 400 });
  }

  const lines = [
    '🧮 Заявка из квиза «План гладкости»',
    `Имя: ${body.name}`,
    `Телефон: ${phone}${body.whatsappOk ? ' (WhatsApp ок)' : ''}`,
    `Город: ${body.city}`,
    `Зоны: ${(body.zones ?? []).join(', ')}`,
    `Сейчас удаляет: ${body.method} · ${body.freq}`,
    `Барьер: ${body.barrier}`,
    `Кожа/волосы: ${body.skin}`,
    `Рекомендовано: ${body.plan}`,
    body.course9PerProc ? `Курс 9: ${body.course9PerProc} с./процедура` : 'Курс: расчёт мастером',
    body.savings5y ? `Экономия 5 лет: ~${body.savings5y} с.` : null,
    Object.keys(body.utm ?? {}).length
      ? `UTM: ${Object.entries(body.utm)
          .map(([k, v]) => `${k}=${v}`)
          .join(' ')}`
      : null
  ].filter(Boolean);

  const text = lines.join('\n');

  // 1) Telegram — всегда (тот же бот, что у формы записи).
  // Заявки из Кыргызстана (+996) уходят в отдельный чат TELEGRAM_CHAT_ID_KG;
  // если он не задан в Secrets — падают в основной, чтобы ничего не терялось.
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const isKg = phone.startsWith('+996');
  const tgChat = isKg
    ? process.env.TELEGRAM_CHAT_ID_KG ?? process.env.TELEGRAM_CHAT_ID
    : process.env.TELEGRAM_CHAT_ID;
  let tgOk = false;
  if (tgToken && tgChat) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChat, text })
      });
      tgOk = res.ok;
    } catch {
      tgOk = false;
    }
  }

  // 2) amoCRM — если настроены секреты AMO_DOMAIN и AMO_TOKEN
  const amoDomain = process.env.AMO_DOMAIN; // например: stella.amocrm.ru
  const amoToken = process.env.AMO_TOKEN;
  let amoOk = false;
  if (amoDomain && amoToken) {
    const tags = [
      'ig_kviz',
      'tj',
      body.city === 'Худжанд' ? 'khujand' : 'dushanbe',
      body?.utm?.utm_source ? `utm_${body.utm.utm_source}` : null
    ].filter(Boolean);

    const payload = [
      {
        name: `Квиз: ${body.name} (${body.plan})`,
        _embedded: {
          tags: (tags as string[]).map((t) => ({ name: t })),
          contacts: [
            {
              first_name: body.name,
              custom_fields_values: [
                {
                  field_code: 'PHONE',
                  values: [{ value: phone, enum_code: 'WORK' }]
                }
              ]
            }
          ]
        }
      }
    ];

    for (let attempt = 0; attempt < 3 && !amoOk; attempt++) {
      try {
        const res = await fetch(`https://${amoDomain}/api/v4/leads/complex`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${amoToken}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const created = await res.json();
          const leadId = created?.[0]?.id;
          if (leadId) {
            // Все ответы — примечанием к сделке
            await fetch(`https://${amoDomain}/api/v4/leads/${leadId}/notes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${amoToken}`
              },
              body: JSON.stringify([
                { note_type: 'common', params: { text } }
              ])
            });
          }
          amoOk = true;
        }
      } catch {
        // retry with backoff
      }
      if (!amoOk) await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  return NextResponse.json({ ok: tgOk || amoOk || (!tgToken && !amoDomain) });
}
