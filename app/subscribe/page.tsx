import { Header } from "@/components/header"
import StripeCheckout from "@/components/stripe-checkout"
import { Check } from "lucide-react"

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4 font-[family-name:var(--font-oswald)] uppercase tracking-wider">
            Unlock Your Vision
          </h1>
          <p className="text-white/70 text-lg">
            Get full access to all Pineal Vision training modules and exercises.
          </p>
        </div>

        <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-8 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-white mb-2">
              $5.55
              <span className="text-lg font-normal text-white/60">/month</span>
            </div>
            <p className="text-white/50 text-sm">Cancel anytime. Billed monthly via Stripe.</p>
            <p className="text-white/45 text-xs mt-3 max-w-md mx-auto leading-relaxed">
              If you use a promotion for a complimentary period, your subscription continues automatically at the regular monthly rate after that—until you cancel.
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "Access to all training modules",
              "Guided vision exercises",
              "Progress tracking",
              "New content added regularly",
              "Community support",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-white/80">
                <Check className="w-5 h-5 text-purple-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <StripeCheckout />

          <p className="text-amber-300/90 text-xs leading-relaxed bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2 mt-6">
            If Stripe’s hosted page shows a 404 or error on the first try, go back and press{" "}
            <span className="font-medium text-amber-200/95">Continue to Secure Checkout</span> again with the same email—hosted checkout sometimes needs a second load after a redirect.
          </p>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Secure payment powered by Stripe. Your subscription will renew monthly.
        </p>
      </div>
    </main>
  )
}
