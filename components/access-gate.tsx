"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function AccessGate({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const checkAccess = async (user: { email?: string } | null) => {
      if (!user?.email) {
        setIsLoggedIn(false)
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
        if (data.hasAccess) setHasAccess(true)
      } catch (error) {
        console.error("Failed to check subscription:", error)
      }
      setIsLoading(false)
    }

    const runCheck = async () => {
      // Prefer getSession(): reads from cookie/storage without a network call,
      // so we see the session immediately after magic-link redirect. getUser()
      // can fail or delay right after redirect.
      const { data: { session } } = await supabase.auth.getSession()
      await checkAccess(session?.user ?? null)
    }

    runCheck()

    // When session appears or changes (e.g. after redirect), update state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) checkAccess(session.user)
    })

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

  // Logged in: show modules. Optionally show upgrade banner when no active subscription.
  if (hasAccess) {
    return <>{children}</>
  }

  // Logged in but no subscription – still show modules, with upgrade prompt at top
  return (
    <>
      <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-3 text-center text-sm">
        Subscribe to support the project and unlock all features.{" "}
        <a href="/subscribe" className="underline font-medium hover:text-amber-100">
          Subscribe now
        </a>
      </div>
      {children}
    </>
  )
}
