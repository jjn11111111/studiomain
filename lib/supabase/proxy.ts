import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Check if there's a code parameter at the root - redirect to auth callback
  // This handles Supabase email links that go to /?code=... instead of /auth/callback?code=...
  const code = request.nextUrl.searchParams.get("code")
  const fullUrl = request.url
  const searchParamsString = request.nextUrl.search
  console.log("[v0] updateSession - path:", request.nextUrl.pathname, "fullUrl:", fullUrl, "search:", searchParamsString, "code:", code)
  
  if (request.nextUrl.pathname === "/" && code) {
    console.log("[v0] Redirecting /?code to /auth/callback")
    const url = request.nextUrl.clone()
    url.pathname = "/auth/callback"
    // Preserve all query params including code and type
    return NextResponse.redirect(url)
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect exercise routes - require authentication
  const protectedPaths = ["/exercises"]
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Check for active subscription on protected paths
  if (isProtectedPath && user) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("email", user.email)
      .single()

    const hasActiveSubscription = subscription && 
      subscription.status === "active" && 
      new Date(subscription.current_period_end) > new Date()

    if (!hasActiveSubscription) {
      const url = request.nextUrl.clone()
      url.pathname = "/subscribe"
      url.searchParams.set("message", "subscription_required")
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from auth pages (except reset-password and callback for recovery)
  const isResetPasswordPage = request.nextUrl.pathname === "/auth/reset-password"
  const isCallbackRoute = request.nextUrl.pathname === "/auth/callback"
  const isConfirmPage = request.nextUrl.pathname === "/auth/confirm"
  
  console.log("[v0] Middleware - path:", request.nextUrl.pathname, "user:", !!user, "isResetPasswordPage:", isResetPasswordPage, "isCallbackRoute:", isCallbackRoute)
  
  // Allow callback route and reset-password for all users (auth happens in the route handler)
  if (isCallbackRoute || isResetPasswordPage || isConfirmPage) {
    return supabaseResponse
  }
  
  if (request.nextUrl.pathname.startsWith("/auth") && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/exercises"
    return NextResponse.redirect(url)
  }

  return supabaseResponse;
}
