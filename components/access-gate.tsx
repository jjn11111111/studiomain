"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function AccessGate({
  children,
  initialEmail,
}: {
  children: React.ReactNode
  /** From server getUser() so we do not flash "Sign in" before the browser hydrates session. */
  initialEmail?: string | null
}) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialEmail)

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

    // Do not call getUser()/getSession() in parallel with this listener.
    // A slow null getUser() can finish after INITIAL_SESSION and overwrite
    // a valid session with "signed out".
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "TOKEN_REFRESHED") return
        void checkAccess(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  // Not logged in – show sign-in
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
              Please sign in to access the training modules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <a href="/auth/login">Sign In</a>
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

  // Logged in with active subscription – show protected content
  if (hasAccess) {
    return <>{children}</>
  }

  // Logged in but no active subscription – block access, show subscribe CTA
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
