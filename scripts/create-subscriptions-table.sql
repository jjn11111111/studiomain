-- Create subscriptions table to track user subscriptions
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive',
  plan_id text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on subscriptions
alter table public.subscriptions enable row level security;

-- Users can read their own subscription
create policy "users_can_read_own_subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service role can insert/update subscriptions (via API)
create policy "service_role_can_manage_subscriptions"
  on public.subscriptions for all
  using (auth.role() = 'service_role');

-- Add index for faster lookups
create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index subscriptions_stripe_customer_id_idx on public.subscriptions(stripe_customer_id);
