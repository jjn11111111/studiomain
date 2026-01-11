"use client"

import { Header } from "@/components/header"
import { MODULE_COLORS, MODULE_INFO } from "@/lib/types"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"
import { exercises } from "@/lib/exercises-data"
import { useParams } from "next/navigation"

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string

  const moduleExercises = exercises.filter((ex) => ex.module.toLowerCase() === moduleId.toLowerCase())

  const colors = MODULE_COLORS[moduleId.toLowerCase()] || MODULE_COLORS.a
  const info = MODULE_INFO[moduleId.toLowerCase()] || {
    title: `MODULE ${moduleId.toUpperCase()}`,
    subtitle: "EXERCISES",
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Bauhaus module header */}
      <div className={`${colors.bg} ${colors.text} pt-24 pb-16 relative overflow-hidden`}>
        {/* Giant letter background */}
        <div className="font-sans text-[20rem] sm:text-[30rem] font-bold leading-none opacity-10 absolute -top-20 -right-10">
          {moduleId.toUpperCase()}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/exercises"
            className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm font-bold tracking-[0.2em] uppercase">All Modules</span>
          </Link>

          <div className="mb-4">
            <span className="font-sans text-sm font-bold tracking-[0.3em] opacity-70">{info.title}</span>
          </div>
          <h1 className="font-sans text-5xl sm:text-7xl font-bold tracking-tight uppercase mb-4">{info.subtitle}</h1>
          <p className="font-sans text-lg opacity-80 max-w-xl">
            {moduleExercises.length} stereoscopic exercises to train your vision
          </p>
        </div>

        {/* Geometric shapes */}
        <div className={`absolute bottom-0 left-0 w-32 h-32 ${colors.accent}`} />
        <div className={`absolute top-1/2 right-1/4 w-16 h-16 border-4 border-current opacity-20 rounded-full`} />
      </div>

      {/* Exercise list - Bauhaus grid style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
          {moduleExercises.map((exercise, index) => (
            <Link
              key={exercise.id}
              href={`/exercises/${moduleId}/${exercise.exercise_number}`}
              className={`group relative aspect-square ${colors.bg} ${colors.text} p-6 flex flex-col justify-between transition-all hover:scale-105 hover:z-10`}
            >
              {/* Exercise number */}
              <div className="font-sans text-6xl font-bold opacity-20">{String(index + 1).padStart(2, "0")}</div>

              {/* Title and play icon */}
              <div>
                <h3 className="font-sans text-sm font-bold uppercase tracking-wide mb-2 line-clamp-2">
                  {exercise.title}
                </h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4" />
                  <span className="font-sans text-xs uppercase tracking-wider">Play</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
