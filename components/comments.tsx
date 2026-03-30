"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Star } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  user_name: string
  comment_text: string
  rating: number
  created_at: string
}

interface CommentsProps {
  exerciseId: string
}

export function Comments({ exerciseId }: CommentsProps) {
  const pathname = usePathname()
  const loginHref = `/auth/login?redirect=${encodeURIComponent(pathname || "/exercises")}`

  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)

  const [userName, setUserName] = useState("")
  const [commentText, setCommentText] = useState("")
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?exerciseId=${encodeURIComponent(exerciseId)}`
      )
      if (!res.ok) {
        throw new Error(`Failed to load comments: ${res.status}`)
      }
      const data = await res.json()
      setComments(data.comments ?? [])
    } catch {
      setComments([])
    } finally {
      setLoading(false)
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

  return (
    <section className="bg-zinc-950/80 border-t border-zinc-800 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans text-sm font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">
          Participant Reflections
        </h2>

        {loading ? (
          <p className="text-sm text-zinc-500">Loading reflections…</p>
        ) : (
          <>
            {!comments.length ? (
              <p className="text-sm text-zinc-500 text-center py-4 mb-6">
                No reflections yet for this exercise.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 mb-10">
                {comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-4 sm:p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-sm text-zinc-100">
                          {comment.user_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {"★".repeat(comment.rating)}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-200 leading-relaxed">
                      {comment.comment_text}
                    </p>
                  </article>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-4 sm:p-6">
              <h3 className="font-sans text-xs font-bold tracking-[0.25em] text-amber-400/90 uppercase mb-4">
                Add your reflection
              </h3>

              {!authReady ? (
                <p className="text-sm text-zinc-500">Checking sign-in…</p>
              ) : !user ? (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-400">
                    Sign in to post a reflection. You can add as many as you like
                    over time.
                  </p>
                  <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                    <Link href={loginHref}>Sign in to post</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="reflection-display-name"
                      className="text-zinc-300"
                    >
                      Display name
                    </Label>
                    <Input
                      id="reflection-display-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="How you want to appear"
                      maxLength={80}
                      className="bg-zinc-950 border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">
                      Rating
                    </span>
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
                            className={`w-6 h-6 ${i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reflection-body" className="text-zinc-300">
                      Your reflection
                    </Label>
                    <Textarea
                      id="reflection-body"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="What did you notice? Any tips for others?"
                      rows={4}
                      maxLength={5000}
                      className="bg-zinc-950 border-zinc-700 text-zinc-100 resize-y min-h-[100px]"
                    />
                  </div>
                  {formError && (
                    <p className="text-sm text-red-400">{formError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                  >
                    {submitting ? "Posting…" : "Post reflection"}
                  </Button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
