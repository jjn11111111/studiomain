'use client';
import Header from '@/components/Header';
import Image from 'next/image';

export default function DirectionsPage() {
  const imageUrl1 = "/stereogram-cd-stars.png";
  const imageUrl2 = "/stereogram-astronaut.png";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl1} alt="Stereogram of a CD with pink stars" width={800} height={450} className="object-cover" data-ai-hint="cd stars" />
          </div>
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl2} alt="Stereogram of an astronaut in space" width={800} height={450} className="object-cover" data-ai-hint="astronaut space" />
          </div>
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl2} alt="Stereogram of an astronaut in space" width={800} height={450} className="object-cover" data-ai-hint="astronaut space" />
          </div>
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl2} alt="Stereogram of an astronaut in space" width={800} height={450} className="object-cover" data-ai-hint="astronaut space" />
          </div>
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
             <Image src={imageUrl2} alt="Stereogram of an astronaut in space" width={800} height={450} className="object-cover" data-ai-hint="astronaut space" />
          </div>
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg aspect-video flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Empty Container 6</span>
          </div>
        </div>
      </main>
    </div>
  );
}
