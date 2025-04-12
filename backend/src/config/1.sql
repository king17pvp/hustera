-- Create images table if it doesn't exist
-- CREATE TABLE IF NOT EXISTS images (
--     image_ID INT PRIMARY KEY AUTO_INCREMENT,
--     image_path VARCHAR(255) NOT NULL,
--     image_type VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Insert default thumbnail if it doesn't exist
INSERT IGNORE INTO images (image_ID, image_path)
VALUES (1, '/public/images/default-course-thumbnail.jpg');

-- Make sure courses table references images correctly
ALTER TABLE courses
ADD CONSTRAINT courses_ibfk_2
FOREIGN KEY (thumbnail_ID) REFERENCES images(image_ID)
ON DELETE CASCADE; 

select * from courses

-- Insert test user with bcrypt hashed password 'admin123'
INSERT INTO user_auth (user_ID, email, password, role) VALUES 
(2, 'admin@gmail.com', '$2b$10$YourHashedPasswordHere', 'instructor');

-- Insert user info
INSERT INTO user_info (user_ID, name, gender) VALUES 
(1, 'Admin User', 'male'); 