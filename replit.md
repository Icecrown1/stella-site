# STELLA — лендинг студии лазерной эпиляции

Next.js 14 + Tailwind CSS одностраничный лендинг для студии STELLA (Душанбе и Худжанд).

## Стек

- **Next.js 14** (App Router)
- **Tailwind CSS 3**
- **TypeScript**
- **lucide-react** — иконки

## Запуск

```bash
npm run dev   # dev-сервер на порту 5000
npm run build # production-сборка
npm start     # запуск production-сборки
```

Workflow в Replit: **Start application** (`npm run dev`, порт 5000).

## Структура

```
app/
  page.tsx          — главная страница (собирает все секции)
  layout.tsx        — корневой layout
  globals.css       — глобальные стили
  api/booking/      — API-роут: отправка заявки в Telegram
components/
  Hero.tsx          — секция hero
  PromoStrip.tsx    — повтор оффера
  Guarantee.tsx     — гарантия гладкости
  Results.tsx       — результаты до/после
  Pricing.tsx       — услуги и цены (с табами)
  Masters.tsx       — косметологи
  Reviews.tsx       — отзывы
  FAQ.tsx           — вопросы и ответы
  BookingForm.tsx   — форма записи
  Header.tsx        — шапка с якорной навигацией
  Footer.tsx        — футер с двумя студиями
public/images/      — все изображения (webp, без пробелов в именах)
```

## Secrets (Replit → Secrets)

| Ключ                  | Описание                                      |
|-----------------------|-----------------------------------------------|
| `TELEGRAM_BOT_TOKEN`  | Токен бота от @BotFather                      |
| `TELEGRAM_CHAT_ID`    | ID чата/группы, куда падают заявки с формы   |
| `SESSION_SECRET`      | Уже задан                                     |

Без `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` форма записи не будет отправлять заявки.

## Фото-плейсхолдеры

Реальные фото кладутся в `/public/images/`. Места с TODO в коде:

- `components/Hero.tsx` — `hero-model.webp` (900×1125)
- `components/PromoStrip.tsx` — `promo-hands.webp`
- `components/Results.tsx` — пары `results/{зона}-before.webp` / `-after.webp`
- `components/Masters.tsx` — фото мастеров (квадратные)
- `components/Reviews.tsx` — аватары клиенток

## User preferences

- Сохранять существующую структуру проекта
