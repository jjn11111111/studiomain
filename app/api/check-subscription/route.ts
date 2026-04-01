import { createClient } from "@/lib/supabase/server"
import { normalizeEmail } from "@/lib/email-normalize"
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import crypto from "crypto"

/**
 * Subscription access is decided from **getUser()** only (no client-supplied email).
 * After identity is verified, we read `subscriptions` with the **service role** so RLS /
 * JWT email claim quirks cannot hide a valid row. Safe: query is keyed only to session email.
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
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!

    let subscription: {
      stripe_subscription_id: string | null
      current_period_end: string
    } | null = null

    if (serviceKey) {
      const admin = createSupabaseJsClient(url, serviceKey)
      const { data: rows, error } = await admin
        .from("subscriptions")
        .select("stripe_subscription_id, current_period_end, status")
        .eq("email", normalized)
        .in("status", ["active", "trialing", "past_due"])
        .order("current_period_end", { ascending: false })
        .limit(1)

      if (error) {
        console.error("[check-subscription] service lookup:", error.message)
      }
      subscription = rows?.[0] ?? null
    } else {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("stripe_subscription_id, current_period_end, status")
        .eq("email", normalized)
        .in("status", ["active", "trialing", "past_due"])
        .order("current_period_end", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("[check-subscription] anon lookup:", error.message)
      }
      subscription = data ?? null
    }

    if (!subscription) {
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
