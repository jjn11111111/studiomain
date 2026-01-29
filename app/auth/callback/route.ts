import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"
  const type = searchParams.get("type")
  const tokenHash = searchParams.get("token_hash")
  const supabaseType = searchParams.get("type") // Supabase passes type for recovery
  
  console.log("[v0] Callback - code:", !!code, "type:", type, "tokenHash:", !!tokenHash, "supabaseType:", supabaseType, "next:", next)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log("[v0] Exchange result - error:", error?.message, "user:", data?.user?.email)
    
    if (!error) {
      // If this is a password recovery flow, redirect to reset password page
      if (type === "recovery" || supabaseType === "recovery" || next === "/auth/reset-password" || next.includes("reset-password")) {
        console.log("[v0] Redirecting to reset-password")
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      console.log("[v0] Redirecting to:", next)
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    console.log("[v0] Exchange failed:", error?.message)
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error?message=Could not authenticate`)
}
