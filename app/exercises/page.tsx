"use client"

import { useEffect } from "react"

import { useState } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MODULE_COLORS, MODULE_INFO } from "@/lib/types"
import Link from "next/link"
import { exercises } from "@/lib/exercises-data"
import { Eye, Focus, Clock, AlertTriangle } from "lucide-react"

interface Exercise {
  id: string
  module: string
  exercise_number: number
  title: string
  video_url: string
}

export default function ExercisesPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const moduleGroups = exercises.reduce(
    (acc, exercise) => {
      const moduleId = exercise.module.toLowerCase()
      if (!acc[moduleId]) acc[moduleId] = []
      acc[moduleId].push(exercise)
      return acc
    },
    {} as Record<string, typeof exercises>,
  )

  const moduleIds = Object.keys(moduleGroups).sort()

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-16">
        {/* Bauhaus-style header */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-sans text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase">Training</h1>
            <h2 className="font-sans text-5xl sm:text-7xl font-bold tracking-tight text-white/40 uppercase">Modules</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-amber-500/20 border-2 border-amber-500 p-6 flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-sans text-lg font-bold text-amber-500 uppercase tracking-wide mb-2">
                Stereoscopic Vision Required
              </h3>
              <p className="text-white/90 leading-relaxed">
                <span className="font-semibold text-white">
                  All exercises require users to maintain stereoscopic viewing for the entire duration.
                </span>{" "}
                This is a key component of the training. While some level of 3rd eye stimulation may occur with standard
                vision, <span className="text-amber-500 font-semibold">optimal results will most likely not occur</span>{" "}
                without proper stereoscopic technique.
              </p>
            </div>
          </div>
        </div>

        {/* How to View Instructions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white/5 border border-white/10 p-8 relative overflow-hidden">
            {/* Geometric accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 -translate-y-1/2 translate-x-1/2 rotate-45" />

            <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-amber-500" />
              How to View Stereoscopic Exercises
            </h3>

            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Each exercise is designed to be viewed with{" "}
                <span className="text-amber-500 font-semibold">stereoscopic vision</span>. You may be familiar with dot
                matrix prints which seem abstract until one allows their vision focus to lapse the slightest bit—at
                which point, a hologram figure develops and emerges.
              </p>

              <p>
                The distance between two human eyes is approximately{" "}
                <span className="text-white font-semibold">2 inches</span>. This retinal disparity helps the brain
                process and assess a sense of distance. The brain utilizes all these spatial components of information
                in tandem to bring about precise depth information in an expanded format known as{" "}
                <span className="text-amber-500 font-semibold">stereoscopic vision</span>.
              </p>
            </div>

            {/* Instructions grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-black/30 p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-red-500 text-white flex items-center justify-center font-bold">1</span>
                  <Focus className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-white/70 text-sm">
                  <span className="text-white font-semibold">Cross your eyes</span> slightly while staring at the video.
                  This is opposite of how vision normally works, but it's easier to achieve.
                </p>
              </div>

              <div className="bg-black/30 p-6 border-l-4 border-amber-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-amber-500 text-black flex items-center justify-center font-bold">2</span>
                  <Eye className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-white/70 text-sm">
                  Cross your eyes until <span className="text-white font-semibold">one image overlaps the other</span>.
                  Three images will appear. Focus on the <span className="text-white font-semibold">middle one</span>—it
                  will appear to have depth.
                </p>
              </div>

              <div className="bg-black/30 p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-white/70 text-sm">
                  When you achieve clarity with the 3rd image in the middle,
                  <span className="text-white font-semibold"> hold it for at least 30 seconds</span>.
                </p>
              </div>
            </div>

            <p className="text-white/50 text-sm mt-6 italic">Source: Answersingenesis.com</p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50">Loading modules...</p>
          </div>
        )}

        {/* Bauhaus grid of modules */}
        {!loading && moduleIds.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {moduleIds.map((moduleId) => {
                const colors = MODULE_COLORS[moduleId] || MODULE_COLORS.a
                const info = MODULE_INFO[moduleId] || {
                  title: `MODULE ${moduleId.toUpperCase()}`,
                  subtitle: "EXERCISES",
                }
                const exerciseCount = moduleGroups[moduleId].length

                return (
                  <Link
                    key={moduleId}
                    href={`/exercises/${moduleId}`}
                    className={`${colors.bg} ${colors.text} aspect-square p-8 flex flex-col justify-between transition-all hover:scale-[1.02] hover:z-10 relative group`}
                  >
                    {/* Module letter - large Bauhaus style */}
                    <div className="font-sans text-[12rem] sm:text-[16rem] font-bold leading-none opacity-20 absolute top-0 right-4">
                      {moduleId.toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <span className="font-sans text-sm font-bold tracking-[0.3em] opacity-70">{info.title}</span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-2">
                        {info.subtitle}
                      </h3>
                      <p className="font-sans text-sm opacity-70">{exerciseCount} exercises</p>
                    </div>

                    {/* Geometric accent */}
                    <div className={`absolute bottom-0 left-0 w-16 h-16 ${colors.accent} opacity-50`} />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* No modules state */}
        {!loading && moduleIds.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/50">No modules found. Check the Supabase connection.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
