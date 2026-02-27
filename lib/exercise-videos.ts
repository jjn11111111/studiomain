/**
 * Single source of truth for which video file plays for each exercise.
 * Paths are relative to each bucket root (e.g. Module A contains ex1.mp4 … ex10.mp4 at root).
 */
export const EXERCISE_VIDEOS: Record<string, Record<number, { title: string; path: string }>> = {
  a: {
    1: { title: "Introduction to Vision Training", path: "ex1.mp4" },
    2: { title: "Basic Eye Coordination", path: "ex2.mp4" },
    3: { title: "Depth Perception Basics", path: "ex3.mp4" },
    4: { title: "Convergence Exercise 1", path: "ex4.mp4" },
    5: { title: "Divergence Exercise 1", path: "ex5.mp4" },
    6: { title: "Focus Flexibility", path: "ex6.mp4" },
    7: { title: "Peripheral Awareness", path: "ex7.mp4" },
    8: { title: "Tracking Exercise 1", path: "ex8.mp4" },
    9: { title: "Saccade Training", path: "ex9.mp4" },
    10: { title: "Module A Review", path: "ex10.mp4" },
  },
  b: {
    1: { title: "Advanced Convergence", path: "ex11.mp4" },
    2: { title: "Advanced Divergence", path: "ex12.mp4" },
    3: { title: "Binocular Fusion Training", path: "ex13.mp4" },
    4: { title: "Dynamic Depth Perception", path: "ex14.mp4" },
    5: { title: "Anti-Suppression Training", path: "ex15.mp4" },
    6: { title: "Accommodation Training", path: "ex16.mp4" },
    7: { title: "Complex Tracking", path: "ex17.mp4" },
    8: { title: "Spatial Awareness", path: "ex18.mp4" },
    9: { title: "Eye Teaming Exercise", path: "ex20.mp4" },
    10: { title: "Module B Review", path: "ex21.mp4" },
  },
  c: {
    1: { title: "Expert Stereopsis", path: "ex22.mp4" },
    2: { title: "Fine Depth Discrimination", path: "ex23.mp4" },
    3: { title: "Speed Fusion Training", path: "ex24.mp4" },
    4: { title: "Complex Binocular Tasks", path: "ex25.mp4" },
    5: { title: "Real-World Application 1", path: "ex26.mp4" },
    6: { title: "Real-World Application 2", path: "ex27.mp4" },
    7: { title: "Performance Optimization", path: "Ex28.MP4" },
    8: { title: "Maintenance Routine", path: "ex29.mp4" },
    9: { title: "Progress Assessment", path: "ex30.mp4" },
    10: { title: "Complete Program Review", path: "ex31.mp4" },
  },
}

const BUCKET_BY_MODULE: Record<string, string> = {
  a: "Module A",
  b: "Module B",
  c: "Module C",
}

export function getExerciseVideo(
  moduleId: string,
  exerciseNumber: number
): { title: string; path: string; bucket: string } | null {
  const key = moduleId.toLowerCase()
  const bucket = BUCKET_BY_MODULE[key] ?? "videos"
  const entry = EXERCISE_VIDEOS[key]?.[exerciseNumber]
  if (!entry) return null
  return { ...entry, bucket }
}
