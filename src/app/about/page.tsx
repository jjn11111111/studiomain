
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Eye, Waves, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-headline text-foreground">About 3rd Eye CrossTraining</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlocking human potential through the focused application of visual and sensory stimulation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-foreground">The Philosophy</h2>
            <p className="text-lg text-muted-foreground">
              These visual exercises emerge from years of personal reflection and study. The exercises combine features of visual optics, spatial depth, super symmetry, and directions of rotation or spin. 
            </p>
            <p className="text-lg text-muted-foreground">
              By following the prescribed methods included with these exercises, a unique perspective of observation is achieved. Purposeful and sustained alterations of visual optics which govern human sight coalesce into a visual experience which utilizes and stimulates structures of the brain and visual cortex, and thereby stimulate interior components of the brain, namely the pineal gland.
            </p>
          </div>
          <div>
            <video
                src="https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(16).mp4?alt=media"
                autoPlay
                muted
                playsInline
                className="rounded-lg shadow-lg w-full h-auto"
              />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-foreground">The Experience: Background, Explanation, and Effects</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb /> Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>The human brain possesses an incredible capacity for neuroplasticity. The techniques used in these exercises are inspired by ancient meditative practices and modern understanding of neuroscience. By presenting the eyes with specific geometric patterns and stereoscopic video, the aim is to induce unique states of brainwave activity.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap /> Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
               <p>The "magic eye" effect (stereopsis) requires the brain to merge two separate images. This process bypasses ordinary, habitual ways of seeing and encourages a more holistic mode of perception. The patterns and movements are designed to be rhythmically coherent, potentially leading to brainwave entrainment, a state associated with deep focus and meditation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves /> Potential Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
               <p>Users may experience a range of effects, from a sense of deep calm and mental clarity to heightened sensory perception and vivid internal visualizations. The goal is to train the mind to access different states of consciousness, which may enhance creativity, intuition, and a feeling of connectedness.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-foreground">Core Principles</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye /> Visual Optics
                </CardTitle>
              </CardHeader>
              <CardContent>
                The exercises are built on principles of stereoscopic vision, depth perception, and geometric patterns designed to engage specific neural pathways.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna /> Neuro-Stimulation
                </CardTitle>
              </CardHeader>
              <CardContent>
                The visual patterns are engineered to stimulate brainwave activity associated with focus, meditation, and expanded states of awareness.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna /> Pineal Gland Activation
                </CardTitle>
              </CardHeader>
              <CardContent>
                The ultimate goal is to gently activate and decalcify the pineal gland, often referred to as the "third eye," enhancing intuition and inner vision.
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="my-16 text-muted-foreground prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-foreground">A New Model of the Meaning of Life</h2>
          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">Introduction</h3>
          <p>The quest for the meaning of life has been a central theme of human contemplation for millennia. This new model posits that physical incarnation is a balanced blend of physicality and consciousness, where consciousness inhabits from dimensions or realms of spirit. The interplay between physicality and spirit manifests as an energetic field of tension between the polarities of the divine masculine and divine feminine. The model further explores the significance of self-actualization, the resolution of inner darkness, and the fundamental dynamics of energetic forces in understanding the essence of life.</p>
          
          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The Blending of Physicality and Spirit</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Physical Incarnation</h4>
          <p>Physical incarnation is the process by which consciousness from higher dimensions or realms of spirit inhabits a physical body. This union of physicality and spirit creates a dynamic field of energetic tension, characterized by the interplay of divine masculine and divine feminine polarities. These polarities are essential for the manifestation and experience of life in the physical realm.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Energetic Tension</h4>
          <p>The energetic tension between the divine masculine and divine feminine creates a field of interaction that shapes our reality. This tension is not merely oppositional but also complementary, facilitating growth, evolution, and the manifestation of physical experiences.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The Neutral Point: The Action Child</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">The Middle Energetic Node</h4>
          <p>At the center of the energetic tension between the divine masculine and feminine lies a neutral point, representing 33% of the total energy. This middle energetic node, or action child, is mutable and can adopt either masculine or feminine qualities. It serves as a dynamic balancing point that allows for the fluid expression of both polarities.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">The Role of the Action Child</h4>
          <p>The action child embodies the potential for transformation and adaptability. As individuals incarnate in the physical realm, the action child within them represents their capacity for growth, change, and the integration of both masculine and feminine aspects.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The Journey of Self-Actualization</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Resolution of Inner Darkness</h4>
          <p>A crucial aspect of physical life is the individual journey toward self-actualization. This involves confronting and resolving the darkness that dwells within, such as spiritual attachments, shadow energies, and negative emotions like anger, guilt, shame, and self-pity. Overcoming these challenges requires taking responsibility for one's actions and emotions, rather than externalizing blame.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Commanding Shadow Energies</h4>
          <p>By acknowledging and commanding shadow energies, individuals can transform and integrate these aspects, leading to greater self-awareness and spiritual growth. This process is essential for achieving balance and harmony within oneself and with the surrounding environment.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Moving Beyond Scarcity and Competition</h4>
          <p>Instead of cultivating a false narrative of scarcity, competition, and nihilism, which aligns individuals with a challenging life of "dog eat dog" or "eat or be eaten" themes, a more useful construct focuses on singular challenges, difficulties, and lessons learned in this life. Emphasizing personal growth, unique experiences, and the reunion with soulmates, twin flames, and spirit family creates a more meaningful and purposeful existence.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">Energetic Dynamics: Centrifugal and Centripetal Forces</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Centrifugal Explosion</h4>
          <p>Centrifugal force, representing the masculine principle, moves energy outward from the center. It is associated with ejection, erection, individual ego, and the perceived separation from the divine creator. This force drives the expression of self and the exploration of external realities.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Centripetal Compression</h4>
          <p>Centripetal force, embodying the feminine principle, moves energy inward toward the center. It is characterized by higher pressure and compression, representing receptivity, nurturing, and the return to the source. This force fosters introspection, internal order, and the negation of entropy, leading to the expansion of life.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The Dance of Electricity and Magnetism</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Masculine Electricity</h4>
          <p>Electricity symbolizes the masculine aspect, characterized by dynamic, outward-moving energy. It represents action, creation, and the assertion of individuality. The red, larger wave electromagnetic frequencies (EMF) are associated with this masculine force.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Feminine Magnetism</h4>
          <p>Magnetism signifies the feminine aspect, characterized by receptive, inward-moving energy. It embodies attraction, nurturing, and the synthesis of experiences. The blue, smaller wave EMF is linked to this feminine force.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The Divine Trinity: DNA and the Fractal Image of God</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">The Helix of Life</h4>
          <p>The DNA helix, composed of two parallel spirals connected by ladder rungs or triplet codons, symbolizes the divine trinity. This structure reflects the true nature of the Trinity: two energetic polarities held in 33% tension, creating a third, mutable node—the action child.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">The Fractal Image of God</h4>
          <p>Each individual, as a unique fractal image of God, contains this divine trinity within their DNA. This trinity embodies the harmonious balance of the divine masculine and feminine, unified through the action child. It represents the interconnectedness of all life and the profound nature of creation.</p>
          
          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">Unique Exploration and Self-Discovery</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Singular Challenges and Lessons</h4>
          <p>The most important aspects of a physical life center around the individual's unique exploration of the world. This includes their Cartesian position, cultural heritage, process of discovery, and reunion with soulmates, twin flames, and spirit family. Each person's journey is marked by energetic milestones that signify growth and increased coherence.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Energetic Mile Markers</h4>
          <p>As individuals progress and grow, they achieve energetic mile markers that signify increased centripetal pressurization and four-wave coherence. These markers represent the order and elucidation of their most singular identity, moving closer to the exact balance point where their unique purpose, truth, and satisfaction are realized.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Zero Function Search</h4>
          <p>At the core of this journey is the zero function search for individual identity, purpose, truth, satisfaction, and the practice of unconditional love. This search finds its most coherent form at the exact balance point, where the divine masculine and feminine energies are perfectly harmonized.</p>

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">The True Competition: Within Ourselves</h3>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Internal Competition</h4>
          <p>The real competition in this life dwells within each of us, as we grapple with our own shadows and strive for self-actualization. Cut-throat tactics, often encouraged by educational systems that glorify money, possessions, and profit, can mislead individuals into a life of constant external competition and comparison.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">False Narratives and Their Impact</h4>
          <p>Society's obsession with comparison, perceived shortcomings, character or celebrity worship, and the belief that external entities will save us leads to a depletion of vitality and an increase in suffering. Massive propaganda campaigns and outright lies pervade public discourse, creating a reality that is more nightmare than dream.</p>
          <h4 className="text-xl font-bold font-headline text-foreground mt-4">Sorting the Fruits of the Tree</h4>
          <p>By examining the "fruits of the tree," the intent behind actions and beliefs is revealed. If the results are hate, anger, rage, loathing, envy, jealousy, division, gossip, suppression, and selfish intent, the fruit is a poison pill. Conversely, if the fruit fosters reconciliation, truth-seeking, gratitude, inclusion, mercy, forgiveness, and unconditional love, it is cast in the example of Christ in service to others.</p>
          
          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">Conclusion</h3>
          <p>This new model of the meaning of life suggests that physical incarnation is an equal blend of physicality and spirit, expressed through the dynamic interplay of divine masculine and feminine energies. The journey of self-actualization involves resolving inner darkness and embracing the action child within. By moving beyond narratives of scarcity and competition, individuals can focus on unique challenges, discoveries, and reunions with soulmates and spirit family. Understanding the energetic dynamics of centrifugal and centripetal forces, as well as the dance of electricity and magnetism, provides a deeper insight into the nature of existence. Ultimately, the divine trinity, reflected in our DNA, reveals the profound interconnectedness and unity of all life, embodying the essence of the creator.</p>
          <p>By understanding and applying these principles, we can enhance our ability to manifest our desires and create meaningful change in our lives.</p>
          <p>Ultimately, our divine composition involves full spectrum expression in both heaven and the physical world. This is what is truly meant when the Christ describes bringing heaven to earth. To be whole is to be fully present in both realms</p>
          

          <h3 className="text-2xl font-bold font-headline text-foreground mt-8">References</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Botvinick, M., & Cohen, J. (1998). Rubber hands 'feel' touch that eyes see. Nature, 391(6669), 756.</li>
            <li>Driskell, J. E., Copper, C., & Moran, A. (1994). Does mental practice enhance performance? Journal of Applied Psychology, 79(4), 481-492.</li>
            <li>Kosslyn, S. M., Ganis, G., & Thompson, W. L. (2001). Neural foundations of imagery. Nature Reviews Neuroscience, 2(9), 635-642.</li>
            <li>Reiter, R. J. (1991). Melatonin: The chemical expression of darkness. Molecular and Cellular Endocrinology, 79(1-3), C153-C158.</li>
            <li>Strassman, R. (2001). DMT: The Spirit Molecule: A Doctor's Revolutionary Research into the Biology of Near-Death and Mystical Experiences. Park Street Press.</li>
          </ul>
        </div>

        <div className="flex justify-between items-center mt-8 border-t pt-8">
            <Button asChild variant="outline">
              <Link href="/training">Skip to Training</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/directions">Next: How to Use <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>

      </div>
    </div>
  );
}
