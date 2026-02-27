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
  const { data, error } = await supabase.storage
    .from(config.bucket)
    .download(config.path)

  if (error || !data) {
    return NextResponse.json(
      { error: "Video not found in Storage", detail: error?.message },
      { status: 404 }
    )
  }

  return new Response(data, {
    headers: {
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
