-- Insert sample course content
-- Xác định course ID (thay đổi nếu cần)
SET @course_id = 1;

-- Make sure we have the required columns
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists FROM information_schema.columns 
WHERE table_name = 'videos' AND column_name = 'resource_type' AND table_schema = DATABASE();

-- Add the columns if they don't exist
SET @alter_sql = IF(@column_exists = 0, 
    'ALTER TABLE videos ADD COLUMN resource_type ENUM("video", "text") DEFAULT "video", ADD COLUMN order_index INT DEFAULT 0',
    'SELECT "Columns already exist"');
PREPARE stmt FROM @alter_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tạo các tuần học
INSERT INTO weeks (course_ID, week_number, title) VALUES 
(@course_id, 1, 'Introduction to Web Development'),
(@course_id, 2, 'HTML and CSS Fundamentals');

-- Lấy ID của các tuần học đã tạo
SET @week1_id = LAST_INSERT_ID();
SET @week2_id = @week1_id + 1;

-- Thêm video cho tuần 1
INSERT INTO videos (week_ID, title, url, resource_type, order_index) VALUES 
(@week1_id, 'Introduction to the Course', 'https://www.youtube.com/embed/PkZNo7MFNFg', 'video', 1);

-- Make sure lectures table exists before inserting
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

-- Thêm bài giảng text cho tuần 1
INSERT INTO lectures (week_ID, title, content, order_index) VALUES
(@week1_id, 'Getting Started with Web Development', '<h2>Getting Started with Web Development</h2><p>Welcome to the course! In this lecture, we will explore the fundamental concepts of web development and set up our development environment.</p><h3>What is Web Development?</h3><p>Web development refers to building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet (i.e., websites).</p><h3>Frontend vs Backend</h3><p>Web development is divided into two broad sections:</p><ul><li><strong>Frontend Development:</strong> It deals with the visual aspects of a website that users interact with directly. It includes HTML, CSS, and JavaScript.</li><li><strong>Backend Development:</strong> It consists of the server, application, and database that work behind the scenes to deliver information to the user. It includes languages like Node.js, Python, Ruby, and databases like MySQL.</li></ul><h3>Setting Up Your Development Environment</h3><p>For this course, you will need:</p><ol><li>A modern web browser like Chrome, Firefox, or Edge</li><li>A code editor like Visual Studio Code</li><li>Node.js installed on your computer</li></ol><h3>Your First Assignment</h3><p>Install all the required software and familiarize yourself with the VS Code interface. In the next lecture, we will dive into HTML basics.</p>', 2);

-- Thêm video cho tuần 2
INSERT INTO videos (week_ID, title, url, resource_type, order_index) VALUES 
(@week2_id, 'HTML Basics - Structure of a Webpage', 'https://www.youtube.com/embed/qz0aGYrrlhU', 'video', 1);

-- Thêm bài giảng text cho tuần 2
INSERT INTO lectures (week_ID, title, content, order_index) VALUES
(@week2_id, 'CSS Styling Principles', '<h2>CSS Styling Principles</h2><p>In this lecture, we will learn how to style our HTML documents using CSS (Cascading Style Sheets).</p><h3>What is CSS?</h3><p>CSS stands for Cascading Style Sheets. It is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p><h3>CSS Syntax</h3><p>CSS consists of a selector and a declaration block:</p><pre><code>selector {<br>  property: value;<br>  property: value;<br>}</code></pre><h3>Ways to Insert CSS</h3><p>There are three ways to insert CSS into your HTML:</p><ol><li><strong>External CSS:</strong> Link to an external .css file</li><li><strong>Internal CSS:</strong> Use a &lt;style&gt; element in the &lt;head&gt; section</li><li><strong>Inline CSS:</strong> Use the style attribute directly in HTML elements</li></ol><h3>CSS Selectors</h3><p>CSS selectors are used to "find" (or select) the HTML elements you want to style. Here are some key selectors:</p><ul><li>Element selector (e.g., h1, p, div)</li><li>ID selector (e.g., #header, #footer)</li><li>Class selector (e.g., .button, .navigation)</li><li>Universal selector (*)</li></ul><h3>Assignment</h3><p>Create a simple webpage with HTML and style it using both internal and external CSS. Include:</p><ul><li>Different text formatting</li><li>Custom colors and backgrounds</li><li>Simple layout with margins and padding</li></ul>', 2);
