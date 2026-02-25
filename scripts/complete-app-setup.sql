/* =============================================
   PINEAL VISION / STUDIOMAIN - COMPLETE APP SQL
   Run in Supabase SQL Editor (sky-village or your project).
   Safe to run multiple times (IF NOT EXISTS, ON CONFLICT, DROP IF EXISTS).
   ============================================= */

-- 1. TABLES

-- Subscriptions (Stripe)
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

-- Add user_id if table already existed without it (e.g. email-only Stripe setup)
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Exercises (per-module video exercises)
-- video_url: full URL or path in Storage (e.g. "A-Red Fruits/ex1.mp4"); app resolves via bucket Module A/B/C
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

CREATE INDEX IF NOT EXISTS idx_exercises_module ON exercises(module);

-- Comments (on exercises)
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

CREATE INDEX IF NOT EXISTS idx_comments_exercise_id ON comments(exercise_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- User progress (optional)
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

-- ---------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS)
-- ---------------------------------------------------------------------------

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Subscriptions: users can only read their own (by email from JWT). Writes are via service_role (webhooks).
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.jwt()->>'email' = email);

-- Exercises: public read; writes via service_role only
DROP POLICY IF EXISTS "Anyone can view exercises" ON exercises;
CREATE POLICY "Anyone can view exercises" ON exercises FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage exercises" ON exercises;
CREATE POLICY "Service role can manage exercises" ON exercises FOR ALL USING (auth.role() = 'service_role');

-- Comments: public read; authenticated users insert/update/delete own
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own comments" ON comments;
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own comments" ON comments;
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- User progress: users manage own rows
DROP POLICY IF EXISTS "Users can manage own progress" ON user_progress;
CREATE POLICY "Users can manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. UPDATED_AT TRIGGERS
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_exercises_updated_at ON exercises;
CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 4. SEED EXERCISES (titles only; no description so works if column missing)
-- ---------------------------------------------------------------------------

