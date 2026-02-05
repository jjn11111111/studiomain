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
              $11.11
              <span className="text-lg font-normal text-white/60">/month</span>
            </div>
            <p className="text-white/50 text-sm">Cancel anytime</p>
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
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Secure payment powered by Stripe. Your subscription will renew monthly.
        </p>
      </div>
    </main>
  )
}
