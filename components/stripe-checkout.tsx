"use client"

import { useCallback, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function StripeCheckout({ productId }: { productId: string }) {
  const [email, setEmail] = useState("")
  const [showCheckout, setShowCheckout] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchClientSecret = useCallback(async () => {
    try {
      const secret = await createCheckoutSession(productId, email)
      return secret
    } catch (err) {
      console.error("[v0] Checkout error:", err)
      setError("Failed to load checkout. Please try again.")
      throw err
    }
  }, [productId, email])

  const handleContinue = async () => {
    if (!email) return
    setLoading(true)
    setError(null)
    setShowCheckout(true)
  }

  if (!showCheckout) {
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
          onClick={handleContinue}
          disabled={!email || loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6"
        >
          {loading ? "Loading..." : "Continue to Payment"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    )
  }

  return (
    <div id="checkout" className="min-h-[400px] bg-white rounded-lg p-4">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
