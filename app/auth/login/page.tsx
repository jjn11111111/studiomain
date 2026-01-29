"use client"

import React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, Suspense } from "react"
import { Eye, ArrowLeft, Mail, Check } from "lucide-react"
import Loading from "./loading"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/exercises`,
        },
      })
      if (error) throw error
      setIsSent(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Eye className="h-10 w-10 text-purple-400" />
              <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded-full" />
            </div>
            <span className="font-sans text-2xl font-semibold tracking-wide text-white">
              Pineal Vision
            </span>
          </div>

          {/* Card */}
          <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
            {isSent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
                <p className="text-white/60">
                  {"We've sent a magic link to"}<br />
                  <span className="text-purple-400 font-medium">{email}</span>
                </p>
                <p className="text-white/40 text-sm">
                  Click the link in the email to sign in. No password needed.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsSent(false)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Use a different email
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
                  <p className="text-white/60">{"Enter your email and we'll send you a magic link"}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending link..." : "Send Magic Link"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-white/40">
                  No password needed. Just click the link in your email.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  )
}
