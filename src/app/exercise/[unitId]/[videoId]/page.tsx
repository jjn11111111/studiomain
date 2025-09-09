
'use client';

import { useParams } from 'next/navigation';
import { exerciseData } from '@/lib/data';
import type { Unit, Video } from '@/lib/data';
import StereoVideoPlayer from '@/components/StereoVideoPlayer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ArrowRight, List } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { completedVideos, markAsComplete, isComplete } = useProgress();

  const { unitId, videoId } = params;

  const unit = exerciseData.find((u) => u.id === unitId);
  const video = unit?.videos.find((v) => v.id === videoId);

  const allVideos: { unit: Unit; video: Video }[] = exerciseData.flatMap(u => 
    u.videos.map(v => ({ unit: u, video: v }))
  );
  
  let currentIndex = -1;
  if(unit && video) {
    currentIndex = allVideos.findIndex(item => item.video.id === video.id);
  }

  const previousVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  const handleComplete = () => {
    if (video) {
      if (!isComplete(video.id)) {
        markAsComplete(video.id);
        toast({
          title: "Exercise Complete!",
          description: `You've completed "${video.title}".`,
        });
      }
      
      if (nextVideo) {
        router.push(`/exercise/${nextVideo.unit.id}/${nextVideo.video.id}`);
      } else {
        router.push('/training');
      }
    }
  };
  
  if (!unit || !video) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Exercise not found</h1>
          <p>The exercise you are looking for does not exist.</p>
          <Button onClick={() => router.push('/training')} className="mt-4">
            Back to Training
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black">
      <StereoVideoPlayer thumbnailUrl={video.thumbnailUrl} videoUrl={video.videoUrl} />

      {/* Controls Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 pointer-events-none">
        {/* Top Controls */}
        <div className="flex justify-between items-start pointer-events-auto">
          <Button asChild variant="outline" className="bg-black/50 hover:bg-black/70 border-white/20 text-white">
            <Link href="/training">
              <List className="mr-2 h-4 w-4" />
              Back to Training List
            </Link>
          </Button>
          <div className="text-right text-white bg-black/50 p-3 rounded-lg">
             <h1 className="text-xl md:text-2xl font-bold font-headline">{video.title}</h1>
             <p className="text-sm md:text-base text-white/80">{unit.title}: {unit.groupName}</p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-end pointer-events-auto">
            {previousVideo ? (
              <Button variant="outline" onClick={() => router.push(`/exercise/${previousVideo.unit.id}/${previousVideo.video.id}`)} className="bg-black/50 hover:bg-black/70 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : ( 
              <div /> // Spacer
            )}
            <Button onClick={handleComplete} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              <CheckCircle className="mr-2 h-5 w-5" />
              {isComplete(video.id) ? 'Next Exercise' : 'Mark Complete & Next'}
              {nextVideo && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
        </div>
      </div>
    </div>
  );
}
