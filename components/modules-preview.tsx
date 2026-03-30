"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const modules = [
  {
    id: "a",
    shortLabel: "Module A",
    title: "Red Fruits",
    meta: "Beginner · 10 exercises",
    color: "bg-red-600",
    textColor: "text-white",
  },
  {
    id: "b",
    shortLabel: "Module B",
    title: "Yellow Animals",
    meta: "Intermediate · 10 exercises",
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    id: "c",
    shortLabel: "Module C",
    title: "Blue Cities",
    meta: "Advanced · 10 exercises",
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
        <div
          className="text-center mb-16 max-w-xl mx-auto"
          style={{ transform: `translateY(${offsetY * -0.08}px)` }}
        >
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-bold mb-3">
            Training Modules
          </h2>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base leading-snug">
            Structured levels that build stereoscopic vision—from foundation to advanced integration.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          style={{
            transform: `translateY(${offsetY * 0.04}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/exercises/${module.id}/1`}
              className="block h-full min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <Card
                className={`group h-full md:aspect-square min-h-[220px] ${module.color} border-none transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden`}
              >
                <CardContent className="p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center gap-3">
                  <Badge
                    variant="outline"
                    className={`${module.textColor} border-current/30 text-[0.65rem] tracking-[0.25em] uppercase shrink-0`}
                  >
                    {module.shortLabel}
                  </Badge>

                  <h3
                    className={`font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-bold ${module.textColor} uppercase tracking-wide leading-none`}
                  >
                    {module.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base ${module.textColor} opacity-85 leading-tight max-w-[14rem]`}
                  >
                    {module.meta}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
