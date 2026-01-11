"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Play, ChevronDown, ChevronUp, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface Exercise {
  id: number
  title: string
  duration: string
  completed: boolean
}

interface Module {
  id: number
  title: string
  description: string
  level: string
  exercises: Exercise[]
  unlocked: boolean
  image: string
}

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced: "bg-primary/10 text-primary border-primary/20",
  Master: "bg-accent/10 text-accent border-accent/20",
}

export function ModuleCard({ module }: { module: Module }) {
  const [expanded, setExpanded] = useState(false)
  const completedCount = module.exercises.filter((e) => e.completed).length
  const progressPercent = Math.round((completedCount / module.exercises.length) * 100)
  const totalDuration = module.exercises.reduce((acc, e) => acc + Number.parseInt(e.duration), 0)

  // Find next incomplete exercise
  const nextExercise = module.exercises.find((e) => !e.completed) || module.exercises[0]

  return (
    <Card
      className={`overflow-hidden bg-card border-border transition-all duration-300 ${module.unlocked ? "hover:border-primary/30" : "opacity-60"}`}
    >
      {/* Module image */}
      <div className="relative h-40 bg-secondary overflow-hidden">
        <Image src={module.image || "/placeholder.svg"} alt={module.title} fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        {!module.unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Complete previous modules to unlock</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className={levelColors[module.level]}>
            {module.level}
          </Badge>
          <span className="text-sm text-muted-foreground">{totalDuration} min total</span>
        </div>

        <h3 className="font-semibold text-xl mb-2">{module.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

        {/* Progress */}
        {module.unlocked && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span>
                {completedCount} / {module.exercises.length}
              </span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {module.unlocked ? (
            <>
              <Link href={`/exercises/${module.id}/${nextExercise.id}`} className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Play className="h-4 w-4" />
                  {completedCount > 0 ? "Continue" : "Start"}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setExpanded(!expanded)}
                className="border-border bg-transparent hover:bg-secondary"
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </>
          ) : (
            <Button disabled className="w-full" variant="secondary">
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </Button>
          )}
        </div>

        {/* Expanded exercise list */}
        {expanded && module.unlocked && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Exercises</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {module.exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/exercises/${module.id}/${exercise.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${exercise.completed ? "bg-emerald-500/20 text-emerald-400" : "bg-muted"}`}
                    >
                      {exercise.completed && <Check className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${exercise.completed ? "text-muted-foreground" : "text-foreground"}`}>
                      {exercise.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{exercise.duration}</span>
                    <Play className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
