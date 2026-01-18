"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession(productId: string, email: string): Promise<string> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "https://studiomain1.vercel.app"

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/subscribe`,
  })

  return session.url!
}
