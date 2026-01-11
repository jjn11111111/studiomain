"use client"

import { StereoscopicPlayer } from "@/components/stereoscopic-player"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Exercise {
  id: number
  title: string
  duration: number
  description: string
}

interface ExerciseViewProps {
  moduleId: string
  moduleTitle: string
  exercise: Exercise
  exerciseNumber: number
  totalExercises: number
  prevExerciseId?: number
  nextExerciseId?: number
}

export function ExerciseView({
  moduleId,
  moduleTitle,
  exercise,
  exerciseNumber,
  totalExercises,
  prevExerciseId,
  nextExerciseId,
}: ExerciseViewProps) {
  const router = useRouter()
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => {
    setCompleted(true)
  }

  const handleNext = () => {
    if (nextExerciseId) {
      router.push(`/exercises/${moduleId}/${nextExerciseId}`)
    }
  }

  const handlePrevious = () => {
    if (prevExerciseId) {
      router.push(`/exercises/${moduleId}/${prevExerciseId}`)
    }
  }

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb and info */}
        <div className="mb-6">
          <Link
            href="/exercises"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-secondary/50">
                  {moduleTitle}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Exercise {exerciseNumber} of {totalExercises}
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl font-bold">{exercise.title}</h1>
            </div>

            {completed && (
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mt-3 max-w-2xl">{exercise.description}</p>
        </div>

        {/* Player */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
          <StereoscopicPlayer
            exerciseId={`${moduleId}-${exercise.id}`}
            title={exercise.title}
            duration={exercise.duration}
            onComplete={handleComplete}
            onNext={nextExerciseId ? handleNext : undefined}
            onPrevious={prevExerciseId ? handlePrevious : undefined}
            hasNext={!!nextExerciseId}
            hasPrevious={!!prevExerciseId}
          />
        </div>

        {/* Completion prompt */}
        {completed && nextExerciseId && (
          <div className="mt-6 p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
            <h3 className="font-semibold text-lg mb-2">Well done!</h3>
            <p className="text-muted-foreground mb-4">You've completed this exercise. Ready for the next challenge?</p>
            <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue to Next Exercise
            </Button>
          </div>
        )}

        {completed && !nextExerciseId && (
          <div className="mt-6 p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
            <h3 className="font-semibold text-lg mb-2">Module Complete!</h3>
            <p className="text-muted-foreground mb-4">Congratulations! You've finished all exercises in this module.</p>
            <Link href="/exercises">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Return to Modules</Button>
            </Link>
          </div>
        )}

        {/* Tips section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Relaxation</h4>
            <p className="text-xs text-muted-foreground">
              Keep your face and eyes relaxed. Tension makes it harder to achieve stereoscopic fusion.
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Distance</h4>
            <p className="text-xs text-muted-foreground">
              Position yourself at arm's length from the screen. Adjust closer or further as needed.
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Patience</h4>
            <p className="text-xs text-muted-foreground">
              It may take 30-60 seconds for the 3D image to appear. Don't rush - the skill develops with practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
