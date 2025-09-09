import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Eye, Waves, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

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
            <Image src="https://picsum.photos/600/400" alt="Abstract representation of brain activity" className="rounded-lg shadow-lg" data-ai-hint="abstract brain" width={600} height={400} />
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
