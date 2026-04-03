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

- `https://studiomain1.vercel.app/api/auth/callback` (**required** — server sets auth cookies; magic links use this URL)
- `https://studiomain1.vercel.app/auth/callback` (optional — loads a page that forwards query auth to `/api/auth/callback`)
- `https://studiomain1.vercel.app/auth/confirm` (optional; redirects to `/api/auth/callback`)
- If you use preview URLs: add `https://*.vercel.app/api/auth/callback` (and `/auth/callback` / `/auth/confirm` if you use them)

Save. Magic links will only redirect to URLs in this list.

## 3. (Optional) Env on Vercel

In your Vercel project → **Settings** → **Environment Variables**, set:

- `NEXT_PUBLIC_SITE_URL` = `https://studiomain1.vercel.app`

so the callback redirect uses the correct host when you want every environment (including previews) to send magic links to production. If you **omit** it, the app uses the **current site origin** for `emailRedirectTo` (good for preview URLs like `https://*-*.vercel.app`).

### “Error sending confirmation email”

Usually Supabase refused the request before sending mail. Typical causes:

1. **Redirect URL** — Under **Redirect URLs**, include `https://YOUR-PREVIEW-HOST/api/auth/callback` or use a wildcard such as `https://*.vercel.app/api/auth/callback` for all Vercel previews.
2. **Custom SMTP** — If you use custom SMTP in Supabase, check credentials and provider logs.
3. **Stripe vs login email** — Subscribe with one address but request a magic link with another; sending still works, but access checks use the signed-in email (use the **same email you paid with**).

After this, the link in the email lands on **`/api/auth/callback`**, which sets the session cookies and redirects to `/exercises` (or the `next` param). Older links may still use `/auth/callback` first; that page forwards query auth to `/api/auth/callback`.

## 4. Make magic links reliable (PKCE + email apps)

The browser client uses **PKCE**. A link that only contains a `code` must be opened in the **same browser** where the user requested the email, or exchange fails (no `code_verifier`). That breaks when people request a link on desktop and open the email on a phone, or use an in-app mail browser.

**Fix (recommended):** In Supabase → **Authentication** → **Email Templates** → **Magic Link**, replace the default `{{ .ConfirmationURL }}` link with a URL that includes **`token_hash`**. That path is verified on the server without PKCE storage, so it works on any device.

Your app passes `emailRedirectTo` like `https://YOUR_DOMAIN/api/auth/callback?next=...`, so **`{{ .RedirectTo }}`** already points at `/api/auth/callback` with a `next` query. Use:

```html
<p><a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=magiclink">Sign in</a></p>
```

- Keep `type=magiclink` for normal magic-link sign-in. If a template is only for email confirmation signup, use `type=signup` when Supabase documents that for your flow.
- The first query parameter on `RedirectTo` is already `?next=...`, so the extra params use `&`.

Query-string sign-in (`code` / `token_hash`) finishes on **`/api/auth/callback`** (server response) so cookies are reliable. If tokens only appear in the **URL hash** (rare), `/auth/callback` still runs a short client step to pick them up.

## 5. Each new magic link as its own email (Gmail threading)

Gmail (and some other clients) **thread** messages when the **subject line is the same** every time. Supabase’s default magic-link subject is fixed (e.g. “Your Magic Link”), so several requests show up as one conversation with new messages stacked inside it.

Your app **cannot** send separate threads from code; you change this in **Supabase → Authentication → Email Templates → Magic Link → Subject**.

Use a **subject that changes on every send**. Supabase provides a new **`{{ .Token }}`** (6-digit OTP) for each request, so for example:

```text
Your Pineal Vision sign-in — code {{ .Token }}
```

or:

```text
Sign in to Pineal Vision ({{ .Token }})
```

Keep the **same** `{{ .Token }}` in the body if you show the code there too. Users can still use the **link**; the code is optional for sign-in if you also expose it.

**Tradeoff:** The code appears in the inbox subject line and lock-screen previews. If you want uniqueness without showing the code, you’d need a **custom email provider / Send Email hook** to set a unique subject or `Message-ID` header—hosted Supabase templates don’t expose a “random id” besides `Token` / `TokenHash`.

**Note:** Rapid “Send again” clicks are still limited by Supabase **rate limits**; you may not get a new email for every click within the cooldown window.
