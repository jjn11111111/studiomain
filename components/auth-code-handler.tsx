"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AuthCodeHandler() {
  const router = useRouter()
  const hasCheckedRecovery = useRef(false)

  useEffect(() => {
    const supabase = createClient()
    
    // Check if URL had a code param (might already be processed)
    const urlHadCode = window.location.href.includes('code=') || 
                       sessionStorage.getItem('pending_password_recovery') === 'true'
    
    console.log("[v0] AuthCodeHandler init - urlHadCode:", urlHadCode)
    
    // Listen for auth state changes - Supabase auto-processes the code
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] AuthCodeHandler - auth event:", event, "user:", session?.user?.email)
      
      // PASSWORD_RECOVERY event means user clicked password reset link
      if (event === "PASSWORD_RECOVERY") {
        console.log("[v0] PASSWORD_RECOVERY detected, redirecting to reset-password")
        sessionStorage.removeItem('pending_password_recovery')
        router.replace("/auth/reset-password")
        return
      }
      
      // For SIGNED_IN or TOKEN_REFRESHED with a session on homepage
      // Check if this might be a recovery flow that didn't fire PASSWORD_RECOVERY
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") && 
          session && 
          window.location.pathname === "/" && 
          !hasCheckedRecovery.current) {
        
        hasCheckedRecovery.current = true
        
        // Check if user's session indicates recovery (aal1 level or recent recovery request)
        const { data: { user } } = await supabase.auth.getUser()
        console.log("[v0] Checking user for recovery:", user?.email, "aal:", session.user?.aal)
        
        // If user exists and we suspect this was from an email link, redirect to reset
        if (user && urlHadCode) {
          console.log("[v0] User authenticated from URL code, redirecting to reset-password")
          router.replace("/auth/reset-password")
          return
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
}
