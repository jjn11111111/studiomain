"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, Loader2 } from "lucide-react"

export default function AuthConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient()
      
      // Get the hash fragment from the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")
      const type = hashParams.get("type")
      
      // Also check for code in search params (PKCE flow)
      const code = searchParams.get("code")
      const next = searchParams.get("next") || "/"
      const typeFromParams = searchParams.get("type")

      // Handle hash-based recovery (older Supabase flow)
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          setError(error.message)
          return
        }

        // Redirect based on the type
        if (type === "recovery") {
          router.push("/auth/reset-password")
        } else {
          router.push(next)
        }
        return
      }

      // Handle code-based PKCE flow
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          setError(error.message)
          return
        }

        // Redirect based on the type
        if (typeFromParams === "recovery" || next === "/auth/reset-password") {
          router.push("/auth/reset-password")
        } else {
          router.push(next)
        }
        return
      }

      // No valid auth params found
      setError("Invalid or expired link. Please request a new one.")
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
