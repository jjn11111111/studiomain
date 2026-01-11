"use client"

import { useEffect, useState } from "react"

export function LogoSection() {
  const logoUrl = "/images/untitled-20design.jpg"
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxTransform = `translateY(${scrollY * 0.15}px)`

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="relative z-10 container mx-auto px-4 flex justify-center">
        <div
          className="relative group transition-transform duration-100 ease-out"
          style={{ transform: parallaxTransform }}
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#E53935]/30 via-[#FDD835]/30 to-[#1E88E5]/30 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[300px] md:h-[300px] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden p-6">
            <img
              src={logoUrl || "/placeholder.svg"}
              alt="Pineal Vision Logo"
              className="w-full h-full object-contain rounded-full"
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `,
        }}
      />
    </section>
  )
}
