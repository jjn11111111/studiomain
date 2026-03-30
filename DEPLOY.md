# Deploy

This repository is **one Next.js app** at the **repository root**. There is no nested `studiomain-app` copy to sync.

## Vercel

- **Root Directory:** `.` (leave empty / default — the app lives at the top level).  
  If it was previously set to `studiomain-app`, **clear it** so the build uses the repo root.
- **Branch:** `master` and `main` are kept in sync for this repo; point production at either one in Vercel (only one production project is needed).
- Set env vars on this project: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, optional `NEXT_PUBLIC_SITE_URL`, etc.

## Ship changes

```bash
git add .
git commit -m "Describe the change."
git push origin master   # or main, matching Vercel
```

Do not maintain a second app folder or submodule for the same site—everything you deploy should come from this tree.
