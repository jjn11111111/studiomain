"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
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

/**
 * Login + subscription for /exercises. Uses GET /api/auth/session (server cookies)
 * before trusting the browser Supabase client, which often lags on Vercel.
 */
export function AccessGate({
  children,
  initialEmail,
}: {
  children: React.ReactNode
  initialEmail?: string | null
}) {
  const pathname = usePathname()
  const loginHref = `/auth/login?redirect=${encodeURIComponent(pathname || "/exercises")}`

  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const cancelledRef = useRef(false)
  const authSubRef = useRef<{ unsubscribe: () => void } | null>(null)
  /** Email we already accepted (server session or hint); ignore stray INITIAL_SESSION null. */
  const establishedEmailRef = useRef<string | null>(null)

  useEffect(() => {
    cancelledRef.current = false
    authSubRef.current = null
    establishedEmailRef.current = null
    const supabase = createClient()

    const checkAccess = async (user: { email?: string } | null) => {
      if (cancelledRef.current) return
      if (!user?.email) {
        establishedEmailRef.current = null
        setIsLoggedIn(false)
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      establishedEmailRef.current = user.email
      setIsLoggedIn(true)

      try {
        const response = await fetch("/api/check-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        })
        const data = await response.json()
        if (!cancelledRef.current) setHasAccess(!!data.hasAccess)
      } catch (error) {
        console.error("Failed to check subscription:", error)
        if (!cancelledRef.current) setHasAccess(false)
      }
      if (!cancelledRef.current) setIsLoading(false)
    }

    const clearDebounce = () => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current)
        debounceRef.current = undefined
      }
    }

    const scheduleConfirmSignedOut = () => {
      clearDebounce()
      debounceRef.current = setTimeout(() => {
        debounceRef.current = undefined
        void (async () => {
          if (cancelledRef.current) return
          const {
            data: { session },
          } = await supabase.auth.getSession()
          if (session?.user?.email) {
            await checkAccess(session.user)
            return
          }
          const serverAgain = await fetchServerSessionEmail()
          if (serverAgain) {
            await checkAccess({ email: serverAgain })
            return
          }
          if (initialEmail) {
            await checkAccess({ email: initialEmail })
            return
          }
          if (establishedEmailRef.current) {
            const retry = await fetchServerSessionEmail()
            if (retry) {
              await checkAccess({ email: retry })
              return
            }
          }
          await checkAccess(null)
        })()
      }, 450)
    }

    void (async () => {
      const serverEmail = await fetchServerSessionEmail()
      const hint = serverEmail ?? initialEmail ?? null

      if (cancelledRef.current) return

      if (hint) {
        await checkAccess({ email: hint })
      }

      if (cancelledRef.current) return

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "TOKEN_REFRESHED") return

          if (event === "SIGNED_OUT") {
            clearDebounce()
            void checkAccess(null)
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

      authSubRef.current = subscription

      if (!hint) {
        scheduleConfirmSignedOut()
      }
    })()

    return () => {
      cancelledRef.current = true
      clearDebounce()
      authSubRef.current?.unsubscribe()
      authSubRef.current = null
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
