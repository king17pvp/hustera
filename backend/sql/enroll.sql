-- First, let's add some students to the user_auth table so we have users to enroll in courses
-- (Skip this section if you already have student users)
INSERT INTO user_auth (email, password, role, created_at) VALUES
('alex.smith@gmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2024-12-10 08:30:00'),
('maria.johnson@yahoo.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-01-05 09:45:00'),
('james.wilson@outlook.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-01-12 11:20:00'),
('sophia.martinez@gmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-01-18 14:15:00'),
('ethan.brown@hotmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-01-25 16:40:00'),
('olivia.davis@gmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-02-03 10:30:00'),
('noah.anderson@yahoo.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-02-11 13:25:00'),
('emma.clark@outlook.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-02-20 09:10:00'),
('william.rodriguez@gmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-03-01 15:20:00'),
('ava.williams@hotmail.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'student', '2025-03-10 12:45:00');

-- Now update student profiles in user_info table
-- First student
UPDATE user_info
SET name = 'Alex Smith', 
    dob = '1998-04-15', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'alex.smith@gmail.com');

-- Second student
UPDATE user_info
SET name = 'Maria Johnson', 
    dob = '1996-08-22', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'maria.johnson@yahoo.com');

-- Third student
UPDATE user_info
SET name = 'James Wilson', 
    dob = '1999-11-30', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'james.wilson@outlook.com');

-- Fourth student
UPDATE user_info
SET name = 'Sophia Martinez', 
    dob = '2000-03-12', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'sophia.martinez@gmail.com');

-- Fifth student
UPDATE user_info
SET name = 'Ethan Brown', 
    dob = '1997-06-25', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'ethan.brown@hotmail.com');

-- Sixth student
UPDATE user_info
SET name = 'Olivia Davis', 
    dob = '2001-01-19', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'olivia.davis@gmail.com');

-- Seventh student
UPDATE user_info
SET name = 'Noah Anderson', 
    dob = '1998-09-05', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'noah.anderson@yahoo.com');

-- Eighth student
UPDATE user_info
SET name = 'Emma Clark', 
    dob = '2000-12-08', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'emma.clark@outlook.com');

-- Ninth student
UPDATE user_info
SET name = 'William Rodriguez', 
    dob = '1997-05-14', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'william.rodriguez@gmail.com');

-- Tenth student
UPDATE user_info
SET name = 'Ava Williams', 
    dob = '1999-02-27', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'ava.williams@hotmail.com');

-- Now, let's populate the course_enroll table
-- We'll use variables to store user IDs for better readability
SET @alex_id = (SELECT user_ID FROM user_auth WHERE email = 'alex.smith@gmail.com');
SET @maria_id = (SELECT user_ID FROM user_auth WHERE email = 'maria.johnson@yahoo.com');
SET @james_id = (SELECT user_ID FROM user_auth WHERE email = 'james.wilson@outlook.com');
SET @sophia_id = (SELECT user_ID FROM user_auth WHERE email = 'sophia.martinez@gmail.com');
SET @ethan_id = (SELECT user_ID FROM user_auth WHERE email = 'ethan.brown@hotmail.com');
SET @olivia_id = (SELECT user_ID FROM user_auth WHERE email = 'olivia.davis@gmail.com');
SET @noah_id = (SELECT user_ID FROM user_auth WHERE email = 'noah.anderson@yahoo.com');
SET @emma_id = (SELECT user_ID FROM user_auth WHERE email = 'emma.clark@outlook.com');
SET @william_id = (SELECT user_ID FROM user_auth WHERE email = 'william.rodriguez@gmail.com');
SET @ava_id = (SELECT user_ID FROM user_auth WHERE email = 'ava.williams@hotmail.com');

-- Now add course enrollments with different dates to show enrollment activity over time
-- Alex's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@alex_id, 1, '2025-01-15 10:30:00'),  -- Web Development Fundamentals
(@alex_id, 3, '2025-02-10 14:15:00');  -- Python for Data Science

-- Maria's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@maria_id, 2, '2025-01-20 09:45:00'),  -- Advanced JavaScript Programming
(@maria_id, 5, '2025-03-05 16:20:00');  -- Database Management Systems

-- James's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@james_id, 4, '2025-02-28 11:10:00'),  -- UI/UX Design Principles
(@james_id, 7, '2025-04-10 08:30:00');  -- Machine Learning Fundamentals

-- Sophia's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@sophia_id, 6, '2025-03-15 13:45:00'),  -- Mobile App Development
(@sophia_id, 9, '2025-04-20 17:25:00');  -- Cloud Computing with AWS

-- Ethan's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@ethan_id, 8, '2025-02-05 12:50:00'),  -- Cybersecurity Essentials
(@ethan_id, 10, '2025-03-25 15:05:00'); -- Blockchain Development

-- Olivia's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@olivia_id, 1, '2025-01-10 11:30:00'),  -- Web Development Fundamentals
(@olivia_id, 4, '2025-02-22 10:15:00');  -- UI/UX Design Principles

-- Noah's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@noah_id, 3, '2025-02-15 09:20:00'),  -- Python for Data Science
(@noah_id, 7, '2025-03-30 14:40:00');  -- Machine Learning Fundamentals

-- Emma's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@emma_id, 5, '2025-03-10 16:35:00'),  -- Database Management Systems
(@emma_id, 8, '2025-04-05 13:50:00');  -- Cybersecurity Essentials

-- William's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@william_id, 2, '2025-02-08 10:25:00'),  -- Advanced JavaScript Programming
(@william_id, 6, '2025-04-15 11:15:00');  -- Mobile App Development

-- Ava's enrollments
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@ava_id, 9, '2025-01-25 15:40:00'),  -- Cloud Computing with AWS
(@ava_id, 10, '2025-03-20 12:10:00'); -- Blockchain Development

-- Adding additional enrollments to show popularity of certain courses
INSERT INTO course_enroll (student_ID, course_ID, enroll_date) VALUES
(@alex_id, 8, '2025-04-02 10:05:00'),    -- Alex also enrolled in Cybersecurity
(@maria_id, 1, '2025-03-12 14:30:00'),   -- Maria also enrolled in Web Development
(@james_id, 10, '2025-04-18 09:15:00'),  -- James also enrolled in Blockchain
(@sophia_id, 3, '2025-04-25 16:50:00'),  -- Sophia also enrolled in Python for Data Science
(@ethan_id, 1, '2025-04-30 11:45:00');   -- Ethan also enrolled in Web Development