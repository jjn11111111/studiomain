import { HowItWorks } from "@/components/how-it-works"
import { FeaturesSection } from "@/components/features-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <HowItWorks />
        <FeaturesSection />
      </div>
      <Footer />
    </main>
  )
}
