import { Header } from "@/components/header"
import StripeCheckout from "@/components/stripe-checkout"
import { MSG_CHECKOUT_MATCH_LOGIN_EMAIL } from "@/lib/auth-copy"
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

          <p className="text-white/50 text-sm mb-4 text-center leading-relaxed">
            {MSG_CHECKOUT_MATCH_LOGIN_EMAIL}
          </p>
          <StripeCheckout />

          <p className="text-amber-200/80 text-xs mt-6 text-center">
            Checkout didn’t load? Try the button again with the same email.
          </p>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Secure payment powered by Stripe. Your subscription will renew monthly.
        </p>
      </div>
    </main>
  )
}
