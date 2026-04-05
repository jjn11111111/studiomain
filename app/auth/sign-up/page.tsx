"use client"

import React from "react"

import { createClient } from "@/lib/supabase/client"
import {
  MSG_AUTH_CHOOSE_GOOGLE_OR_EMAIL,
  MSG_CHECK_EMAIL,
  MSG_EMAIL_SEND_FAIL,
  MSG_RATE_LIMIT,
  MSG_SAME_EMAIL_AS_CHECKOUT,
} from "@/lib/auth-copy"
import { AuthGoogleButton } from "@/components/auth-google-button"
import { getEmailRedirectOrigin } from "@/lib/site-url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Eye, ArrowLeft, Mail, Check } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const origin = getEmailRedirectOrigin()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/api/auth/callback`,
        },
      })
      if (error) throw error
      setIsSent(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      const isRateLimit = /seconds|rate|limit/i.test(message)
      const isSendFail = /confirmation email|sending/i.test(message)
      setError(
        isRateLimit
          ? MSG_RATE_LIMIT
          : isSendFail
            ? MSG_EMAIL_SEND_FAIL
            : message
      )
      if (isRateLimit) setCooldown(6)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Eye className="h-10 w-10 text-purple-400" />
              <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded-full" />
            </div>
            <span className="font-sans text-2xl font-semibold tracking-wide text-white">
              Pineal Vision
            </span>
          </div>

          <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
            {isSent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-white">Check your email</h1>
                <p className="text-white/60">
                  Sent to <span className="text-purple-400 font-medium">{email}</span>
                </p>
                <p className="text-white/45 text-sm">{MSG_CHECK_EMAIL}</p>
                <p className="text-white/40 text-xs">{MSG_SAME_EMAIL_AS_CHECKOUT}</p>
                <Button
                  variant="ghost"
                  onClick={() => setIsSent(false)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Different email
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-white mb-2">Sign up</h1>
                  <p className="text-white/55 text-sm text-balance px-1">
                    {MSG_AUTH_CHOOSE_GOOGLE_OR_EMAIL}
                  </p>
                </div>
                <AuthGoogleButton />
                <p className="text-center text-xs text-white/40 my-8 uppercase tracking-wide">
                  Or use email
                </p>
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400/95 text-sm text-center">{error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full disabled:opacity-70"
                    disabled={isLoading || cooldown > 0}
                  >
                    {cooldown > 0
                      ? `Retry in ${cooldown}s`
                      : isLoading
                        ? "Sending…"
                        : "Email me a link"}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-white/50">
                  Have an account?{" "}
                  <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
