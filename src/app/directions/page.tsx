'use client';
import Header from '@/components/Header';
import { PlayCircle } from 'lucide-react';

export default function DirectionsPage() {
  const correctVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(10).mp4?alt=media';
  const secondVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(13).mp4?alt=media';
  const thirdVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(9).mp4?alt=media';
  const fourthVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(11).mp4?alt=media';

  const videos = [
    correctVideoUrl,
    secondVideoUrl,
    thirdVideoUrl,
    fourthVideoUrl,
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">Practice Area</h1>
            <p className="text-muted-foreground mt-2">Use these videos to practice the viewing technique before starting the modules.</p>
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
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PlayCircle className="h-12 w-12 mx-auto" />
                <p>Video Placeholder</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
