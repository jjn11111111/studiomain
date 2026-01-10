# Stripe Integration Guide

This document provides instructions for setting up and using the Stripe subscription integration in PinealVision.

## Overview

The Stripe integration enables users to subscribe to premium features through a secure, PCI-compliant payment flow. The integration includes:

- **Checkout Flow**: Users can subscribe via `/subscribe` page
- **Customer Portal**: Users can manage subscriptions via Stripe Customer Portal
- **Webhook Handling**: Automatic subscription status updates via webhooks
- **Embedded Checkout**: Modern Stripe Elements for seamless payment experience

## Architecture

### Components

1. **`components/stripe-checkout.tsx`**
   - Embedded Stripe payment form using Stripe Elements
   - Handles payment confirmation and redirects
   - Customized appearance matching PinealVision branding

2. **`components/CheckoutForm.tsx`**
   - Simple email collection form
   - Redirects to subscribe page

### API Routes

1. **`app/api/stripe/create-checkout/route.ts`**
   - Creates Stripe Checkout Session
   - Requires authentication (Supabase)
   - Returns hosted checkout URL

2. **`app/api/stripe/create-portal/route.ts`**
   - Creates Stripe Customer Portal session
   - Allows users to manage subscriptions, payment methods, billing history
   - Requires authentication (Supabase)

3. **`app/api/webhooks/stripe/route.ts`**
   - Handles Stripe webhook events
   - Verifies webhook signatures for security
   - Supported events:
     - `checkout.session.completed` - Subscription started
     - `customer.subscription.created/updated/deleted` - Subscription lifecycle
     - `invoice.payment_succeeded/failed` - Payment processing

### Pages

1. **`app/subscribe/page.tsx`**
   - Subscription landing page
   - Displays pricing ($9.99/month)
   - Lists features included in subscription
   - Redirects to Stripe hosted checkout

## Setup Instructions

### 1. Stripe Account Setup

1. Create a Stripe account at https://stripe.com
2. Navigate to Dashboard > Developers > API Keys
3. Copy your publishable and secret keys

### 2. Create a Product and Price

1. Go to Dashboard > Products > Add Product
2. Name: "PinealVision Premium" (or your choice)
3. Add a recurring price: $9.99/month
4. Copy the Price ID (starts with `price_`)

### 3. Environment Variables

Add the following to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_PRICE_ID=price_YOUR_PRICE_ID
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe Webhook (add after step 4)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### 4. Webhook Configuration

#### Production Setup

1. Go to Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

#### Local Development

Use Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret from the CLI output to your `.env`.

### 5. Supabase Integration (Optional)

To track subscription status in Supabase:

1. Add a `subscription_status` column to your users table:
   ```sql
   ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'free';
   ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;
   ```

2. Update the webhook handler in `app/api/webhooks/stripe/route.ts` to update Supabase when subscription status changes.

## Usage

### For Users

1. **Subscribe**: Navigate to `/subscribe`
2. **Manage Subscription**: After subscribing, users can visit `/account` (you need to implement this page) and call the `/api/stripe/create-portal` endpoint to manage their subscription

### For Developers

#### Create Checkout Session

```typescript
const response = await fetch('/api/stripe/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});
const { url } = await response.json();
window.location.href = url; // Redirect to Stripe
```

#### Create Customer Portal Session

```typescript
const response = await fetch('/api/stripe/create-portal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});
const { url } = await response.json();
window.location.href = url; // Redirect to Stripe portal
```

## Testing

### Test Cards

Use Stripe test cards for testing:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiration date and any 3-digit CVC.

### Test Mode

Make sure you're using test keys (starting with `sk_test_` and `pk_test_`) during development.

### Webhook Testing

Use Stripe CLI to test webhooks locally:

```bash
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

## Security Considerations

1. **Webhook Verification**: Always verify webhook signatures using `STRIPE_WEBHOOK_SECRET`
2. **Environment Variables**: Never commit real API keys to version control
3. **Server-Side Only**: Secret key operations must only occur server-side
4. **HTTPS Required**: Webhooks require HTTPS in production

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct and accessible
2. Verify webhook secret matches
3. Check Stripe Dashboard > Webhooks > Logs for errors
4. Ensure your app is deployed and accessible

### Checkout Session Expires

Checkout sessions expire after 24 hours. Create a new session if needed.

### Customer Portal Issues

Ensure the customer has an active Stripe customer ID and subscription.

## Next Steps

1. **Implement Account Page**: Create `/account` page showing subscription status
2. **Database Integration**: Store subscription status in Supabase
3. **Access Control**: Implement middleware to restrict premium content
4. **Email Notifications**: Send confirmation emails on subscription events
5. **Analytics**: Track subscription conversions and churn

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- PinealVision: [Your support email]
