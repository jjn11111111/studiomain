-- =============================================================================
-- Align RLS with what the Supabase Dashboard showed (run in SQL Editor).
-- 1) practice_images: RLS on but zero policies → no rows via API.
-- 2) subscriptions: optional drop legacy duplicate SELECT policy.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) practice_images — public read + service role manage
-- -----------------------------------------------------------------------------
ALTER TABLE public.practice_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "practice_images_public_select" ON public.practice_images;
CREATE POLICY "practice_images_public_select" ON public.practice_images
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "practice_images_service_role_all" ON public.practice_images;
CREATE POLICY "practice_images_service_role_all" ON public.practice_images
  FOR ALL
  USING ((select auth.role()) = 'service_role');

-- -----------------------------------------------------------------------------
-- 2) subscriptions — remove legacy duplicate if you already use subscriptions_select
--    (Keeps one clear SELECT path; avoids multiple permissive SELECT policies.)
--    Inspect first if unsure:
--    SELECT policyname, cmd, qual, with_check
--    FROM pg_policies WHERE tablename = 'subscriptions';
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "users_can_read_own_subscription" ON public.subscriptions;
