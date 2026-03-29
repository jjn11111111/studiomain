"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PracticeImage {
  id: string
  title: string
  description: string | null
  image_url: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string | null
}

const PRACTICE_STORAGE_BASE =
  process.env.NEXT_PUBLIC_PRACTICE_IMAGES_BASE ||
  "https://azbdkfqhrvncwhzdlfoy.supabase.co/storage/v1/object/public/user-uploads"

const makeUrl = (fileName: string) => `${PRACTICE_STORAGE_BASE}/${encodeURIComponent(fileName)}`

const mockImages: PracticeImage[] = [
  {
    id: "1",
    title: "Boardwalk Stereo",
    description: "Beginner cross-view practice on the boardwalk.",
    image_url: makeUrl("boardwalk stereo.jpeg"),
    difficulty: "beginner",
    category: "scene",
  },
  {
    id: "2",
    title: "Little Kids in Snow",
    description: "Soft depth cues in a snowy forest path.",
    // Served from /public/practice so it works without Supabase; was previously littlekidsnow.jpeg in Storage.
    image_url: "/practice/little-kids-snow.png",
    difficulty: "beginner",
    category: "people",
  },
  {
    id: "3",
    title: "Mirror Balls",
    description: "Intermediate reflections and depth.",
    image_url: makeUrl("mirror balls.jpeg"),
    difficulty: "intermediate",
    category: "objects",
  },
  {
    id: "4",
    title: "Stereo 11",
    description: "Advanced fine-depth stereogram.",
    image_url: makeUrl("stereo11.jpg"),
    difficulty: "advanced",
    category: "abstract",
  },
  {
    id: "5",
    title: "Sunset Stereo",
    description: "Warm gradient depth practice.",
    image_url: makeUrl("sunsetstereo.jpeg"),
    difficulty: "intermediate",
    category: "nature",
  },
  {
    id: "6",
    title: "Two Houses",
    description: "Compare depth between structures.",
    image_url: makeUrl("two houses.jpg"),
    difficulty: "beginner",
    category: "architecture",
  },
]

export function PracticeGallery() {
  const [selectedImage, setSelectedImage] = useState<PracticeImage | null>(null)

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/50",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    advanced: "bg-red-500/20 text-red-400 border-red-500/50",
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockImages.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
            onClick={() => setSelectedImage(image)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black/20">
                <img
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className={difficultyColors[image.difficulty]}>
                    {image.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-lg">{image.title}</CardTitle>
              {image.description && <p className="text-sm text-muted-foreground">{image.description}</p>}
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-6xl w-full">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-gray-400">{selectedImage.description}</p>}
              </div>
              <Badge variant="outline" className={difficultyColors[selectedImage.difficulty]}>
                {selectedImage.difficulty}
              </Badge>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-gray-400 mt-4">Click anywhere to close</p>
          </div>
        </div>
      )}
    </>
  )
}
