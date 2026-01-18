import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exerciseId = searchParams.get("exerciseId")

  if (!exerciseId) {
    return NextResponse.json({ error: "Exercise ID required" }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("exercise_id", exerciseId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comments })
}
