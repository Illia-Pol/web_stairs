# web_stairs

Многостраничный сайт на Next.js App Router с локальной контент-моделью (`/content`), статическим экспортом для GitHub Pages и отдельным serverless endpoint для лидов в Telegram.

## Что внутри

- Основной сайт: статический (`output: "export"`), сборка в `out/`.
- Контент: JSON/MD в `/content` + валидация через `zod`.
- Лид-форма: POST во внешний endpoint (`content/site.json -> leadEndpoint`).
- Fallback при ошибке отправки: автопереход в Telegram deep link + ручная кнопка.
- Отдельный backend: `/serverless` (Vercel Function `POST /api/lead`).

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

## Локализация (RU/EN)

- Локаль для статической сборки задается через `NEXT_PUBLIC_LOCALE=ru|en`.
- Все UI-строки собираются в:
  - `content/i18n/ru.json`
  - `content/i18n/en.json`
- Для синхронизации словарей со строками в коде используйте:

```bash
npm run i18n:extract
```

Команда:
- обновляет `ru.json` ключами из `t("...")`;
- дополняет `en.json` недостающими ключами (с fallback-значениями).
- сохраняет ваши ручные переводы в `ru.json` и `en.json` (не перезаписывает существующие значения).

Переключатель языка на сайте:
- в правом нижнем углу есть мини-виджет RU/EN;
- ссылки берутся из `content/site.json -> localeLinks`:
  - `localeLinks.ru`
  - `localeLinks.en`

## GitHub Pages (автодеплой из `main`)

Репозиторий настроен на деплой через GitHub Actions:
- workflow: [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)
- триггер: каждый `push` в ветку `main`
- публикация: артефакт из `out/`

Что нужно сделать один раз в GitHub:
1. `Settings -> Pages -> Source`: выбрать `GitHub Actions`.
2. Убедиться, что Actions имеют право деплоя Pages (по умолчанию для owner/repo обычно уже включено).

Локально ничего коммитить из `out/`/`docs/` не нужно — это собирается в CI.

Если проект будет жить в подпапке (`https://user.github.io/repo-name/`), поменяйте в workflow переменную:

```yaml
NEXT_PUBLIC_BASE_PATH: "/repo-name"
```

Для custom domain (например, `https://betostep.by`) оставьте пустую:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
```

## Serverless endpoint (Vercel)

См. подробности в [`serverless/README.md`](./serverless/README.md).

Коротко:

1. Создайте отдельный Vercel Project с `Root Directory = serverless`.
2. Добавьте ENV:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. После деплоя получите URL вида:
   - `https://{{VERCEL_PROJECT}}.vercel.app/api/lead`
4. Запишите его в `content/site.json -> leadEndpoint`.

## Важные настройки контента

В `content/site.json` обязательно заполнить:

- `leadEndpoint`: `https://{{VERCEL_PROJECT}}.vercel.app/api/lead`
- `telegramFallback.username` и/или `telegramFallback.url`
- `telegramFallbackMode`: `auto_redirect` или `button_only`

## Полезные команды

```bash
npm run typecheck
npm run lint
npm run generate:seo
npm run i18n:extract
```
