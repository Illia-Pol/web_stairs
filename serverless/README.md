# Serverless Lead Endpoint (Vercel)

Отдельный backend для формы заявок. Основной сайт остается полностью статичным.

## Что делает endpoint

- Маршрут: `POST /api/lead`.
- Принимает `JSON` или `multipart/form-data` (с фото).
- Валидирует payload через `zod`.
- Проверяет honeypot (если заполнен, возвращает `ok: true` без отправки).
- Отправляет заявку в Telegram Bot API `sendMessage`.
- Если пришли фото, отправляет их в Telegram через `sendMediaGroup`.
- Возвращает JSON:
  - `{ "ok": true }` на успех
  - `{ "ok": false, "error": "..." }` на ошибку

## Формат входного payload (JSON)

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

## Формат входного payload (multipart/form-data)

- Текстовые поля: `name`, `phone`, `city`, `message`, `pageUrl`, `source`, `honeypot`
- Файлы: поле `files` (можно несколько)
- Лимиты: до `8` файлов, до `10MB` каждый

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
   - `https://{{VERCEL_PROJECT}}.vercel.app/api/lead`

## Привязка к фронтенду

В основном сайте откройте `content/site.json` и заполните:

```json
{
  "leadEndpoint": "https://{{VERCEL_PROJECT}}.vercel.app/api/lead",
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
curl -i -X POST "https://{{VERCEL_PROJECT}}.vercel.app/api/lead" \
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

Проверка с фото:

```bash
curl -i -X POST "https://{{VERCEL_PROJECT}}.vercel.app/api/lead" \
  -F "name=Test" \
  -F "phone=+375291112233" \
  -F "city=Minsk" \
  -F "message=Тестовая заявка с фото" \
  -F "pageUrl=https://example.com/" \
  -F "source=manual_test" \
  -F "honeypot=" \
  -F "files=@./test-photo.jpg"
```

Ожидаемый ответ:

```json
{ "ok": true }
```
