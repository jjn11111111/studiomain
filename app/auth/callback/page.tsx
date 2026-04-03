import { Suspense } from "react"

import { AuthCallbackClient } from "./auth-callback-client"

export const dynamic = "force-dynamic"

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white/60 text-sm">
          Signing you in…
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  )
}
