-- Update exercises to 10 per module with correct MP4 video URLs
-- Delete exercises 11+ from each module
DELETE FROM exercises WHERE module = 'a' AND exercise_number > 10;
DELETE FROM exercises WHERE module = 'b' AND exercise_number > 10;
DELETE FROM exercises WHERE module = 'c' AND exercise_number > 10;

-- Update Module A (Red Fruits) - ModuleAFRUIT folder
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(1).mp4' WHERE module = 'a' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(2).mp4' WHERE module = 'a' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(4).mp4' WHERE module = 'a' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(5).mp4' WHERE module = 'a' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(8).mp4' WHERE module = 'a' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(9).mp4' WHERE module = 'a' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(12).MP4' WHERE module = 'a' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(20) 2.MP4' WHERE module = 'a' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(23).mp4' WHERE module = 'a' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/ModuleAFRUIT/Untitled design(24).mp4' WHERE module = 'a' AND exercise_number = 10;

-- Update Module B (Yellow Animals) - Module B folder
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(2).mp4' WHERE module = 'b' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(6).mp4' WHERE module = 'b' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(7).mp4' WHERE module = 'b' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(10).mp4' WHERE module = 'b' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(11).mp4' WHERE module = 'b' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(13).mp4' WHERE module = 'b' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Video 11.MP4' WHERE module = 'b' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Video 13.MP4' WHERE module = 'b' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(26) 2.MP4' WHERE module = 'b' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module B/Untitled design(32).MP4' WHERE module = 'b' AND exercise_number = 10;

-- Update Module C (Blue Cities) - Module C folder
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 3.mp4' WHERE module = 'c' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 10.MP4' WHERE module = 'c' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 12.MP4' WHERE module = 'c' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 15.MP4' WHERE module = 'c' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 16.MP4' WHERE module = 'c' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 17.MP4' WHERE module = 'c' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 18.MP4' WHERE module = 'c' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 19.MP4' WHERE module = 'c' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 22.MP4' WHERE module = 'c' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/reconnect/Module C/Video 23.MP4' WHERE module = 'c' AND exercise_number = 10;
