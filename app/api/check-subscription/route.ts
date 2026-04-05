import { NextResponse } from "next/server"
import crypto from "crypto"
import { resolveSessionSubscription } from "@/lib/subscription-access"

export const dynamic = "force-dynamic"

/**
 * Subscription access from **getUser()** only. Delegates to {@link resolveSessionSubscription}.
 */
export async function POST() {
  try {
    const resolved = await resolveSessionSubscription()

    if (resolved.kind === "unauthenticated") {
      return NextResponse.json({ hasAccess: false, error: "Not authenticated" })
    }

    if (resolved.kind === "no_subscription") {
      return NextResponse.json({ hasAccess: false })
    }

    const { emailNormalized, subscription } = resolved

    const token = crypto
      .createHash("sha256")
      .update(
        `${emailNormalized}-${subscription.stripe_subscription_id}-${process.env.SUPABASE_JWT_SECRET ?? ""}`
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
