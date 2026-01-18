import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if the token exists in subscriptions and is active
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("stripe_subscription_id", token)
      .eq("status", "active")
      .single()

    if (error || !subscription) {
      return NextResponse.json({ valid: false })
    }

    // Check if subscription hasn't expired
    const currentPeriodEnd = new Date(subscription.current_period_end)
    if (currentPeriodEnd < new Date()) {
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error("Error validating token:", error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
