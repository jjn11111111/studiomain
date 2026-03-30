"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Comment {
  id: string
  user_name: string
  comment_text: string
  rating: number
  created_at: string
}

interface ExerciseCommentsProps {
  exerciseId: string
}

export function ExerciseComments({ exerciseId }: ExerciseCommentsProps) {
  const pathname = usePathname()
  const loginHref = `/auth/login?redirect=${encodeURIComponent(pathname || "/exercises")}`

  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)

  const [userName, setUserName] = useState("")
  const [commentText, setCommentText] = useState("")
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/comments?exerciseId=${encodeURIComponent(exerciseId)}`
      )
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    } finally {
      setIsLoading(false)
    }
  }, [exerciseId])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u?.email) {
        setUserName((prev) => prev || (u.email.split("@")[0] ?? ""))
      }
      setAuthReady(true)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u?.email) {
        setUserName((prev) => prev || (u.email!.split("@")[0] ?? ""))
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    if (!user) {
      setFormError("Please sign in to post.")
      return
    }
    const text = commentText.trim()
    if (!text) {
      setFormError("Write something before posting.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId,
          commentText: text,
          rating,
          userName: userName.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setFormError(
          typeof data.error === "string"
            ? data.error
            : "Could not post. Try again."
        )
        return
      }
      setCommentText("")
      await loadComments()
    } catch {
      setFormError("Network error. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">Loading comments...</div>
    )
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-oswald font-bold">Community Feedback</h3>

      {comments.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No comments yet. Be the first to share your experience!
        </div>
      ) : (
        <div className="grid gap-4">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-4 bg-zinc-900/40 border-zinc-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-zinc-100">
                    {comment.user_name}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-200">
                {comment.comment_text}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-4 sm:p-6 bg-zinc-900/50 border-zinc-700">
        <h4 className="text-sm font-bold tracking-wider text-purple-300 uppercase mb-4">
          Add your comment
        </h4>
        {!authReady ? (
          <p className="text-sm text-zinc-500">Checking sign-in…</p>
        ) : !user ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">
              Sign in to post. You can add multiple comments over time.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href={loginHref}>Sign in to post</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment-display-name" className="text-zinc-300">
                Display name
              </Label>
              <Input
                id="comment-display-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="How you want to appear"
                maxLength={80}
                className="bg-black/40 border-zinc-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">Rating</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="p-1 rounded hover:bg-white/5 transition-colors"
                    aria-label={`${i + 1} star${i === 0 ? "" : "s"}`}
                  >
                    <Star
                      className={`w-6 h-6 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment-body" className="text-zinc-300">
                Your note
              </Label>
              <Textarea
                id="comment-body"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What did you notice? Any tips for others?"
                rows={4}
                maxLength={5000}
                className="bg-black/40 border-zinc-600 text-white resize-y min-h-[100px]"
              />
            </div>
            {formError && (
              <p className="text-sm text-red-400">{formError}</p>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {submitting ? "Posting…" : "Post feedback"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
