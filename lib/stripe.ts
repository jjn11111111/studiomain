import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Client-side Stripe instance (singleton pattern)
let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Helper function to get or create a customer
export async function getOrCreateCustomer(params: { userId: string; email?: string }) {
  try {
    // Search for existing customer by metadata
    const existingCustomers = await stripe.customers.list({
      limit: 1,
      email: params.email,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email: params.email,
      metadata: {
        userId: params.userId,
      },
    });

    return customer;
  } catch (error) {
    console.error('Error getting or creating customer:', error);
    throw error;
  }
}