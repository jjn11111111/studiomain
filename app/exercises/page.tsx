import { ModulesPreview } from "@/components/modules-preview"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccessGate } from "@/components/access-gate"

export default function ExercisesPage() {
  return (
    <AccessGate>
      <main className="min-h-screen bg-black">
        <Header />
        <div className="pt-20">
          <ModulesPreview />
        </div>
        <Footer />
      </main>
    </AccessGate>
  )
}
