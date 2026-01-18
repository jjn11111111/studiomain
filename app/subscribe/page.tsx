import StripeCheckout from "@/components/stripe-checkout"
import { Header } from "@/components/header"

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-xl mx-auto">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Unlock Full Access
          </h1>
          <p className="text-white/70 text-center mb-8">
            Get unlimited access to all exercises, modules, and exclusive content to train your vision and expand consciousness.
          </p>
          
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-white">$11.11<span className="text-lg text-white/60">/month</span></div>
              <p className="text-white/60 mt-2">Cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/80">
                <span className="text-purple-400">✓</span> Access to all 3 modules
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="text-purple-400">✓</span> 30+ vision training exercises
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="text-purple-400">✓</span> Stereoscopic & pineal activation content
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="text-purple-400">✓</span> Progress tracking
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="text-purple-400">✓</span> New exercises added monthly
              </li>
            </ul>
            
            <StripeCheckout productId="price_subscription" />
          </div>
        </div>
      </div>
    </main>
  )
}
