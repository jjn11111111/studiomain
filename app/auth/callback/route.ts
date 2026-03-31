import { createServerClient } from "@supabase/ssr"
import type { EmailOtpType } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const tokenHash = requestUrl.searchParams.get("token_hash")
  const typeParam = requestUrl.searchParams.get("type")
  const nextParam = requestUrl.searchParams.get("next")
  const callbackDebug = requestUrl.searchParams.get("callbackdebug") === "1"

  const safePath =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/exercises"

  const origin = requestUrl.origin
  const failRedirect = NextResponse.redirect(new URL("/?error=auth_failed", origin))

  if (!code && !tokenHash) {
    return failRedirect
  }

  const cookieStore = await cookies()
  const redirectTarget = new URL(safePath, origin)
  const response = NextResponse.redirect(redirectTarget)
  const attemptedCookieNames: string[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            attemptedCookieNames.push(name)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  let error: Error | null = null
  let flow: "code" | "token_hash" | "unknown" = "unknown"
  if (code) {
    flow = "code"
    const exchange = await supabase.auth.exchangeCodeForSession(code)
    error = exchange.error
  } else if (tokenHash) {
    flow = "token_hash"
    const otpType = (typeParam ?? "email") as EmailOtpType
    const verify = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: otpType,
    })
    error = verify.error
  }

  if (error) {
    if (callbackDebug) {
      return NextResponse.json({
        ok: false,
        flow,
        error: error.message,
        attemptedCookieNames,
        redirectTarget: redirectTarget.toString(),
      })
    }
    return failRedirect
  }

  if (callbackDebug) {
    return NextResponse.json({
      ok: true,
      flow,
      attemptedCookieNames,
      redirectTarget: redirectTarget.toString(),
    })
  }

  return response
}
