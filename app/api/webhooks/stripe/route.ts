// Force dynamic rendering and use Node.js runtime
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe inside the handler to avoid build-time initialization
    const Stripe = (await import("stripe")).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
    })

    const body = await request.text()
    const signature = (await headers()).get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle successful subscription
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any

      // Get customer email
      const customerEmail = session.customer_details?.email || session.customer_email

      if (customerEmail) {
        // Generate magic link
        const tokenResponse = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/api/generate-access-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: customerEmail,
              stripeCustomerId: session.customer,
            }),
          },
        )

        const { magicLink } = await tokenResponse.json()

        console.log("=".repeat(80))
        console.log("NEW SUBSCRIPTION - MAGIC LINK GENERATED")
        console.log("=".repeat(80))
        console.log(`Email: ${customerEmail}`)
        console.log(`Magic Link: ${magicLink}`)
        console.log("=".repeat(80))

        // Increment user counter in Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

        // Get current count
        const statsResponse = await fetch(`${supabaseUrl}/rest/v1/user_stats?select=total_users&limit=1`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        })

        const stats = await statsResponse.json()
        const currentCount = stats[0]?.total_users || 252

        // Update count (increment by 1)
        await fetch(`${supabaseUrl}/rest/v1/user_stats?id=eq.${stats[0].id}`, {
          method: "PATCH",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            total_users: currentCount + 1,
            updated_at: new Date().toISOString(),
          }),
        })

        console.log(`User counter incremented: ${currentCount} → ${currentCount + 1}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error.message)
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 })
  }
}
