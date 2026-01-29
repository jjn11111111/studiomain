"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function AuthCodeHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for code in URL query params
    const code = searchParams.get("code")
    
    // Check for tokens in hash fragment (Supabase implicit flow)
    const hash = window.location.hash
    const hashParams = new URLSearchParams(hash.substring(1))
    const accessToken = hashParams.get("access_token")
    const type = hashParams.get("type")
    
    console.log("[v0] AuthCodeHandler - code:", !!code, "accessToken:", !!accessToken, "type:", type, "hash:", hash)

    if (code) {
      // Redirect to callback with the code
      console.log("[v0] Redirecting to /auth/callback with code")
      router.replace(`/auth/callback?code=${code}`)
      return
    }

    if (accessToken || type === "recovery") {
      // Redirect to confirm page to handle the hash tokens
      console.log("[v0] Redirecting to /auth/confirm with hash")
      router.replace(`/auth/confirm${hash}`)
      return
    }
  }, [searchParams, router])

  return null
}
