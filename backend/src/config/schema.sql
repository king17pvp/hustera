-- Create images table if it doesn't exist
CREATE TABLE IF NOT EXISTS images (
    image_ID INT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(255) NOT NULL,
    image_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default thumbnail if it doesn't exist
INSERT IGNORE INTO images (image_ID, image_path, image_type)
VALUES (1, '/public/images/default-course-thumbnail.jpg', 'thumbnail');

-- Make sure courses table references images correctly
ALTER TABLE courses
ADD CONSTRAINT courses_ibfk_2
FOREIGN KEY (thumbnail_ID) REFERENCES images(image_ID)
ON DELETE CASCADE;

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
ALTER TABLE videos ADD COLUMN IF NOT EXISTS resource_type ENUM('video', 'text') DEFAULT 'video';