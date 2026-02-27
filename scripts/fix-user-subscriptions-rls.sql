-- =============================================
-- Fix: RLS disabled on public.user_subscriptions
-- Table is in the public schema (exposed to PostgREST) but RLS was off.
-- This enables RLS and adds per-user policies (assumes user_id column).
-- Run in Supabase SQL Editor.
-- =============================================

-- Only run if the table exists (e.g. created in dashboard or another migration)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_subscriptions') THEN
    -- 1. Enable RLS (locks down access until policies are defined)
    EXECUTE 'ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY';

    -- 2. Drop existing policies if any (avoid duplicates)
    DROP POLICY IF EXISTS "read_own" ON public.user_subscriptions;
    DROP POLICY IF EXISTS "insert_own" ON public.user_subscriptions;
    DROP POLICY IF EXISTS "update_own" ON public.user_subscriptions;
    DROP POLICY IF EXISTS "delete_own" ON public.user_subscriptions;

    -- 3. Per-user policies using (select auth.uid()) for linter-friendly evaluation
    CREATE POLICY "read_own" ON public.user_subscriptions
      FOR SELECT TO authenticated
      USING ((SELECT auth.uid()) = user_id);

    CREATE POLICY "insert_own" ON public.user_subscriptions
      FOR INSERT TO authenticated
      WITH CHECK ((SELECT auth.uid()) = user_id);

    CREATE POLICY "update_own" ON public.user_subscriptions
      FOR UPDATE TO authenticated
      USING ((SELECT auth.uid()) = user_id)
      WITH CHECK ((SELECT auth.uid()) = user_id);

    CREATE POLICY "delete_own" ON public.user_subscriptions
      FOR DELETE TO authenticated
      USING ((SELECT auth.uid()) = user_id);

    -- 4. Index for policy performance
    CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
  END IF;
END $$;

-- Done. Re-run the linter; "RLS Disabled in Public Entity" for user_subscriptions should clear.
