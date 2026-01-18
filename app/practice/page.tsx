import { PracticeGallery } from "@/components/practice-gallery"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <PracticeGallery />
      </div>
      <Footer />
    </main>
  )
}
