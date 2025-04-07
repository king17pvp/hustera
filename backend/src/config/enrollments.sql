-- Create enrollments table for tracking student enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  enrollment_ID INT AUTO_INCREMENT PRIMARY KEY,
  course_ID INT NOT NULL,
  user_ID INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  completion_status VARCHAR(20) DEFAULT 'In Progress',
  FOREIGN KEY (course_ID) REFERENCES courses(course_ID),
  FOREIGN KEY (user_ID) REFERENCES user_auth(user_ID)
);

-- Add some sample enrollments (optional)
INSERT INTO enrollments (course_ID, user_ID) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2);
