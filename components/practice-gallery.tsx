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

const mockImages: PracticeImage[] = [
  {
    id: "1",
    title: "House & Tree",
    description: "Basic stereoscopic cross-view practice",
    image_url: "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/misc.3rdeye/practice-1.png",
    difficulty: "beginner",
    category: "basic",
  },
  {
    id: "2",
    title: "Geometric Shapes",
    description: "Practice depth perception with simple shapes",
    image_url: "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/misc.3rdeye/practice-2.png",
    difficulty: "beginner",
    category: "shapes",
  },
  {
    id: "3",
    title: "Nature Scene",
    description: "Intermediate depth with natural elements",
    image_url: "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/misc.3rdeye/practice-3.png",
    difficulty: "intermediate",
    category: "nature",
  },
  {
    id: "4",
    title: "Deep Layers",
    description: "Master multiple depth layers",
    image_url: "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/misc.3rdeye/practice-5.png",
    difficulty: "advanced",
    category: "advanced",
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
