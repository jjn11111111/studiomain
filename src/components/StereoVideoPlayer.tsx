
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from './ui/card';
import { Play, Pause, RefreshCw, Expand, Shrink } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface StereoVideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
}

export default function StereoVideoPlayer({ thumbnailUrl, videoUrl }: StereoVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only play/pause. Replay is handled by its own button.
    if (video.paused) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the main click handler from firing
    const video = videoRef.current;
    if (video) {
        setHasEnded(false);
        video.currentTime = 0;
        video.play().catch(console.error);
    }
  }

  const togglePlayButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayPause();
  };
  
  const onVideoEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
  }

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const onFullscreenChange = useCallback(() => {
    setIsFullScreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [onFullscreenChange]);

  useEffect(() => {
    // Reset state when video source changes
    setIsPlaying(false);
    setHasEnded(false);
    if (videoRef.current) {
        videoRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            // Autoplay was blocked, user will need to click play.
            setIsPlaying(false);
        });
    }
  }, [videoUrl]);


  return (
    <Card 
      ref={containerRef}
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
          playsInline
          muted
          autoPlay
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={onVideoEnded}
          data-ai-hint="abstract space"
        />
      </div>
      <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
          (isHovered || !isPlaying || hasEnded) ? 'opacity-100' : 'opacity-0'
        )}>
        {hasEnded ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReplay}
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm flex flex-col items-center"
              aria-label="Replay video"
            >
              <RefreshCw className="h-10 w-10" />
              <span className="text-xs mt-1">Replay</span>
            </Button>
        ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayButton}
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-2" />}
            </Button>
        )}
      </div>

       <div className={cn(
            "absolute bottom-2 right-2 transition-opacity",
            (isHovered || !isPlaying || hasEnded) ? 'opacity-100' : 'opacity-0'
        )}>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="h-10 w-10 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm"
                aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
                {isFullScreen ? <Shrink className="h-6 w-6" /> : <Expand className="h-6 w-6" />}
            </Button>
        </div>
    </Card>
  );
}
