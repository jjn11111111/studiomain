"use client"

import React from "react"

import { createClient } from "@/lib/supabase/client"
import {
  MSG_SIGNUP_CHOOSE_GOOGLE_OR_PASSWORD,
  MSG_SAME_EMAIL_AS_CHECKOUT,
} from "@/lib/auth-copy"
import { AuthGoogleButton } from "@/components/auth-google-button"
import { getEmailRedirectOrigin } from "@/lib/site-url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Eye, ArrowLeft, Mail } from "lucide-react"

const MIN_PASSWORD = 8

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setNotice(null)

    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`)
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const origin = getEmailRedirectOrigin()
      const { data, error: signErr } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/api/auth/callback`,
        },
      })
      if (signErr) throw signErr

      if (data.session) {
        window.location.href = "/exercises"
        return
      }

      setNotice(
        "Check your email to confirm your account, then return here to log in."
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign up.")
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
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Sign up</h1>
              <p className="text-white/55 text-sm text-balance px-1">
                {MSG_SIGNUP_CHOOSE_GOOGLE_OR_PASSWORD}
              </p>
            </div>
            <AuthGoogleButton />
            <p className="text-center text-xs text-white/40 my-8 uppercase tracking-wide">
              Or email and password
            </p>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password ({MIN_PASSWORD}+ characters)
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-white/80">
                  Confirm password
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                />
              </div>

              <p className="text-white/40 text-xs">{MSG_SAME_EMAIL_AS_CHECKOUT}</p>

              {error && (
                <p className="text-red-400/95 text-sm text-center">{error}</p>
              )}
              {notice && (
                <p className="text-emerald-200/90 text-sm text-center bg-emerald-500/10 border border-emerald-400/15 rounded-lg px-3 py-2">
                  {notice}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Creating account…" : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              Have an account?{" "}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
