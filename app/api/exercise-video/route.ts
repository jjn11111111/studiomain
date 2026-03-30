import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getExerciseVideo } from "@/lib/exercise-videos"

/**
 * Proxies exercise video from Supabase Storage so the browser loads it from your
 * domain (no CORS). Uses service role so it works even if the bucket is private.
 * Requires: SUPABASE_SERVICE_ROLE_KEY and files in Storage at the paths in lib/exercise-videos.ts
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const moduleId = (searchParams.get("moduleId") ?? "").toLowerCase()
  const exerciseId = searchParams.get("exerciseId")
  const exerciseNumber = parseInt(exerciseId ?? "0", 10)
  const range = request.headers.get("range")

  if (!moduleId || !exerciseNumber || exerciseNumber < 1) {
    return NextResponse.json({ error: "moduleId and exerciseId required" }, { status: 400 })
  }

  const config = getExerciseVideo(moduleId, exerciseNumber)
  if (!config) {
    return NextResponse.json({ error: "Unknown exercise" }, { status: 404 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Server misconfigured: missing Supabase env" },
      { status: 500 }
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)
  // iOS Safari relies heavily on byte-range requests for video playback.
  // `download()` buffers the entire object and does not support Range, which can
  // work on desktop but fail/hang on mobile. Instead we create a short-lived
  // signed URL and proxy the response while forwarding Range headers.
  const { data: signed, error: signedError } = await supabase.storage
    .from(config.bucket)
    .createSignedUrl(config.path, 60)

  if (signedError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Video not found in Storage", detail: signedError?.message },
      { status: 404 }
    )
  }

  const upstream = await fetch(signed.signedUrl, {
    headers: range ? { range } : undefined,
    // Allow Vercel/Next to stream rather than buffering
    cache: "no-store",
  })

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Video unavailable", detail: `Upstream status ${upstream.status}` },
      { status: 404 }
    )
  }

  const headers = new Headers(upstream.headers)
  // Ensure reasonable caching on our domain (signed URL itself is short-lived)
  headers.set("Cache-Control", "public, max-age=3600")
  // Some upstream responses omit this; browsers expect it for MP4
  if (!headers.get("Content-Type")) headers.set("Content-Type", "video/mp4")

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  })
}
