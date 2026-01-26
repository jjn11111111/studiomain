-- Add user_id column to subscriptions table to link to auth.users
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Update RLS policy to allow users to read their own subscription by user_id or email
DROP POLICY IF EXISTS "Users can read own subscription" ON subscriptions;
CREATE POLICY "Users can read own subscription" ON subscriptions 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'email' = email
  );

-- Function to auto-link subscription when user signs up with matching email
CREATE OR REPLACE FUNCTION public.link_subscription_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE subscriptions 
  SET user_id = NEW.id 
  WHERE email = NEW.email AND user_id IS NULL;
  RETURN NEW;
END;
$$;

-- Trigger to run the function after user signup
DROP TRIGGER IF EXISTS on_auth_user_created_link_subscription ON auth.users;
CREATE TRIGGER on_auth_user_created_link_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.link_subscription_on_signup();
