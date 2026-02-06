import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LogoSection } from "@/components/logo-section"
import { ModulesPreview } from "@/components/modules-preview"
import { PracticeSection } from "@/components/practice-section"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; type?: string }>
}) {
  const params = await searchParams
  
  
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LogoSection />
      <ModulesPreview />
      <PracticeSection />
      <HowItWorks />
      <Footer />
    </main>
  )
}
