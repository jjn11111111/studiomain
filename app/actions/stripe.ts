"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function createCheckoutSession(productId: string, email: string): Promise<string> {
  // Use VERCEL_URL (auto-provided by Vercel) or fallback to your deployed URL
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "https://studiomain1.vercel.app"

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer_email: email,
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    return_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret!
}
