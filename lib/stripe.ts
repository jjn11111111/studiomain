import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function getOrCreateCustomer(params: { userId: string; email?: string }) {
  // This is a placeholder implementation
  // You'll need to implement actual customer creation logic
  return { id: 'cus_placeholder' }
}
