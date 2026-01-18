"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession(productId: string, email: string): Promise<string> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "https://studiomain1.vercel.app"

    console.log("[v0] Creating session with:", { productId, email, baseUrl })

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

    console.log("[v0] Session created:", session.url)
    return session.url!
  } catch (error: unknown) {
    const stripeError = error as { message?: string; type?: string }
    console.error("[v0] Stripe error:", stripeError.message, stripeError.type)
    throw new Error(stripeError.message || "Failed to create checkout session")
  }
}
