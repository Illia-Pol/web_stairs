#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Lint"
npm run lint

echo "[2/4] Build static"
npm run build

echo "[3/4] Sync out -> docs"
rm -rf docs
mkdir -p docs
cp -R out/. docs/
touch docs/.nojekyll

echo "[4/4] Stage docs and unstage out (if staged)"
# docs/ может быть в .gitignore (например, при деплое через GitHub Actions),
# поэтому форсируем добавление для режима ручного деплоя через docs.
git add -A -f docs
git restore --staged out 2>/dev/null || true

echo "Done. Now run: git commit -m \"...\""
