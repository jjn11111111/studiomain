
'use client';
import Header from '@/components/Header';
import { PlayCircle } from 'lucide-react';

export default function DirectionsPage() {
  const sampleVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/pinealvision.firebasestorage.app/o/Untitled%20design(12).MP4?alt=media';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">Practice Area</h1>
            <p className="text-muted-foreground mt-2">Use these videos to practice the viewing technique before starting the modules.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <video
              src={sampleVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-muted border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PlayCircle className="h-12 w-12 mx-auto" />
                <p>Video Placeholder {i + 2}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
