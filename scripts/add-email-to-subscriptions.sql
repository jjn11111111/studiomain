-- Add email column to subscriptions table if it doesn't exist
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

-- Make email unique (one subscription per email)
ALTER TABLE subscriptions ADD CONSTRAINT unique_subscription_email UNIQUE (email);
