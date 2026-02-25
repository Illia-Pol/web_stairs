# Serverless Lead Endpoint (Vercel)

Отдельный endpoint для приёма лидов и отправки в Telegram.

## Endpoint

- `POST /lead` (rewrite на `api/lead.js`)

## Входной JSON

```json
{
  "name": "{{CLIENT_NAME}}",
  "phone": "{{PHONE}}",
  "city": "{{CITY}}",
  "message": "{{MESSAGE}}",
  "pageUrl": "{{PAGE_URL}}",
  "source": "site_form",
  "honeypot": ""
}
```

## ENV

Скопируйте `.env.example` и задайте переменные в Vercel Project Settings:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Деплой

1. Создайте новый проект в Vercel и укажите `Root Directory = serverless`.
2. Добавьте ENV переменные.
3. Deploy.
4. После деплоя используйте URL вида `https://{{VERCEL_PROJECT}}.vercel.app/lead` в `content/site.json` как `leadEndpoint`.
