import { createServerClient } from "@supabase/ssr"
import type { EmailOtpType } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Server-side OAuth / magic-link exchange. Lives under /api so routing is
 * unambiguous (avoids /auth/* edge cases) and Set-Cookie applies on redirect.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const tokenHash = requestUrl.searchParams.get("token_hash")
  const typeParam = requestUrl.searchParams.get("type")
  const nextParam = requestUrl.searchParams.get("next")

  const safePath =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/exercises"

  const origin = requestUrl.origin

  function loginFail(reason: "no_params" | "exchange" | "verify") {
    const u = new URL("/auth/login", origin)
    u.searchParams.set("error", "auth_failed")
    u.searchParams.set("reason", reason)
    return NextResponse.redirect(u)
  }

  if (!code && !tokenHash) {
    console.error("[auth/callback] no_params: missing code and token_hash")
    return loginFail("no_params")
  }

  const cookieStore = await cookies()
  const redirectTarget = new URL(safePath, origin)
  const response = NextResponse.redirect(redirectTarget)

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
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  let lastError: { message: string } | null = null

  if (tokenHash) {
    // Password reset emails use type=recovery; templates sometimes omit `type` in the URL.
    const tryTypes: EmailOtpType[] = typeParam
      ? [typeParam as EmailOtpType]
      : ["recovery", "magiclink", "email", "signup"]
    for (const t of tryTypes) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: t,
      })
      if (!error) {
        lastError = null
        break
      }
      lastError = error
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    lastError = error
  }

  if (lastError) {
    const reason = tokenHash ? "verify" : "exchange"
    console.error("[auth/callback]", reason, lastError.message)
    return loginFail(reason)
  }

  return response
}
