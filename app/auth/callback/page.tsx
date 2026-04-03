"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw
  return "/exercises"
}

/**
 * Query auth (?code= / ?token_hash=) is completed on /api/auth/callback (server).
 * Hash-only / implicit callbacks stay on this page.
 */
function AuthCallbackInner() {
  const router = useRouter()
  const redirected = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const url = new URL(window.location.href)
    const hasQueryAuth =
      url.searchParams.has("code") || url.searchParams.has("token_hash")

    if (hasQueryAuth) {
      if (redirected.current) return
      redirected.current = true
      window.location.replace(`/api/auth/callback${url.search}`)
      return
    }

    let cancelled = false
    const finish = (path: string) => {
      if (!cancelled) router.replace(path)
    }

    const run = async () => {
      const supabase = createClient()
      const next = safeNext(url.searchParams.get("next"))

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

      if (await pollSession(6000)) {
        if (!cancelled) finish(next)
        return
      }

      if (!cancelled) finish("/auth/login?error=auth_failed")
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white/60 text-sm px-4 text-center">
      Signing you in…
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white/60 text-sm">
          Signing you in…
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  )
}
