import { Eye, Brain, Waves, Shield } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Stereoscopic Training",
    description:
      "Specially designed dual-image exercises that train your eyes to work in harmony, stimulating the pineal region.",
  },
  {
    icon: Brain,
    title: "Neural Activation",
    description: "Progressive difficulty levels that challenge and develop your brain's visual processing centers.",
  },
  {
    icon: Waves,
    title: "Frequency Alignment",
    description: "Audio-visual synchronization tuned to frequencies associated with higher states of consciousness.",
  },
  {
    icon: Shield,
    title: "Safe Practice",
    description: "Gentle, scientifically-grounded exercises with built-in rest periods to protect your visual health.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl font-bold mb-4 text-balance">
            An Innovative Approach Which Tunes 3rd Eye Activation With Simultaneous Physical and Spiritual Alignment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Combining time-tested spiritual practices with contemporary visual technology to create a powerful training
            system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
