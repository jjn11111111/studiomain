import { VideoExerciseView } from "@/components/video-exercise-view"
import { Header } from "@/components/header"

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string; exerciseId: string }>
}) {
  const { moduleId, exerciseId } = await params
  
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <VideoExerciseView moduleId={moduleId} exerciseId={exerciseId} />
      </div>
    </main>
  )
}
