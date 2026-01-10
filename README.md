This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## PinealVision - Spiritual Video Exercise Platform

PinealVision is a Next.js application featuring stereoscopic visual exercises designed to stimulate intuitive and psychic abilities. The platform includes subscription management through Stripe integration.

## Features

- 📹 Sequential stereoscopic video presentation
- 📊 Progress tracking through video levels
- 🎯 Guided exercises with AI-powered assistance
- 💳 Stripe subscription integration
- 👥 Community features with Supabase
- 🔒 Secure authentication and payment processing

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, set up your environment variables (see [Environment Variables](#environment-variables) below).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Before running the application, you need to configure the following environment variables. See `docs/ENVIRONMENT_VARIABLES.md` for detailed instructions.

### Required Variables

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Stripe Integration

The application includes a complete Stripe subscription integration:

- **Subscribe Page**: `/subscribe` - Users can subscribe to premium features
- **Customer Portal**: Managed through Stripe's hosted portal
- **Webhook Handler**: Automatically processes subscription events
- **Secure Checkout**: PCI-compliant payment processing

For detailed setup instructions, see:
- `docs/STRIPE_INTEGRATION.md` - Complete integration guide
- `docs/MERGE_SUMMARY.md` - Summary of integration changes

## Project Structure

```
studiomain/
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-checkout/    # Creates Stripe checkout sessions
│   │   │   └── create-portal/      # Opens customer portal
│   │   └── webhooks/
│   │       └── stripe/             # Handles Stripe events
│   ├── community/                  # Community features
│   ├── subscribe/                  # Subscription landing page
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── stripe-checkout.tsx         # Embedded Stripe checkout
│   └── CheckoutForm.tsx            # Simple checkout form
├── lib/
│   ├── stripe.ts                   # Stripe utilities
│   ├── supabase.ts                 # Supabase client
│   └── supabaseServer.ts           # Server-side Supabase
└── docs/
    ├── ENVIRONMENT_VARIABLES.md    # Environment configuration
    ├── STRIPE_INTEGRATION.md       # Integration guide
    └── MERGE_SUMMARY.md            # Merge details
```

## Available Routes

- `/` - Home page
- `/subscribe` - Subscription page with Stripe checkout
- `/community` - Community posts and discussions
- `/api/stripe/create-checkout` - Creates checkout session (POST)
- `/api/stripe/create-portal` - Opens customer portal (POST)
- `/api/webhooks/stripe` - Stripe webhook endpoint (POST)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Stripe Documentation](https://stripe.com/docs) - learn about Stripe integration.
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase features.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security

- All Stripe operations use secure server-side routes
- Webhook signatures are verified
- API keys are stored in environment variables
- CodeQL scans: 0 vulnerabilities
- npm audit: 0 vulnerabilities

## License

This project is private and proprietary.
