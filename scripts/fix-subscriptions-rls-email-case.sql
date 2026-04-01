-- Fix subscription rows invisible to RLS when JWT email casing differs from LOWER(email).
-- Symptom: logged-in users see "Subscription Required" even with a valid subscriptions row.
-- Run once in Supabase SQL Editor (Dashboard → SQL).
--
-- Before: (select auth.jwt())->>'email' = LOWER(email)  -- JWT side was not lowercased
-- After: compare both sides with LOWER(TRIM(...))

-- Optional: normalize stored emails so app queries using lowercase session email always match.
-- If this errors on duplicate emails differing only by case, resolve duplicates first.
UPDATE subscriptions
SET email = LOWER(TRIM(email))
WHERE email IS NOT NULL AND email <> LOWER(TRIM(email));

DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;

CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    (select auth.role()) = 'service_role'
    OR (select auth.uid()) = user_id
    OR LOWER(TRIM(COALESCE((select auth.jwt())->>'email', '')))
       = LOWER(TRIM(COALESCE(email, '')))
  );
