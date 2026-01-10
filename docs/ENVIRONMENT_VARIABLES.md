# Environment Variables

This document lists all the environment variables needed for the Stripe integration.

## Stripe Configuration

### Required Variables

1. **STRIPE_SECRET_KEY**
   - Description: Your Stripe secret key for server-side operations
   - Format: `sk_test_...` (test mode) or `sk_live_...` (production mode)
   - Get it from: Stripe Dashboard > Developers > API Keys

2. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
   - Description: Your Stripe publishable key for client-side operations
   - Format: `pk_test_...` (test mode) or `pk_live_...` (production mode)
   - Get it from: Stripe Dashboard > Developers > API Keys

3. **STRIPE_WEBHOOK_SECRET**
   - Description: Webhook signing secret for verifying webhook events
   - Format: `whsec_...`
   - Get it from: Stripe Dashboard > Developers > Webhooks
   - Note: You need to create a webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`

4. **STRIPE_PRICE_ID**
   - Description: The price ID for your subscription product
   - Format: `price_...`
   - Get it from: Stripe Dashboard > Products > (your product) > Pricing

### Optional Variables

5. **NEXT_PUBLIC_SITE_URL**
   - Description: Your site's base URL (used for redirects)
   - Example: `https://yourdomain.com` or `http://localhost:3000` for development
   - Default: Falls back to `http://localhost:3000` if not set

## Supabase Configuration

6. **NEXT_PUBLIC_SUPABASE_URL**
   - Description: Your Supabase project URL
   - Format: `https://xxxxx.supabase.co`

7. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Description: Your Supabase anonymous key
   - Format: Long JWT token

8. **SUPABASE_SERVICE_ROLE_KEY**
   - Description: Your Supabase service role key (for admin operations)
   - Format: Long JWT token
   - Warning: Keep this secret! Never expose to client-side code

## Setting Up Webhooks

To receive webhook events from Stripe:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Example .env.local File

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_51xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID=price_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

## Testing Webhooks Locally

For local development, you can use Stripe CLI to forward webhook events:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward events to your local endpoint
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI will provide a webhook signing secret that you can use for `STRIPE_WEBHOOK_SECRET` during local development.
