import { normalizeEmail } from "@/lib/email-normalize"
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
    console.error("[stripe-webhook] Missing stripe-signature header")
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
    console.error("[stripe-webhook] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log("[stripe-webhook] Stripe webhook received:", event.type)

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      // Get email from customer_email OR customer_details.email (payment links use customer_details)
      const rawEmail = session.customer_email || session.customer_details?.email
      const email = rawEmail ? normalizeEmail(rawEmail) : null
      console.log("[stripe-webhook] Checkout session completed for:", email)
      
      if (email) {
        let periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        if (session.subscription) {
          try {
            const sub = await stripe.subscriptions.retrieve(session.subscription as string)
            periodEnd = new Date(sub.current_period_end * 1000).toISOString()
          } catch (e) {
            console.warn("[stripe-webhook] Could not fetch subscription for period_end, using fallback")
          }
        }

        const { data: existing } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("email", email)
          .single()

        if (existing) {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: "active",
              current_period_end: periodEnd,
            })
            .eq("email", email)

          if (updateError) {
            console.error("[stripe-webhook] Error updating subscription:", updateError)
          } else {
            console.log("[stripe-webhook] Updated subscription for:", email)
          }
        } else {
          const { error: insertError } = await supabase
            .from("subscriptions")
            .insert({
              email: email,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: "active",
              current_period_end: periodEnd,
            })

          if (insertError) {
            console.error("[stripe-webhook] Error inserting subscription:", insertError)
          } else {
            console.log("[stripe-webhook] Created subscription for:", email)
          }
        }
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      console.log("[stripe-webhook] Subscription updated:", subscription.id, subscription.status)

      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id)
      
      if (error) {
        console.error("[stripe-webhook] Error updating subscription status:", error)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      console.log("[stripe-webhook] Subscription deleted:", subscription.id)

      const { error } = await supabase
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id)
      
      if (error) {
        console.error("[stripe-webhook] Error canceling subscription:", error)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
