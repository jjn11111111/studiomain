/**
 * Single source of truth for which video file plays for each exercise.
 * No need to set video_url in Supabase – the app uses this map.
 * Buckets: Module A, Module B, Module C (paths relative to each bucket).
 */
export const EXERCISE_VIDEOS: Record<string, Record<number, { title: string; path: string }>> = {
  a: {
    1: { title: "Introduction to Vision Training", path: "A-Red Fruits/ex1.mp4" },
    2: { title: "Basic Eye Coordination", path: "A-Red Fruits/ex2.mp4" },
    3: { title: "Depth Perception Basics", path: "A-Red Fruits/ex3.mp4" },
    4: { title: "Convergence Exercise 1", path: "A-Red Fruits/ex4.mp4" },
    5: { title: "Divergence Exercise 1", path: "A-Red Fruits/ex5.mp4" },
    6: { title: "Focus Flexibility", path: "A-Red Fruits/ex6.mp4" },
    7: { title: "Peripheral Awareness", path: "A-Red Fruits/ex7.mp4" },
    8: { title: "Tracking Exercise 1", path: "A-Red Fruits/ex8.mp4" },
    9: { title: "Saccade Training", path: "A-Red Fruits/ex9.mp4" },
    10: { title: "Module A Review", path: "A-Red Fruits/ex10.mp4" },
  },
  b: {
    1: { title: "Advanced Convergence", path: "B-Yellow Animals/ex11.mp4" },
    2: { title: "Advanced Divergence", path: "B-Yellow Animals/ex12.mp4" },
    3: { title: "Binocular Fusion Training", path: "B-Yellow Animals/ex13.mp4" },
    4: { title: "Dynamic Depth Perception", path: "B-Yellow Animals/ex14.mp4" },
    5: { title: "Anti-Suppression Training", path: "B-Yellow Animals/ex15.mp4" },
    6: { title: "Accommodation Training", path: "B-Yellow Animals/ex16.mp4" },
    7: { title: "Complex Tracking", path: "B-Yellow Animals/ex17.mp4" },
    8: { title: "Spatial Awareness", path: "B-Yellow Animals/ex18.mp4" },
    9: { title: "Eye Teaming Exercise", path: "B-Yellow Animals/ex20.mp4" },
    10: { title: "Module B Review", path: "B-Yellow Animals/ex21.mp4" },
  },
  c: {
    1: { title: "Expert Stereopsis", path: "C-Blue Cities/ex22.mp4" },
    2: { title: "Fine Depth Discrimination", path: "C-Blue Cities/ex23.mp4" },
    3: { title: "Speed Fusion Training", path: "C-Blue Cities/ex24.mp4" },
    4: { title: "Complex Binocular Tasks", path: "C-Blue Cities/ex25.mp4" },
    5: { title: "Real-World Application 1", path: "C-Blue Cities/ex26.mp4" },
    6: { title: "Real-World Application 2", path: "C-Blue Cities/ex27.mp4" },
    7: { title: "Performance Optimization", path: "C-Blue Cities/Ex28.MP4" },
    8: { title: "Maintenance Routine", path: "C-Blue Cities/ex29.mp4" },
    9: { title: "Progress Assessment", path: "C-Blue Cities/ex30.mp4" },
    10: { title: "Complete Program Review", path: "C-Blue Cities/ex31.mp4" },
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
