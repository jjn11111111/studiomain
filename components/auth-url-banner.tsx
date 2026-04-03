"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { MSG_LINK_FAILED } from "@/lib/auth-copy"

/** Top banner for auth errors on marketing pages only—/auth/* handles its own messaging. */
export function AuthUrlBanner() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (pathname?.startsWith("/auth")) return

    const search = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const errorCode = search.get("error_code") || hash.get("error_code")

    const failed =
      search.get("error") === "auth_failed" ||
      errorCode === "otp_expired" ||
      (hash.get("error") === "access_denied" && hash.get("error_description"))

    if (failed) setOpen(true)
  }, [pathname])

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

  if (!open) return null

  return (
    <div
      role="alert"
      className="border-b border-amber-500/30 bg-amber-950/80 px-4 py-2.5 text-center text-sm text-amber-100"
    >
      <span>{MSG_LINK_FAILED}</span>
      <span className="mx-2 text-amber-500/60">·</span>
      <Link href="/auth/login" className="font-medium text-white underline underline-offset-2">
        Login
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="ml-3 text-amber-200/90 underline-offset-2 hover:underline"
      >
        Dismiss
      </button>
    </div>
  )
}
