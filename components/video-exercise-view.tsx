"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Play, Pause, Maximize, Volume2, VolumeX, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { getExerciseVideo } from "@/lib/exercise-videos"
import { Comments } from "@/components/comments"

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
  exerciseId: string
}

const moduleConfig: Record<string, { title: string; colors: { bg: string; text: string; accent: string } }> = {
  a: { title: "Module A: Red Fruits", colors: { bg: "bg-red-600", text: "text-white", accent: "bg-red-800" } },
  b: { title: "Module B: Yellow Animals", colors: { bg: "bg-yellow-400", text: "text-black", accent: "bg-yellow-500" } },
  c: { title: "Module C: Blue Cities", colors: { bg: "bg-blue-600", text: "text-white", accent: "bg-blue-800" } },
}

export function VideoExerciseView({ moduleId, exerciseId }: VideoExerciseViewProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [totalExercises, setTotalExercises] = useState(10)

  const config = moduleConfig[moduleId] || moduleConfig.a
  const exerciseNumber = parseInt(exerciseId) || 1
  const prevExerciseNumber = exerciseNumber > 1 ? exerciseNumber - 1 : undefined
  const nextExerciseNumber = exerciseNumber < totalExercises ? exerciseNumber + 1 : undefined

  useEffect(() => {
    async function fetchExercise() {
      const supabase = createClient()
      const moduleUpper = moduleId.toUpperCase()

      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .in("module", [moduleId, moduleUpper])
        .eq("exercise_number", exerciseNumber)
        .maybeSingle()

      const configVideo = getExerciseVideo(moduleId, exerciseNumber)
      const proxyVideoUrl = `/api/exercise-video?moduleId=${moduleId}&exerciseId=${exerciseNumber}`

      if (error || !data) {
        const title = configVideo?.title ?? `Exercise ${exerciseNumber}`
        const path = configVideo?.path ?? ""
        setExercise({
          id: `${moduleId}-${exerciseId}`,
          module: moduleId,
          exercise_number: exerciseNumber,
          title,
          video_url: path ? proxyVideoUrl : "",
        })
      } else if (data) {
        const title = (data.title ?? configVideo?.title) ?? `Exercise ${exerciseNumber}`
        setExercise({ ...data, title, video_url: proxyVideoUrl })
      } else {
        // No row, but no error either – fall back to config
        const title = configVideo?.title ?? `Exercise ${exerciseNumber}`
        setExercise({
          id: `${moduleId}-${exerciseId}`,
          module: moduleUpper,
          exercise_number: exerciseNumber,
          title,
          video_url: configVideo ? proxyVideoUrl : "",
        })
      }

      const { count } = await supabase
        .from("exercises")
        .select("*", { count: "exact", head: true })
        .eq("module", moduleUpper)

      if (count) setTotalExercises(count)
      setLoading(false)
    }

    fetchExercise()
  }, [moduleId, exerciseId, exerciseNumber])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !exercise?.video_url) return

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

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [nextExerciseNumber, moduleId, router, exercise?.video_url])

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
    const video = videoRef.current
    if (!container) return

    const docAny = document as any
    const isFullscreen = Boolean(document.fullscreenElement || docAny.webkitFullscreenElement)

    if (isFullscreen) {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen()
        return
      }
      if (docAny.webkitExitFullscreen) {
        docAny.webkitExitFullscreen()
        return
      }
      return
    }

    // iOS Safari: fullscreen works only on the <video> element.
    if (video) {
      const videoAny = video as any
      if (typeof videoAny.webkitEnterFullscreen === "function") {
        videoAny.webkitEnterFullscreen()
        return
      }
      if (typeof video.requestFullscreen === "function") {
        video.requestFullscreen()
        return
      }
    }

    if (typeof container.requestFullscreen === "function") {
      container.requestFullscreen()
      return
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

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="text-white">Loading exercise...</div>
        </div>
      )
    }

    if (!exercise) {
      return (
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="text-white">Exercise not found</div>
        </div>
      )
    }

    return (
      <>
      {/* Header bar */}
      <div className={`${config.colors.bg} ${config.colors.text} pt-20 pb-6 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/exercises/${moduleId}`}
            className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm font-bold tracking-[0.2em] uppercase">{config.title}</span>
          </Link>

          <div className="flex items-center justify-between gap-6">
            <div>
              <span className="font-sans text-sm font-bold tracking-[0.3em] opacity-50">
                {String(exerciseNumber).padStart(2, "0")} / {String(totalExercises).padStart(2, "0")}
              </span>
              <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight uppercase mt-1">
                {exercise.title}
              </h1>
              <p className="mt-2 font-sans text-sm sm:text-base opacity-80">
                Expand the exercise to full screen and begin.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => prevExerciseNumber && router.push(`/exercises/${moduleId}/${prevExerciseNumber}`)}
                disabled={!prevExerciseNumber}
                className={`${config.colors.text} hover:bg-white/20 disabled:opacity-30`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => nextExerciseNumber && router.push(`/exercises/${moduleId}/${nextExerciseNumber}`)}
                disabled={!nextExerciseNumber}
                className={`${config.colors.text} hover:bg-white/20 disabled:opacity-30`}
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

      {/* Video player */}
      <div
        ref={containerRef}
        className="flex-1 bg-black relative group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {videoError || !exercise.video_url ? (
          (() => {
            const configVideo = getExerciseVideo(moduleId, exerciseNumber)
            const bucket = configVideo?.bucket ?? (moduleId === "a" ? "Module A" : moduleId === "b" ? "Module B" : moduleId === "c" ? "Module C" : "videos")
            const path = configVideo?.path ?? ""
            return (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className={`${config.colors.bg} p-8 text-center max-w-md`}>
                  <p className={`font-sans text-xl font-bold ${config.colors.text} mb-2`}>
                    {!exercise.video_url ? "Video not yet assigned" : "Video unavailable"}
                  </p>
                  <p className={`font-sans text-sm ${config.colors.text} opacity-70`}>
                    {!exercise.video_url
                      ? "Add a video URL (or storage path) for this exercise in Supabase to enable playback."
                      : "Unable to load this exercise video. Check the URL or storage bucket and CORS."}
                  </p>
                  <p className={`font-sans text-xs ${config.colors.text} opacity-70 mt-2`}>
                    Ensure you have an active subscription to access all modules.
                  </p>
                  {path && (
                    <p className={`font-sans text-xs ${config.colors.text} opacity-90 mt-3 font-mono break-all`}>
                      Bucket: {bucket} → {path}
                    </p>
                  )}
                  {exercise.video_url && (
                    <p className={`font-sans text-xs ${config.colors.text} opacity-90 mt-2 font-mono break-all`}>
                      URL:{" "}
                      <a
                        href={exercise.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                      >
                        Open in new tab
                      </a>
                      . Videos are proxied from Storage—ensure the file exists and SUPABASE_SERVICE_ROLE_KEY is set.
                    </p>
                  )}
                  <p className={`font-sans text-xs ${config.colors.text} opacity-50 mt-2`}>
                    See STORAGE.md in the project for setup steps.
                  </p>
                </div>
              </div>
            )
          })()
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onClick={togglePlay}
            onError={() => setVideoError(true)}
            key={exercise.video_url}
          >
            <source src={exercise.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Play overlay when paused */}
        {!isPlaying && !videoError && exercise.video_url && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <div className={`${config.colors.bg} ${config.colors.text} w-24 h-24 rounded-full flex items-center justify-center`}>
              <Play className="w-10 h-10 ml-1" />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 ${config.colors.bg} ${config.colors.text} p-4 transition-opacity ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-1 bg-white/30 mb-4 cursor-pointer" onClick={handleProgressClick}>
            <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={togglePlay} className={`${config.colors.text} hover:bg-white/20`}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMute} className={`${config.colors.text} hover:bg-white/20`}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>

            <span className="font-sans text-sm font-bold tracking-wider uppercase">{exercise.title}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className={`${config.colors.text} hover:bg-white/20`}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${config.colors.accent} ${config.colors.text} py-4 px-4 sm:px-6 lg:px-8`}>
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

      {/* Comments */}
      <Comments exerciseId={exercise.id} />
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {renderBody()}
    </div>
  )
}
