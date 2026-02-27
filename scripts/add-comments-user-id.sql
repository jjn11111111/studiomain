-- =============================================
-- Optional: Add user_id to comments for ownership-based RLS
-- Run this only if your comments table does NOT have user_id and you want
-- "users can update/delete own comments". Then run the policy block at the end.
-- =============================================

-- 1) Add user_id to comments
ALTER TABLE public.comments
  ADD COLUMN IF NOT EXISTS user_id uuid;

-- 2) (Optional) FK to auth.users for integrity
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema = 'public' AND table_name = 'comments' AND constraint_name = 'comments_user_id_fkey'
  ) THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES auth.users(id)
      ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;

-- 3) Index for RLS performance
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);

-- 4) Backfill: set user_id from auth where you can match (e.g. by email). Example if you have user_email:
-- UPDATE public.comments c SET user_id = u.id FROM auth.users u WHERE u.email = c.user_email AND c.user_id IS NULL;

-- 5) Drop existing comment policies and create ownership-based ones
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Service role manages comments" ON comments;

CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING ((select auth.uid()) = user_id);

CREATE POLICY "Service role manages comments" ON comments
  FOR ALL USING ((select auth.role()) = 'service_role');

-- Done. Ensure your app sets user_id when inserting comments.
