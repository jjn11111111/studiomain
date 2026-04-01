import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ hasAccess: false, error: "Email required" })
    }

    const normalized = email.trim().toLowerCase()
    const supabase = await createClient()

    // Match lib/supabase/proxy.ts userHasActiveSubscription: active + trialing (Stripe trial)
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("email", normalized)
      .in("status", ["active", "trialing"])
      .maybeSingle()

    if (error || !subscription) {
      return NextResponse.json({ hasAccess: false })
    }

    // Check if subscription is still valid
    const now = new Date()
    const periodEnd = new Date(subscription.current_period_end)

    if (periodEnd < now) {
      return NextResponse.json({ hasAccess: false, error: "Subscription expired" })
    }

    // Generate a simple access token
    const token = crypto
      .createHash("sha256")
      .update(`${normalized}-${subscription.stripe_subscription_id}-${process.env.SUPABASE_JWT_SECRET}`)
      .digest("hex")

    return NextResponse.json({ 
      hasAccess: true, 
      token,
      expiresAt: subscription.current_period_end 
    })
  } catch (error) {
    console.error("Check subscription error:", error)
    return NextResponse.json({ hasAccess: false, error: "Server error" })
  }
}
