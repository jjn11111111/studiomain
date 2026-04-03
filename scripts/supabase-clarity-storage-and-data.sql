-- =============================================================================
-- Clarity helpers: Storage layout + subscription vs auth (run in SQL Editor).
-- Safe to re-run: replaces view; comments are idempotent enough for ops.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- A) What “buckets” mean in Supabase
-- -----------------------------------------------------------------------------
-- 1) STORAGE buckets (Dashboard → Storage): file containers. This app expects:
--    - Module A, Module B, Module C  (public) — exercise videos. See STORAGE.md.
--    - Optional: user-uploads, home page, etc. if you use those paths in the UI.
-- 2) DATABASE “buckets” are just tables — subscriptions, exercises, comments, etc.
--    Stripe writes to public.subscriptions (email from checkout). Auth lives in
--    auth.users. Linking column: subscriptions.user_id (backfill scripts exist).
-- -----------------------------------------------------------------------------

COMMENT ON TABLE public.subscriptions IS
  'Stripe mirror: email = checkout customer (normalized in app). user_id links auth.users when set; access checks use email first, then user_id.';

-- -----------------------------------------------------------------------------
-- B) Support view: compare checkout email vs logged-in identity (SQL Editor only)
-- -----------------------------------------------------------------------------
-- Not exposed to anon/authenticated API clients — service_role only.
CREATE OR REPLACE VIEW public.v_subscriptions_with_auth AS
SELECT
  s.id,
  s.email AS stripe_email,
  s.user_id,
  u.email AS auth_email,
  (s.email IS NOT NULL AND u.email IS NOT NULL AND lower(trim(s.email)) <> lower(trim(u.email))) AS email_mismatch,
  s.status,
  s.current_period_end,
  s.stripe_customer_id,
  s.stripe_subscription_id,
  s.created_at
FROM public.subscriptions s
LEFT JOIN auth.users u ON u.id = s.user_id;

COMMENT ON VIEW public.v_subscriptions_with_auth IS
  'Support: SELECT * FROM v_subscriptions_with_auth ORDER BY current_period_end DESC; email_mismatch = pay email vs login email.';

REVOKE ALL ON public.v_subscriptions_with_auth FROM PUBLIC;
REVOKE ALL ON public.v_subscriptions_with_auth FROM anon, authenticated;
GRANT SELECT ON public.v_subscriptions_with_auth TO service_role;

-- -----------------------------------------------------------------------------
-- C) Optional: refresh user_id from auth when emails match (run after magic-link signups)
-- -----------------------------------------------------------------------------
-- UPDATE public.subscriptions s
-- SET user_id = u.id
-- FROM auth.users u
-- WHERE s.user_id IS NULL
--   AND lower(trim(s.email)) = lower(trim(u.email));
