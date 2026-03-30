-- Run in Supabase SQL Editor if POST /api/comments fails (unknown column / FK).
-- Adjust to match your live schema.

ALTER TABLE public.comments
  ADD COLUMN IF NOT EXISTS comment_text TEXT;

ALTER TABLE public.comments
  ADD COLUMN IF NOT EXISTS rating INTEGER;

ALTER TABLE public.comments
  ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Legacy setups used `content` instead of comment_text
UPDATE public.comments
SET comment_text = content
WHERE comment_text IS NULL AND content IS NOT NULL;

-- If exercise_id must reference exercises(id), use real UUIDs from public.exercises only.
