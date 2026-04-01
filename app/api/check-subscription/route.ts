import { createClient } from "@/lib/supabase/server"
import { normalizeEmail } from "@/lib/email-normalize"
import { NextResponse } from "next/server"
import crypto from "crypto"

/**
 * Subscription access must be decided from the **server session**, not the request body.
 * Client-supplied email is ignored for auth (prevents spoofing); RLS still restricts rows.
 */
export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user?.email) {
      return NextResponse.json({ hasAccess: false, error: "Not authenticated" })
    }

    const normalized = normalizeEmail(user.email)

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
