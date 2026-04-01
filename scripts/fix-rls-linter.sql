-- =============================================
-- Fix Supabase Database Linter warnings
-- 1. auth_rls_initplan: use (select auth.uid()) etc. so auth is evaluated once per query
-- 2. multiple_permissive_policies: single SELECT policy on subscriptions
-- 3. comments: no user_id in your table → use open read/insert, service_role for update/delete
-- Run in Supabase SQL Editor.
-- =============================================

-- ---------------------------------------------------------------------------
-- SUBSCRIPTIONS: drop all existing SELECT/ALL policies, then create one of each
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can read own subscription" ON subscriptions;
DROP POLICY IF EXISTS "service_role_can_manage_subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON subscriptions;

-- Single SELECT policy: service_role or own row by user_id or email (avoids multiple_permissive_policies)
CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    (select auth.role()) = 'service_role'
    OR (select auth.uid()) = user_id
    OR LOWER(TRIM(COALESCE((select auth.jwt())->>'email', '')))
       = LOWER(TRIM(COALESCE(email, '')))
  );

-- Service role can do everything else (INSERT/UPDATE/DELETE)
CREATE POLICY "subscriptions_service_role_all" ON subscriptions
  FOR ALL USING ((select auth.role()) = 'service_role');

-- ---------------------------------------------------------------------------
-- EXERCISES: fix auth.role() and drop "Active subscribers can read" if present
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Active subscribers can read" ON exercises;
DROP POLICY IF EXISTS "Service role can manage exercises" ON exercises;
DROP POLICY IF EXISTS "Anyone can view exercises" ON exercises;

CREATE POLICY "Anyone can view exercises" ON exercises
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage exercises" ON exercises
  FOR ALL USING ((select auth.role()) = 'service_role');

-- ---------------------------------------------------------------------------
-- COMMENTS: policies that do NOT require user_id
-- Your table has (exercise_id, user_name, comment_text, rating, id, created_at) — no user_id.
-- If you add user_id later, run add-comments-user-id.sql and switch to ownership policies.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Active subscribers can read" ON comments;
DROP POLICY IF EXISTS "Active subscribers can insert" ON comments;
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;
DROP POLICY IF EXISTS "Service role manages comments" ON comments;
DROP POLICY IF EXISTS "Service role deletes comments" ON comments;

CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Service role manages comments" ON comments
  FOR ALL USING ((select auth.role()) = 'service_role');

-- ---------------------------------------------------------------------------
-- PRACTICE_IMAGES: only if this table exists (e.g. from another migration)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'practice_images') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Active subscribers can read" ON practice_images';
    EXECUTE 'DROP POLICY IF EXISTS "practice_images_public_select" ON practice_images';
    EXECUTE 'CREATE POLICY "practice_images_public_select" ON practice_images FOR SELECT USING (true)';
    EXECUTE 'DROP POLICY IF EXISTS "practice_images_service_role_all" ON practice_images';
    EXECUTE 'CREATE POLICY "practice_images_service_role_all" ON practice_images FOR ALL USING ((select auth.role()) = ''service_role'')';
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- USER_PROGRESS: fix auth.uid(), ensure RLS is enabled
-- ---------------------------------------------------------------------------
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own progress" ON user_progress;
CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING ((select auth.uid()) = user_id);

-- Done. Re-run the linter to confirm warnings are resolved.
