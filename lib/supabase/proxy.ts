import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // If there's a code parameter at the root, redirect to auth callback
  const code = request.nextUrl.searchParams.get("code")
  
  if (request.nextUrl.pathname === "/" && code) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/callback"
    // Preserve all search params (code, type, next, etc.)
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

  // This refreshes the session - IMPORTANT: do not remove
  await supabase.auth.getUser();

  // Allow all auth-related routes without any redirects
  if (
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return supabaseResponse
  }

  return supabaseResponse;
}
