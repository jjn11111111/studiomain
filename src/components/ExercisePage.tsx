'use client';

import type { Unit, Video } from '@/lib/data';
import { useProgress } from '@/hooks/use-progress';
import { SidebarProvider, Sidebar, SidebarInset } from './ui/sidebar';
import ExerciseSidebar from './ExerciseSidebar';
import StereoVideoPlayer from './StereoVideoPlayer';
import AffirmationGenerator from './AffirmationGenerator';
import { Button } from './ui/button';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ColoredGroupTitle } from './ColoredGroupTitle';

interface ExercisePageProps {
  unit: Unit;
  video: Video;
  previousVideoLink: string | null;
  nextVideoLink: string | null;
}

export default function ExercisePage({
  unit,
  video,
  previousVideoLink,
  nextVideoLink,
}: ExercisePageProps) {
  const { isComplete, markAsComplete, completedVideos } = useProgress();
  const { toast } = useToast();
  const router = useRouter();
  const isCompleted = isComplete(video.id);
  
  const themeClass = `unit-${unit.id.split('-')[1]}-theme`;

  const handleComplete = () => {
    if (!isCompleted) {
      markAsComplete(video.id);
      toast({
        title: "Exercise Complete!",
        description: `You've completed "${video.title}".`,
      });
    }
    if (nextVideoLink) {
      router.push(nextVideoLink);
    } else {
      router.push('/');
    }
  };

  return (
    <SidebarProvider>
      <div className={cn("flex h-full", themeClass)}>
        <Sidebar collapsible="icon">
          <ExerciseSidebar unit={unit} currentVideoId={video.id} completedVideos={completedVideos} />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col p-4 md:p-8 h-full">
            <header className="mb-6">
              <div className="text-sm font-medium text-accent font-headline">
                <ColoredGroupTitle title={unit.title} /> - Level {video.level}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{video.title}</h1>
              <p className="mt-2 text-muted-foreground">{video.description}</p>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <StereoVideoPlayer thumbnailUrl={video.thumbnailUrl} videoUrl={video.videoUrl} />
                <div className="flex justify-between items-center mt-auto pt-4">
                  {previousVideoLink ? (
                    <Button asChild variant="outline">
                      <Link href={previousVideoLink}><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Link>
                    </Button>
                  ) : <div />}
                  <Button onClick={handleComplete} size="lg" className="bg-primary hover:bg-primary/90">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {isCompleted ? 'Next Exercise' : 'Mark as Complete & Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <AffirmationGenerator unit={unit} video={video} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
