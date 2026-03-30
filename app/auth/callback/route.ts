import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// Ensure this route is always run dynamically (no static optimization)
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const nextParam = requestUrl.searchParams.get("next")

  const safePath =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/exercises"

  // Same host as this callback so Set-Cookie and the final page share one origin.
  // NEXT_PUBLIC_SITE_URL often points at a different host (e.g. custom domain vs *.vercel.app),
  // which leaves session cookies on the wrong site and /exercises shows "Sign in required".
  const origin = requestUrl.origin
  const failRedirect = NextResponse.redirect(new URL("/?error=auth_failed", origin))

  if (!code) {
    return failRedirect
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
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return failRedirect
  }

  return response
}
