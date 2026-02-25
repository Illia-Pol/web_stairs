# web_stairs

Многостраничный сайт на Next.js (App Router) для бетонных монолитных лестниц.

## Стек

- Next.js + TypeScript + Tailwind CSS
- Контент в локальных файлах (`/content`)
- Валидация контента через `zod`
- Лид-форма с API (`POST /api/lead`) и интеграциями Telegram/SMTP

## Быстрый старт

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Сборка

```bash
npm run build
npm run start
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_TO`
- `SMTP_FROM`

## Контент

Весь редактируемый контент хранится в `/content`:

- `site.json`
- `types/*.json`
- `features/*.json`
- `cases/*.md`
- `reviews.json`
- `faq.json`
- `knowledge/*.md`
- `geo/*.json`
