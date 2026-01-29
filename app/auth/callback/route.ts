import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next")
  const type = searchParams.get("type")

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.session) {
      // Check if this is a password recovery flow
      const isRecoveryFlow = type === "recovery" || 
        next === "/auth/reset-password" || 
        (next && next.includes("reset-password"))
      
      if (isRecoveryFlow) {
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      
      // If no next param specified, default to reset-password for email links
      if (!next) {
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error?message=Could not authenticate`)
}
