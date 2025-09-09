
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
          <h1 className="text-5xl font-bold font-headline text-black dark:text-white">How to Use the Exercises</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow these steps to unlock the 3D stereoscopic images and engage your third eye.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-accent flex items-center gap-2"><HelpCircle/> The Technique</h2>
            <p className="text-lg text-muted-foreground">
              Each exercise is designed to be viewed with stereoscopic vision. Users may be familiar with dot matrix prints which seem abstract until one allows their vision focus to lapse the slightest bit at which point, a hologram figure develops and emerges.
            </p>
            <p className="text-lg text-muted-foreground">
              The distance between two human eyes is about 2 inches. Thus, this retinal disparity helps the brain to process and assess a sense of distance. The brain utilises all these spatial components of information in tandem to bring about precise depth information in an expanded format know as stereoscopic vision.
            </p>
             <p className="text-lg text-muted-foreground">
              Answersingenesis.com says, "To see a stereo image, you need to cross your eyes(that's opposite of how it works normanlly, but it's easier to do) stare at the photos and cross your eyes until one photo overlaps the other. Three images will appear. When you see them, focus on the middle one, and it will appear to have depth."
            </p>
            <p className="text-lg text-muted-foreground">
              Practice by viewing the stereoscopic images below and use the directions above as a guide. When you achieve clarity with the 3rd image in the middle, hold it for at least 30 seconds.
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
