"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export function AccessGate({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const validateAccess = async () => {
      const token = localStorage.getItem("pineal_access_token")

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (data.valid) {
          setHasAccess(true)
        } else {
          // Invalid token, remove it
          localStorage.removeItem("pineal_access_token")
          localStorage.removeItem("pineal_access_email")
        }
      } catch (error) {
        console.error("[v0] Failed to validate access token:", error)
      }

      setIsLoading(false)
    }

    validateAccess()
  }, [])

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
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-white">Access Required</CardTitle>
          <CardDescription className="text-purple-200">
            Subscribe to unlock all Pineal Vision training modules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-purple-200 text-center">Subscribe for just $11.11/month</p>
            <p className="text-xs text-purple-300 text-center">
              After payment, you'll receive an instant access link via email
            </p>
          </div>

          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <a href="/subscribe">Subscribe Now</a>
          </Button>

          <div className="pt-4 border-t border-purple-500/30 text-center">
            <p className="text-xs text-purple-300">Already subscribed? Check your email for the access link</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
