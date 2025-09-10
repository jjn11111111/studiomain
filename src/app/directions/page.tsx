'use client';
import Header from '@/components/Header';
import { PlayCircle } from 'lucide-react';

export default function DirectionsPage() {
  const correctVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(10).mp4?alt=media';
  const secondVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(13).mp4?alt=media';
  const thirdVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(9).mp4?alt=media';
  const fourthVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(11).mp4?alt=media';
  const fifthVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(15).mp4?alt=media';

  const videos = [
    correctVideoUrl,
    secondVideoUrl,
    thirdVideoUrl,
    fourthVideoUrl,
    fifthVideoUrl,
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">How to View the Exercises</h1>
            <p className="text-muted-foreground mt-2">A guide to stereoscopic viewing.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground mb-12">
            <p>
                Each exercise is designed to be viewed with stereoscopic vision. Users may be familiar with dot matrix prints which seem abstract until one allows their vision focus to lapse the slightest bit at which point, a hologram figure develops and emerges.
            </p>
            <p>
                The distance between two human eyes is about 2 inches. Thus, this retinal disparity helps the brain to process and assess a sense of distance. The brain utilises all these spatial components of information in tandem to bring about precise depth information in an expanded format know as stereoscopic vision.
            </p>
            <blockquote className="border-l-4 pl-4 italic">
                Answersingenesis.com says, "To see a stereo image, you need to cross your eyes (that's opposite of how it works normanlly, but it's easier to do) stare at the photos and cross your eyes until one photo overlaps the other. Three images will appear. When you see them, focus on the middle one, and it will appear to have depth."
            </blockquote>
            <p className="font-semibold text-foreground">
                Practice by viewing the videos below and use the directions above as a guide. When you achieve clarity with the 3rd image in the middle, hold it for at least 30 seconds.
            </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {/* Videos */}
          {videos.map((url, index) => (
            <div key={index} className="w-full bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              <video
                src={url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Empty Placeholders */}
          {[...Array(1)].map((_, i) => (
            <div key={i} className="w-full bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PlayCircle className="h-12 w-12 mx-auto" />
                <p>Video Placeholder</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground mt-12">
            <p>
                All exercises created for this app require users to maintain stereoscopic viewing for the duration of each exercise. This is a key component, and while some level of 3rd eye stimulation may occur with standard vision, optimal results will most likely not occur.
            </p>
        </div>
      </main>
    </div>
  );
}
