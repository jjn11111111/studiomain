#!/usr/bin/env bash
# Run after pushing to master so Vercel (production branch: main) gets the same commits.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: uncommitted changes. Commit or stash first."
  exit 1
fi

echo "Updating main from master…"
git checkout main
git pull origin main
git merge master -m "sync: merge master into main for Vercel production"
git push origin main
git checkout master
echo "Done. main is synced with master."
