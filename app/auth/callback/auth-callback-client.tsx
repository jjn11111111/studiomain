"use client"

import { createClient } from "@/lib/supabase/client"
import type { EmailOtpType } from "@supabase/supabase-js"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw
  return "/exercises"
}

type AuthResult = { ok: true; next: string } | { ok: false }

/**
 * One promise per exact callback URL so React Strict Mode (or double effects)
 * does not call verifyOtp twice and burn a one-time token.
 */
const inflightByUrl = new Map<string, Promise<AuthResult>>()

async function completeAuthFromUrl(href: string): Promise<AuthResult> {
  const url = new URL(href)
  const params = new URLSearchParams(url.search)
  const next = safeNext(params.get("next"))
  const tokenHash = url.searchParams.get("token_hash")
  const typeParam = url.searchParams.get("type") as EmailOtpType | null

  const supabase = createClient()

  if (tokenHash) {
    const tryTypes: EmailOtpType[] = typeParam
      ? [typeParam]
      : ["magiclink", "email", "signup"]
    let lastError: { message: string } | null = null
    for (const t of tryTypes) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: t,
      })
      if (!error) {
        return { ok: true, next }
      }
      lastError = error
    }
    if (lastError && process.env.NODE_ENV === "development") {
      console.warn("[auth/callback] verifyOtp failed:", lastError.message)
    }
    return { ok: false }
  }

  const pollSession = async (maxMs: number) => {
    const deadline = Date.now() + maxMs
    while (Date.now() < deadline) {
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
    return { ok: true, next }
  }

  const code = url.searchParams.get("code")
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return { ok: true, next }
    }
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth/callback] exchangeCodeForSession failed:", error.message)
    }
  }

  return { ok: false }
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
      const href = window.location.href
      let work = inflightByUrl.get(href)
      if (!work) {
        work = completeAuthFromUrl(href).finally(() => {
          inflightByUrl.delete(href)
        })
        inflightByUrl.set(href, work)
      }

      const result = await work

      if (cancelled) return

      if (result.ok) {
        finish(result.next)
        return
      }

      finish("/auth/login?error=auth_failed")
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
