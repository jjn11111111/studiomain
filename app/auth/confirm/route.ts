import { NextResponse } from "next/server"

/** Supabase samples use /auth/confirm; we complete auth on /auth/callback. */
export async function GET(request: Request) {
  const from = new URL(request.url)
  const to = new URL("/auth/callback", from.origin)
  to.search = from.search
  return NextResponse.redirect(to)
}
