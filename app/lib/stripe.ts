import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Client-side Stripe
export const getStripe = () => {
  if (typeof window === 'undefined') return null;
  
  const stripePromise = import('@stripe/stripe-js').then(
    (module) => module.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  );
  
  return stripePromise;
};
