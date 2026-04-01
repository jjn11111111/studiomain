-- Supabase Security Advisor: "RLS Enabled No Policy" on public.practice_images
-- When RLS is ON and there are zero policies, SELECT/INSERT/UPDATE/DELETE are denied
-- for normal roles—queries fail or return no rows.
--
-- Run in Supabase SQL Editor once.

ALTER TABLE public.practice_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "practice_images_public_select" ON public.practice_images;
CREATE POLICY "practice_images_public_select" ON public.practice_images
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "practice_images_service_role_all" ON public.practice_images;
CREATE POLICY "practice_images_service_role_all" ON public.practice_images
  FOR ALL
  USING ((select auth.role()) = 'service_role');
