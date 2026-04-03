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
- `https://studiomain1.vercel.app/auth/confirm` (optional; redirects to `/auth/callback`)
- If you use preview URLs: `https://*.vercel.app/auth/callback` (and the same for `/auth/confirm` if you use it)

Save. Magic links will only redirect to URLs in this list.

## 3. (Optional) Env on Vercel

In your Vercel project → **Settings** → **Environment Variables**, set:

- `NEXT_PUBLIC_SITE_URL` = `https://studiomain1.vercel.app`

so the callback redirect uses the correct host.

After this, the link in the email should land on `/auth/callback`, exchange the code for a session, and redirect to `/exercises` (or the `next` param).

## 4. Make magic links reliable (PKCE + email apps)

The browser client uses **PKCE**. A link that only contains a `code` must be opened in the **same browser** where the user requested the email, or exchange fails (no `code_verifier`). That breaks when people request a link on desktop and open the email on a phone, or use an in-app mail browser.

**Fix (recommended):** In Supabase → **Authentication** → **Email Templates** → **Magic Link**, replace the default `{{ .ConfirmationURL }}` link with a URL that includes **`token_hash`**. That path is verified on the server without PKCE storage, so it works on any device.

Your app passes `emailRedirectTo` like `https://YOUR_DOMAIN/auth/callback?next=...`, so **`{{ .RedirectTo }}`** already points at `/auth/callback` with a `next` query. Use:

```html
<p><a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=magiclink">Sign in</a></p>
```

- Keep `type=magiclink` for normal magic-link sign-in. If a template is only for email confirmation signup, use `type=signup` when Supabase documents that for your flow.
- The first query parameter on `RedirectTo` is already `?next=...`, so the extra params use `&`.

The app completes sign-in on **`/auth/callback`** in the browser (including tokens in the **hash**, for some resend / implicit edge cases), so users should not get stuck on a blank response when the fragment carries the session.
