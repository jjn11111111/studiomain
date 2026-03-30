"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

/**
 * Login + subscription for /exercises. Do not redirect unauthenticated users
 * from the server layout: on Vercel, RSC often cannot see the same Supabase
 * cookies the browser client has, which falsely sent people to /auth/login.
 *
 * `INITIAL_SESSION` can fire with null before cookie storage finishes—we debounce
 * “signed out” and re-read with getSession() so logged-in users are not bounced.
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialEmail)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const supabase = createClient()

    const checkAccess = async (user: { email?: string } | null) => {
      if (!user?.email) {
        setIsLoggedIn(false)
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      setIsLoggedIn(true)

      try {
        const response = await fetch("/api/check-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        })
        const data = await response.json()
        setHasAccess(!!data.hasAccess)
      } catch (error) {
        console.error("Failed to check subscription:", error)
        setHasAccess(false)
      }
      setIsLoading(false)
    }

    const clearDebounce = () => {
      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current)
        debounceRef.current = undefined
      }
    }

    /** Null session from listener may be too early; confirm with getSession. */
    const scheduleConfirmSignedOut = () => {
      clearDebounce()
      debounceRef.current = setTimeout(() => {
        debounceRef.current = undefined
        void supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            void checkAccess(session.user)
          } else if (initialEmail) {
            // RSC sometimes sees cookies before the browser client does; still verify subscription.
            void checkAccess({ email: initialEmail })
          } else {
            void checkAccess(null)
          }
        })
      }, 450)
    }

    if (initialEmail) {
      void checkAccess({ email: initialEmail })
    }

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

        scheduleConfirmSignedOut()
      }
    )

    return () => {
      clearDebounce()
      subscription.unsubscribe()
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
