-- Update RLS policies for subscription-based access

-- Exercises table: Allow access only to users with active subscriptions
DROP POLICY IF EXISTS "Allow public read access" ON exercises;

CREATE POLICY "Allow authenticated users with active subscription to read exercises"
ON exercises FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM subscriptions
    WHERE subscriptions.user_id = auth.uid()
    AND subscriptions.status = 'active'
  )
);

-- Subscriptions table policies are already correct
-- Users can only view their own subscription
