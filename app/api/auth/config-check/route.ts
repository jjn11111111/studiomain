import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Safe deploy sanity check: confirms env names are present (no values exposed).
 * Open GET /api/auth/config-check on production after deploy.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ""
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? ""

  return NextResponse.json({
    ok: url.length > 0 && anon.length > 0,
    hasPublicSupabaseUrl: url.length > 0,
    hasPublicSupabaseAnonKey: anon.length > 0,
    urlLooksLikeSupabase: /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url),
    anonLooksLikeJwt: anon.startsWith("eyJ"),
  })
}
