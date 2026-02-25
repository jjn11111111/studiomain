# Auth (magic link) setup

If clicking the magic link in the email sends you to a **404**, Supabase is redirecting to a URL your app doesn’t serve. Fix it in the Supabase Dashboard.

## 1. Set Site URL

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project (**sky-village**).
2. Go to **Authentication** → **URL Configuration**.
3. Set **Site URL** to your production URL, e.g.:
   - `https://studiomain1.vercel.app`
   (Use your real Vercel URL if different.)

Do **not** leave it as `http://localhost:3000` if you’re testing magic links from production.

## 2. Allow the callback URL

In the same **URL Configuration** page, under **Redirect URLs**, add:

- `https://studiomain1.vercel.app/auth/callback`
- If you use preview URLs: `https://*.vercel.app/auth/callback`

Save. Magic links will only redirect to URLs in this list.

## 3. (Optional) Env on Vercel

In your Vercel project → **Settings** → **Environment Variables**, set:

- `NEXT_PUBLIC_SITE_URL` = `https://studiomain1.vercel.app`

so the callback redirect uses the correct host.

After this, the link in the email should land on `/auth/callback`, exchange the code for a session, and redirect to `/exercises` (or the `next` param).
