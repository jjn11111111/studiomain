"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

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
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments?exerciseId=${exerciseId}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments || [])
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [exerciseId])

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading comments...</div>
  }

  if (comments.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No comments yet. Be the first to share your experience!</div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-oswald font-bold">Community Feedback</h3>
      <div className="grid gap-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold">{comment.user_name}</p>
                <p className="text-sm text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed">{comment.comment_text}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
