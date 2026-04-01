-- =============================================================================
-- Supabase Security Advisor fixes (run once in SQL Editor)
-- Matches lints: function_search_path_mutable, rls_policy_always_true (comments)
-- Auth "leaked password protection" is toggled in Dashboard only (see bottom).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) Function search_path mutable — public.is_stripe_active
--    Locks search_path so the function cannot be tricked via malicious objects.
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  fn_args text;
BEGIN
  SELECT pg_get_function_identity_arguments(p.oid)
  INTO fn_args
  FROM pg_proc p
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE n.nspname = 'public'
    AND p.proname = 'is_stripe_active'
  ORDER BY p.oid
  LIMIT 1;

  IF fn_args IS NOT NULL THEN
    EXECUTE format(
      'ALTER FUNCTION public.is_stripe_active(%s) SET search_path = pg_catalog, public',
      fn_args
    );
    RAISE NOTICE 'Set search_path on public.is_stripe_active(%)', fn_args;
  ELSE
    RAISE NOTICE 'No public.is_stripe_active function found; skip search_path fix.';
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2) RLS: comments INSERT must not use WITH CHECK (true)
--    App (app/api/comments/route.ts) inserts with user_id = auth user id.
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;

CREATE POLICY "Authenticated users can create comments" ON public.comments
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- -----------------------------------------------------------------------------
-- 3) Leaked password protection — not SQL; enable in Supabase Dashboard:
--    Authentication → Providers → Email → Password → enable
--    "Prevent use of leaked passwords" (HaveIBeenPwned)
--    https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
-- -----------------------------------------------------------------------------
