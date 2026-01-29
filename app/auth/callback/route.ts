import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next")
  const type = searchParams.get("type")
  
  console.log("[v0] Callback - code:", !!code, "type:", type, "next:", next)

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log("[v0] Exchange result - error:", error?.message, "user:", data?.user?.email)
    
    if (!error && data.session) {
      // Check if this is a password recovery flow
      const isRecoveryFlow = type === "recovery" || 
        next === "/auth/reset-password" || 
        (next && next.includes("reset-password"))
      
      if (isRecoveryFlow) {
        console.log("[v0] Redirecting to reset-password (recovery flow)")
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      
      // If no next param specified, this is likely from a password reset email
      // Supabase strips custom query params, so we check if user has no destination
      if (!next) {
        // Check if user recently requested password reset
        const user = data.session.user
        console.log("[v0] No next param, user metadata:", user.user_metadata)
        
        // Default to reset-password for email link clicks without next param
        // This handles password reset emails from Supabase
        console.log("[v0] Redirecting to reset-password (no next param)")
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
