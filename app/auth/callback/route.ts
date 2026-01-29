import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"
  const type = searchParams.get("type")
  
  // Log for debugging
  console.log("[v0] Auth callback - code exists:", !!code, "type:", type, "next:", next)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log("[v0] Exchange result - error:", error?.message, "user:", data.session?.user?.email)
    
    if (!error) {
      // If this is a password recovery flow, redirect to reset password page
      // Check both explicit type param and if redirecting to reset-password
      if (type === "recovery" || next === "/auth/reset-password" || next.includes("reset-password")) {
        console.log("[v0] Redirecting to reset-password")
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      console.log("[v0] Redirecting to:", next)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  console.log("[v0] Auth callback failed - redirecting to error")
  return NextResponse.redirect(`${origin}/auth/error?message=Could not authenticate`)
}
