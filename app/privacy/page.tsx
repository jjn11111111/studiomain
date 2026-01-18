import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-purple">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Your privacy is important to us. Pineal Vision collects only the information necessary to provide our services.
          </p>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            We do not sell or share your personal information with third parties. Payment processing is handled securely through Stripe.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            By using our service, you agree to our collection and use of information in accordance with this policy.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
