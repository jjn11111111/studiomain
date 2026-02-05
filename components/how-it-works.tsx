const steps = [
  {
    number: "01",
    title: "Relax Your Gaze",
    description:
      "Find a comfortable position and soften your focus. The exercises work best when you're relaxed and receptive.",
  },
  {
    number: "02",
    title: "Cross or Diverge",
    description:
      "Follow the on-screen guides to cross your eyes inward or diverge them outward until the hidden image appears.",
  },
  {
    number: "03",
    title: "Hold the Vision",
    description:
      "Once you see the 3D image, hold your focus. This sustained attention activates and strengthens the pineal region.",
  },
  {
    number: "04",
    title: "Progress Gradually",
    description: "Complete each module before advancing. Consistent practice leads to lasting neurological changes.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A simple process that creates profound results through consistent practice.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start group">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="font-[family-name:var(--font-oswald)] text-primary font-bold">{step.number}</span>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
