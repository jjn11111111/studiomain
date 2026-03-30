import { updateSession } from "@/lib/supabase/proxy"
import { type NextRequest } from "next/server"

// Next.js 16+: convention is a single named export `proxy` (not `middleware`).
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
}
