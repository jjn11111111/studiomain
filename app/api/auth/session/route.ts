import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies, headers } from "next/headers"

export const dynamic = "force-dynamic"

/**
 * Read Supabase session using server cookies (same as RSC, but this runs after
 * the browser’s follow-up request so refreshed Set-Cookie headers are often
 * visible here when createBrowserClient still shows null on first paint).
 */
export async function GET(request: Request) {
  try {
    const headerStore = await headers()
    const cookieStore = await cookies()
    const url = new URL(request.url)
    const debugEnabled =
      headerStore.get("x-auth-debug") === "1" || url.searchParams.get("authdebug") === "1"
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
      if (debugEnabled) {
        const cookieNames = cookieStore.getAll().map((c) => c.name)
        return NextResponse.json({
          user: null,
          debug: {
            host: headerStore.get("host"),
            xForwardedHost: headerStore.get("x-forwarded-host"),
            cookieCount: cookieNames.length,
            supabaseCookieCount: cookieNames.filter((n) => n.includes("sb-")).length,
            hasAccessTokenCookie: cookieNames.some((n) => n.endsWith("auth-token")),
          },
        })
      }
      return NextResponse.json({ user: null })
    }

    if (debugEnabled) {
      return NextResponse.json({
        user: { email },
        debug: {
          host: headerStore.get("host"),
          xForwardedHost: headerStore.get("x-forwarded-host"),
          cookieCount: cookieStore.getAll().length,
        },
      })
    }

    return NextResponse.json({ user: { email } })
  } catch (e) {
    console.error("[auth/session]", e)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
