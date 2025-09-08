
'use client';
import type { Unit } from '@/lib/data';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from './ui/sidebar';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ColoredLetterTitle from './ColoredLetterTitle';

interface ExerciseSidebarProps {
  unit: Unit;
  currentVideoId: string;
  completedVideos: Set<string>;
}

export default function ExerciseSidebar({ unit, currentVideoId, completedVideos }: ExerciseSidebarProps) {
  const getColorClass = (unit: Unit | undefined) => {
    if (!unit) return '';
    return `text-unit-${unit.id.split('-')[1]}`;
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/training" className="flex items-center gap-2">
            <span className="font-bold text-lg font-headline text-primary">3rd Eye CrossTraining</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
            <h3 className="text-sm font-semibold text-muted-foreground px-2 font-headline">
              {unit.title}: <span className={cn("font-bold", getColorClass(unit))}>{unit.groupName}</span>
            </h3>
        </div>
        <SidebarMenu>
          {unit.videos.map((video) => {
            const isCompleted = completedVideos.has(video.id);
            const isActive = video.id === currentVideoId;
            return (
              <SidebarMenuItem key={video.id}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={video.title}
                  className={cn(
                      "justify-start w-full",
                      isActive && "font-bold bg-accent/10 text-accent-foreground",
                  )}
                >
                  <Link href={`/exercise/${unit.id}/${video.id}`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span><ColoredLetterTitle title={video.title} unitId={unit.id} /></span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
