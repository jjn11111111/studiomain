"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Shows when Supabase puts errors in the URL hash (e.g. otp_expired) or ?error=auth_failed on home.
 */
export function AuthUrlBanner() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const errorCode = search.get("error_code") || hash.get("error_code")
    const errorDescription =
      search.get("error_description") || hash.get("error_description")
    let msg: string | null = null
    if (errorCode === "otp_expired") {
      msg =
        "That magic link expired or was already used. Open your email, request a brand-new link, and tap it within a few minutes."
    } else if (search.get("error") === "auth_failed") {
      msg =
        "Sign-in could not finish (expired link, wrong browser, or keys out of sync). Request a new magic link from Login."
    } else if (hash.get("error") === "access_denied" && errorDescription) {
      try {
        msg = decodeURIComponent(errorDescription.replace(/\+/g, " "))
      } catch {
        msg = "Sign-in was denied. Try a new magic link from Login."
      }
    }

    if (msg) {
      setMessage(msg)
      setOpen(true)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    url.searchParams.delete("error")
    url.searchParams.delete("error_code")
    url.searchParams.delete("error_description")
    url.hash = ""
    window.history.replaceState({}, "", url.pathname + url.search)
  }

  if (!open || !message) return null

  return (
    <div
      role="alert"
      className="border-b border-amber-500/40 bg-amber-950/90 px-4 py-3 text-center text-sm text-amber-100"
    >
      <p className="mx-auto max-w-2xl">{message}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link href="/auth/login" className="font-medium text-white underline underline-offset-2">
          Go to Login
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="text-amber-200/80 underline-offset-2 hover:text-amber-50 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
