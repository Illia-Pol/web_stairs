#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Lint"
npm run lint

echo "[2/3] Typecheck"
npm run typecheck

echo "[3/3] Build static"
npm run build

echo "Done. Static export is ready in out/."
