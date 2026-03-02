# Serverless Lead Endpoint (Vercel)

Отдельный backend для формы заявок. Основной сайт остается полностью статичным.

## Что делает endpoint

- Маршрут: `POST /lead` (через rewrite на `api/lead.js`).
- Принимает JSON из фронтенд-формы.
- Валидирует payload через `zod`.
- Проверяет honeypot (если заполнен, возвращает `ok: true` без отправки).
- Отправляет заявку в Telegram Bot API `sendMessage`.
- Возвращает JSON:
  - `{ "ok": true }` на успех
  - `{ "ok": false, "error": "..." }` на ошибку

## Формат входного payload

```json
{
  "name": "{{CLIENT_NAME}}",
  "phone": "{{PHONE_REQUIRED}}",
  "city": "{{CITY}}",
  "message": "{{MESSAGE}}",
  "pageUrl": "{{PAGE_URL}}",
  "source": "site_form",
  "honeypot": ""
}
```

## Переменные окружения

Задаются в Vercel Project Settings -> Environment Variables:

- `TELEGRAM_BOT_TOKEN` — токен бота из `@BotFather`
- `TELEGRAM_CHAT_ID` — chat id, куда отправлять заявки
- `CORS_ALLOW_ORIGINS` (опционально) — allowlist origin-ов через запятую
  - пример: `https://{{DOMAIN}},https://{{ORG}}.github.io`
  - если пусто, endpoint принимает любой origin

## Деплой на Vercel (Dashboard)

1. Создайте новый Vercel Project из этого репозитория.
2. В настройках проекта выставьте `Root Directory = serverless`.
3. Добавьте переменные окружения (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, опционально `CORS_ALLOW_ORIGINS`).
4. Нажмите Deploy.
5. Получите URL вида:
   - `https://{{VERCEL_PROJECT}}.vercel.app/lead`

## Привязка к фронтенду

В основном сайте откройте `content/site.json` и заполните:

```json
{
  "leadEndpoint": "https://{{VERCEL_PROJECT}}.vercel.app/lead",
  "telegramFallback": {
    "username": "{{TELEGRAM_USERNAME}}",
    "url": "https://t.me/{{TELEGRAM_USERNAME}}"
  },
  "telegramFallbackMode": "auto_redirect"
}
```

После изменения выполните сборку статического сайта заново.

## Быстрая проверка endpoint

```bash
curl -i -X POST "https://{{VERCEL_PROJECT}}.vercel.app/lead" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "phone":"+375291112233",
    "city":"Minsk",
    "message":"Тестовая заявка",
    "pageUrl":"https://example.com/",
    "source":"manual_test",
    "honeypot":""
  }'
```

Ожидаемый ответ:

```json
{ "ok": true }
```
