import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

type CommentRow = {
  id: string
  user_name?: string | null
  comment_text?: string | null
  content?: string | null
  created_at: string
  rating?: number | null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exerciseId = searchParams.get("exerciseId")

  if (!exerciseId) {
    return NextResponse.json({ error: "Exercise ID required" }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: rows, error } = await supabase
    .from("comments")
    .select("*")
    .eq("exercise_id", exerciseId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const comments = (rows || []).map((c: CommentRow) => ({
    id: c.id,
    user_name: c.user_name ?? "Anonymous",
    comment_text: c.comment_text ?? c.content ?? "",
    rating: typeof c.rating === "number" ? c.rating : 5,
    created_at: c.created_at,
  }))

  return NextResponse.json({ comments })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json(
      { error: "Sign in required to share feedback." },
      { status: 401 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const exerciseId = typeof b.exerciseId === "string" ? b.exerciseId.trim() : ""
  const commentText =
    typeof b.commentText === "string" ? b.commentText.trim() : ""
  let rating = 5
  if (typeof b.rating === "number" && Number.isFinite(b.rating)) {
    rating = Math.min(5, Math.max(1, Math.round(b.rating)))
  }

  const rawName = typeof b.userName === "string" ? b.userName.trim() : ""
  const displayName = rawName
    ? rawName.slice(0, 80)
    : (user.email?.split("@")[0] ?? "Member")

  if (!exerciseId || !commentText) {
    return NextResponse.json(
      { error: "Exercise and comment text are required." },
      { status: 400 }
    )
  }

  if (commentText.length > 5000) {
    return NextResponse.json(
      { error: "Comment must be 5000 characters or less." },
      { status: 400 }
    )
  }

  const insert: Record<string, unknown> = {
    exercise_id: exerciseId,
    user_id: user.id,
    user_name: displayName,
    comment_text: commentText,
    rating,
  }

  if (user.email) {
    insert.user_email = user.email.toLowerCase()
  }

  const { data, error } = await supabase
    .from("comments")
    .insert(insert)
    .select("id, created_at")
    .single()

  if (error) {
    console.error("[comments POST]", error.message, error.code)
    return NextResponse.json(
      {
        error:
          "Could not save your comment. If this persists, your database may need a rating column or matching exercise id.",
      },
      { status: 500 }
    )
  }

  return NextResponse.json({
    ok: true,
    id: data.id,
    created_at: data.created_at,
  })
}
