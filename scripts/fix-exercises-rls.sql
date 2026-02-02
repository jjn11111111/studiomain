-- =============================================
-- FIX: Enable RLS on exercises table
-- This script resolves the lint warning:
-- "Table public.exercises has RLS policies but RLS is not enabled"
-- =============================================

-- Enable Row Level Security on the exercises table
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- Optional: Force RLS even for table owner sessions (recommended for security)
ALTER TABLE public.exercises FORCE ROW LEVEL SECURITY;

-- Clean up any old/misnamed policies and ensure correct policies exist
-- First, drop any potentially conflicting policies
DROP POLICY IF EXISTS "Allow public read access" ON public.exercises;

-- Recreate the correct policies (these are idempotent - will error if exists, which is fine)
DO $$
BEGIN
  -- Policy for anyone to view exercises
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'exercises' 
    AND policyname = 'Anyone can view exercises'
  ) THEN
    CREATE POLICY "Anyone can view exercises" ON public.exercises
      FOR SELECT USING (true);
  END IF;
  
  -- Policy for service role to manage exercises
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'exercises' 
    AND policyname = 'Service role can manage exercises'
  ) THEN
    CREATE POLICY "Service role can manage exercises" ON public.exercises
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Verify RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'exercises' AND schemaname = 'public';
