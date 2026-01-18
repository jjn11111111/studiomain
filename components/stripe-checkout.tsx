"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/8x2fZhcMpaMb8dt8xsaVa00"

export default function StripeCheckout() {
  const [email, setEmail] = useState("")

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
        Continue to Payment
      </Button>
    </div>
  )
}
