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

-- Tạo bảng cho bài giảng dạng text
CREATE TABLE IF NOT EXISTS lectures (
    lecture_ID INT PRIMARY KEY AUTO_INCREMENT,
    week_ID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    order_index INT NOT NULL,  -- Thứ tự hiển thị trong tuần
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (week_ID) REFERENCES weeks(week_ID) ON DELETE CASCADE
);

-- Thêm trường resource_type vào bảng videos để phân biệt video/lecture
ALTER TABLE videos ADD COLUMN resource_type ENUM('video', 'text') DEFAULT 'video';
