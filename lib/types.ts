export interface Exercise {
  id: number
  module_id: string
  exercise_number: number
  title: string
  video_url: string
  duration?: string
  description?: string
}

export interface Module {
  id: string
  title: string
  subtitle: string
  color: string
  exercises: Exercise[]
}

// Bauhaus color scheme for modules
export const MODULE_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  a: { bg: "bg-red-600", text: "text-white", accent: "bg-red-700" },
  b: { bg: "bg-yellow-400", text: "text-black", accent: "bg-yellow-500" },
  c: { bg: "bg-blue-600", text: "text-white", accent: "bg-blue-700" },
}

export const MODULE_INFO: Record<string, { title: string; subtitle: string }> = {
  a: { title: "MODULE A", subtitle: "RED FRUITS" },
  b: { title: "MODULE B", subtitle: "YELLOW ANIMALS" },
  c: { title: "MODULE C", subtitle: "BLUE CITIES" },
}
