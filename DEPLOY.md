# Deploy

This repository is **one Next.js app** at the **repository root**. There is no nested `studiomain-app` copy to sync.

## Vercel

- **Root Directory:** In **Project Settings → Build and Deployment → Root Directory**, use **`.`** or leave the field empty so the app is the repo root (not `studiomain-app`).  
  Vercel documents this under Build and Deployment, not under General.
- **Branch:** `master` and `main` are kept in sync for this repo; point production at either one in Vercel (only one production project is needed).
- Set env vars on this project: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`, etc.
- **`NEXT_PUBLIC_SITE_URL`** — Set to your production URL (e.g. `https://studiomain1.vercel.app`) for **Production**, **Preview**, and **Development** so magic links and Stripe redirects stay aligned. Redeploy after adding or changing it.

## Ship changes

```bash
git add .
git commit -m "Describe the change."
git push origin master   # or main, matching Vercel
```

Do not maintain a second app folder or submodule for the same site—everything you deploy should come from this tree.
