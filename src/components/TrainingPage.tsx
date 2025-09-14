
'use client';

import { exerciseData } from '@/lib/data';
import type { Unit, Video } from '@/lib/data';
import UnitCard from './UnitCard';
import { CheckCircle, Circle } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenuItem, SidebarMenu, SidebarProvider, SidebarMenuButton } from './ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useProgress } from '@/hooks/use-progress';
import { useRouter } from 'next/navigation';
import ColoredLetterTitle from './ColoredLetterTitle';
import Header from './Header';


export default function TrainingPage() {
  const { completedVideos, isInitialized } = useProgress();
  const router = useRouter();


  const handleSelectVideo = (unit: Unit, video: Video) => {
    router.push(`/exercise/${unit.id}/${video.id}`);
  };


  const getThemeClass = (unit: Unit) => {
    return `unit-${unit.id.split('-')[1]}-theme`;
  };

  const getColorClass = (unit: Unit) => {
    return `text-unit-${unit.id.split('-')[1]}`;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <SidebarProvider>
          <div className={cn("flex h-full w-full")}>
            <Sidebar collapsible="icon">
              <SidebarHeader>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-lg font-headline text-primary">3rd Eye CrossTraining</span>
                  </Link>
              </SidebarHeader>
              <SidebarContent>
                {exerciseData.map(unit => (
                  <div key={unit.id} className="p-2">
                    <h3 className={cn("text-sm font-semibold px-2 font-headline", `text-unit-${unit.id.split('-')[1]}`)}>
                      {unit.title}: {unit.groupName}
                    </h3>
                    <SidebarMenu>
                      {unit.videos.map((video) => {
                        const isCompleted = completedVideos.has(video.id);
                        return (
                          <SidebarMenuItem key={video.id}>
                            <SidebarMenuButton
                              onClick={() => handleSelectVideo(unit, video)}
                              tooltip={video.title}
                              className="justify-start w-full"
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <ColoredLetterTitle title={video.title} unitId={unit.id} />
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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 overflow-auto h-full">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-2 flex items-center justify-center gap-4">
                      CrossTraining Modules
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                      For best results, complete all exercises in a module without stopping. Make sure you have read the directions page and practiced the stereoscopic vision adjustment. With each exercise, open the video, enlarge to full screen, adjust your vision, and then begin the video. Hold the stereoscopic position in your vision for the duration of the exercise. Please leave comments of your interactions and experience on the Journal page.
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                    {exerciseData.map((unit) => (
                        <div key={unit.id} className={getThemeClass(unit)}>
                          <UnitCard 
                            unit={unit} 
                            completedVideos={completedVideos} 
                            isInitialized={isInitialized}
                            onSelectVideo={(video) => handleSelectVideo(unit, video)}
                          />
                        </div>
                    ))}
                  </div>
                </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
