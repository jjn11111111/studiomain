"use client"

import { useEffect, useState, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, Loader2 } from "lucide-react"

function AuthConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()
      
      // Get the full URL for debugging
      const fullUrl = window.location.href
      console.log("[v0] Full URL:", fullUrl)
      
      // Get the hash fragment from the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")
      const type = hashParams.get("type")
      
      console.log("[v0] Hash params - type:", type, "accessToken exists:", !!accessToken)
      
      // Also check for code in search params (PKCE flow)
      const code = searchParams.get("code")
      const next = searchParams.get("next") || "/"
      const typeFromParams = searchParams.get("type")
      
      console.log("[v0] Search params - code exists:", !!code, "type:", typeFromParams)

      // Handle hash-based recovery (older Supabase flow)
      if (accessToken && refreshToken) {
        console.log("[v0] Using hash-based flow")
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          console.log("[v0] Hash flow error:", error.message)
          setError(error.message)
          return
        }

        // Redirect based on the type
        if (type === "recovery") {
          console.log("[v0] Redirecting to reset-password (hash recovery)")
          router.push("/auth/reset-password")
        } else {
          router.push(next)
        }
        return
      }

      // Handle code-based PKCE flow
      if (code) {
        console.log("[v0] Using PKCE flow with code")
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.log("[v0] PKCE error:", error.message)
          setError(error.message)
          return
        }

        console.log("[v0] PKCE success, session user:", data.session?.user?.email)
        
        // Check if this was a recovery flow by checking the session
        // Supabase sets aal1 for recovery sessions
        const isRecovery = typeFromParams === "recovery" || 
                          next === "/auth/reset-password" ||
                          data.session?.user?.aud === "authenticated"
        
        // For password recovery, always redirect to reset page
        if (typeFromParams === "recovery") {
          console.log("[v0] Redirecting to reset-password (PKCE recovery)")
          router.push("/auth/reset-password")
        } else {
          console.log("[v0] Redirecting to:", next)
          router.push(next)
        }
        return
      }

      // Listen for auth state changes as fallback
      // This handles cases where Supabase auto-processes the URL
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("[v0] Auth state change:", event)
        if (event === "PASSWORD_RECOVERY") {
          console.log("[v0] PASSWORD_RECOVERY event detected")
          router.push("/auth/reset-password")
        } else if (event === "SIGNED_IN" && session) {
          // Check if type param indicates recovery
          if (typeFromParams === "recovery") {
            router.push("/auth/reset-password")
          }
        }
      })

      // Cleanup subscription after a timeout if no auth params found
      setTimeout(() => {
        subscription.unsubscribe()
        if (!accessToken && !refreshToken && !code) {
          setError("Invalid or expired link. Please request a new one.")
        }
      }, 5000)
    }

    handleAuthCallback()
  }, [router, searchParams])

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <Eye className="h-10 w-10 text-purple-400" />
            <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded-full" />
          </div>
          <span className="font-sans text-2xl font-semibold tracking-wide text-white">
            Pineal Vision
          </span>
        </div>
        <div className="bg-white/5 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm max-w-md w-full text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <a 
            href="/auth/forgot-password" 
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
          >
            Request a new reset link
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Eye className="h-10 w-10 text-purple-400" />
          <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded-full" />
        </div>
        <span className="font-sans text-2xl font-semibold tracking-wide text-white">
          Pineal Vision
        </span>
      </div>
      <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm max-w-md w-full text-center">
        <Loader2 className="h-8 w-8 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-white/60">Verifying your request...</p>
      </div>
    </div>
  )
}

export default function AuthConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
      </div>
    }>
      <AuthConfirmContent />
    </Suspense>
  )
}
