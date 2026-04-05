"use client"

import React from "react"

import { createClient } from "@/lib/supabase/client"
import {
  MSG_AUTH_CHOOSE_GOOGLE_OR_PASSWORD,
  MSG_AUTH_CLIENT_POLL,
  MSG_AUTH_EXCHANGE,
  MSG_AUTH_NO_PARAMS,
  MSG_AUTH_VERIFY,
  MSG_LINK_FAILED,
} from "@/lib/auth-copy"
import { AuthGoogleButton } from "@/components/auth-google-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, Suspense, useEffect } from "react"
import { Eye, ArrowLeft, Mail } from "lucide-react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const errorCode = search.get("error_code") || hash.get("error_code")
    const errorDescription =
      search.get("error_description") || hash.get("error_description")

    if (search.get("error") === "auth_failed" || errorCode === "otp_expired") {
      const reason = search.get("reason")
      const byReason =
        reason === "no_params"
          ? MSG_AUTH_NO_PARAMS
          : reason === "exchange"
            ? MSG_AUTH_EXCHANGE
            : reason === "verify"
              ? MSG_AUTH_VERIFY
              : reason === "client_poll"
                ? MSG_AUTH_CLIENT_POLL
                : null
      setNotice(byReason ?? MSG_LINK_FAILED)
      setError(null)
      return
    }

    const authError = search.get("error") || hash.get("error")
    if (authError) {
      setNotice(
        errorDescription
          ? decodeURIComponent(errorDescription)
          : MSG_LINK_FAILED
      )
    }
  }, [])

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setNotice(null)

    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (err) throw err
      window.location.href = "/exercises"
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in.")
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
              <h1 className="text-2xl font-bold text-white mb-2">Log in</h1>
              <p className="text-white/55 text-sm text-balance px-1">
                {MSG_AUTH_CHOOSE_GOOGLE_OR_PASSWORD}
              </p>
            </div>
            <AuthGoogleButton />
            <p className="text-center text-xs text-white/40 my-8 uppercase tracking-wide">
              Or email and password
            </p>
            <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                <div className="flex justify-between gap-2">
                  <Label htmlFor="password" className="text-white/80">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                />
              </div>

              {error && (
                <p className="text-red-400/95 text-sm text-center">{error}</p>
              )}
              {notice && (
                <p className="text-amber-200/90 text-sm text-center bg-amber-500/10 border border-amber-400/15 rounded-lg px-3 py-2">
                  {notice}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              No account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-purple-400">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
