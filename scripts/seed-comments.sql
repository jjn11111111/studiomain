-- Seed lightweight, high-gravitas comments across modules/exercises.
-- Safe to run multiple times; uses ON CONFLICT DO NOTHING on (id).

WITH ex AS (
  SELECT id, UPPER(module) AS module, exercise_number
  FROM exercises
)
INSERT INTO comments (id, exercise_id, user_name, comment_text, created_at)
SELECT *
FROM (
  VALUES
    -- Module A
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'A' AND exercise_number = 1),
      'Sofia R.', 'I didn''t expect to feel anything during the first session, but my eyes felt calmer and more awake afterwards.', NOW() - INTERVAL '21 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'A' AND exercise_number = 3),
      'Liam K.', 'The depth exercise made everything in my room look slightly more 3D for a few minutes. Very surreal in a good way.', NOW() - INTERVAL '17 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'A' AND exercise_number = 7),
      'Maya L.', 'Peripheral awareness felt subtle at first, then suddenly my whole field of view felt wider. Came back to this one twice.', NOW() - INTERVAL '9 days'),

    -- Module B
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'B' AND exercise_number = 2),
      'Andrew P.', 'This divergence sequence is where the training really started to “click” for me. My focus feels more responsive all day.', NOW() - INTERVAL '12 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'B' AND exercise_number = 4),
      'Tessa D.', 'The moving depth patterns were strangely meditative. I noticed it was easier to hold a soft gaze afterwards.', NOW() - INTERVAL '6 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'B' AND exercise_number = 8),
      'Noah V.', 'Spatial awareness training made walking outside feel more spacious and bright. It''s a quiet but powerful shift.', NOW() - INTERVAL '3 days'),

    -- Module C
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'C' AND exercise_number = 1),
      'Elena S.', 'This felt like the moment all the previous work integrated. My depth sense went from “interesting” to undeniably present.', NOW() - INTERVAL '14 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'C' AND exercise_number = 3),
      'Jonah M.', 'The speed fusion drill is intense but incredibly clarifying. My eyes feel both softer and sharper afterwards.', NOW() - INTERVAL '7 days'),
    (gen_random_uuid(), (SELECT id FROM ex WHERE module = 'C' AND exercise_number = 7),
      'Amira Q.', 'After this session the world looked subtly luminous for the rest of the evening. It''s hard to describe, but very real.', NOW() - INTERVAL '2 days')
) AS seed(id, exercise_id, user_name, comment_text, created_at)
WHERE exercise_id IS NOT NULL
ON CONFLICT (id) DO NOTHING;
