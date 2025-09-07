import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl text-center shadow-2xl relative overflow-hidden bg-card/80 backdrop-blur-sm">
           <div className="absolute inset-0 w-full h-full aurora-bg opacity-30"></div>
           <CardHeader className="relative">
            <div className="mx-auto w-40 h-40 mb-4 text-primary">
              <Logo />
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold font-headline text-primary">Welcome to 3rd Eye CrossTraining</CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
              Stimulate your Pineal Gland and unlock your inner vision with stereoscopic video exercises.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Begin Training <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More <Info /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
