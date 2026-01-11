"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Eye,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface StereoscopicPlayerProps {
  exerciseId: string
  title: string
  duration: number // in seconds
  onComplete?: () => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
}

export function StereoscopicPlayer({
  exerciseId,
  title,
  duration,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: StereoscopicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [separation, setSeparation] = useState(50) // Distance between stereo images
  const [showGuides, setShowGuides] = useState(true)

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration - 1) {
            setIsPlaying(false)
            onComplete?.()
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentTime, duration, onComplete])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const reset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="flex flex-col h-full">
      {/* Main viewer area */}
      <div className="flex-1 relative bg-black rounded-xl overflow-hidden min-h-[400px]">
        {/* Stereoscopic display area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Left image */}
          <div className="absolute transition-all duration-300" style={{ transform: `translateX(-${separation}px)` }}>
            <StereoscopicPattern exerciseId={exerciseId} time={currentTime} isPlaying={isPlaying} side="left" />
          </div>

          {/* Right image */}
          <div className="absolute transition-all duration-300" style={{ transform: `translateX(${separation}px)` }}>
            <StereoscopicPattern exerciseId={exerciseId} time={currentTime} isPlaying={isPlaying} side="right" />
          </div>

          {/* Center guide dot */}
          {showGuides && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80">Focus here</span>
            </div>
          )}
        </div>

        {/* Overlay info */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="text-sm text-foreground/70 bg-background/50 px-3 py-1 rounded-full">{title}</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-background/50 hover:bg-background/70">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>How to View</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Cross-eyed method:</strong> Cross your eyes slightly until the two
                  images merge into one 3D image in the center.
                </p>
                <p>
                  <strong className="text-foreground">Parallel method:</strong> Relax your eyes and look "through" the
                  screen until the images merge.
                </p>
                <p>
                  <strong className="text-foreground">Tips:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Start with the screen at arm's length</li>
                  <li>Focus on the guide dot first</li>
                  <li>Adjust separation using the slider below</li>
                  <li>Be patient - it may take a few moments</li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 space-y-4">
        {/* Time display */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{formatTime(currentTime)}</span>
          <span className="text-muted-foreground">{formatTime(duration)}</span>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={reset} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={!hasNext}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Settings */}
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-3 flex-1">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">Separation</span>
            <Slider
              value={[separation]}
              onValueChange={([val]) => setSeparation(val)}
              min={20}
              max={100}
              step={5}
              className="flex-1"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGuides(!showGuides)}
            className={`text-sm ${showGuides ? "text-primary" : "text-muted-foreground"}`}
          >
            Guides {showGuides ? "On" : "Off"}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Maximize className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Component that generates the stereoscopic patterns
function StereoscopicPattern({
  exerciseId,
  time,
  isPlaying,
  side,
}: {
  exerciseId: string
  time: number
  isPlaying: boolean
  side: "left" | "right"
}) {
  // Generate different patterns based on exercise ID
  const patternType = Number.parseInt(exerciseId) % 4

  return (
    <div className="w-64 h-64 relative">
      {patternType === 0 && <ConcentricCircles time={time} isPlaying={isPlaying} side={side} />}
      {patternType === 1 && <SacredGeometry time={time} isPlaying={isPlaying} side={side} />}
      {patternType === 2 && <FloatingOrbs time={time} isPlaying={isPlaying} side={side} />}
      {patternType === 3 && <GridPattern time={time} isPlaying={isPlaying} side={side} />}
    </div>
  )
}

// Pattern: Concentric circles
function ConcentricCircles({ time, isPlaying, side }: { time: number; isPlaying: boolean; side: "left" | "right" }) {
  const offset = side === "left" ? -5 : 5
  const pulse = isPlaying ? Math.sin(time * 0.5) * 10 : 0

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={i}
          cx={100 + offset}
          cy={100}
          r={r + pulse * (i * 0.3)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          opacity={0.3 + i * 0.2}
        />
      ))}
      <circle cx={100 + offset * 2} cy={100} r={8} fill="currentColor" className="text-primary" />
    </svg>
  )
}

// Pattern: Sacred geometry (flower of life inspired)
function SacredGeometry({ time, isPlaying, side }: { time: number; isPlaying: boolean; side: "left" | "right" }) {
  const offset = side === "left" ? -8 : 8
  const rotation = isPlaying ? time * 2 : 0

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: `rotate(${rotation}deg)` }}>
      {/* Center circle */}
      <circle
        cx={100 + offset}
        cy={100}
        r={30}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary"
        opacity={0.6}
      />
      {/* Surrounding circles */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const x = 100 + offset + Math.cos((angle * Math.PI) / 180) * 30
        const y = 100 + Math.sin((angle * Math.PI) / 180) * 30
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={30}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary"
            opacity={0.4}
          />
        )
      })}
      {/* Inner detail */}
      <circle cx={100 + offset * 1.5} cy={100} r={10} fill="currentColor" className="text-primary" opacity={0.8} />
    </svg>
  )
}

// Pattern: Floating orbs with depth
function FloatingOrbs({ time, isPlaying, side }: { time: number; isPlaying: boolean; side: "left" | "right" }) {
  const baseOffset = side === "left" ? -1 : 1

  const orbs = [
    { x: 100, y: 100, r: 20, depth: 0, speed: 1 },
    { x: 60, y: 70, r: 12, depth: 2, speed: 1.5 },
    { x: 140, y: 80, r: 15, depth: 1, speed: 0.8 },
    { x: 80, y: 140, r: 10, depth: 3, speed: 1.2 },
    { x: 130, y: 130, r: 14, depth: 2, speed: 1 },
  ]

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {orbs.map((orb, i) => {
        const depthOffset = baseOffset * orb.depth * 4
        const yOffset = isPlaying ? Math.sin(time * orb.speed + i) * 5 : 0
        return (
          <circle
            key={i}
            cx={orb.x + depthOffset}
            cy={orb.y + yOffset}
            r={orb.r}
            fill="currentColor"
            className="text-primary"
            opacity={0.3 + (3 - orb.depth) * 0.2}
          />
        )
      })}
    </svg>
  )
}

// Pattern: Grid with depth
function GridPattern({ time, isPlaying, side }: { time: number; isPlaying: boolean; side: "left" | "right" }) {
  const baseOffset = side === "left" ? -1 : 1
  const wave = isPlaying ? time * 0.3 : 0

  const points = []
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const depth = Math.abs(2 - x) + Math.abs(2 - y)
      points.push({
        x: 40 + x * 30,
        y: 40 + y * 30,
        depth,
      })
    }
  }

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {points.map((point, i) => {
        const depthOffset = baseOffset * point.depth * 3
        const zOffset = isPlaying ? Math.sin(wave + point.x * 0.05 + point.y * 0.05) * 3 : 0
        return (
          <circle
            key={i}
            cx={point.x + depthOffset}
            cy={point.y + zOffset}
            r={6 - point.depth * 0.5}
            fill="currentColor"
            className="text-primary"
            opacity={0.8 - point.depth * 0.15}
          />
        )
      })}
    </svg>
  )
}
