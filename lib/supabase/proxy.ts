import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

/** Plain redirects drop Set-Cookie from the refreshed session on `supabaseResponse`. */
function redirectWithRefreshedCookies(
  supabaseResponse: NextResponse,
  target: URL
): NextResponse {
  const redirectResponse = NextResponse.redirect(target);
  supabaseResponse.cookies.getAll().forEach((c) => {
    redirectResponse.cookies.set(c);
  });
  return redirectResponse;
}

async function userHasActiveSubscription(
  supabase: SupabaseClient,
  email: string | undefined
): Promise<boolean> {
  if (!email) return false;
  // Match /api/check-subscription: lowercase + active or trialing (Stripe trial)
  const normalized = email.trim().toLowerCase();
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("email", normalized)
    .in("status", ["active", "trialing"])
    .maybeSingle();
  if (error || !subscription) return false;
  return new Date(subscription.current_period_end) > new Date();
}

export async function updateSession(request: NextRequest) {
  // Check if there's a code parameter at the root - redirect to auth callback
  const code = request.nextUrl.searchParams.get("code")
  
  // Debug: log every request to see if middleware runs
  console.log("[MIDDLEWARE]", request.nextUrl.pathname, "code:", code)
  
  if (request.nextUrl.pathname === "/" && code) {
    console.log("[MIDDLEWARE] Redirecting to /api/auth/exchange")
    const url = request.nextUrl.clone()
    url.pathname = "/api/auth/exchange"
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

  // Refresh session cookies (Supabase + Next proxy). Do not use this alone for
  // security-sensitive decisions without getClaims/getUser; here we only need
  // side effects on the response cookies.
  await supabase.auth.getClaims().catch(() => null);

  const {
    data: { user: userFromJwt },
  } = await supabase.auth.getUser();

  // Next proxy can run before the JWT round-trip resolves; fall back to the
  // cookie session so signed-in users are not bounced to /auth/login.
  let user = userFromJwt ?? null;
  if (!user) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    user = session?.user ?? null;
  }

  // /exercises: do NOT gate here. Next.js 16 proxy + Supabase edge session reads
  // are flaky for some users (false "logged out" → /auth/login). AccessGate +
  // /api/check-subscription already enforce login + subscription on the page.

  // Redirect logged-in users away from auth pages (except reset-password and callback for recovery)
  const isResetPasswordPage = request.nextUrl.pathname === "/auth/reset-password"
  const isCallbackRoute = request.nextUrl.pathname === "/auth/callback"
  const isConfirmPage = request.nextUrl.pathname === "/auth/confirm"
  
  // Allow callback route and reset-password for all users (auth happens in the route handler)
  if (isCallbackRoute || isResetPasswordPage || isConfirmPage) {
    return supabaseResponse
  }
  
  if (request.nextUrl.pathname.startsWith("/auth") && user) {
    const url = request.nextUrl.clone();
    const hasActiveSubscription = await userHasActiveSubscription(
      supabase,
      user.email
    );
    if (!hasActiveSubscription) {
      url.pathname = "/subscribe";
      url.searchParams.set("message", "subscription_required");
    } else {
      const next = request.nextUrl.searchParams.get("redirect");
      url.pathname =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/exercises";
      url.searchParams.delete("redirect");
    }
    return redirectWithRefreshedCookies(supabaseResponse, url);
  }

  return supabaseResponse;
}
