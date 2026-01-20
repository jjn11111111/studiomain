"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Eye className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 blur-sm bg-primary/30 rounded-full" />
            </div>
            <span className="font-sans text-lg font-semibold tracking-wide">
              Pineal Vision
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Philosophy
            </Link>
            <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/practice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </Link>
            <Link href="/exercises" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Modules
            </Link>
            <Link href="/subscribe">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg shadow-purple-500/25">
                Subscribe
              </Button>
            </Link>
            <Link href="/exercises">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Training</Button>
            </Link>
          </nav>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/philosophy" className="text-muted-foreground hover:text-foreground">
              Philosophy
            </Link>
            <Link href="/learn" className="text-muted-foreground hover:text-foreground">
              Learn
            </Link>
            <Link href="/practice" className="text-muted-foreground hover:text-foreground">
              Practice
            </Link>
            <Link href="/exercises" className="text-muted-foreground hover:text-foreground">
              Modules
            </Link>
            <Link href="/subscribe">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/25">
                Subscribe
              </Button>
            </Link>
            <Link href="/exercises">
              <Button className="w-full bg-primary text-primary-foreground">Start Training</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
