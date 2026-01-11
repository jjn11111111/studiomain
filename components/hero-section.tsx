"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { UserCounter } from "@/components/user-counter"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const staticVideoUrl =
    "https://azbdkfqhrvncwhzdlfoy.supabase.co/storage/v1/object/public/home%20page/Untitled%20design(14).mp4"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isMounted = true

    const playVideo = async () => {
      try {
        if (isMounted && video) {
          await video.play()
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setVideoError(true)
        }
      }
    }

    playVideo()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxTransform = `translateY(${scrollY * 0.5}px)`
  const fadeOpacity = Math.max(0, 1 - scrollY / 500)

  return (
    <section className="relative bg-gradient-to-br from-black via-purple-950/20 to-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="relative aspect-[9/16] md:aspect-video overflow-hidden shadow-2xl">
          {!videoError && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              style={{
                opacity: videoLoaded ? 1 : 0,
                imageRendering: "high-quality",
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
              }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            >
              <source src={staticVideoUrl} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: parallaxTransform, opacity: fadeOpacity }}
          >
            <div className="text-center px-6">
              <h1 className="font-[family-name:var(--font-oswald)] text-5xl sm:text-6xl md:text-7xl font-black tracking-wide mb-3 leading-none">
                <span className="block text-white drop-shadow-2xl">PINEAL VISION</span>
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400" />
                <span className="font-[family-name:var(--font-oswald)] text-sm sm:text-base tracking-[0.3em] text-white/80 drop-shadow-lg">
                  3RD EYE CROSSTRAINER
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400" />
              </div>

              <p className="text-base sm:text-lg text-white/90 mb-8 max-w-md leading-relaxed mx-auto drop-shadow-lg">
                Stereoscopic visual exercises designed to stimulate the pineal gland and expand consciousness.
              </p>

              <Link
                href="/exercises"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-[family-name:var(--font-oswald)] text-base tracking-wider hover:bg-white/90 transition-colors shadow-2xl"
              >
                START TRAINING
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center gap-16 mt-8 transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: fadeOpacity }}
        >
          <div>
            <div className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-white drop-shadow-lg text-center">
              3
            </div>
            <div className="text-sm text-white/60 text-center">Modules</div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-white drop-shadow-lg text-center">
              30
            </div>
            <div className="text-sm text-white/60 text-center">Exercises</div>
          </div>
          <UserCounter />
        </div>
      </div>

      <div className="absolute bottom-0 w-full flex">
        <div className="w-1/3 bg-[#E53935] p-4 flex items-center justify-center">
          <span className="text-white font-[family-name:var(--font-oswald)] text-xs sm:text-sm tracking-wider text-center">
            DEVELOP PSYCHIC GIFTS
          </span>
        </div>
        <div className="w-1/3 bg-[#FDD835] p-4 flex items-center justify-center">
          <span className="text-black font-[family-name:var(--font-oswald)] text-xs sm:text-sm tracking-wider text-center">
            INCREASE INTUITIVE KNOWING
          </span>
        </div>
        <div className="w-1/3 bg-[#1E88E5] p-4 flex items-center justify-center">
          <span className="text-white font-[family-name:var(--font-oswald)] text-xs sm:text-sm tracking-wider text-center">
            ENGAGE MAXIMUM POTENTIAL
          </span>
        </div>
      </div>
    </section>
  )
}
