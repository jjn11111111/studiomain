"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Play, Lock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Exercise {
  id: string
  module: string
  exercise_number: number
  title: string
  video_url: string
}

const moduleConfig: Record<string, { title: string; color: string; textColor: string; description: string }> = {
  a: { 
    title: "Module A: Red", 
    color: "bg-red-600", 
    textColor: "text-white",
    description: "Foundation exercises to develop basic stereoscopic vision and eye coordination."
  },
  b: { 
    title: "Module B: Yellow", 
    color: "bg-yellow-400", 
    textColor: "text-black",
    description: "Intermediate exercises to enhance depth perception and visual focus."
  },
  c: { 
    title: "Module C: Blue", 
    color: "bg-blue-600", 
    textColor: "text-white",
    description: "Advanced exercises for pineal activation and expanded consciousness."
  },
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  const config = moduleConfig[moduleId] || moduleConfig.a

  useEffect(() => {
    async function fetchExercises() {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("module", moduleId.toUpperCase())
        .order("exercise_number", { ascending: true })

      if (error) {
        console.error("[v0] Error fetching exercises:", error)
        // Create placeholder exercises if none found
        const placeholders = Array.from({ length: 10 }, (_, i) => ({
          id: `${moduleId}-${i + 1}`,
          module: moduleId,
          exercise_number: i + 1,
          title: `Exercise ${i + 1}`,
          video_url: "",
        }))
        setExercises(placeholders)
      } else {
        // If less than 10 exercises, fill with placeholders
        const existingNumbers = new Set(data.map(e => e.exercise_number))
        const allExercises = [...data]
        
        for (let i = 1; i <= 10; i++) {
          if (!existingNumbers.has(i)) {
            allExercises.push({
              id: `${moduleId}-${i}`,
              module: moduleId,
              exercise_number: i,
              title: `Exercise ${i}`,
              video_url: "",
            })
          }
        }
        
        allExercises.sort((a, b) => a.exercise_number - b.exercise_number)
        setExercises(allExercises)
      }
      setLoading(false)
    }

    fetchExercises()
  }, [moduleId])

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      {/* Module header */}
      <div className={`${config.color} ${config.textColor} pt-24 pb-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/exercises"
            className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold tracking-widest uppercase">All Modules</span>
          </Link>

          <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-4">
            {config.title}
          </h1>
          <p className={`text-lg opacity-80 max-w-2xl`}>
            {config.description}
          </p>
        </div>
      </div>

      {/* Exercises list */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-white/60 py-12">Loading exercises...</div>
          ) : (
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <Link 
                  key={exercise.id} 
                  href={`/exercises/${moduleId}/${exercise.exercise_number}`}
                  className="block"
                >
                  <div className={`${config.color} ${config.textColor} p-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-between group`}>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-3xl opacity-50">
                        {String(exercise.exercise_number).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-bold text-xl uppercase tracking-wide">
                          {exercise.title}
                        </h3>
                        {!exercise.video_url && (
                          <span className="text-sm opacity-60 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors`}>
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

        <Footer />
      </main>
  )
}
