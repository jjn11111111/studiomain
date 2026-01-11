"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const modules = [
  {
    id: "a",
    colorName: "Red",
    level: "Module A",
    exercises: 10,
    color: "bg-red-600",
    textColor: "text-white",
  },
  {
    id: "b",
    colorName: "Yellow",
    level: "Module B",
    exercises: 10,
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    id: "c",
    colorName: "Blue",
    level: "Module C",
    exercises: 10,
    color: "bg-blue-600",
    textColor: "text-white",
  },
]

export function ModulesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top
        const windowHeight = window.innerHeight

        if (sectionTop < windowHeight && sectionTop > -rect.height) {
          setOffsetY((windowHeight - sectionTop) * 0.1)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="modules" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16" style={{ transform: `translateY(${offsetY * -0.08}px)` }}>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-bold mb-4">
            Training Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Progress through carefully structured levels, each building upon the last to develop your inner vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link key={module.id} href={`/exercises/${module.id}/1`}>
              <div
                style={{
                  transform: `translateY(${offsetY * (0.06 * (index - 1))}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Card
                  className={`group h-full ${module.color} border-none transition-all duration-300 hover:scale-105 hover:shadow-2xl relative`}
                >
                  <CardContent className="p-8 flex flex-col items-center justify-center min-h-[280px]">
                    <Badge variant="outline" className={`${module.textColor} border-current/30 mb-4`}>
                      {module.level}
                    </Badge>

                    <h3
                      className={`font-[family-name:var(--font-oswald)] text-4xl font-bold mb-3 ${module.textColor} text-center uppercase tracking-wide`}
                    >
                      {module.colorName}
                    </h3>

                    <div
                      className={`font-[family-name:var(--font-oswald)] text-5xl font-bold mb-4 ${module.textColor} uppercase`}
                    >
                      {module.level}
                    </div>

                    <div className={`text-lg ${module.textColor} opacity-80`}>{module.exercises} exercises</div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