INSERT INTO exercises (module, exercise_number, title, duration_seconds, is_free, sort_order) VALUES
  ('A', 1, 'Introduction to Vision Training', 300, true, 1),
  ('A', 2, 'Basic Eye Coordination', 360, false, 2),
  ('A', 3, 'Depth Perception Basics', 420, false, 3),
  ('A', 4, 'Convergence Exercise 1', 300, false, 4),
  ('A', 5, 'Divergence Exercise 1', 300, false, 5),
  ('A', 6, 'Focus Flexibility', 360, false, 6),
  ('A', 7, 'Peripheral Awareness', 420, false, 7),
  ('A', 8, 'Tracking Exercise 1', 300, false, 8),
  ('A', 9, 'Saccade Training', 360, false, 9),
  ('A', 10, 'Module A Review', 480, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

INSERT INTO exercises (module, exercise_number, title, duration_seconds, is_free, sort_order) VALUES
  ('B', 1, 'Advanced Convergence', 360, false, 1),
  ('B', 2, 'Advanced Divergence', 360, false, 2),
  ('B', 3, 'Binocular Fusion Training', 420, false, 3),
  ('B', 4, 'Dynamic Depth Perception', 300, false, 4),
  ('B', 5, 'Anti-Suppression Training', 360, false, 5),
  ('B', 6, 'Accommodation Training', 420, false, 6),
  ('B', 7, 'Complex Tracking', 300, false, 7),
  ('B', 8, 'Spatial Awareness', 360, false, 8),
  ('B', 9, 'Eye Teaming Exercise', 420, false, 9),
  ('B', 10, 'Module B Review', 480, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

INSERT INTO exercises (module, exercise_number, title, duration_seconds, is_free, sort_order) VALUES
  ('C', 1, 'Expert Stereopsis', 420, false, 1),
  ('C', 2, 'Fine Depth Discrimination', 360, false, 2),
  ('C', 3, 'Speed Fusion Training', 300, false, 3),
  ('C', 4, 'Complex Binocular Tasks', 420, false, 4),
  ('C', 5, 'Real-World Application 1', 360, false, 5),
  ('C', 6, 'Real-World Application 2', 360, false, 6),
  ('C', 7, 'Performance Optimization', 420, false, 7),
  ('C', 8, 'Maintenance Routine', 300, false, 8),
  ('C', 9, 'Progress Assessment', 480, false, 9),
  ('C', 10, 'Complete Program Review', 600, false, 10)
ON CONFLICT (module, exercise_number) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 5. VIDEO URLS (Storage paths – buckets: Module A, Module B, Module C)
-- Adjust paths if your filenames differ.
-- ---------------------------------------------------------------------------

-- Module A (A-Red Fruits)
UPDATE exercises SET video_url = 'A-Red Fruits/ex1.mp4'    WHERE module = 'A' AND exercise_number = 1;
UPDATE exercises SET video_url = 'A-Red Fruits/ex2.mp4'    WHERE module = 'A' AND exercise_number = 2;
UPDATE exercises SET video_url = 'A-Red Fruits/ex3.mp4'    WHERE module = 'A' AND exercise_number = 3;
UPDATE exercises SET video_url = 'A-Red Fruits/ex4.mp4'    WHERE module = 'A' AND exercise_number = 4;
UPDATE exercises SET video_url = 'A-Red Fruits/ex5.mp4'    WHERE module = 'A' AND exercise_number = 5;
UPDATE exercises SET video_url = 'A-Red Fruits/ex6.mp4'    WHERE module = 'A' AND exercise_number = 6;
UPDATE exercises SET video_url = 'A-Red Fruits/ex7.mp4'    WHERE module = 'A' AND exercise_number = 7;
UPDATE exercises SET video_url = 'A-Red Fruits/ex8.mp4'    WHERE module = 'A' AND exercise_number = 8;
UPDATE exercises SET video_url = 'A-Red Fruits/ex9.mp4'    WHERE module = 'A' AND exercise_number = 9;
UPDATE exercises SET video_url = 'A-Red Fruits/ex10.mp4'   WHERE module = 'A' AND exercise_number = 10;

-- Module B (B-Yellow Animals)
UPDATE exercises SET video_url = 'B-Yellow Animals/ex11.mp4' WHERE module = 'B' AND exercise_number = 1;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex12.mp4' WHERE module = 'B' AND exercise_number = 2;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex13.mp4' WHERE module = 'B' AND exercise_number = 3;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex14.mp4' WHERE module = 'B' AND exercise_number = 4;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex15.mp4' WHERE module = 'B' AND exercise_number = 5;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex16.mp4' WHERE module = 'B' AND exercise_number = 6;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex17.mp4' WHERE module = 'B' AND exercise_number = 7;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex18.mp4' WHERE module = 'B' AND exercise_number = 8;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex20.mp4' WHERE module = 'B' AND exercise_number = 9;
UPDATE exercises SET video_url = 'B-Yellow Animals/ex21.mp4' WHERE module = 'B' AND exercise_number = 10;

-- Module C (C-Blue Cities)
UPDATE exercises SET video_url = 'C-Blue Cities/ex22.mp4'  WHERE module = 'C' AND exercise_number = 1;
UPDATE exercises SET video_url = 'C-Blue Cities/ex23.mp4'  WHERE module = 'C' AND exercise_number = 2;
UPDATE exercises SET video_url = 'C-Blue Cities/ex24.mp4'  WHERE module = 'C' AND exercise_number = 3;
UPDATE exercises SET video_url = 'C-Blue Cities/ex25.mp4'  WHERE module = 'C' AND exercise_number = 4;
UPDATE exercises SET video_url = 'C-Blue Cities/ex26.mp4'  WHERE module = 'C' AND exercise_number = 5;
UPDATE exercises SET video_url = 'C-Blue Cities/ex27.mp4'  WHERE module = 'C' AND exercise_number = 6;
UPDATE exercises SET video_url = 'C-Blue Cities/Ex28.MP4'   WHERE module = 'C' AND exercise_number = 7;
UPDATE exercises SET video_url = 'C-Blue Cities/ex29.mp4'  WHERE module = 'C' AND exercise_number = 8;
UPDATE exercises SET video_url = 'C-Blue Cities/ex30.mp4'  WHERE module = 'C' AND exercise_number = 9;
UPDATE exercises SET video_url = 'C-Blue Cities/ex31.mp4'  WHERE module = 'C' AND exercise_number = 10;

-- ---------------------------------------------------------------------------
-- 6. OPTIONAL: User stats view (for hero “Users Trained” counter)
-- Uncomment if you want the /api/user-stats endpoint to read from DB.
-- ---------------------------------------------------------------------------

-- CREATE OR REPLACE VIEW user_stats AS
-- SELECT COUNT(DISTINCT email)::integer AS total_users FROM subscriptions WHERE status = 'active';

-- Done.
