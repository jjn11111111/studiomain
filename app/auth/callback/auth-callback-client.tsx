"use client"

import { createClient } from "@/lib/supabase/client"
import type { EmailOtpType } from "@supabase/supabase-js"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw
  return "/exercises"
}

export function AuthCallbackClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    let cancelled = false

    const finish = (path: string) => {
      if (!cancelled) router.replace(path)
    }

    const run = async () => {
      const supabase = createClient()
      const next = safeNext(searchParams.get("next"))

      const url = new URL(window.location.href)
      const tokenHash = url.searchParams.get("token_hash")
      const typeParam = url.searchParams.get("type") as EmailOtpType | null

      if (tokenHash) {
        const tryTypes: EmailOtpType[] = typeParam
          ? [typeParam]
          : ["magiclink", "email"]
        let lastError: Error | null = null
        for (const t of tryTypes) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: t,
          })
          if (!error) {
            lastError = null
            break
          }
          lastError = error
        }
        if (cancelled) return
        if (lastError) {
          finish("/auth/login?error=auth_failed")
          return
        }
        finish(next)
        return
      }

      const pollSession = async (maxMs: number) => {
        const deadline = Date.now() + maxMs
        while (Date.now() < deadline && !cancelled) {
          const {
            data: { session },
          } = await supabase.auth.getSession()
          if (session) return true
          await new Promise((r) => setTimeout(r, 80))
        }
        return false
      }

      // Implicit (hash) or PKCE with code_verifier: handled during client init
      if (await pollSession(5000)) {
        if (!cancelled) finish(next)
        return
      }

      const code = url.searchParams.get("code")
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!cancelled && !error) {
          finish(next)
          return
        }
      }

      if (!cancelled) finish("/auth/login?error=auth_failed")
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white/60 text-sm px-4 text-center">
      Signing you in…
    </div>
  )
}
