-- 1. Create lectures table if not exists
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

-- 2. Alter videos table (no IF NOT EXISTS support in MySQL)
-- So run separately and ignore errors if columns exist
-- ALTER TABLE videos ADD COLUMN resource_type ENUM('video', 'text') DEFAULT 'video';
-- ALTER TABLE videos ADD COLUMN order_index INT DEFAULT 0;

-- 3. Delete all existing lectures to avoid duplicates
SET SQL_SAFE_UPDATES = 0;
DELETE FROM lectures;

-- 4. Set default order_index for videos
UPDATE videos SET order_index = 1 WHERE order_index IS NULL OR order_index = 0;

-- 5. Set course ID manually
SET @course_id := 1;

-- 6. Get week IDs manually via SELECT
-- (you'll need to manually read them if not using procedures)
-- TEMP: simulate variables
SELECT week_ID INTO @week1_id FROM weeks WHERE course_ID = @course_id AND week_number = 1 LIMIT 1;
SELECT week_ID INTO @week2_id FROM weeks WHERE course_ID = @course_id AND week_number = 2 LIMIT 1;

-- 7. Insert sample lectures (note: use FROM DUAL + WHERE inside SELECT)
INSERT INTO lectures (week_ID, title, content, order_index)
SELECT @week1_id, 'Getting Started with Web Development', '<HTML CONTENT>', 2
FROM dual
WHERE @week1_id IS NOT NULL;

INSERT INTO lectures (week_ID, title, content, order_index)
SELECT @week2_id, 'CSS Styling Principles', '<HTML CONTENT>', 2
FROM dual
WHERE @week2_id IS NOT NULL;

-- 8. Insert videos if not already present
INSERT INTO videos (week_ID, title, url, resource_type, order_index)
SELECT @week1_id, 'Introduction to the Course', 'https://www.youtube.com/embed/PkZNo7MFNFg', 'video', 1
FROM dual
WHERE @week1_id IS NOT NULL 
AND NOT EXISTS (
    SELECT 1 FROM videos WHERE week_ID = @week1_id AND title = 'Introduction to the Course'
);

INSERT INTO videos (week_ID, title, url, resource_type, order_index)
SELECT @week2_id, 'HTML Basics - Structure of a Webpage', 'https://www.youtube.com/embed/qz0aGYrrlhU', 'video', 1
FROM dual
WHERE @week2_id IS NOT NULL 
AND NOT EXISTS (
    SELECT 1 FROM videos WHERE week_ID = @week2_id AND title = 'HTML Basics - Structure of a Webpage'
);

-- 9. Final verification
SELECT w.week_ID, w.week_number, w.title, 
    COUNT(DISTINCT v.video_ID) AS video_count, 
    COUNT(DISTINCT l.lecture_ID) AS lecture_count
FROM weeks w 
LEFT JOIN videos v ON v.week_ID = w.week_ID
LEFT JOIN lectures l ON l.week_ID = w.week_ID
WHERE w.course_ID = @course_id
GROUP BY w.week_ID;

SET SQL_SAFE_UPDATES = 1;

SELECT * FROM videos WHERE resource_type = 'video';
