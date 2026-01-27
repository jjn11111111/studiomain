-- =============================================
-- STUDIOMAIN DATABASE SETUP
-- Run this script in your Supabase SQL Editor
-- =============================================

-- 1. SUBSCRIPTIONS TABLE
-- Stores Stripe subscription data linked to users
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'inactive',
  plan_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- 2. EXERCISES TABLE
-- Stores exercise content for each module
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module TEXT NOT NULL,
  exercise_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(module, exercise_number)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_exercises_module ON exercises(module);

-- 3. COMMENTS TABLE
-- Stores user comments on exercises
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  user_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_comments_exercise_id ON comments(exercise_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- 4. USER PROGRESS TABLE (Optional - for tracking completed exercises)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for SUBSCRIPTIONS
-- Users can read their own subscription
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt()->>'email' = email);

-- Service role can manage all subscriptions (for webhooks)
CREATE POLICY "Service role can manage subscriptions" ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');

-- 7. RLS Policies for EXERCISES
-- Anyone can read exercises (public content)
CREATE POLICY "Anyone can view exercises" ON exercises
  FOR SELECT USING (true);

-- Only service role can manage exercises
CREATE POLICY "Service role can manage exercises" ON exercises
  FOR ALL USING (auth.role() = 'service_role');

-- 8. RLS Policies for COMMENTS
-- Anyone can read comments
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update/delete their own comments
CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- 9. RLS Policies for USER PROGRESS
-- Users can manage their own progress
CREATE POLICY "Users can manage own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

-- 10. SEED EXERCISES DATA
-- Module A: Foundation exercises
INSERT INTO exercises (module, exercise_number, title, description, duration_seconds, is_free, sort_order) VALUES
  ('A', 1, 'Introduction to Vision Training', 'Learn the fundamentals of stereoscopic vision training', 300, true, 1),
  ('A', 2, 'Basic Eye Coordination', 'Develop basic eye coordination skills', 360, false, 2),
  ('A', 3, 'Depth Perception Basics', 'Understanding depth perception fundamentals', 420, false, 3),
  ('A', 4, 'Convergence Exercise 1', 'First convergence training exercise', 300, false, 4),
  ('A', 5, 'Divergence Exercise 1', 'First divergence training exercise', 300, false, 5),
  ('A', 6, 'Focus Flexibility', 'Train your focusing muscles', 360, false, 6),
  ('A', 7, 'Peripheral Awareness', 'Expand your peripheral vision', 420, false, 7),
  ('A', 8, 'Tracking Exercise 1', 'Basic smooth pursuit training', 300, false, 8),
  ('A', 9, 'Saccade Training', 'Quick eye movement training', 360, false, 9),
  ('A', 10, 'Module A Review', 'Comprehensive review of Module A concepts', 480, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

-- Module B: Intermediate exercises
INSERT INTO exercises (module, exercise_number, title, description, duration_seconds, is_free, sort_order) VALUES
  ('B', 1, 'Advanced Convergence', 'Advanced convergence techniques', 360, false, 1),
  ('B', 2, 'Advanced Divergence', 'Advanced divergence techniques', 360, false, 2),
  ('B', 3, 'Binocular Fusion Training', 'Learn to fuse stereoscopic images', 420, false, 3),
  ('B', 4, 'Dynamic Depth Perception', 'Moving depth perception exercises', 300, false, 4),
  ('B', 5, 'Anti-Suppression Training', 'Prevent eye suppression', 360, false, 5),
  ('B', 6, 'Accommodation Training', 'Focus muscle strengthening', 420, false, 6),
  ('B', 7, 'Complex Tracking', 'Advanced tracking exercises', 300, false, 7),
  ('B', 8, 'Spatial Awareness', 'Develop 3D spatial awareness', 360, false, 8),
  ('B', 9, 'Eye Teaming Exercise', 'Improve eye coordination', 420, false, 9),
  ('B', 10, 'Module B Review', 'Comprehensive review of Module B concepts', 480, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

-- Module C: Advanced exercises
INSERT INTO exercises (module, exercise_number, title, description, duration_seconds, is_free, sort_order) VALUES
  ('C', 1, 'Expert Stereopsis', 'Master-level stereopsis training', 420, false, 1),
  ('C', 2, 'Fine Depth Discrimination', 'Precise depth perception training', 360, false, 2),
  ('C', 3, 'Speed Fusion Training', 'Quick fusion technique training', 300, false, 3),
  ('C', 4, 'Complex Binocular Tasks', 'Advanced binocular coordination', 420, false, 4),
  ('C', 5, 'Real-World Application 1', 'Apply skills to real scenarios', 360, false, 5),
  ('C', 6, 'Real-World Application 2', 'Advanced real-world training', 360, false, 6),
  ('C', 7, 'Performance Optimization', 'Optimize your visual performance', 420, false, 7),
  ('C', 8, 'Maintenance Routine', 'Daily maintenance exercises', 300, false, 8),
  ('C', 9, 'Progress Assessment', 'Assess your improvement', 480, false, 9),
  ('C', 10, 'Complete Program Review', 'Final review of all modules', 600, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

-- 11. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_exercises_updated_at ON exercises;
CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
