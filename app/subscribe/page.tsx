import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import StripeCheckout from "@/components/stripe-checkout"

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Unlock Your Pineal Vision</h1>
            <p className="text-xl text-purple-200">Get instant access via email - no account creation needed</p>
          </div>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white">Monthly Subscription</CardTitle>
              <CardDescription className="text-purple-200">Cancel anytime</CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold text-white">$11.11</span>
                <span className="text-xl text-purple-300">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  "Instant email access - no passwords",
                  "Access to all 3 modules",
                  "30 stereoscopic exercises",
                  "Practice images library",
                  "Future modules included",
                  "Cancel anytime",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-purple-100">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <StripeCheckout productId="monthly-subscription" />

              <p className="text-xs text-purple-300 text-center">
                After payment, you'll receive an instant access link via email. Click the link to unlock all modules -
                no password needed!
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-purple-200 mb-4">Secure checkout powered by Stripe. Access link sent instantly.</p>
            <p className="text-sm text-purple-300">Questions? Contact support@pinealvision.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
