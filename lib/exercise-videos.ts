/**
 * Single source of truth for which video file plays for each exercise.
 * Paths are relative to each bucket root (e.g. Module A contains ex1.mp4 … ex10.mp4 at root).
 */
export const EXERCISE_VIDEOS: Record<string, Record<number, { title: string; path: string }>> = {
  a: {
    1: { title: "A - Apple", path: "ex1.mp4" },
    2: { title: "B - Banana", path: "ex2.mp4" },
    3: { title: "C - Cherry", path: "ex3.mp4" },
    4: { title: "D - Dragon Fruit", path: "ex4.mp4" },
    5: { title: "E - Elderberry", path: "ex5.mp4" },
    6: { title: "F - Fig", path: "ex6.mp4" },
    7: { title: "G - Guava", path: "ex7.mp4" },
    8: { title: "H - Honeydew", path: "ex8.mp4" },
    9: { title: "I - Icaco", path: "ex9.mp4" },
    10: { title: "J - Jackfruit", path: "ex10.mp4" },
  },
  b: {
    1: { title: "Ardvaark", path: "ex11.mp4" },
    2: { title: "Bear", path: "ex12.mp4" },
    3: { title: "Coyote", path: "ex13.mp4" },
    4: { title: "Dog", path: "ex14.mp4" },
    5: { title: "Elephant", path: "ex15.mp4" },
    6: { title: "Ferret", path: "ex16.mp4" },
    7: { title: "Giraffe", path: "ex17.mp4" },
    8: { title: "Hyena", path: "ex18.mp4" },
    9: { title: "Iguana", path: "ex20.mp4" },
    10: { title: "Jaguar", path: "ex21.mp4" },
  },
  c: {
    1: { title: "Atlanta", path: "ex22.mp4" },
    2: { title: "Boston", path: "ex23.mp4" },
    3: { title: "Charleston", path: "ex24.mp4" },
    4: { title: "Dallas", path: "ex25.mp4" },
    5: { title: "Easthampton", path: "ex26.mp4" },
    6: { title: "Fresno", path: "ex27.mp4" },
    7: { title: "Greenwich", path: "Ex28.MP4" },
    8: { title: "Houston", path: "ex29.mp4" },
    9: { title: "Iowa City", path: "ex30.mp4" },
    10: { title: "Jackson", path: "ex31.mp4" },
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
