import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">About Pineal Vision</h1>
        <div className="prose prose-invert prose-purple">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Pineal Vision - 3rd Eye Crosstrainer is a revolutionary vision training platform designed to stimulate the pineal gland and expand consciousness through carefully crafted stereoscopic visual exercises.
          </p>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Our exercises are developed based on ancient wisdom combined with modern understanding of visual perception and neuroplasticity. Each module targets specific aspects of visual and mental development.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            Join thousands of users who have experienced improved focus, enhanced peripheral vision, and deeper states of meditation through our unique training methods.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
