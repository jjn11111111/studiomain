import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">The Science Behind Pineal Vision</h1>
        <div className="prose prose-invert prose-purple">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Stereoscopic vision training has been shown to improve depth perception, visual acuity, and neural plasticity. Our exercises leverage the brain's natural ability to process binocular vision cues.
          </p>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            The pineal gland, often called the "third eye," plays a crucial role in regulating circadian rhythms and producing melatonin. Visual stimulation through specific patterns can influence pineal gland activity.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            Regular practice with our exercises can lead to improved concentration, reduced eye strain, and enhanced visual processing speed.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
