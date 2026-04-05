"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { getEmailRedirectOrigin } from "@/lib/site-url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const origin = getEmailRedirectOrigin()
      const next = encodeURIComponent("/auth/reset-password")
      const { error: err } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${origin}/auth/callback?next=${next}`,
        }
      )
      if (err) throw err
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send reset email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to log in
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <Mail className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Reset password
          </h1>
          <p className="text-white/55 text-sm text-center mb-6">
            We’ll email you a link to choose a new password.
          </p>

          {sent ? (
            <p className="text-emerald-200/90 text-sm text-center">
              If an account exists for that email, you’ll get a message shortly.
              Open it and follow the link.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-6 rounded-full"
              >
                {loading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
