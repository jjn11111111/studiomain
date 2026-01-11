import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight mb-6">THE SCIENCE</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Understanding the pineal gland, crystalline structures, and the ancient wisdom behind third eye activation
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Intro */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12">
            <p className="text-lg leading-relaxed text-white/80">
              The human body is a marvel of intricate systems working in harmony. Among these, the pineal gland, the
              sacrocranial pump of the spine, and the concept of Kundalini form a fascinating triad that bridges
              anatomy, physiology, and spirituality.
            </p>
          </div>

          <article>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E53935] via-[#FFD600] to-[#1E88E5] flex items-center justify-center">
                <span className="font-sans text-2xl font-bold text-white">∿</span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold">CYMATICS & BRAIN RESONANCE</h2>
            </div>
            <div className="pl-0 md:pl-20 space-y-6 text-white/70 leading-relaxed">
              {/* Cymatic Brain Image */}
              <div className="relative aspect-square max-w-lg mx-auto mb-8">
                <Image
                  src="/images/faa937-6bd7818ec9df46cda41ae52b5766f45c-mv2.avif"
                  alt="MRI brain scan with 27Hz cymatic pattern overlay showing correlation between vibrational patterns and brain structures"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-white/40 text-center -mt-4 mb-6">Image courtesy of Ben Browne Cymatics</p>

              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  The images above reveal MRI/X-ray scans of the human head from directly above. A cymatic vibratory
                  pattern of a <strong className="text-white">27Hz sine wave</strong> with transparency is placed atop
                  the brain scan at scale.
                </p>
                <p>
                  The nuanced features of the cymatic pattern{" "}
                  <strong className="text-white">
                    mirror the structures of the human brain at every level of scale
                  </strong>{" "}
                  and reveal an incredibly important nexus point — that of the{" "}
                  <strong className="text-[#FFD600]">3rd eye</strong> and other components of the central cavern of the
                  brain.
                </p>
                <p>
                  This visual correlation suggests a profound connection between{" "}
                  <strong className="text-white">sound frequencies, vibrational patterns, and neuroanatomy</strong>. The
                  27Hz frequency falls within the beta brainwave range associated with active concentration and
                  cognitive processing — precisely the states targeted by the stereoscopic exercises in this program.
                </p>
              </div>

              <div className="bg-white/5 border-l-4 border-[#1E88E5] p-6 mt-6">
                <p className="text-white/80 italic">
                  "As above, so below; as within, so without." The cymatic patterns formed by sound waves appear to be
                  encoded into the very structure of our brain — a fractal resonance connecting the macrocosm of
                  universal vibration to the microcosm of human consciousness.
                </p>
              </div>
            </div>
          </article>

          {/* Pineal Gland Section */}
          <article>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                <span className="font-sans text-2xl font-bold text-white">01</span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold">THE PINEAL GLAND & CRYSTALLINE STRUCTURES</h2>
            </div>
            <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
              <p>
                The pineal gland, nestled deep within the brain, has garnered significant attention for its unique
                properties and potential spiritual significance. One of the most intriguing aspects of the pineal gland
                is the presence of <strong className="text-white">calcite microcrystals</strong>.
              </p>
              <p>
                These microcrystals, composed of calcium carbonate, have{" "}
                <strong className="text-white">piezoelectric properties</strong>, meaning they can generate an
                electrical charge in response to mechanical stress.
              </p>
              <p>
                This piezoelectric capability suggests that the pineal gland could be sensitive to electromagnetic
                fields and light, potentially playing a role in the perception of non-physical realities. Some
                researchers propose that these crystalline structures might act like a{" "}
                <strong className="text-white">natural antenna</strong>, tuning into frequencies beyond the ordinary
                sensory experience, thus facilitating heightened states of awareness and spiritual experiences.
              </p>
            </div>
          </article>

          {/* Sacrocranial Pump Section */}
          <article>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FDD835] flex items-center justify-center">
                <span className="font-sans text-2xl font-bold text-black">02</span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold">THE SACROCRANIAL PUMP</h2>
            </div>
            <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
              <p>
                The sacrocranial pump, also known as the craniosacral system, refers to the{" "}
                <strong className="text-white">rhythmic pulsation of cerebrospinal fluid (CSF)</strong> that flows
                between the brain and the sacrum, the triangular bone at the base of the spine.
              </p>
              <p>
                This fluid movement is driven by the inherent motility of the brain and spinal cord and the rhythmic
                expansion and contraction of the cranial bones.
              </p>
              <p>
                The sacrocranial pump plays a crucial role in maintaining the health of the central nervous system by
                distributing nutrients and removing waste products. It also influences the{" "}
                <strong className="text-white">flow of energy through the body</strong>, which is where its connection
                to Kundalini energy becomes particularly significant.
              </p>
            </div>
          </article>

          {/* Kundalini Section */}
          <article>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#1E88E5] flex items-center justify-center">
                <span className="font-sans text-2xl font-bold text-white">03</span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold">KUNDALINI ENERGY</h2>
            </div>
            <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
              <p>
                Kundalini, derived from the Sanskrit word for "coiled," refers to a{" "}
                <strong className="text-white">primal energy located at the base of the spine</strong>, often depicted
                as a serpent coiled around the sacrum.
              </p>
              <p>
                In spiritual traditions, particularly within Hinduism and yoga, Kundalini is considered a powerful force
                of spiritual awakening and transformation.
              </p>
              <p>
                When awakened, Kundalini energy rises through the central channel (Sushumna) of the spine,{" "}
                <strong className="text-white">activating the seven chakras</strong> along its path. This journey of
                energy is believed to lead to higher states of consciousness, profound spiritual experiences, and a deep
                connection to the divine.
              </p>
            </div>
          </article>

          {/* The Interplay Section */}
          <article className="bg-white/5 border border-white/10 p-8 md:p-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold mb-8 text-center">THE INTERPLAY</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-bold text-[#E53935]">Activation & Sensitivity</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  The calcite microcrystals in the pineal gland may enhance sensitivity to electromagnetic fields and
                  spiritual frequencies, facilitating the perception of subtle energies.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-bold text-[#FDD835]">Fluid Dynamics & Energy Flow</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  The rhythmic pulsation of the sacrocranial pump influences cerebrospinal fluid movement, creating an
                  optimal environment for the upward journey of Kundalini.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-bold text-[#1E88E5]">Chakra Activation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  As Kundalini energy ascends through the spine, it activates the chakras. The pineal gland, associated
                  with the Ajna (third eye) chakra, plays a pivotal role in higher consciousness.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-bold text-white">Holistic Transformation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  The combined action promotes holistic healing by balancing the nervous system, enhancing mental
                  clarity, and fostering spiritual growth.
                </p>
              </div>
            </div>
          </article>

          {/* Practical Applications */}
          <article>
            <h2 className="font-sans text-3xl md:text-4xl font-bold mb-8 text-center">PRACTICAL APPLICATIONS</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-[#E53935] p-6">
                <h3 className="font-sans text-lg font-bold mb-3">Meditation & Visualization</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Practices that focus on the third eye or involve visualization techniques can stimulate the pineal
                  gland and enhance its sensitivity.
                </p>
              </div>
              <div className="border border-[#FDD835] p-6">
                <h3 className="font-sans text-lg font-bold mb-3">Yoga & Breathwork</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Kundalini yoga and specific breathwork practices (pranayama) can help awaken and guide Kundalini
                  energy through the spine.
                </p>
              </div>
              <div className="border border-[#1E88E5] p-6">
                <h3 className="font-sans text-lg font-bold mb-3">Stereoscopic Training</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Visual exercises that engage both eyes in convergence can stimulate the optic pathways connected to
                  the pineal region.
                </p>
              </div>
            </div>
          </article>

          {/* Research Section */}
          <article className="border-t-4 border-white/20 pt-16">
            <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12 text-center">THE RESEARCH</h2>

            <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-12">
              <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6">
                The Efficacy of Combined Visual Training
              </h3>
              <p className="text-lg leading-relaxed text-white/80">
                The exercises in this platform integrate stereoscopic vision, simultaneous movement in opposing
                directions, symbols, patterns, and meditation—offering a multifaceted approach to mental and spiritual
                growth supported by scientific research.
              </p>
            </div>

            {/* Stereoscopic Vision */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-white">01</span>
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold">STEREOSCOPIC VISION</h3>
              </div>
              <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                <p className="font-bold text-white/90">Enhancing Depth Perception and Cognitive Function</p>
                <p>
                  Stereoscopic vision exercises present two slightly different images to each eye, creating perception
                  of depth and three-dimensionality. This technique is widely used in vision therapy.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Cognitive Enhancement:</strong> Studies show these activities enhance
                    spatial awareness, hand-eye coordination, and visual memory—linked to better overall cognitive
                    function and problem-solving abilities.
                  </li>
                  <li>
                    <strong className="text-white">Neuroplasticity:</strong> Regular practice promotes neuroplasticity,
                    the brain's ability to reorganize itself by forming new neural connections.
                  </li>
                </ul>
              </div>
            </div>

            {/* Simultaneous Opposing Movements */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#FDD835] flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-black">02</span>
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold">SIMULTANEOUS OPPOSING MOVEMENTS</h3>
              </div>
              <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                <p className="font-bold text-white/90">Stimulating Brain Coordination and Focus</p>
                <p>
                  Exercises involving simultaneous movements in opposing directions challenge the brain's coordination
                  and focus, requiring integration of complex motor and cognitive processes.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Bilateral Integration:</strong> Such exercises promote bilateral
                    integration, the brain's ability to coordinate information from both hemispheres.
                  </li>
                  <li>
                    <strong className="text-white">Enhanced Focus:</strong> The complexity demands sustained attention
                    and concentration, leading to improvements in focus, mental clarity, and ability to manage
                    distractions.
                  </li>
                </ul>
              </div>
            </div>

            {/* Symbols and Patterns */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#1E88E5] flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-white">03</span>
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold">SYMBOLS & PATTERNS</h3>
              </div>
              <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                <p className="font-bold text-white/90">Engaging the Mind and Enhancing Intuition</p>
                <p>
                  The use of symbols and patterns taps into the brain's inherent ability to recognize and interpret
                  visual information, engaging both analytical and intuitive faculties.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Pattern Recognition:</strong> Engaging with complex patterns enhances
                    the brain's pattern recognition abilities, fundamental to memory, reasoning, and problem-solving.
                  </li>
                  <li>
                    <strong className="text-white">Symbolic Thinking:</strong> Symbols carry meaning and evoke deep
                    psychological responses, stimulating intuition and creativity.
                  </li>
                </ul>
              </div>
            </div>

            {/* Meditation */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-white">04</span>
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold">MEDITATION</h3>
              </div>
              <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                <p className="font-bold text-white/90">Fostering Mindfulness and Spiritual Awareness</p>
                <p>
                  Meditation is a well-established practice known for reducing stress, enhancing emotional regulation,
                  and promoting overall mental health.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Mindfulness and Presence:</strong> Meditation cultivates mindfulness,
                    enhancing the effectiveness of visual exercises by fostering a focused and receptive mental state.
                  </li>
                  <li>
                    <strong className="text-white">Spiritual Growth:</strong> When combined with visual exercises, it
                    deepens the impact, promoting both mental and spiritual growth.
                  </li>
                </ul>
              </div>
            </div>

            {/* Synergistic Effect */}
            <div className="bg-gradient-to-br from-[#E53935]/10 via-[#FDD835]/10 to-[#1E88E5]/10 border border-white/20 p-8 md:p-12">
              <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6 text-center">THE SYNERGISTIC EFFECT</h3>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                The combination of stereoscopic vision, simultaneous opposing movements, symbols, patterns, and
                meditation creates a powerful synergistic effect, enhancing the benefits of each individual component.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-sans font-bold text-white mb-2">Holistic Brain Stimulation</h4>
                  <p className="text-white/60 text-sm">
                    By engaging multiple aspects of brain function, these exercises provide comprehensive brain
                    stimulation.
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white mb-2">Enhanced Neuroplasticity</h4>
                  <p className="text-white/60 text-sm">
                    The integration of diverse techniques promotes neuroplasticity, supporting the brain's capacity to
                    adapt, learn, and grow.
                  </p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white mb-2">Balanced Development</h4>
                  <p className="text-white/60 text-sm">
                    This multifaceted approach fosters balanced development of both analytical and intuitive faculties.
                  </p>
                </div>
              </div>
            </div>

            {/* Supporting Evidence */}
            <div className="mt-12 bg-white/5 border border-white/10 p-8 md:p-12">
              <h3 className="font-sans text-2xl font-bold mb-6">SUPPORTING EVIDENCE FROM RESEARCH</h3>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Vision Therapy:</strong> Research in vision therapy supports the
                  benefits of stereoscopic vision exercises for improving visual and cognitive function.
                </p>
                <p>
                  <strong className="text-white">Bilateral Movement Exercises:</strong> Studies on bilateral
                  coordination exercises demonstrate effectiveness in enhancing brain integration and cognitive skills.
                </p>
                <p>
                  <strong className="text-white">Meditation Research:</strong> Extensive research on meditation confirms
                  its benefits for mental health, cognitive function, and spiritual development.
                </p>
                <p className="pt-4 border-t border-white/10 text-white/90">
                  By combining these diverse elements, our exercises offer a comprehensive training program that
                  nurtures the mind, body, and spirit—paving the way for profound personal transformation.
                </p>
              </div>
            </div>

            {/* Trinity/Fractal Philosophy Section */}
            <article className="border-t-4 border-white/20 pt-16">
              <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12 text-center">THE TRINITY</h2>

              <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-12">
                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6">
                  A Fractal Representation of the Divine
                </h3>
                <p className="text-lg leading-relaxed text-white/80">
                  The concept of the Trinity, a cornerstone of many spiritual and religious traditions, represents a
                  profound model of divine nature and its manifestations. The Trinity embodies a fractal representation
                  of Divine Creator Source, forming a dynamic interplay of polarities held in balance by a neutral,
                  mutable point of free will.
                </p>
              </div>

              {/* Fractals */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">01</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">FRACTALS & SELF-SIMILARITY</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Fractals are complex patterns that are{" "}
                    <strong className="text-white">self-similar across different scales</strong>, meaning that the
                    structure of the whole is reflected in its parts. This concept has been explored in mathematics,
                    nature, and spiritual contexts.
                  </p>
                  <p>
                    <strong className="text-white">In Nature:</strong> Fractals are observed in natural phenomena such
                    as snowflakes, coastlines, and branching trees. The Mandelbrot set displays intricate, repeating
                    patterns at every scale.
                  </p>
                  <p>
                    <strong className="text-white">Spiritual Implications:</strong> The idea that the divine can be
                    represented fractally suggests that the essence of the creator is present in every part of creation.
                    Each component of the Trinity embodies the whole, reflecting the interconnectedness of all aspects
                    of the divine.
                  </p>
                </div>
              </div>

              {/* Polarity */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#FDD835] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-black">02</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">POLARITY & BALANCE</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    The Trinity involves two equal but opposite parts in energetic tension, aligning with principles of
                    polarity found in both science and spirituality.
                  </p>
                  <p>
                    <strong className="text-white">In Physics:</strong> Polarity refers to the separation of charges,
                    creating an electric field. The balance of positive and negative charges results in stability and
                    neutrality.
                  </p>
                  <p>
                    <strong className="text-white">Yin and Yang:</strong> In Eastern philosophy, particularly Taoism,
                    Yin and Yang represents dualities that are interconnected and interdependent. Each aspect contains a
                    seed of the other, maintaining a dynamic balance.
                  </p>
                </div>
              </div>

              {/* Free Will */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1E88E5] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">03</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">THE NEUTRAL POINT & FREE WILL</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    The third aspect of the Trinity holds the balance between the two polarities—a point of
                    <strong className="text-white"> neutrality, free will, and mutability</strong>.
                  </p>
                  <p>
                    <strong className="text-white">Quantum Mechanics:</strong> Quantum mechanics introduces
                    superposition, where particles exist in multiple states simultaneously until observed. This
                    indeterminacy has been linked to free will, suggesting that at a fundamental level, the universe
                    allows for choices and variability.
                  </p>
                  <p>
                    <strong className="text-white">Consciousness:</strong> Research suggests that self-awareness and
                    decision-making are emergent properties of complex neural processes. The ability to choose between
                    different options is a hallmark of conscious beings.
                  </p>
                </div>
              </div>

              {/* Three-in-One */}
              <div className="bg-gradient-to-br from-[#E53935]/10 via-[#FDD835]/10 to-[#1E88E5]/10 border border-white/20 p-8 md:p-12 mb-12">
                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-6 text-center">
                  THREE-IN-ONE & ONE-IN-THREE
                </h3>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  The Trinity is simultaneously three distinct entities and one unified whole, reflecting the complexity
                  and unity of consciousness.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-sans font-bold text-white mb-2">Integrated Information Theory</h4>
                    <p className="text-white/60 text-sm">
                      Consciousness arises from the integration of information across a system. Individual parts
                      (neurons, brain regions) contribute to a unified conscious experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white mb-2">Spiritual Unity</h4>
                    <p className="text-white/60 text-sm">
                      The Trinity in Christianity, the Trimurti in Hinduism, and similar concepts in other religions all
                      reflect the principle of unity in diversity.
                    </p>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="bg-white/5 border border-white/10 p-8 md:p-12">
                <h3 className="font-sans text-xl font-bold mb-6">SCHOLARLY SOURCES</h3>
                <div className="space-y-3 text-white/60 text-sm leading-relaxed">
                  <p>
                    <strong className="text-white/80">Mandelbrot, B. (1982).</strong> The Fractal Geometry of Nature —
                    Mathematical basis of fractals and their occurrence in nature.
                  </p>
                  <p>
                    <strong className="text-white/80">Capra, F. (1975).</strong> The Tao of Physics — Parallels between
                    modern physics and Eastern mysticism.
                  </p>
                  <p>
                    <strong className="text-white/80">Penrose, R. (1989).</strong> The Emperor's New Mind — Implications
                    of quantum mechanics for consciousness and free will.
                  </p>
                  <p>
                    <strong className="text-white/80">Chalmers, D. J. (1996).</strong> The Conscious Mind — Philosophy
                    of mind and the nature of consciousness.
                  </p>
                  <p>
                    <strong className="text-white/80">Tononi, G. (2008).</strong> Consciousness as Integrated
                    Information — Integrated Information Theory (IIT).
                  </p>
                </div>
              </div>
            </article>

            {/* Fractal Trinity Section */}
            <article>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E53935] via-[#FDD835] to-[#1E88E5] flex items-center justify-center">
                  <span className="font-sans text-2xl font-bold text-white drop-shadow-md">∞</span>
                </div>
                <h2 className="font-sans text-3xl md:text-4xl font-bold">FRACTAL TRINITY</h2>
              </div>
              <div className="pl-0 md:pl-20 space-y-6 text-white/70 leading-relaxed">
                <p className="text-lg text-white/90">
                  The third eye exercises embody a{" "}
                  <strong className="text-white">fractal representation of the Trinity</strong>, mirroring the interplay
                  of the divine masculine, divine feminine, and the child.
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-8">
                  <div className="bg-[#E53935]/20 border border-[#E53935]/40 p-6">
                    <h4 className="font-sans font-bold text-[#E53935] mb-2">DIVINE MASCULINE</h4>
                    <p className="text-sm">Structure, logic, analytical thinking. The Father principle.</p>
                  </div>
                  <div className="bg-[#1E88E5]/20 border border-[#1E88E5]/40 p-6">
                    <h4 className="font-sans font-bold text-[#1E88E5] mb-2">DIVINE FEMININE</h4>
                    <p className="text-sm">Creativity, intuition, receptivity. The Mother principle.</p>
                  </div>
                  <div className="bg-[#FDD835]/20 border border-[#FDD835]/40 p-6">
                    <h4 className="font-sans font-bold text-[#FDD835] mb-2">THE CHILD</h4>
                    <p className="text-sm">
                      Integration, potential, bridging polarities. The neutral, mutable mediator.
                    </p>
                  </div>
                </div>

                <h3 className="font-sans text-xl font-bold text-white mt-8">Neurological Correlates</h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 bg-[#E53935]"></div>
                    <div>
                      <h4 className="font-bold text-white">Left Brain (Analytical, Masculine)</h4>
                      <p>
                        Logical reasoning, analytical thinking, language, structured processes. Order, linearity,
                        systematic problem-solving.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 bg-[#1E88E5]"></div>
                    <div>
                      <h4 className="font-bold text-white">Right Brain (Artistic, Feminine)</h4>
                      <p>
                        Creativity, intuition, holistic thinking, spatial awareness. Artistic expression, emotional
                        intelligence, non-linear thinking.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 bg-[#FDD835]"></div>
                    <div>
                      <h4 className="font-bold text-white">Third Eye (Integration, The Child)</h4>
                      <p>
                        Intuitive insight, higher perception, integration of left and right brain functions. The
                        neutral, mutable point of free will and spiritual awareness.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="font-sans text-xl font-bold text-white mt-8">How The Exercises Reflect the Trinity</h3>

                <div className="space-y-4">
                  <div className="bg-white/5 border-l-4 border-[#E53935] p-4">
                    <h4 className="font-bold text-white">Stereoscopic Vision → Left Brain, Divine Masculine</h4>
                    <p>
                      Engages analytical and logical processes by requiring precise coordination and depth perception.
                      Enhances focus, attention to detail, and the ability to distinguish subtle differences.
                    </p>
                  </div>
                  <div className="bg-white/5 border-l-4 border-[#1E88E5] p-4">
                    <h4 className="font-bold text-white">
                      Simultaneous Opposing Movements → Right Brain, Divine Feminine
                    </h4>
                    <p>
                      Stimulates creativity and holistic thinking by challenging the brain to coordinate complex,
                      non-linear movements. Enhances spatial awareness and the ability to perceive patterns in chaos.
                    </p>
                  </div>
                  <div className="bg-white/5 border-l-4 border-[#FDD835] p-4">
                    <h4 className="font-bold text-white">Symbols and Patterns → Integration, The Child</h4>
                    <p>
                      Combines analytical and artistic aspects, using symbols and patterns to engage both hemispheres.
                      The neutral, mutable point that encourages intuitive insights and integration of conscious and
                      subconscious knowledge.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#E53935]/10 via-[#FDD835]/10 to-[#1E88E5]/10 border border-white/20 p-8 mt-8">
                  <h4 className="font-sans text-lg font-bold text-white mb-4">PRACTICAL BENEFITS</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>
                      <strong className="text-white">Holistic Cognitive Development:</strong> Balanced development of
                      logical and creative capacities
                    </li>
                    <li>
                      <strong className="text-white">Enhanced Intuition:</strong> Integration of symbols and meditation
                      fosters intuitive insights
                    </li>
                    <li>
                      <strong className="text-white">Emotional Balance:</strong> Dynamic interplay reduces stress and
                      enhances well-being
                    </li>
                    <li>
                      <strong className="text-white">Spiritual Awakening:</strong> Third eye activation supports higher
                      consciousness development
                    </li>
                  </ul>
                </div>

                <p className="text-white/60 italic mt-6">
                  Through these practices, individuals can tap into their full potential, achieving a state of
                  integrated consciousness that reflects the unity and diversity of the divine Trinity.
                </p>
              </div>
            </article>
            {/* End Fractal Trinity section */}

            {/* Remote Viewing & Hemi-Sync Section */}
            <article className="border-t-4 border-white/20 pt-16">
              <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12 text-center">REMOTE VIEWING & HEMI-SYNC</h2>

              <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-12">
                <h3 className="font-sans text-2xl md:text-3xl font-bold">Enhancing Extrasensory Perception</h3>
                <p className="text-lg leading-relaxed text-white/80">
                  Remote viewing is a form of extrasensory perception (ESP) where individuals attempt to gather
                  information about a distant or unseen target solely through their mind. This practice has been
                  explored extensively in various research programs, most notably in the U.S. government's{" "}
                  <strong className="text-white">Stargate Project</strong>, which aimed to investigate the potential of
                  psychic phenomena for intelligence purposes.
                </p>
              </div>

              {/* Historical Context */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">01</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">HISTORICAL CONTEXT</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Remote viewing gained prominence in the 1970s and 1980s, largely due to the work of physicists{" "}
                    <strong className="text-white">Russell Targ and Harold Puthoff</strong> at the Stanford Research
                    Institute (SRI). Their studies, published in Nature and other journals, provided evidence suggesting
                    that remote viewing was more than mere coincidence or chance.
                  </p>
                  <p>
                    <strong className="text-white">Key Components:</strong> The practice involves a <em>target</em> (the
                    object, location, or person to perceive), a <em>viewer</em> (the individual performing the session),
                    and a <em>protocol</em> (the structured process ensuring objectivity and repeatability).
                  </p>
                </div>
              </div>

              {/* The Monroe Institute */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#FDD835] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-black">02</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">THE MONROE INSTITUTE & HEMI-SYNC</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    <strong className="text-white">Robert Monroe</strong>, a pioneer in the field of human
                    consciousness, founded the Monroe Institute in the 1970s. His work focused on out-of-body
                    experiences (OBEs) and altered states of consciousness, documented in his book "Journeys Out of the
                    Body" (1971).
                  </p>
                  <p>
                    <strong className="text-white">Hemi-Sync Technology:</strong> Short for hemispheric synchronization,
                    Hemi-Sync is an audio-guidance technology that uses binaural beats to synchronize the brain's
                    hemispheres, facilitating altered states of consciousness conducive to deep meditation, relaxation,
                    and enhanced cognitive function.
                  </p>
                  <p>
                    <strong className="text-white">How It Works:</strong> When two slightly different frequencies are
                    played in each ear, the brain perceives a third tone (binaural beat). This induces brainwave
                    entrainment, encouraging the brain to align with alpha (relaxed awareness), theta (meditative), or
                    delta (deep sleep) states.
                  </p>
                </div>
              </div>

              {/* Connection to Exercises */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1E88E5] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">03</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">ENHANCING REMOTE VIEWING</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Our visual exercises integrate the same principles that enhance remote viewing capabilities:
                    stereoscopic vision, simultaneous opposing movements, symbols, patterns, and meditation.
                  </p>
                  <p>
                    <strong className="text-white">Holistic Brain Stimulation:</strong> By engaging multiple aspects of
                    brain function—visual processing, motor coordination, cognitive focus, and intuitive insight—these
                    exercises provide comprehensive brain stimulation.
                  </p>
                  <p>
                    <strong className="text-white">Enhanced Neuroplasticity:</strong> The integration of diverse
                    techniques promotes neuroplasticity, supporting the brain's capacity to adapt, learn, and grow.
                  </p>
                  <p>
                    <strong className="text-white">Balanced Development:</strong> This multifaceted approach fosters
                    balanced development of both analytical and intuitive faculties, enhancing overall cognitive and
                    spiritual well-being.
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#E53935]/20 border border-[#E53935]/40 p-6">
                  <h4 className="font-sans text-lg font-bold mb-3 text-[#E53935]">ENHANCED FOCUS</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Synchronizing the brain hemispheres improves mental clarity and focus, leading to more accurate and
                    detailed perception sessions.
                  </p>
                </div>
                <div className="bg-[#FDD835]/20 border border-[#FDD835]/40 p-6">
                  <h4 className="font-sans text-lg font-bold mb-3 text-[#FDD835]">STRESS REDUCTION</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The relaxing effects of hemisphere synchronization reduce stress and anxiety, which often hinder
                    intuitive performance.
                  </p>
                </div>
                <div className="bg-[#1E88E5]/20 border border-[#1E88E5]/40 p-6">
                  <h4 className="font-sans text-lg font-bold mb-3 text-[#1E88E5]">CONSISTENCY</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Regular practice helps achieve more consistent and reliable results by maintaining optimal brainwave
                    states.
                  </p>
                </div>
              </div>

              {/* Supporting Research */}
              <div className="bg-white/5 border-l-4 border-white/40 p-6">
                <h4 className="font-sans text-lg font-bold mb-4">SUPPORTING RESEARCH</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>
                    • May, E.C. (1995). The American Institutes for Research Review of the Department of Defense's STAR
                    GATE Program.
                  </li>
                  <li>
                    • Targ, R., & Puthoff, H. (1974). Information transmission under conditions of sensory shielding.
                    Nature.
                  </li>
                  <li>• Monroe, R. (1971). Journeys Out of the Body.</li>
                  <li>
                    • Kennerly, R.C. (1994). An empirical investigation into the effect of beta frequency binaural beat
                    audio signals on four measures of human memory. Journal of Alternative and Complementary Medicine.
                  </li>
                  <li>
                    • Le Scouarnec, R.P. et al. (2001). Use of binaural beat tapes for treatment of anxiety. Journal of
                    Nervous and Mental Disease.
                  </li>
                </ul>
              </div>
            </article>

            {/* Meaning of Life Section */}
            <article className="border-t-4 border-white/20 pt-16">
              <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12 text-center">
                A NEW MODEL OF THE MEANING OF LIFE
              </h2>

              <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-12">
                <p className="text-lg leading-relaxed text-white/80">
                  This model posits that physical incarnation is a balanced blend of physicality and consciousness,
                  where consciousness inhabits from dimensions or realms of spirit. The interplay between physicality
                  and spirit manifests as an energetic field of tension between the polarities of the divine masculine
                  and divine feminine.
                </p>
              </div>

              {/* Blending of Physicality and Spirit */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#E53935] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">01</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">THE BLENDING OF PHYSICALITY & SPIRIT</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    <strong className="text-white">Physical incarnation</strong> is the process by which consciousness
                    from higher dimensions or realms of spirit inhabits a physical body. This union of physicality and
                    spirit creates a dynamic field of energetic tension, characterized by the interplay of divine
                    masculine and divine feminine polarities.
                  </p>
                  <p>
                    The <strong className="text-white">energetic tension</strong> between the divine masculine and
                    feminine creates a field of interaction that shapes our reality. This tension is not merely
                    oppositional but also complementary, facilitating growth, evolution, and the manifestation of
                    physical experiences.
                  </p>
                </div>
              </div>

              {/* The Neutral Point */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#FDD835] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-black">02</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">THE NEUTRAL POINT: THE ACTION CHILD</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    At the center of the energetic tension between the divine masculine and feminine lies a
                    <strong className="text-white"> neutral point</strong>, representing 33% of the total energy. This
                    middle energetic node, or <strong className="text-[#1E88E5]">action child</strong>, is mutable and
                    can adopt either masculine or feminine qualities.
                  </p>
                  <p>
                    The action child embodies the potential for transformation and adaptability. As individuals
                    incarnate in the physical realm, the action child within them represents their capacity for growth,
                    change, and the integration of both masculine and feminine aspects.
                  </p>
                </div>
              </div>

              {/* Journey of Self-Actualization */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1E88E5] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">03</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">THE JOURNEY OF SELF-ACTUALIZATION</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    A crucial aspect of physical life is the individual journey toward self-actualization. This involves
                    <strong className="text-white"> confronting and resolving the darkness</strong> that dwells within—
                    spiritual attachments, shadow energies, and negative emotions like anger, guilt, shame, and
                    self-pity.
                  </p>
                  <p>
                    By acknowledging and commanding shadow energies, individuals can transform and integrate these
                    aspects, leading to greater self-awareness and spiritual growth. Instead of cultivating false
                    narratives of scarcity and competition, a more useful construct focuses on{" "}
                    <strong className="text-white">singular challenges, difficulties, and lessons learned</strong> in
                    this life.
                  </p>
                </div>
              </div>

              {/* Energetic Dynamics */}
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-12">
                <h3 className="font-sans text-2xl md:text-3xl font-bold mb-8 text-center">ENERGETIC DYNAMICS</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#E53935]"></div>
                      <h4 className="font-sans text-xl font-bold text-[#E53935]">Centrifugal Explosion</h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Representing the <strong className="text-white">masculine principle</strong>, this force moves
                      energy outward from the center. Associated with ejection, individual ego, and the perceived
                      separation from the divine creator. It drives the expression of self and exploration of external
                      realities.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#1E88E5]"></div>
                      <h4 className="font-sans text-xl font-bold text-[#1E88E5]">Centripetal Compression</h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Embodying the <strong className="text-white">feminine principle</strong>, this force moves energy
                      inward toward the center. Characterized by higher pressure and compression, representing
                      receptivity, nurturing, and the return to the source.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#E53935]"></div>
                      <h4 className="font-sans text-xl font-bold text-[#E53935]">Masculine Electricity</h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Electricity symbolizes the masculine aspect—dynamic, outward-moving energy representing action,
                      creation, and the assertion of individuality. The red, larger wave EMF frequencies are associated
                      with this force.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#1E88E5]"></div>
                      <h4 className="font-sans text-xl font-bold text-[#1E88E5]">Feminine Magnetism</h4>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Magnetism signifies the feminine aspect—receptive, inward-moving energy embodying attraction,
                      nurturing, and the synthesis of experiences. The blue, smaller wave EMF is linked to this force.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divine Trinity DNA */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E53935] via-[#FFD600] to-[#1E88E5] flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-white">☿</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">
                    THE DIVINE TRINITY: DNA & THE FRACTAL IMAGE OF GOD
                  </h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    The DNA helix, composed of two parallel spirals connected by ladder rungs or triplet codons,
                    <strong className="text-white"> symbolizes the divine trinity</strong>. This structure reflects the
                    true nature of the Trinity: two energetic polarities held in 33% tension, creating a third, mutable
                    node—the action child.
                  </p>
                  <p>
                    Each individual, as a <strong className="text-[#FFD600]">unique fractal image of God</strong>,
                    contains this divine trinity within their DNA. This trinity embodies the harmonious balance of the
                    divine masculine and feminine, unified through the action child.
                  </p>
                </div>
              </div>

              {/* Zero Function Search */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white flex items-center justify-center">
                    <span className="font-sans text-2xl font-bold text-black">∅</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold">ZERO FUNCTION SEARCH</h3>
                </div>
                <div className="pl-0 md:pl-20 space-y-4 text-white/70 leading-relaxed">
                  <p>
                    At the core of this journey is the <strong className="text-white">zero function search</strong> for
                    individual identity, purpose, truth, satisfaction, and the practice of unconditional love. This
                    search finds its most coherent form at the exact balance point, where the divine masculine and
                    feminine energies are perfectly harmonized.
                  </p>
                  <p>
                    As individuals progress and grow, they achieve{" "}
                    <strong className="text-white">energetic mile markers</strong>
                    that signify increased centripetal pressurization and four-wave coherence. These markers represent
                    the order and elucidation of their most singular identity.
                  </p>
                </div>
              </div>

              {/* True Competition */}
              <div className="bg-white/5 border-l-4 border-[#FFD600] p-6 mb-12">
                <h4 className="font-sans text-xl font-bold mb-4">THE TRUE COMPETITION: WITHIN OURSELVES</h4>
                <p className="text-white/80 leading-relaxed mb-4">
                  The real competition in this life dwells within each of us, as we grapple with our own shadows and
                  strive for self-actualization. By examining the "fruits of the tree," the intent behind actions and
                  beliefs is revealed.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="border border-[#E53935]/50 p-4">
                    <p className="text-[#E53935] font-bold mb-2">Poison Fruit</p>
                    <p className="text-white/60">
                      Hate, anger, rage, loathing, envy, jealousy, division, gossip, suppression, selfish intent
                    </p>
                  </div>
                  <div className="border border-[#1E88E5]/50 p-4">
                    <p className="text-[#1E88E5] font-bold mb-2">Good Fruit</p>
                    <p className="text-white/60">
                      Reconciliation, truth-seeking, gratitude, inclusion, mercy, forgiveness, unconditional love
                    </p>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="border-t border-white/10 pt-8">
                <h4 className="font-sans text-lg font-bold mb-4 text-white/60">References</h4>
                <ul className="text-sm text-white/40 space-y-2">
                  <li>
                    Botvinick, M., & Cohen, J. (1998). Rubber hands 'feel' touch that eyes see. Nature, 391(6669), 756.
                  </li>
                  <li>
                    Driskell, J. E., Copper, C., & Moran, A. (1994). Does mental practice enhance performance? Journal
                    of Applied Psychology, 79(4), 481-492.
                  </li>
                  <li>
                    Kosslyn, S. M., Ganis, G., & Thompson, W. L. (2001). Neural foundations of imagery. Nature Reviews
                    Neuroscience, 2(9), 635-642.
                  </li>
                  <li>
                    Reiter, R. J. (1991). Melatonin: The chemical expression of darkness. Molecular and Cellular
                    Endocrinology, 79(1-3), C153-C158.
                  </li>
                  <li>Strassman, R. (2001). DMT: The Spirit Molecule. Park Street Press.</li>
                </ul>
              </div>
            </article>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
