import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Use service role client for webhooks (no cookies available)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("[v0] Missing stripe-signature header")
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log("[v0] Stripe webhook received:", event.type)

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      console.log("[v0] Checkout session completed for:", session.customer_email)
      
      if (session.customer_email) {
        // Check if subscription already exists for this email
        const { data: existing } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("email", session.customer_email)
          .single()

        if (existing) {
          // Update existing subscription
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: "active",
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq("email", session.customer_email)
          
          if (updateError) {
            console.error("[v0] Error updating subscription:", updateError)
          } else {
            console.log("[v0] Updated subscription for:", session.customer_email)
          }
        } else {
          // Insert new subscription
          const { error: insertError } = await supabase
            .from("subscriptions")
            .insert({
              email: session.customer_email,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: "active",
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            })
          
          if (insertError) {
            console.error("[v0] Error inserting subscription:", insertError)
          } else {
            console.log("[v0] Created subscription for:", session.customer_email)
          }
        }
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      console.log("[v0] Subscription updated:", subscription.id, subscription.status)

      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id)
      
      if (error) {
        console.error("[v0] Error updating subscription status:", error)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      console.log("[v0] Subscription deleted:", subscription.id)

      const { error } = await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id)
      
      if (error) {
        console.error("[v0] Error canceling subscription:", error)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
