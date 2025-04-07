-- Add resource_type and order_index columns to videos table
ALTER TABLE videos 
ADD COLUMN resource_type ENUM('video', 'text') DEFAULT 'video',
ADD COLUMN order_index INT DEFAULT 0;

-- Create lectures table for text-based lessons
CREATE TABLE IF NOT EXISTS lectures (
    lecture_ID INT PRIMARY KEY AUTO_INCREMENT,
    week_ID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (week_ID) REFERENCES weeks(week_ID) ON DELETE CASCADE
);
