import { createClient } from "@/lib/supabase/server"
import { normalizeEmail } from "@/lib/email-normalize"
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import crypto from "crypto"
import type { SupabaseClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

type SubRow = {
  stripe_subscription_id: string | null
  current_period_end: string
  status: string | null
}

function pickActiveSubscription(rows: SubRow[] | null | undefined): SubRow | null {
  if (!rows?.length) return null
  const now = Date.now()
  for (const r of rows) {
    const end = new Date(r.current_period_end).getTime()
    if (!Number.isFinite(end) || end < now) continue
    const s = (r.status ?? "").toLowerCase()
    if (["active", "trialing", "past_due"].includes(s)) return r
    // Paid through end of period after user canceled
    if (s === "canceled") return r
  }
  return null
}

async function loadSubscriptionsByEmail(
  admin: SupabaseClient,
  email: string
): Promise<SubRow[]> {
  const { data, error } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, current_period_end, status")
    .eq("email", email)
    .order("current_period_end", { ascending: false })
    .limit(10)

  if (error) {
    console.error("[check-subscription] email lookup:", error.message)
    return []
  }
  return (data ?? []) as SubRow[]
}

async function loadSubscriptionsByUserId(
  admin: SupabaseClient,
  userId: string
): Promise<SubRow[]> {
  const { data, error } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, current_period_end, status")
    .eq("user_id", userId)
    .order("current_period_end", { ascending: false })
    .limit(10)

  if (error) {
    // user_id column may not exist on older DBs
    if (error.message.includes("user_id") || error.code === "42703") {
      return []
    }
    console.error("[check-subscription] user_id lookup:", error.message)
    return []
  }
  return (data ?? []) as SubRow[]
}

/**
 * Subscription access from **getUser()** only. Reads `subscriptions` with service role
 * keyed by session email, then by **user_id** if the Stripe email differs from login email.
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

    let subscription: SubRow | null = null

    if (serviceKey) {
      const admin = createSupabaseJsClient(url, serviceKey)
      let rows = await loadSubscriptionsByEmail(admin, normalized)
      subscription = pickActiveSubscription(rows)
      if (!subscription && user.id) {
        rows = await loadSubscriptionsByUserId(admin, user.id)
        subscription = pickActiveSubscription(rows)
      }
    } else {
      console.error(
        "[check-subscription] SUPABASE_SERVICE_ROLE_KEY is not set — subscription checks will fail in production. Add it in Vercel → Settings → Environment Variables."
      )
      const { data, error } = await supabase
        .from("subscriptions")
        .select("stripe_subscription_id, current_period_end, status")
        .eq("email", normalized)
        .order("current_period_end", { ascending: false })
        .limit(10)

      if (error) {
        console.error("[check-subscription] anon lookup:", error.message)
      }
      subscription = pickActiveSubscription((data ?? []) as SubRow[])
    }

    if (!subscription) {
      return NextResponse.json({ hasAccess: false })
    }

    const token = crypto
      .createHash("sha256")
      .update(
        `${normalized}-${subscription.stripe_subscription_id}-${process.env.SUPABASE_JWT_SECRET ?? ""}`
      )
      .digest("hex")

    return NextResponse.json({
      hasAccess: true,
      token,
      expiresAt: subscription.current_period_end,
    })
  } catch (error) {
    console.error("Check subscription error:", error)
    return NextResponse.json({ hasAccess: false, error: "Server error" })
  }
}
