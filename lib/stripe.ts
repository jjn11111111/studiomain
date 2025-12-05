import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-11-17.clover',
    })
  }
  return stripeInstance
}

export const stripe = getStripe()

export async function getOrCreateCustomer(params: { userId: string; email?: string }) {
  // This is a placeholder implementation
  // You'll need to implement actual customer creation logic
  return { id: 'cus_placeholder' }
}
