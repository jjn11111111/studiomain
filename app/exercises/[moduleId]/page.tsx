import { ExerciseView } from "@/components/exercise-view"
import { Header } from "@/components/header"

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params
  
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <ExerciseView moduleId={moduleId} />
      </div>
    </main>
  )
}
