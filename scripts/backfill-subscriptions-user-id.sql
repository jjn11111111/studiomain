-- Link subscriptions to auth.users by email so /api/check-subscription can find rows
-- when Stripe email and magic-link email differ slightly or user_id was never set.
-- Run once in Supabase SQL Editor (service role / SQL is fine).

UPDATE public.subscriptions s
SET user_id = u.id
FROM auth.users u
WHERE s.user_id IS NULL
  AND s.email IS NOT NULL
  AND LOWER(TRIM(s.email)) = LOWER(TRIM(u.email));
