"use client"

import React from "react"

import { MagicLinkTips } from "@/components/magic-link-tips"
import { createClient } from "@/lib/supabase/client"
import { getEmailRedirectOrigin } from "@/lib/site-url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, Suspense, useEffect } from "react"
import { Eye, ArrowLeft, Mail, Check } from "lucide-react"

const RATE_LIMIT_SECONDS = 6

function LoginForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  // Countdown for rate-limit cooldown
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  // Surface auth callback failures (including hash fragments from Supabase).
  useEffect(() => {
    if (typeof window === "undefined") return
    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const errorCode = search.get("error_code") || hash.get("error_code")
    const errorDescription =
      search.get("error_description") || hash.get("error_description")

    if (search.get("error") === "auth_failed") {
      setNotice(
        "Sign-in did not complete—often an expired link or a second click on an old email. Request a fresh magic link below."
      )
      setError(null)
      return
    }

    if (errorCode === "otp_expired") {
      setNotice("Your magic link expired or was already used. Request a new one below.")
      setError(null)
      return
    }

    const authError = search.get("error") || hash.get("error")
    if (authError) {
      setNotice(errorDescription ? decodeURIComponent(errorDescription) : "Sign-in link failed. Please request a new magic link.")
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setNotice(null)

    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null
      const next = params?.get("redirect") || "/exercises"
      const origin = getEmailRedirectOrigin()
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })
      if (err) throw err
      setIsSent(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred"
      const isRateLimit = /seconds|rate|limit/i.test(message)
      const isSendFail = /confirmation email|sending/i.test(message)
      setError(
        isRateLimit
          ? "Please wait a few seconds before requesting another link."
          : isSendFail
            ? `${message} If you’re on a preview URL, add https://*.vercel.app/api/auth/callback under Supabase → Authentication → Redirect URLs. Sign in with the same email you used for Stripe.`
            : message
      )
      if (isRateLimit) setCooldown(RATE_LIMIT_SECONDS)
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
                <MagicLinkTips />
                <p className="text-amber-300/90 text-xs leading-relaxed bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2">
                  If you see an error page, request a fresh link—don&apos;t reuse an old email link.
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
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                  {notice && (
                    <p className="text-amber-300 text-sm text-center bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2">
                      {notice}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full disabled:opacity-70"
                    disabled={isLoading || cooldown > 0}
                  >
                    {cooldown > 0
                      ? `Send magic link again in ${cooldown}s`
                      : isLoading
                        ? "Sending link..."
                        : "Send Magic Link"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-white/40">
                  No password required. Just click the link in your email.
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
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
