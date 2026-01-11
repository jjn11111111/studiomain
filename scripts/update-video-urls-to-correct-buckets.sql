-- Update video URLs to use the correct bucket names that exist in storage

-- Module A videos
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Untitled design(12).MP4' WHERE module = 'A' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Untitled design(20) 2.MP4' WHERE module = 'A' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 10.MP4' WHERE module = 'A' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 12.MP4' WHERE module = 'A' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 15.MP4' WHERE module = 'A' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 16.MP4' WHERE module = 'A' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 17.MP4' WHERE module = 'A' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 18.MP4' WHERE module = 'A' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 19.MP4' WHERE module = 'A' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module A/Video 22.MP4' WHERE module = 'A' AND exercise_number = 10;

-- Module B videos
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 3.mp4' WHERE module = 'B' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 5.MP4' WHERE module = 'B' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 6.MP4' WHERE module = 'B' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 7.MP4' WHERE module = 'B' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 8.MP4' WHERE module = 'B' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 9.MP4' WHERE module = 'B' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 10.MP4' WHERE module = 'B' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 12.MP4' WHERE module = 'B' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 15.MP4' WHERE module = 'B' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module B/Video 16.MP4' WHERE module = 'B' AND exercise_number = 10;

-- Module C videos
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 3.MP4' WHERE module = 'C' AND exercise_number = 1;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 10.MP4' WHERE module = 'C' AND exercise_number = 2;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 12.MP4' WHERE module = 'C' AND exercise_number = 3;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 15.MP4' WHERE module = 'C' AND exercise_number = 4;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 16.MP4' WHERE module = 'C' AND exercise_number = 5;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 17.MP4' WHERE module = 'C' AND exercise_number = 6;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 18.MP4' WHERE module = 'C' AND exercise_number = 7;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 19.MP4' WHERE module = 'C' AND exercise_number = 8;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 22.MP4' WHERE module = 'C' AND exercise_number = 9;
UPDATE exercises SET video_url = 'https://jzfwbcjpklxppwpuimty.supabase.co/storage/v1/object/public/Module C/Video 23.MP4' WHERE module = 'C' AND exercise_number = 10;
