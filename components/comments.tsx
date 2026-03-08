import { useEffect, useState } from "react"

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
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetch(`/api/comments?exerciseId=${encodeURIComponent(exerciseId)}`)
        if (!res.ok) {
          throw new Error(`Failed to load comments: ${res.status}`)
        }
        const data = await res.json()
        setComments(data.comments ?? [])
      } catch (error) {
        // Soft-fail: just show no comments if API breaks
        setComments([])
      } finally {
        setLoading(false)
      }
    }

    loadComments()
  }, [exerciseId])

  if (loading) {
    return null
  }

  if (!comments.length) {
    return null
  }

  return (
    <section className="bg-zinc-950/80 border-t border-zinc-800 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans text-sm font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">
          Participant Reflections
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
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
      </div>
    </section>
  )
}

