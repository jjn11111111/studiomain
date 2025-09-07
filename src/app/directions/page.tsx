import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Target, Eye, View, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DirectionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-headline text-primary">How to Use the Exercises</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow these steps to unlock the 3D stereoscopic images and engage your third eye.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <img src="https://placehold.co/600x400" alt="Abstract representation of vision" className="rounded-lg shadow-lg" data-ai-hint="abstract vision" />
            </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-accent flex items-center gap-2"><HelpCircle/> The Technique</h2>
            <p className="text-lg text-muted-foreground">
              The goal is to look "through" the screen, as if you are focusing on a point far behind it. This technique, often called "magic eye" or stereoscopic viewing, allows your brain to merge the two slightly different video streams into a single, three-dimensional image.
            </p>
            <p className="text-lg text-muted-foreground">
              This process can take practice. Be patient with yourself, relax, and let the image come to you. Avoid straining your eyes.
            </p>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-accent">Step-by-Step Guide</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye /> 1. Relax Your Gaze
                </CardTitle>
              </CardHeader>
              <CardContent>
                Start the video. Instead of focusing directly on the screen, allow your eyes to relax and your gaze to soften. Let the screen become slightly blurry.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target /> 2. Look Through
                </CardTitle>
              </CardHeader>
              <CardContent>
                Imagine you are looking at an object far behind your screen. Your eyes will naturally diverge, or un-cross. This is the key to the effect.
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <View /> 3. Find the Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                As you look through the screen, you'll notice the patterns start to overlap. A third, 3D image will begin to appear in the middle.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle /> 4. Hold & Observe
                </CardTitle>
              </CardHeader>
              <CardContent>
                Once the 3D image is clear, try to hold your focus there. Observe the depth, the movement, and any sensations you feel. Let your mind be still.
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end items-center mt-8 border-t pt-8">
            <Button asChild size="lg">
              <Link href="/training">Start Training <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>

      </div>
    </div>
  );
}
