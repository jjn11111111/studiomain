import { createClient } from "@/lib/supabase/server"
import { normalizeEmail } from "@/lib/email-normalize"
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

export type SubscriptionRow = {
  stripe_subscription_id: string | null
  current_period_end: string
  status: string | null
}

export type SessionSubscriptionResult =
  | { kind: "unauthenticated" }
  | { kind: "no_subscription"; userId: string }
  | {
      kind: "ok"
      userId: string
      emailNormalized: string
      subscription: SubscriptionRow
    }

function pickActiveSubscription(
  rows: SubscriptionRow[] | null | undefined
): SubscriptionRow | null {
  if (!rows?.length) return null
  const now = Date.now()
  for (const r of rows) {
    const end = new Date(r.current_period_end).getTime()
    if (!Number.isFinite(end) || end < now) continue
    const s = (r.status ?? "").toLowerCase()
    if (["active", "trialing", "past_due"].includes(s)) return r
    if (s === "canceled") return r
  }
  return null
}

async function loadSubscriptionsByEmail(
  admin: SupabaseClient,
  email: string
): Promise<SubscriptionRow[]> {
  const { data, error } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, current_period_end, status")
    .eq("email", email)
    .order("current_period_end", { ascending: false })
    .limit(10)

  if (error) {
    console.error("[subscription-access] email lookup:", error.message)
    return []
  }
  return (data ?? []) as SubscriptionRow[]
}

async function loadSubscriptionsByUserId(
  admin: SupabaseClient,
  userId: string
): Promise<SubscriptionRow[]> {
  const { data, error } = await admin
    .from("subscriptions")
    .select("stripe_subscription_id, current_period_end, status")
    .eq("user_id", userId)
    .order("current_period_end", { ascending: false })
    .limit(10)

  if (error) {
    if (error.message.includes("user_id") || error.code === "42703") {
      return []
    }
    console.error("[subscription-access] user_id lookup:", error.message)
    return []
  }
  return (data ?? []) as SubscriptionRow[]
}

/**
 * Single source of truth: session user + active subscription row (service role when set).
 */
export async function resolveSessionSubscription(): Promise<SessionSubscriptionResult> {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user?.email) {
    return { kind: "unauthenticated" }
  }

  const normalized = normalizeEmail(user.email)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!

  let subscription: SubscriptionRow | null = null

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
      "[subscription-access] SUPABASE_SERVICE_ROLE_KEY missing — subscription checks are not reliable."
    )
    const { data, error } = await supabase
      .from("subscriptions")
      .select("stripe_subscription_id, current_period_end, status")
      .eq("email", normalized)
      .order("current_period_end", { ascending: false })
      .limit(10)

    if (error) {
      console.error("[subscription-access] anon lookup:", error.message)
    }
    subscription = pickActiveSubscription((data ?? []) as SubscriptionRow[])
  }

  if (!subscription) {
    return { kind: "no_subscription", userId: user.id }
  }

  return {
    kind: "ok",
    userId: user.id,
    emailNormalized: normalized,
    subscription,
  }
}
