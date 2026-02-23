# Pineal Vision (studiomain) – Full App Review

## 1. Overview

- **Stack:** Next.js 16, React 19, Supabase (auth + DB + storage), Stripe (payment link + webhooks).
- **Deploy:** Vercel (studiomain1.vercel.app).
- **Data:** sky-village Supabase project; exercises in Storage (Module A/B/C) and `exercises` table.

---

## 2. Security

### Good

- **Auth:** Access gate checks Supabase `getUser()` and `/api/check-subscription` (email + active subscription). Login/sign-up and auth callback use Supabase SSR; callback uses `await cookies()`.
- **Subscription check:** Server-side; uses `SUPABASE_JWT_SECRET` to mint a short-lived token (hash). No subscription IDs sent to client for access checks.
- **Stripe webhook:** Verifies `stripe-signature` with `STRIPE_WEBHOOK_SECRET`; uses service role only in webhook and checkout/success.
- **RLS:** Exercises readable by all; comments readable by all, write/update/delete scoped to `auth.uid()`; subscriptions scoped to user/email and service role.
- **Video URLs:** Storage paths resolved server-side in the app with a bucket whitelist (Module A/B/C, home page, videos); no arbitrary bucket from user input.

### To improve

- **Check-subscription:** Anyone can POST with any `email` and see if that email has access. Prefer requiring a valid session and using the logged-in user’s email (or validating a signed token) so only the account holder can check their own access.
- **Validate-token API:** Expects `token === stripe_subscription_id` in DB. The rest of the app uses a hashed token from check-subscription. Either remove validate-token or align it with the same token scheme; otherwise it’s dead or inconsistent.
- **Stripe Payment Link:** Hardcoded in `stripe-checkout.tsx`. Prefer env var (e.g. `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`) so it can change per environment and stay out of git history.
- **Secrets:** Ensure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET` exist in Vercel and are never committed.

---

## 3. Functionality

### Working

- Home: hero video (sky-village `home page` bucket), modules preview, practice section, how it works, footer.
- Auth: login, sign-up, callback; redirect to `/exercises` after login.
- Access gate: unauthenticated → sign-in CTA; authenticated no subscription → subscribe CTA; authenticated + active subscription → module content.
- Exercises: list by module (A/B/C), video player per exercise, storage path resolution with per-module bucket (Module A/B/C).
- Subscribe: Stripe Payment Link with prefilled email; success page creates/updates subscription and shows CTA to create account / login.
- Webhooks: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` update `subscriptions` (create/update/status and period end where fixed).
- Comments API: GET comments by `exerciseId` from `comments` table.

### Gaps / bugs

- **Subscription period end:** In webhook `checkout.session.completed` and in checkout/success page, `current_period_end` is set to `now + 30 days` instead of using Stripe’s real period end. That can mark subscriptions expired too early or leave them active too long. Should use Stripe subscription’s `current_period_end` (from session or subscription object).
- **Comments:**
  - DB has `content`, `user_name`, `user_email`; no `rating` or `comment_text`. The UI expects `comment_text` and `rating`. Either add a migration for `rating` and map `content` → `comment_text` in API, or change the component to use `content` and drop rating.
  - There is no POST endpoint for creating comments; the app only reads comments. To allow “Be the first to share,” add a POST (or client Supabase insert with RLS).
- **Practice gallery:** Uses hardcoded `mockImages` with URLs from a **different** Supabase project (`jzfwbcjpklxppwpuimty`). Your JPGs live in sky-village. To use your images, either (a) point `image_url` to sky-village storage URLs, or (b) add a `practice_images` table (or config) and load from your project.
- **User counter:** `/api/user-stats` calls a view `user_stats` (may not exist); falls back to 252. Confirm the view exists in sky-village or remove/replace the endpoint.

---

## 4. Efficiency

- **Next:** `images.unoptimized: true` disables image optimization; consider enabling for practice images and thumbnails.
- **TypeScript:** `ignoreBuildErrors: true` hides type errors; better to fix and turn off for production.
- **Access gate:** Calls `/api/check-subscription` on every mount; could cache result (e.g. in state or short-lived client token) to avoid repeated calls.
- **Video:** Preload and storage URL resolution are reasonable; per-module bucket logic avoids unnecessary env toggling.

---

## 5. Recommendations (priority)

1. **High:** Fix subscription period end (webhook + checkout/success) using Stripe’s `current_period_end`.
2. **High:** Align comments DB/API/UI (field names + optional rating) and add POST for new comments if you want that feature.
3. **Medium:** Move Stripe Payment Link to env; optionally tighten check-subscription to authenticated user only.
4. **Medium:** Point practice gallery at sky-village (config or DB) so your JPGs show.
5. **Low:** Enable Next image optimization; remove `ignoreBuildErrors` and fix types; add security headers in `next.config` if needed (CSP, X-Frame-Options, etc.).

---

## 6. Env checklist (Vercel / .env.local)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `SUPABASE_JWT_SECRET` (check-subscription token)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_VIDEO_STORAGE_BUCKET` (optional; app defaults to Module A/B/C by module)
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` (optional; app falls back to hardcoded link)
- `NEXT_PUBLIC_PRACTICE_IMAGES_BASE` (optional; base URL for practice gallery images, e.g. your sky-village bucket public URL)
