"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

async function fetchServerSessionEmail(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/session", {
      credentials: "same-origin",
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = (await res.json()) as { user: { email?: string } | null }
    return data.user?.email ?? null
  } catch {
    return null
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchServerSessionEmailWithRetries(
  isCancelled: () => boolean,
  attempts = 4,
  delayMs = 120
): Promise<string | null> {
  for (let i = 0; i < attempts; i++) {
    if (isCancelled()) return null
    const email = await fetchServerSessionEmail()
    if (email) return email
    if (i < attempts - 1) await sleep(delayMs)
  }
  return null
}

/**
 * Login + subscription for /exercises. Uses server session API + client listener.
 * Uses a per-effect `cancelled` closure (not a shared ref reset on mount) so
 * React Strict Mode / fast navigations cannot resurrect a stale async chain.
 */
export function AccessGate({
  children,
  initialEmail,
}: {
  children: React.ReactNode
  initialEmail?: string | null
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const authDebug = searchParams?.get("authdebug") === "1"
  const redirectTarget = `${pathname || "/exercises"}${authDebug ? "?authdebug=1" : ""}`
  const loginHref = `/auth/login?redirect=${encodeURIComponent(redirectTarget)}`

  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [debugReason, setDebugReason] = useState("initializing")
  const [debugServerSnapshot, setDebugServerSnapshot] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  /** Email we already accepted; ignore stray INITIAL_SESSION null from the client. */
  const establishedEmailRef = useRef<string | null>(null)
  const lastConfirmedAuthRef = useRef(0)
  const signedOutConfirmCountRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    const isCancelled = () => cancelled

    establishedEmailRef.current = null
    const supabase = createClient()

    const clearDebounce = () => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current)
        debounceRef.current = undefined
      }
    }

    const checkAccess = async (user: { email?: string } | null) => {
      if (cancelled) return
      if (!user?.email) {
        if (authDebug) setDebugReason("checkAccess(null)")
        establishedEmailRef.current = null
        setIsLoggedIn(false)
        setHasAccess(false)
        try {
          window.localStorage.removeItem("pv:last-auth-email")
        } catch {}
        setIsLoading(false)
        return
      }

      establishedEmailRef.current = user.email
      lastConfirmedAuthRef.current = Date.now()
      signedOutConfirmCountRef.current = 0
      if (authDebug) setDebugReason(`checkAccess(${user.email})`)
      try {
        window.localStorage.setItem("pv:last-auth-email", user.email)
      } catch {}
      setIsLoggedIn(true)

      try {
        const response = await fetch("/api/check-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        })
        const data = await response.json()
        if (!cancelled) setHasAccess(!!data.hasAccess)
      } catch (error) {
        console.error("Failed to check subscription:", error)
        if (!cancelled) setHasAccess(false)
      }
      if (!cancelled) setIsLoading(false)
    }

    const scheduleConfirmSignedOut = () => {
      if (authDebug) setDebugReason("scheduleConfirmSignedOut")
      clearDebounce()
      debounceRef.current = setTimeout(() => {
        debounceRef.current = undefined
        void (async () => {
          if (cancelled) return
          const {
            data: { session },
          } = await supabase.auth.getSession()
          if (session?.user?.email) {
            if (authDebug) setDebugReason("supabase.getSession user present")
            await checkAccess(session.user)
            return
          }
          if (authDebug) setDebugReason("supabase.getSession null")
          const serverAgain = await fetchServerSessionEmailWithRetries(isCancelled, 3, 150)
          if (serverAgain) {
            if (authDebug) setDebugReason("server session recovered")
            await checkAccess({ email: serverAgain })
            return
          }
          if (initialEmail) {
            if (authDebug) setDebugReason("using initialEmail fallback")
            await checkAccess({ email: initialEmail })
            return
          }
          try {
            const remembered = window.localStorage.getItem("pv:last-auth-email")
            if (remembered) {
              if (authDebug) setDebugReason("using localStorage fallback")
              await checkAccess({ email: remembered })
              return
            }
          } catch {}
          if (establishedEmailRef.current) {
            const retry = await fetchServerSessionEmailWithRetries(isCancelled, 3, 150)
            if (retry) {
              if (authDebug) setDebugReason("establishedEmail retry recovered")
              await checkAccess({ email: retry })
              return
            }
          }
          // Resist brief auth flicker right after a confirmed login/session.
          if (
            establishedEmailRef.current &&
            Date.now() - lastConfirmedAuthRef.current < 15000
          ) {
            const finalRetry = await fetchServerSessionEmailWithRetries(isCancelled, 4, 200)
            if (finalRetry) {
              if (authDebug) setDebugReason("grace window retry recovered")
              await checkAccess({ email: finalRetry })
              return
            }
          }

          signedOutConfirmCountRef.current += 1
          if (signedOutConfirmCountRef.current < 2) {
            if (authDebug) setDebugReason("waiting for second signed-out confirmation")
            scheduleConfirmSignedOut()
            return
          }

          if (authDebug) setDebugReason("confirmed signed-out after retries")
          await checkAccess(null)
        })()
      }, 450)
    }

    let authSubscription: { unsubscribe: () => void } | undefined

    void (async () => {
      if (authDebug) setDebugReason("initial fetchServerSessionEmailWithRetries")
      const serverEmail = await fetchServerSessionEmailWithRetries(isCancelled, 4, 120)
      if (cancelled) return

      const hint = serverEmail ?? initialEmail ?? null
      if (authDebug) {
        try {
          const r = await fetch("/api/auth/session", {
            credentials: "same-origin",
            cache: "no-store",
            headers: { "x-auth-debug": "1" },
          })
          const text = await r.text()
          setDebugServerSnapshot(text)
        } catch {
          setDebugServerSnapshot("failed to load /api/auth/session debug")
        }
      }

      if (hint) {
        await checkAccess({ email: hint })
      }

      if (cancelled) return

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (authDebug) setDebugReason(`onAuthStateChange:${event}`)
          if (event === "TOKEN_REFRESHED") return

          if (event === "SIGNED_OUT") {
            // Treat sign-out as tentative until server cookies agree.
            scheduleConfirmSignedOut()
            return
          }

          if (session?.user) {
            clearDebounce()
            void checkAccess(session.user)
            return
          }

          if (event === "INITIAL_SESSION" && establishedEmailRef.current) {
            return
          }

          scheduleConfirmSignedOut()
        }
      )

      authSubscription = subscription

      if (cancelled) {
        subscription.unsubscribe()
        return
      }

      if (!hint) {
        scheduleConfirmSignedOut()
      }
    })()

    return () => {
      cancelled = true
      clearDebounce()
      authSubscription?.unsubscribe()
    }
  }, [initialEmail])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-900/20 to-black">
        <Card className="max-w-md w-full bg-black/40 border-purple-500/30 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
            <CardTitle className="text-2xl text-white">Sign In Required</CardTitle>
            <CardDescription className="text-purple-200">
              Please sign in to access the training modules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {authDebug && (
              <div className="rounded border border-amber-500/50 bg-amber-500/10 p-2 text-left text-[11px] text-amber-200">
                <div>debugReason: {debugReason}</div>
                {debugServerSnapshot && <div className="break-words">server: {debugServerSnapshot}</div>}
              </div>
            )}
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <a href={loginHref}>Sign In</a>
            </Button>
            <div className="pt-4 border-t border-purple-500/30 text-center">
              <p className="text-xs text-purple-300">{"Don't have a subscription? "}</p>
              <Button asChild variant="link" className="text-purple-400">
                <a href="/subscribe">Subscribe Now</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-900/20 to-black">
      <Card className="max-w-md w-full bg-black/40 border-purple-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <CardTitle className="text-2xl text-white">Subscription Required</CardTitle>
          <CardDescription className="text-purple-200">
            Exercises and training modules are only available with an active subscription. Subscribe to unlock full access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <a href="/subscribe">Subscribe Now</a>
          </Button>
          <Button asChild variant="outline" className="w-full border-purple-500/50 text-purple-200 hover:bg-purple-500/10">
            <a href="/">Back to Home</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
