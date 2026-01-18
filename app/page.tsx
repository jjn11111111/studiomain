import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LogoSection } from "@/components/logo-section"
import { ModulesPreview } from "@/components/modules-preview"
import { PracticeSection } from "@/components/practice-section"
import { HowItWorks } from "@/components/how-it-works"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LogoSection />
      <ModulesPreview />
      <PracticeSection />
      <HowItWorks />
    </main>
  )
}
