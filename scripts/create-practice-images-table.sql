-- Create practice images table for static stereoscopic images
CREATE TABLE IF NOT EXISTS practice_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  order_number INTEGER
);

-- Enable RLS
ALTER TABLE practice_images ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Allow public read access to practice images"
ON practice_images FOR SELECT
TO public
USING (true);
