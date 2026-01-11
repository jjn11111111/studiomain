"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Play, Pause, Maximize, Volume2, VolumeX, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

interface Exercise {
  id: string
  module: string
  exercise_number: number
  title: string
  video_url: string
  duration_seconds?: number
}

interface VideoExerciseViewProps {
  moduleId: string
  moduleTitle: string
  exercise: Exercise
  exerciseNumber: number
  totalExercises: number
  prevExerciseNumber?: number
  nextExerciseNumber?: number
  colors: { bg: string; text: string; accent: string }
}

export function VideoExerciseView({
  moduleId,
  moduleTitle,
  exercise,
  exerciseNumber,
  totalExercises,
  prevExerciseNumber,
  nextExerciseNumber,
  colors,
}: VideoExerciseViewProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isMounted = true

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100
      setProgress(progress)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (nextExerciseNumber) {
        setTimeout(() => {
          router.push(`/exercises/${moduleId}/${nextExerciseNumber}`)
        }, 1500)
      }
    }

    const handleCanPlay = () => {
      if (isMounted) setVideoLoaded(true)
    }

    const handleError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement
      console.error("[v0] Video error details:", {
        error: videoElement.error?.message || "Unknown error",
        code: videoElement.error?.code,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
        src: videoElement.currentSrc,
        videoUrl: exercise.video_url,
      })
      if (isMounted) setVideoError(true)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      isMounted = false
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError as EventListener)
    }
  }, [nextExerciseNumber, moduleId, router, exercise.video_url])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video || videoError) return

    try {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        await video.play()
        setIsPlaying(true)
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setVideoError(true)
      }
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    video.currentTime = percentage * video.duration
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Bauhaus header bar */}
      <div className={`${colors.bg} ${colors.text} pt-20 pb-6 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/exercises/${moduleId}`}
            className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm font-bold tracking-[0.2em] uppercase">{moduleTitle}</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-sm font-bold tracking-[0.3em] opacity-50">
                {String(exerciseNumber).padStart(2, "0")} / {String(totalExercises).padStart(2, "0")}
              </span>
              <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight uppercase mt-1">
                {exercise.title}
              </h1>
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => prevExerciseNumber && router.push(`/exercises/${moduleId}/${prevExerciseNumber}`)}
                disabled={!prevExerciseNumber}
                className={`${colors.text} hover:bg-white/20 disabled:opacity-30`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => nextExerciseNumber && router.push(`/exercises/${moduleId}/${nextExerciseNumber}`)}
                disabled={!nextExerciseNumber}
                className={`${colors.text} hover:bg-white/20 disabled:opacity-30`}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-500 text-black px-4 py-3 flex items-center justify-center gap-3">
        <Eye className="w-5 h-5" />
        <p className="font-sans text-sm font-bold uppercase tracking-wide">
          Maintain stereoscopic vision throughout this exercise for optimal results
        </p>
        <Eye className="w-5 h-5" />
      </div>

      {/* Video player - full width Bauhaus style */}
      <div
        ref={containerRef}
        className="flex-1 bg-black relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {videoError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className={`${colors.bg} p-8 text-center`}>
              <p className={`font-sans text-xl font-bold ${colors.text} mb-2`}>Video Unavailable</p>
              <p className={`font-sans text-sm ${colors.text} opacity-70`}>Unable to load this exercise video</p>
              <p className={`font-sans text-xs ${colors.text} opacity-50 mt-2`}>Please ensure you are logged in</p>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            muted={isMuted}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onError={() => setVideoError(true)}
            key={exercise.video_url}
          >
            <source src={exercise.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Play overlay when paused */}
        {!isPlaying && !videoError && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <div className={`${colors.bg} ${colors.text} w-24 h-24 rounded-full flex items-center justify-center`}>
              <Play className="w-10 h-10 ml-1" />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 ${colors.bg} ${colors.text} p-4 transition-opacity ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
        >
          {/* Progress bar */}
          <div className="h-1 bg-white/30 mb-4 cursor-pointer" onClick={handleProgressClick}>
            <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={togglePlay} className={`${colors.text} hover:bg-white/20`}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMute} className={`${colors.text} hover:bg-white/20`}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>

            <span className="font-sans text-sm font-bold tracking-wider uppercase">{exercise.title}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className={`${colors.text} hover:bg-white/20`}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Exercise number - large Bauhaus accent */}
      <div className={`${colors.accent} ${colors.text} py-4 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-sans text-sm font-bold tracking-[0.3em] uppercase">Exercise Complete</span>
          {nextExerciseNumber && (
            <Button
              onClick={() => router.push(`/exercises/${moduleId}/${nextExerciseNumber}`)}
              className="bg-white/20 hover:bg-white/30 text-inherit font-bold uppercase tracking-wider"
            >
              Next Exercise
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
