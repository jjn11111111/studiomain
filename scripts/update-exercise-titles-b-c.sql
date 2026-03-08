-- Update exercise titles for Module B (Yellow Animals) and Module C (Blue Cities).
-- Run in Supabase SQL Editor. Safe to run multiple times.

-- Module B: Yellow Animals (exercise_number 1–10)
UPDATE exercises SET title = 'Ardvaark'   WHERE UPPER(module) = 'B' AND exercise_number = 1;
UPDATE exercises SET title = 'Bear'       WHERE UPPER(module) = 'B' AND exercise_number = 2;
UPDATE exercises SET title = 'Coyote'     WHERE UPPER(module) = 'B' AND exercise_number = 3;
UPDATE exercises SET title = 'Dog'        WHERE UPPER(module) = 'B' AND exercise_number = 4;
UPDATE exercises SET title = 'Elephant'   WHERE UPPER(module) = 'B' AND exercise_number = 5;
UPDATE exercises SET title = 'Ferret'      WHERE UPPER(module) = 'B' AND exercise_number = 6;
UPDATE exercises SET title = 'Giraffe'    WHERE UPPER(module) = 'B' AND exercise_number = 7;
UPDATE exercises SET title = 'Hyena'      WHERE UPPER(module) = 'B' AND exercise_number = 8;
UPDATE exercises SET title = 'Iguana'     WHERE UPPER(module) = 'B' AND exercise_number = 9;
UPDATE exercises SET title = 'Jaguar'     WHERE UPPER(module) = 'B' AND exercise_number = 10;

-- Module C: Blue Cities (exercise_number 1–10)
UPDATE exercises SET title = 'Atlanta'    WHERE UPPER(module) = 'C' AND exercise_number = 1;
UPDATE exercises SET title = 'Boston'     WHERE UPPER(module) = 'C' AND exercise_number = 2;
UPDATE exercises SET title = 'Charleston'  WHERE UPPER(module) = 'C' AND exercise_number = 3;
UPDATE exercises SET title = 'Dallas'     WHERE UPPER(module) = 'C' AND exercise_number = 4;
UPDATE exercises SET title = 'Easthampton' WHERE UPPER(module) = 'C' AND exercise_number = 5;
UPDATE exercises SET title = 'Fresno'     WHERE UPPER(module) = 'C' AND exercise_number = 6;
UPDATE exercises SET title = 'Greenwich'  WHERE UPPER(module) = 'C' AND exercise_number = 7;
UPDATE exercises SET title = 'Houston'    WHERE UPPER(module) = 'C' AND exercise_number = 8;
UPDATE exercises SET title = 'Iowa City'  WHERE UPPER(module) = 'C' AND exercise_number = 9;
UPDATE exercises SET title = 'Jackson'    WHERE UPPER(module) = 'C' AND exercise_number = 10;
