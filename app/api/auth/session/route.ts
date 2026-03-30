import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Read Supabase session using server cookies (same as RSC, but this runs after
 * the browser’s follow-up request so refreshed Set-Cookie headers are often
 * visible here when createBrowserClient still shows null on first paint).
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    let email = authUser?.email ?? null

    if (!email) {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      email = session?.user?.email ?? null
    }

    if (!email) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: { email },
    })
  } catch (e) {
    console.error("[auth/session]", e)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
