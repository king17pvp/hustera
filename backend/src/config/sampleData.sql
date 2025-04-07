-- Insert sample images
INSERT INTO images (image_ID, image_path) VALUES 
(1, 'default_avatar.jpg'),
(2, 'default_course_thumbnail.jpg'),
(3, 'javascript_course.jpg'),
(4, 'python_course.jpg'),
(5, 'react_course.jpg');

-- Insert sample users (instructors)
INSERT INTO user_auth (user_ID, email, password, role) VALUES
(1, 'john.doe@hustera.com', '$2b$10$YourHashedPasswordHere', 'instructor'),
(2, 'alice.smith@hustera.com', '$2b$10$YourHashedPasswordHere', 'instructor');

-- Insert instructor info
INSERT INTO user_info (user_ID, avatar_ID, name, dob, gender) VALUES
(1, 1, 'John Doe', '1985-01-15', 'male'),
(2, 1, 'Alice Smith', '1990-03-20', 'female');

-- Insert sample courses
INSERT INTO courses (course_ID, instructor_ID, title, description, category, thumbnail_ID, price, duration, level) VALUES
(1, 1, 'JavaScript Fundamentals', 'A comprehensive course covering JavaScript basics to advanced concepts. Learn about variables, functions, DOM manipulation, and modern ES6+ features.', 'Programming', 3, 49.99, 6, 'Beginner'),
(2, 2, 'Python for Data Science', 'Master Python programming with a focus on data science. Learn pandas, numpy, and data visualization techniques.', 'Data Science', 4, 59.99, 8, 'Intermediate'),
(3, 1, 'React.js Mastery', 'Build modern web applications with React.js. Learn hooks, context, Redux, and best practices for component design.', 'Web Development', 5, 69.99, 10, 'Expert');

-- Insert sample weeks
INSERT INTO weeks (week_ID, course_ID, week_number, title) VALUES
(1, 1, 1, 'JavaScript Basics'),
(2, 1, 2, 'Functions and Objects'),
(3, 2, 1, 'Python Fundamentals'),
(4, 2, 2, 'Data Analysis with Pandas'),
(5, 3, 1, 'React Fundamentals'),
(6, 3, 2, 'State Management');

-- Insert sample videos
INSERT INTO videos (video_ID, week_ID, title, url) VALUES
(1, 1, 'Variables and Data Types', 'https://example.com/js-basics-1'),
(2, 1, 'Control Flow', 'https://example.com/js-basics-2'),
(3, 2, 'Function Declaration', 'https://example.com/js-functions-1'),
(4, 3, 'Python Setup', 'https://example.com/python-1'),
(5, 4, 'Pandas Introduction', 'https://example.com/pandas-1'),
(6, 5, 'React Components', 'https://example.com/react-1');

-- Insert sample tags
INSERT INTO tags (tag_ID, tag_name) VALUES
(1, 'JavaScript'),
(2, 'Python'),
(3, 'React'),
(4, 'Web Development'),
(5, 'Data Science');

-- Insert course tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 5),
(3, 3),
(3, 4); 