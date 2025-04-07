-- Insert test user with bcrypt hashed password 'admin123'
INSERT INTO user_auth (user_ID, email, password, role) VALUES 
(1, 'admin@gmail.com', '$2b$10$YourHashedPasswordHere', 'instructor');

-- Insert user info
INSERT INTO user_info (user_ID, name, gender) VALUES 
(1, 'Admin User', 'male'); 