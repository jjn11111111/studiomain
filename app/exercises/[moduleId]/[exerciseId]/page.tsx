"use client"

import { AccessGate } from "@/components/access-gate"
import { Header } from "@/components/header"
import { VideoExerciseView } from "@/components/video-exercise-view"
import { ExerciseComments } from "@/components/exercise-comments"
import { MODULE_COLORS, MODULE_INFO } from "@/lib/types"
import { getExercisesByModule } from "@/lib/exercises-data"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export default function ExercisePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const exerciseId = params.exerciseId as string

  const exercises = useMemo(() => getExercisesByModule(moduleId), [moduleId])

  const exerciseIndex =
    exercises.length > 0 ? exercises.findIndex((e) => e.exercise_number === Number.parseInt(exerciseId)) : -1
  const exercise = exerciseIndex >= 0 ? exercises[exerciseIndex] : null
  const prevExercise = exerciseIndex > 0 ? exercises[exerciseIndex - 1] : null
  const nextExercise = exerciseIndex >= 0 && exerciseIndex < exercises.length - 1 ? exercises[exerciseIndex + 1] : null

  const colors = MODULE_COLORS[moduleId.toLowerCase()] || MODULE_COLORS.a
  const info = MODULE_INFO[moduleId.toLowerCase()] || {
    title: `MODULE ${moduleId.toUpperCase()}`,
    subtitle: "EXERCISES",
  }

  if (!exercise) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/50">Exercise not found</p>
      </main>
    )
  }

  const commentExerciseId = `${moduleId.toLowerCase()}-${exerciseId}`

  return (
    <AccessGate>
      <main className="min-h-screen bg-black">
        <Header />
        <VideoExerciseView
          moduleId={moduleId}
          moduleTitle={info.subtitle}
          exercise={exercise}
          exerciseNumber={exerciseIndex + 1}
          totalExercises={exercises.length}
          prevExerciseNumber={prevExercise?.exercise_number}
          nextExerciseNumber={nextExercise?.exercise_number}
          colors={colors}
        />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ExerciseComments exerciseId={commentExerciseId} />
        </div>
      </main>
    </AccessGate>
  )
}
