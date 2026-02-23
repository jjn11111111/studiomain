import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exerciseId = searchParams.get("exerciseId")

  if (!exerciseId) {
    return NextResponse.json({ error: "Exercise ID required" }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: rows, error } = await supabase
    .from("comments")
    .select("id, user_name, content, created_at")
    .eq("exercise_id", exerciseId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const comments = (rows || []).map((c) => ({
    id: c.id,
    user_name: c.user_name ?? "Anonymous",
    comment_text: c.content,
    rating: 5,
    created_at: c.created_at,
  }))

  return NextResponse.json({ comments })
}
