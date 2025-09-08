
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


export default function TrainingPage() {
  const { completedVideos } = useProgress();
  const router = useRouter();


  const handleSelectVideo = (unit: Unit, video: Video) => {
    router.push(`/exercise/${unit.id}/${video.id}`);
  };


  const getThemeClass = (unit: Unit | undefined) => {
    if (!unit) return '';
    return `unit-${unit.id.split('-')[1]}-theme`;
  };

  return (
    <SidebarProvider>
      <div className={cn("flex h-full")}>
        <Sidebar collapsible="icon">
           <SidebarHeader>
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-lg font-headline text-primary">3rd Eye CrossTraining</span>
              </Link>
           </SidebarHeader>
           <SidebarContent>
            {exerciseData.map(unit => (
               <div key={unit.id} className={cn("p-2", getThemeClass(unit))}>
                 <h3 className="text-sm font-semibold text-muted-foreground px-2 font-headline">
                   {unit.title}: <span className="text-primary">{unit.groupName}</span>
                 </h3>
                 <SidebarMenu>
                  {unit.videos.map((video) => {
                    const isCompleted = completedVideos.has(video.id);
                    return (
                       <SidebarMenuItem key={video.id}>
                         <SidebarMenuButton
                           onClick={() => handleSelectVideo(unit, video)}
                           tooltip={video.title}
                           className={cn(
                               "justify-start w-full",
                           )}
                         >
                           {isCompleted ? (
                             <CheckCircle className="h-4 w-4 text-primary" />
                           ) : (
                             <Circle className="h-4 w-4 text-muted-foreground" />
                           )}
                           <span>
                             <ColoredLetterTitle title={video.title} />
                           </span>
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2 flex items-center justify-center gap-4">
                  CrossTraining Modules
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
