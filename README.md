# web_stairs

Многостраничный сайт на Next.js App Router с локальной контент-моделью (`/content`), статическим экспортом для GitHub Pages и отдельным serverless endpoint для лидов в Telegram.

## Что внутри

- Основной сайт: статический (`output: "export"`), сборка в `out/`.
- Контент: JSON/MD в `/content` + валидация через `zod`.
- Лид-форма: POST во внешний endpoint (`content/site.json -> leadEndpoint`).
- Fallback при ошибке отправки: автопереход в Telegram deep link + ручная кнопка.
- Отдельный backend: `/serverless` (Vercel Function `POST /lead`).

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## Сборка статики

```bash
npm install
npm run build
```

Результат:

- `out/` — готовый статический сайт.
- `public/sitemap.xml`, `public/robots.txt` и копии в `out/` генерируются скриптом `postbuild`.

## GitHub Pages (с basePath)

1. Для репозитория `repo-name` задайте env при сборке:

```bash
NEXT_PUBLIC_BASE_PATH=/repo-name npm run build
```

2. Задеплойте содержимое `out/` в GitHub Pages.
3. Убедитесь, что `content/site.json -> baseUrl` указывает на публичный домен.

## Serverless endpoint (Vercel)

См. подробности в [`serverless/README.md`](./serverless/README.md).

Коротко:

1. Создайте отдельный Vercel Project с `Root Directory = serverless`.
2. Добавьте ENV:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. После деплоя получите URL вида:
   - `https://{{VERCEL_PROJECT}}.vercel.app/lead`
4. Запишите его в `content/site.json -> leadEndpoint`.

## Важные настройки контента

В `content/site.json` обязательно заполнить:

- `leadEndpoint`: `{{LEAD_ENDPOINT_URL}}`
- `telegramFallback.username` и/или `telegramFallback.url`
- `telegramFallbackMode`: `auto_redirect` или `button_only`

## Полезные команды

```bash
npm run typecheck
npm run lint
npm run generate:seo
```
