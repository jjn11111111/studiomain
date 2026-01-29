"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AuthCodeHandler() {
  const router = useRouter()
  const hasCheckedRecovery = useRef(false)

  useEffect(() => {
    const supabase = createClient()
    
    // Check for pending password recovery (stored when user requests reset)
    const pendingRecovery = localStorage.getItem('pending_password_recovery')
    const pendingRecoveryTime = pendingRecovery ? parseInt(pendingRecovery, 10) : 0
    const isRecentRecoveryRequest = Date.now() - pendingRecoveryTime < 60 * 60 * 1000 // Within 1 hour
    
    console.log("[v0] AuthCodeHandler init - pendingRecovery:", !!pendingRecovery, "isRecent:", isRecentRecoveryRequest)
    
    // Listen for auth state changes - Supabase auto-processes the code
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] AuthCodeHandler - auth event:", event, "user:", session?.user?.email)
      
      // PASSWORD_RECOVERY event means user clicked password reset link
      if (event === "PASSWORD_RECOVERY") {
        console.log("[v0] PASSWORD_RECOVERY detected, redirecting to reset-password")
        localStorage.removeItem('pending_password_recovery')
        router.replace("/auth/reset-password")
        return
      }
      
      // SIGNED_IN event with a recent recovery request - likely from password reset email
      if (event === "SIGNED_IN" && session && isRecentRecoveryRequest && !hasCheckedRecovery.current) {
        hasCheckedRecovery.current = true
        console.log("[v0] SIGNED_IN with recent recovery request, redirecting to reset-password")
        localStorage.removeItem('pending_password_recovery')
        router.replace("/auth/reset-password")
        return
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return null
}
