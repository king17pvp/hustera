INSERT INTO user_auth (email, password, role, created_at) VALUES
('john.smith@hustera.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'instructor', '2024-01-15 09:30:00'),
('lisa.johnson@hustera.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'instructor', '2024-01-20 10:45:00'),
('michael.chen@hustera.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'instructor', '2024-02-05 14:20:00'),
('sarah.patel@hustera.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'instructor', '2024-02-12 11:15:00'),
('david.kim@hustera.com', '$2a$10$abcdefghijklmnopqrstuuVwxyzAbCdEfGhIjKlMnOpQrStUvWxYz', 'instructor', '2024-03-01 08:50:00');

UPDATE user_info
SET name = 'John Smith', 
    dob = '1985-06-15', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'john.smith@hustera.com');

-- Update Lisa Johnson's profile
UPDATE user_info
SET name = 'Lisa Johnson', 
    dob = '1988-09-22', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'lisa.johnson@hustera.com');

-- Update Michael Chen's profile
UPDATE user_info
SET name = 'Michael Chen', 
    dob = '1982-03-10', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'michael.chen@hustera.com');

-- Update Sarah Patel's profile
UPDATE user_info
SET name = 'Sarah Patel', 
    dob = '1990-11-28', 
    gender = 'female'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'sarah.patel@hustera.com');

-- Update David Kim's profile
UPDATE user_info
SET name = 'David Kim', 
    dob = '1987-07-04', 
    gender = 'male'
WHERE user_ID = (SELECT user_ID FROM user_auth WHERE email = 'david.kim@hustera.com');