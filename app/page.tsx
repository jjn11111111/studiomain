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
  
  // If there's a code parameter, redirect to auth callback to handle it properly
  if (params.code) {
    const type = params.type || "recovery" // Default to recovery for email links
    redirect(`/auth/callback?code=${params.code}&type=${type}`)
  }
  
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
