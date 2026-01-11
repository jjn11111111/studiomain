import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PracticeGallery } from "@/components/practice-gallery"

export const metadata = {
  title: "Practice Images - Pineal Vision",
  description: "Practice stereoscopic vision with static images before moving to video exercises",
}

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Practice Images
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master the cross-view technique with these static stereoscopic images. Practice makes perfect before moving
            to video exercises.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 mb-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">How to View Stereoscopic Images:</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">1.</strong> Position yourself 12-18 inches from the screen
            </li>
            <li>
              <strong className="text-foreground">2.</strong> Look at the two images and relax your eyes
            </li>
            <li>
              <strong className="text-foreground">3.</strong> Cross your eyes slightly until a third image appears in
              the center
            </li>
            <li>
              <strong className="text-foreground">4.</strong> Focus on the center image - it should appear 3D
            </li>
            <li>
              <strong className="text-foreground">5.</strong> Hold your focus steady for 10-30 seconds
            </li>
          </ol>
        </div>

        <PracticeGallery />

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Practice images courtesy of{" "}
            <a
              href="https://stereoscopyblog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
            >
              Stereoscopy Blog
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
