"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AuthCodeHandler() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Listen for auth state changes - Supabase auto-processes the code
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[v0] AuthCodeHandler - auth event:", event, "user:", session?.user?.email)
      
      // PASSWORD_RECOVERY event means user clicked password reset link
      if (event === "PASSWORD_RECOVERY") {
        console.log("[v0] PASSWORD_RECOVERY detected, redirecting to reset-password")
        router.replace("/auth/reset-password")
        return
      }
      
      // SIGNED_IN can also happen from recovery flow
      // Check if we're on the homepage with no intended destination
      if (event === "SIGNED_IN" && session && window.location.pathname === "/") {
        // Check if user metadata indicates recovery
        console.log("[v0] SIGNED_IN on homepage, checking if recovery flow")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
}
