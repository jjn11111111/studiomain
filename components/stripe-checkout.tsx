"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/8x2fZhcMpaMb8dt8xsaVa00"

export default function StripeCheckout() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "same-origin",
          cache: "no-store",
        })
        if (!res.ok || cancelled) return
        const data = (await res.json()) as { user?: { email?: string } | null }
        const e = data.user?.email?.trim()
        if (e) setEmail(e)
      } catch {
        /* ignore */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleCheckout = () => {
    if (!email) return
    // Redirect to Stripe Payment Link with prefilled email
    window.location.href = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(email)}`
  }

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-black/40 border-purple-500/30 text-white"
        required
      />
      <Button
        onClick={handleCheckout}
        disabled={!email}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6"
      >
        Continue to Secure Checkout ($5.55/mo)
      </Button>
    </div>
  )
}
