import { createServerClient, parseCookieHeader } from "@supabase/ssr"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const nextParam = requestUrl.searchParams.get("next")

  const safePath =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/exercises"

  const origin = requestUrl.origin
  const failRedirect = NextResponse.redirect(new URL("/?error=auth_failed", origin))

  if (!code) {
    return failRedirect
  }

  const redirectTarget = new URL(safePath, origin)
  const response = NextResponse.redirect(redirectTarget)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("cookie") ?? "")
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return failRedirect
  }

  return response
}
