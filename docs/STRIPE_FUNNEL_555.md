# Pineal Vision Stripe Funnel ($5.55/month)

This is the canonical setup for the Pineal Vision subscription funnel at **$5.55/month**.

## 1) Offer and Funnel Flow

1. User lands on `/subscribe`.
2. Page shows `$5.55/month` and takes user email.
3. User clicks checkout and is redirected to Stripe Payment Link.
4. Stripe checkout succeeds and returns to `/checkout/success`.
5. Webhook (`/api/webhooks/stripe`) and success page activation both update `subscriptions`.
6. AccessGate checks `/api/check-subscription` and unlocks `/exercises` for active subscribers.

## 2) Stripe Dashboard Setup

1. Create (or edit) a recurring monthly product price at **$5.55 USD**.
2. Update your Payment Link to use that price.
3. Copy the Payment Link URL and set:
   - `NEXT_PUBLIC_STRIPE_PAYMENT_LINK=<your payment link>`
4. Ensure webhook endpoint is configured:
   - URL: `https://<your-domain>/api/webhooks/stripe`
   - Events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
5. Copy webhook signing secret and set:
   - `STRIPE_WEBHOOK_SECRET=<whsec_...>`

## 3) Required Environment Variables

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4) Access Control Behavior

- Subscription access is keyed by subscriber email in `subscriptions`.
- `status` must be `active`.
- `current_period_end` must be in the future.
- Users should authenticate with the same email used at checkout.

## 5) Verification Checklist

1. Start at `/subscribe` and confirm price copy shows `$5.55/month`.
2. Complete a test-mode Stripe checkout.
3. Confirm redirect to `/checkout/success`.
4. In Supabase `subscriptions`, verify:
   - `email`
   - `status = active`
   - `stripe_subscription_id`
   - `current_period_end`
5. Login with same email and verify `/exercises` is unlocked.

## 6) Conversion Guidance at $5.55

- Keep one primary CTA and minimal friction (email + checkout).
- Keep “cancel anytime” and secure-payment copy near the button.
- Consider adding an annual option later (e.g. $49/year) after baseline data.
