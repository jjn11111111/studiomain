"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

/**
 * Subscription check only. Login is enforced in app/exercises/layout.tsx (server getUser + redirect)
 * so we do not depend on flaky client session timing.
 */
export function AccessGate({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail: string
}) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const runCheck = async () => {
      try {
        const response = await fetch("/api/check-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        })
        const data = await response.json()
        if (!cancelled) setHasAccess(!!data.hasAccess)
      } catch (error) {
        console.error("Failed to check subscription:", error)
        if (!cancelled) setHasAccess(false)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void runCheck()

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        window.location.href = "/auth/login?redirect=/exercises"
      }
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [userEmail])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="text-purple-400 text-xl">Loading...</div>
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
