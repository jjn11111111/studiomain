"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-md mx-auto text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-white/70 mb-8">
          Something went wrong during authentication. Please try again.
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/auth/login">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-500/10 bg-transparent">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
