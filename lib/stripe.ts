import Stripe from 'stripe'

const getStripeClient = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
  })
}

export const stripe = typeof process.env.STRIPE_SECRET_KEY !== 'undefined' 
  ? getStripeClient()
  : null as any

export async function getOrCreateCustomer(params: { userId: string; email?: string }) {
  // This is a placeholder implementation
  // You'll need to implement actual customer creation logic
  return { id: 'cus_placeholder' }
}
