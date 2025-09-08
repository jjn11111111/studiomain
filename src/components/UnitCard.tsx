
'use client';
import type { Unit, Video } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowRight, Lock, PlayCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface UnitCardProps {
  unit: Unit;
  completedVideos: Set<string>;
  isInitialized: boolean;
  onSelectVideo: (video: Video) => void;
}

export default function UnitCard({ unit, completedVideos, isInitialized, onSelectVideo }: UnitCardProps) {
  const completedInUnit = unit.videos.filter(v => completedVideos.has(v.id)).length;
  const totalInUnit = unit.videos.length;
  const progress = totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

  const firstUncompletedVideo = unit.videos.find(v => !completedVideos.has(v.id)) || unit.videos[0];
  
  const isLocked = false; // Future logic for unlocking units can go here.
  
  const themeClass = `unit-${unit.id.split('-')[1]}-theme`;
  const colorClass = `text-unit-${unit.id.split('-')[1]}`;

  if (!isInitialized) {
    return (
      <Card className="flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="w-full md:w-2/3">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </CardHeader>
        <CardContent className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
        "flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
        themeClass
    )}>
      <CardHeader className="w-full md:w-2/3">
          <CardTitle className="font-headline text-2xl">
            {unit.title}: <span className={cn("font-bold", colorClass)}>{unit.groupName}</span>
          </CardTitle>
          <CardDescription>{unit.description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center gap-4 bg-muted/50 h-full">
          <div className="text-sm font-medium text-muted-foreground">
          {completedInUnit} / {totalInUnit} COMPLETED
          </div>
          <Progress value={progress} aria-label={`${progress.toFixed(0)}% complete`} />
          <Button onClick={() => onSelectVideo(firstUncompletedVideo)} disabled={isLocked} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLocked ? <Lock /> : (progress === 100 ? <ArrowRight/> : <PlayCircle />)}
              <span className="ml-2">{isLocked ? 'Locked' : (progress < 100 ? 'Start' : 'Review')}</span>
          </Button>
      </CardContent>
    </Card>
  );
}
