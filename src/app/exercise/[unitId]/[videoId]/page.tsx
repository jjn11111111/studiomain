
'use client';

import { useParams } from 'next/navigation';
import { exerciseData } from '@/lib/data';
import type { Unit, Video } from '@/lib/data';
import StereoVideoPlayer from '@/components/StereoVideoPlayer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import AffirmationGenerator from '@/components/AffirmationGenerator';
import { cn } from '@/lib/utils';
import ExerciseSidebar from '@/components/ExerciseSidebar';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import ColoredLetterTitle from '@/components/ColoredLetterTitle';

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
        router.push('/training'); // Go back to curriculum page if it's the last video
      }
    }
  };

  const getThemeClass = (unit: Unit | undefined) => {
    if (!unit) return '';
    return `unit-${unit.id.split('-')[1]}-theme`;
  };
  
  if (!unit || !video) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    <SidebarProvider>
      <div className={cn("flex h-full", getThemeClass(unit))}>
        <Sidebar collapsible="icon">
          <ExerciseSidebar 
            unit={unit} 
            currentVideoId={video.id} 
            completedVideos={completedVideos} 
          />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col p-4 md:p-8 h-full">
            <header className="mb-6">
              <div className="text-sm font-medium text-accent font-headline">
                {unit.title}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                <ColoredLetterTitle title={video.title} />
              </h1>
              <p className="mt-2 text-muted-foreground">{video.description}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
              <div className="lg:col-span-2 flex flex-col gap-4">
                 <StereoVideoPlayer thumbnailUrl={video.thumbnailUrl} videoUrl={video.videoUrl} />
              </div>
              <div className="lg:col-span-1">
                <AffirmationGenerator unit={unit} video={video} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto pt-6 border-t mt-6">
                {previousVideo ? (
                  <Button variant="outline" onClick={() => router.push(`/exercise/${previousVideo.unit.id}/${previousVideo.video.id}`)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                ) :  (
                   <Button variant="outline" onClick={() => router.push('/training')}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training
                    </Button>
                )}
                <Button onClick={handleComplete} size="lg" className="bg-primary hover:bg-primary/90">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {isComplete(video.id) ? 'Next Exercise' : 'Mark Complete & Next'}
                  {nextVideo && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
