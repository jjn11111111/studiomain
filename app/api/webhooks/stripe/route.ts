import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sign } from "jsonwebtoken"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("[v0] Webhook signature verification failed:", err.message)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    // Handle successful subscription creation
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Get customer email
      const customerEmail = session.customer_details?.email

      if (!customerEmail) {
        console.error("[v0] No customer email found in session")
        return NextResponse.json({ error: "No customer email" }, { status: 400 })
      }

      // Generate JWT access token
      const token = sign(
        {
          email: customerEmail,
          subscriptionId: session.subscription,
          customerId: session.customer,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "365d" }, // 1 year access
      )

      // Create magic link with proper https protocol
      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000"
      const magicLink = `${baseUrl}/access/${token}`

      console.log("[v0] Access token generated for:", customerEmail)
      console.log("[v0] Magic link:", magicLink)

      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        // First get current count
        const getResponse = await fetch(`${supabaseUrl}/rest/v1/user_stats?select=total_users&limit=1`, {
          headers: {
            apikey: supabaseKey!,
            Authorization: `Bearer ${supabaseKey}`,
          },
        })

        if (getResponse.ok) {
          const data = await getResponse.json()
          const currentCount = data[0]?.total_users || 252

          // Update with incremented count
          await fetch(`${supabaseUrl}/rest/v1/user_stats?select=total_users`, {
            method: "PATCH",
            headers: {
              apikey: supabaseKey!,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              total_users: currentCount + 1,
              updated_at: new Date().toISOString(),
            }),
          })

          console.log("[v0] User counter incremented to:", currentCount + 1)
        }
      } catch (error) {
        console.error("[v0] Failed to increment user counter:", error)
      }

      console.log("[v0] EMAIL TO SEND:")
      console.log("[v0] To:", customerEmail)
      console.log("[v0] Subject: Your Pineal Vision Access Link")
      console.log("[v0] Body:", `Click here to access Pineal Vision: ${magicLink}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error("[v0] Webhook error:", err.message)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
