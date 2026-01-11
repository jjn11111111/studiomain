export interface Exercise {
  id: string
  module: string
  exercise_number: number
  title: string
  video_url: string
}

export const exercises: Exercise[] = [
  // MODULE A: Red Fruits (10 exercises)
  {
    id: "a-1",
    module: "A",
    exercise_number: 1,
    title: "Apple",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design(12).MP4",
  },
  {
    id: "a-2",
    module: "A",
    exercise_number: 2,
    title: "Banana",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design(20)%202.MP4",
  },
  {
    id: "a-3",
    module: "A",
    exercise_number: 3,
    title: "Cantaloupe",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Video%2014.MP4",
  },
  {
    id: "a-4",
    module: "A",
    exercise_number: 4,
    title: "Dragon Fruit",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Video%202.mp4",
  },
  {
    id: "a-5",
    module: "A",
    exercise_number: 5,
    title: "Elderberry",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design%20(1).mp4",
  },
  {
    id: "a-6",
    module: "A",
    exercise_number: 6,
    title: "Fig",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design%20(2).mp4",
  },
  {
    id: "a-7",
    module: "A",
    exercise_number: 7,
    title: "Grape",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design%20(3).mp4",
  },
  {
    id: "a-8",
    module: "A",
    exercise_number: 8,
    title: "Honeydew",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design%20(4).mp4",
  },
  {
    id: "a-9",
    module: "A",
    exercise_number: 9,
    title: "Italian Plum",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design%20(5).mp4",
  },
  {
    id: "a-10",
    module: "A",
    exercise_number: 10,
    title: "Jackfruit",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20A/A-Red%20Fruits/Untitled%20design.mp4",
  },

  // MODULE B: Yellow Animals (10 exercises)
  {
    id: "b-1",
    module: "B",
    exercise_number: 1,
    title: "Aardvark",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(2).mp4",
  },
  {
    id: "b-2",
    module: "B",
    exercise_number: 2,
    title: "Bear",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(6).mp4",
  },
  {
    id: "b-3",
    module: "B",
    exercise_number: 3,
    title: "Cheetah",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(7).mp4",
  },
  {
    id: "b-4",
    module: "B",
    exercise_number: 4,
    title: "Dolphin",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(10).mp4",
  },
  {
    id: "b-5",
    module: "B",
    exercise_number: 5,
    title: "Elephant",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(11).mp4",
  },
  {
    id: "b-6",
    module: "B",
    exercise_number: 6,
    title: "Fox",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(13).mp4",
  },
  {
    id: "b-7",
    module: "B",
    exercise_number: 7,
    title: "Giraffe",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Video%2011.MP4",
  },
  {
    id: "b-8",
    module: "B",
    exercise_number: 8,
    title: "Hippo",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Video%2013.MP4",
  },
  {
    id: "b-9",
    module: "B",
    exercise_number: 9,
    title: "Iguana",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(26)%202.MP4",
  },
  {
    id: "b-10",
    module: "B",
    exercise_number: 10,
    title: "Jaguar",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20B/B-Yellow%20Animals/Untitled%20design(32).MP4",
  },

  // MODULE C: Blue Cities (10 exercises)
  {
    id: "c-1",
    module: "C",
    exercise_number: 1,
    title: "Atlanta",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%203.mp4",
  },
  {
    id: "c-2",
    module: "C",
    exercise_number: 2,
    title: "Boston",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2010.MP4",
  },
  {
    id: "c-3",
    module: "C",
    exercise_number: 3,
    title: "Chicago",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2012.MP4",
  },
  {
    id: "c-4",
    module: "C",
    exercise_number: 4,
    title: "Dallas",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2015.MP4",
  },
  {
    id: "c-5",
    module: "C",
    exercise_number: 5,
    title: "Elmira",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2016.MP4",
  },
  {
    id: "c-6",
    module: "C",
    exercise_number: 6,
    title: "Fresno",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2017.MP4",
  },
  {
    id: "c-7",
    module: "C",
    exercise_number: 7,
    title: "Gary",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2018.MP4",
  },
  {
    id: "c-8",
    module: "C",
    exercise_number: 8,
    title: "Houston",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2019.MP4",
  },
  {
    id: "c-9",
    module: "C",
    exercise_number: 9,
    title: "Indianapolis",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2022.MP4",
  },
  {
    id: "c-10",
    module: "C",
    exercise_number: 10,
    title: "Jersey City",
    video_url:
      "https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module%20C/C-Blue%20Cities/Video%2023.MP4",
  },
]

export const EXERCISES_DATA = exercises

export function getExercisesByModule(moduleId: string): Exercise[] {
  return exercises.filter((ex) => ex.module.toLowerCase() === moduleId.toLowerCase())
}

export function getExercise(moduleId: string, exerciseNumber: number): Exercise | undefined {
  return exercises.find(
    (ex) => ex.module.toLowerCase() === moduleId.toLowerCase() && ex.exercise_number === exerciseNumber,
  )
}

export default exercises
