INSERT INTO user_auth (email, password, role) VALUES 
("admin@admin.com", "admin", "admin");

UPDATE user_auth SET role="admin" WHERE email="admin@admin.com";