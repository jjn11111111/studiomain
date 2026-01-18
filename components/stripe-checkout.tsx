"use client"

import { useState } from "react"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function StripeCheckout({ productId }: { productId: string }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!email) return
    setLoading(true)
    setError(null)
    
    try {
      const url = await createCheckoutSession(productId, email)
      window.location.href = url
    } catch (err) {
      console.error("[v0] Checkout error:", err)
      setError("Failed to start checkout. Please try again.")
      setLoading(false)
    }
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
        disabled={!email || loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6"
      >
        {loading ? "Loading..." : "Continue to Payment"}
      </Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  )
}
