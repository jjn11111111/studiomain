import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const type = searchParams.get("type")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Only send to reset-password if this is explicitly a recovery flow
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/auth/reset-password`)
      }
      // Default: send to exercises (logged-in users landing page)
      return NextResponse.redirect(`${origin}/exercises`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/error?message=Could not authenticate`)
}
