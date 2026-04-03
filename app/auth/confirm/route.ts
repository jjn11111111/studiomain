import { NextResponse } from "next/server"

/** Supabase samples use /auth/confirm; session cookies are set on /auth/exchange. */
export async function GET(request: Request) {
  const from = new URL(request.url)
  const to = new URL("/auth/exchange", from.origin)
  to.search = from.search
  return NextResponse.redirect(to)
}
