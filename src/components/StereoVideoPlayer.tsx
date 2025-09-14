
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
    
    if (video.paused) {
      if (hasEnded) {
        setHasEnded(false);
        video.currentTime = 0;
      }
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation(); 
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
    setIsPlaying(false);
    setHasEnded(false);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
          setIsPlaying(true);
      }).catch(err => {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
      });
    }
  }, [videoUrl]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        playsInline
        muted
        autoPlay
        loop
        className="w-full h-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onVideoEnded}
        data-ai-hint="abstract space"
      />
      <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity z-10",
          (isHovered || !isPlaying || hasEnded) ? 'opacity-100' : 'opacity-0'
        )}>
        {hasEnded ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReplay}
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm flex flex-col items-center pointer-events-auto"
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
              className="h-20 w-20 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm pointer-events-auto"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-2" />}
            </Button>
        )}
      </div>

       <div className={cn(
            "absolute bottom-4 right-4 z-10 transition-opacity",
            (isHovered || !isPlaying || hasEnded) ? 'opacity-100' : 'opacity-0'
        )}>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="h-12 w-12 text-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm pointer-events-auto"
                aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
                {isFullScreen ? <Shrink className="h-7 w-7" /> : <Expand className="h-7 w-7" />}
            </Button>
        </div>
    </div>
  );
}
