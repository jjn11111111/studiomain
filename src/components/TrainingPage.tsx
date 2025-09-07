'use client';

import { useState } from 'react';
import { exerciseData } from '@/lib/data';
import type { Unit, Video } from '@/lib/data';
import UnitCard from './UnitCard';
import { BrainCircuit, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenuItem, SidebarMenu, SidebarProvider, SidebarMenuButton } from './ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useProgress } from '@/hooks/use-progress';
import StereoVideoPlayer from './StereoVideoPlayer';
import AffirmationGenerator from './AffirmationGenerator';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { ColoredGroupTitle } from './ColoredGroupTitle';

export default function TrainingPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ unit: Unit; video: Video } | null>(null);
  const { completedVideos, markAsComplete, isComplete } = useProgress();
  const { toast } = useToast();

  const handleSelectVideo = (unit: Unit, video: Video) => {
    setSelectedVideo({ unit, video });
  };

  const allVideos: { unit: Unit; video: Video }[] = exerciseData.flatMap(u => u.videos.map(v => ({ unit: u, video: v })));
  
  let currentIndex = -1;
  if(selectedVideo) {
    currentIndex = allVideos.findIndex(item => item.video.id === selectedVideo.video.id);
  }

  const previousVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  const handleComplete = () => {
    if (selectedVideo) {
      if (!isComplete(selectedVideo.video.id)) {
        markAsComplete(selectedVideo.video.id);
        toast({
          title: "Exercise Complete!",
          description: `You've completed "${selectedVideo.video.title}".`,
        });
      }
      if (nextVideo) {
        setSelectedVideo(nextVideo);
      } else {
        setSelectedVideo(null); // Go back to curriculum
      }
    }
  };
  
  const handleBackToTraining = () => {
    setSelectedVideo(null);
  };

  const getThemeClass = (unit: Unit | undefined) => {
    if (!unit) return '';
    return `unit-${unit.id.split('-')[1]}-theme`;
  };

  return (
    <SidebarProvider>
      <div className={cn("flex h-full", getThemeClass(selectedVideo?.unit))}>
        <Sidebar collapsible="icon">
           <SidebarHeader>
              <Link href="/" className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg font-headline text-primary">3rd Eye CrossTraining</span>
              </Link>
           </SidebarHeader>
           <SidebarContent>
            {exerciseData.map(unit => (
               <div key={unit.id} className="p-2">
                 <h3 className="text-sm font-semibold text-muted-foreground px-2 font-headline">
                   <ColoredGroupTitle title={unit.title} />
                 </h3>
                 <SidebarMenu>
                  {unit.videos.map((video) => {
                    const isCompleted = completedVideos.has(video.id);
                    const isActive = selectedVideo?.video.id === video.id;
                    return (
                       <SidebarMenuItem key={video.id}>
                         <SidebarMenuButton
                           onClick={() => handleSelectVideo(unit, video)}
                           isActive={isActive}
                           tooltip={video.title}
                           className={cn(
                               "justify-start w-full",
                               isActive && "font-bold bg-accent/10 text-accent-foreground",
                           )}
                         >
                           {isCompleted ? (
                             <CheckCircle className="h-4 w-4 text-primary" />
                           ) : (
                             <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                           )}
                           <span>{video.title}</span>
                         </SidebarMenuButton>
                       </SidebarMenuItem>
                    );
                  })}
                 </SidebarMenu>
               </div>
            ))}
           </SidebarContent>
        </Sidebar>
        <SidebarInset>
          {selectedVideo ? (
             <div className="flex flex-col p-4 md:p-8 h-full">
              <header className="mb-6">
                <div className="text-sm font-medium text-accent font-headline">
                  <ColoredGroupTitle title={selectedVideo.unit.title} /> - Level {selectedVideo.video.level}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{selectedVideo.video.title}</h1>
                <p className="mt-2 text-muted-foreground">{selectedVideo.video.description}</p>
              </header>

              <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <StereoVideoPlayer thumbnailUrl={selectedVideo.video.thumbnailUrl} videoUrl={selectedVideo.video.videoUrl} />
                  <div className="flex justify-between items-center mt-auto pt-4">
                    {previousVideo ? (
                      <Button variant="outline" onClick={() => setSelectedVideo(previousVideo)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                    ) :  (
                       <Button variant="outline" onClick={handleBackToTraining}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training
                        </Button>
                    )}
                    <Button onClick={handleComplete} size="lg" className="bg-primary hover:bg-primary/90">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      {isComplete(selectedVideo.video.id) ? 'Next Exercise' : 'Mark as Complete & Next'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <AffirmationGenerator unit={selectedVideo.unit} video={selectedVideo.video} />
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2 flex items-center justify-center gap-4">
                  <BrainCircuit className="w-12 h-12" />
                  Training Curriculum
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Select an exercise from the sidebar to begin your training. The visual exercises combine features of visual optics, spatial depth, super symmetry, and directions of rotation or spin to stimulate structures of the brain and visual cortex.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                {exerciseData.map((unit) => (
                  <UnitCard 
                    key={unit.id} 
                    unit={unit} 
                    completedVideos={completedVideos} 
                    isInitialized={true}
                    onSelectVideo={(video) => handleSelectVideo(unit, video)}
                  />
                ))}
              </div>
            </div>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
