"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getEmailRedirectOrigin } from "@/lib/site-url"
import { Button } from "@/components/ui/button"

export function AuthGoogleButton({
  children = "Continue with Google",
}: {
  children?: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const origin = getEmailRedirectOrigin()
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/api/auth/callback`,
        },
      })
      if (oauthError) throw oauthError
      if (data.url) window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start Google sign-in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        disabled={loading}
        className="w-full bg-white text-gray-900 border-white/20 hover:bg-gray-100 font-semibold py-6 rounded-full"
      >
        {loading ? "Redirecting…" : children}
      </Button>
      {error ? (
        <p className="text-red-400/95 text-sm text-center">{error}</p>
      ) : null}
    </div>
  )
}
