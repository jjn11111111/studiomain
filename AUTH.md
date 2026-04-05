# Auth setup

## Email and password (what users see)

Login and sign-up use **email + password** only (no Google OAuth in the app UI).

**Supabase:** **Authentication** → **Providers** → **Email** — enable **Email** sign-in. **Confirm email** can be on or off (if on, new users confirm once via email before signing in).

**Password reset:** `/auth/forgot-password` sends a link that lands on `/auth/callback?next=…` then `/auth/reset-password`. Under **URL Configuration** → **Redirect URLs**, allow your app’s **`/auth/callback**`** pattern (see §2 below).

---

## Subscription security (app behavior)

- **`/api/exercise-video`** only streams after **`resolveSessionSubscription()`** succeeds (signed-in user + active row in `subscriptions`). Guessing URLs is not enough without a valid session and plan.
- **`/api/check-subscription`** uses the same resolver; keep **`SUPABASE_SERVICE_ROLE_KEY`** set on the server in production.
- **Stripe:** Use the **same email** as login (subscribe page pre-fills when you’re signed in) so `subscriptions.email` matches your account email.

---

## Seamless setup (best default)

Use **one production hostname** for real users so auth, Stripe, and Supabase never disagree.

1. **Vercel → Settings → Environment Variables** — Set  
   `NEXT_PUBLIC_SITE_URL` = `https://studiomain1.vercel.app`  
   (or your final custom domain). Use it for **Production**, **Preview**, and **Development** so Supabase redirect URLs stay consistent.

2. **Supabase → Authentication → URL Configuration**
   - **Site URL:** `https://studiomain1.vercel.app` — **site root only** (no `/api/auth/callback` here).
   - **Redirect URLs:** must include  
     `https://studiomain1.vercel.app/api/auth/callback`  
     and patterns for **`/auth/callback`** (password reset / confirmations). See §2 below.

3. **Email templates** — **Confirm signup** and **Reset password** emails must redirect to allowed URLs (same as above). §4–§5 below are **legacy** notes for magic-link sign-in (the app no longer uses magic-link login).

4. **Stripe** — Checkout with the **same email** you use to log in; subscriptions are keyed off that email.

5. **Habit** — Share and bookmark **`https://studiomain1.vercel.app`**. Avoid random **preview** URLs for real login or checkout.

---

If a **confirmation or reset** link in email hits a **404**, add that URL pattern under **Redirect URLs** in Supabase.

## 1. Set Site URL

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project (**sky-village**).
2. Go to **Authentication** → **URL Configuration**.
3. Set **Site URL** to your production URL, e.g.:
   - `https://studiomain1.vercel.app`
   (Use your real Vercel URL if different.)

Do **not** leave **Site URL** as `http://localhost:3000` if real users sign in on production.

## 2. Allow the callback URL

In the same **URL Configuration** page, under **Redirect URLs**, add:

- `https://studiomain1.vercel.app/api/auth/callback` (**required** — exact path, no query; matches what the app sends as `emailRedirectTo`)
- Optionally one glob to cover query strings in **custom email links** (e.g. `?token_hash=`): `https://studiomain1.vercel.app/api/auth/callback/**` (see [Supabase redirect URL patterns](https://supabase.com/docs/guides/auth/redirect-urls))
- `https://studiomain1.vercel.app/auth/callback` (optional — loads a page that forwards query auth to `/api/auth/callback`)
- `https://studiomain1.vercel.app/auth/confirm` (optional; redirects to `/api/auth/callback`)
- If you use preview URLs: add `https://*.vercel.app/api/auth/callback` (and `/auth/callback` / `/auth/confirm` if you use them)

Save. Auth redirects (callbacks, email confirmations, resets) only go to URLs in this list.

## 3. Env on Vercel (`NEXT_PUBLIC_SITE_URL`)

Recommended for seamless behavior: set **`NEXT_PUBLIC_SITE_URL`** = your production URL for **all** Vercel environments (see **Seamless setup** above).

If you **omit** it, the app still **forces the production URL** for Vercel **preview** hosts (`*.vercel.app` except your main deploy hostname); localhost and custom domains use the current origin when appropriate.

### “Error sending confirmation email”

Usually Supabase refused the request before sending mail. Typical causes:

1. **Redirect URL** — Under **Redirect URLs**, include `https://YOUR-PREVIEW-HOST/api/auth/callback` or use a wildcard such as `https://*.vercel.app/api/auth/callback` for all Vercel previews.
2. **Custom SMTP** — If you use custom SMTP in Supabase, check credentials and provider logs.
3. **Stripe vs login email** — Pay with one address but sign in with another → subscription checks won’t match (use the **same email you paid with**).

After this, the link in the email lands on **`/api/auth/callback`**, which sets the session cookies and redirects to `/exercises` (or the `next` param). Older links may still use `/auth/callback` first; that page forwards query auth to `/api/auth/callback`.

## 4. Make magic links reliable (PKCE + email apps)

The browser client uses **PKCE**. A link that only contains a `code` must be opened in the **same browser** where the user requested the email, or exchange fails (no `code_verifier`). That breaks when people request a link on desktop and open the email on a phone, or use an in-app mail browser.

**Fix (recommended):** In Supabase → **Authentication** → **Email Templates** → **Magic Link**, replace the default `{{ .ConfirmationURL }}` link with a URL that includes **`token_hash`**. That path is verified on the server without PKCE storage, so it works on any device.

The app sets `emailRedirectTo` to **`https://YOUR_DOMAIN/api/auth/callback`** (no query), so **`{{ .RedirectTo }}`** has no `?`. Add `token_hash` as the first query param:

```html
<p><a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=magiclink">Sign in</a></p>
```

- Keep `type=magiclink` for normal magic-link sign-in. If a template is only for email confirmation signup, use `type=signup` when Supabase documents that for your flow.
- After sign-in, users land on **`/exercises`** by default (or add `https://YOUR_DOMAIN/api/auth/callback/**` to Redirect URLs if you put extra query params on the link).

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
