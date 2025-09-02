'use client';

import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

interface StereoVideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
}

export default function StereoVideoPlayer({ thumbnailUrl, videoUrl }: StereoVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    
    if (nextIsPlaying) {
      videoRef.current?.play().catch(console.error);
    } else {
      videoRef.current?.pause();
    }
  };

  const togglePlayButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
  };

  return (
    <Card 
      className="aspect-video w-full overflow-hidden shadow-lg border-2 border-primary/20 relative cursor-pointer bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
    >
      <div className="h-full w-full bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          loop
          playsInline
          muted
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          data-ai-hint="abstract space"
        />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${(isHovered || !isPlaying) ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayButton}
          className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-2" />}
        </Button>
      </div>
    </Card>
  );
}
