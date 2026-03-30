import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ hasAccess: false, error: "Email required" })
    }

    const supabase = await createClient()

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("status", "active")
      .single()

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
      .update(`${email}-${subscription.stripe_subscription_id}-${process.env.SUPABASE_JWT_SECRET}`)
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
