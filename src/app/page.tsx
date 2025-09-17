
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="relative text-center py-20 md:py-32 lg:py-40 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <video
              src="https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(7).mp4?alt=media"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25"></div> {/* Overlay */}
          </div>
          <div className="relative z-10 container mx-auto flex flex-col items-center">
            <Logo className="w-48 h-48 mb-8 text-foreground animate-fade-in" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline animate-fade-in-down" style={{ color: 'black', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
              3rd Eye CrossTraining
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in-up delay-200">
              Unlock human potential through the focused application of visual and sensory stimulation. These stereoscopic video exercises are designed to gently activate the pineal gland.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up delay-400">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/training">
                  Begin Training <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
