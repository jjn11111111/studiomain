import { NextResponse } from "next/server"

/** Supabase samples use /auth/confirm; session is set via /api/auth/callback. */
export async function GET(request: Request) {
  const from = new URL(request.url)
  const to = new URL("/api/auth/callback", from.origin)
  to.search = from.search
  return NextResponse.redirect(to)
}
