import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
})

export async function getOrCreateCustomer(params: { userId: string; email?: string }) {
  // This is a placeholder implementation
  // You'll need to implement actual customer creation logic
  return { id: 'cus_placeholder' }
}
