CREATE DATABASE hustera_db;

-- Step 2: Use the Database
USE hustera_db;

-- Step 3: Create the Users Table
CREATE TABLE user_auth (
    user_ID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store bcrypt hash
	role ENUM('admin', 'instructor', 'student') NOT NULL DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
	image_ID INT AUTO_INCREMENT PRIMARY KEY,
    image MEDIUMBLOB
);

CREATE TABLE user_info (
	user_ID INT PRIMARY KEY,
    avatar_ID INT,
    name VARCHAR(255),
    dob DATE,
    gender ENUM('male', 'female', 'other'),
    FOREIGN KEY (user_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (avatar_ID) REFERENCES images(image_ID) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER after_user_auth_insert
AFTER INSERT ON user_auth
FOR EACH ROW
BEGIN
    -- Extract the part before @ in email and use it as the name
    INSERT INTO user_info (user_ID, name)
    VALUES (NEW.user_ID, SUBSTRING_INDEX(NEW.email, '@', 1));
END//

DELIMITER ;

CREATE TABLE courses (
	course_ID INT AUTO_INCREMENT PRIMARY KEY,
    instructor_ID INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    thumbnail_ID INT DEFAULT NULL,
    thumbnail_url VARCHAR(800) DEFAULT NULL,
    price DECIMAL(6, 2) NOT NULL,
    duration INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
	FOREIGN KEY (instructor_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (thumbnail_ID) REFERENCES images(image_ID) ON DELETE CASCADE
);

CREATE TABLE tags (
	tag_ID INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255)
);

CREATE TABLE course_tags (
	course_ID INT,
    tag_ID INT,
    PRIMARY KEY (course_ID, tag_ID),
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID) ON DELETE CASCADE,
    FOREIGN KEY (tag_ID) REFERENCES tags(tag_ID) ON DELETE CASCADE
);

CREATE TABLE course_reviews (
	review_ID INT AUTO_INCREMENT PRIMARY KEY,
    course_ID INT,
    reviewer_ID INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    rated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    review TEXT,
    FOREIGN KEY (reviewer_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID) ON DELETE CASCADE
);

CREATE TABLE weeks (
    week_ID INT AUTO_INCREMENT PRIMARY KEY,
    course_ID INT,
    week_number INT,
    title VARCHAR(255),
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID) ON DELETE CASCADE
);

CREATE TABLE videos (
    video_ID INT AUTO_INCREMENT PRIMARY KEY,
    week_ID INT,
    title VARCHAR(255),
    url VARCHAR(500),
    FOREIGN KEY (week_ID) REFERENCES weeks(week_ID) ON DELETE CASCADE
);

CREATE TABLE video_watch (
	student_ID INT, 
    video_ID INT,
    status ENUM('completed', 'incomplete') NOT NULL DEFAULT 'completed',
    FOREIGN KEY (student_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (video_ID) REFERENCES videos(video_ID) ON DELETE CASCADE
);

CREATE TABLE course_enroll (
	student_ID INT,
    course_ID INT,
    enroll_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_ID, course_ID),
    FOREIGN KEY (student_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID) ON DELETE CASCADE
);

CREATE TABLE threads (
	thread_ID INT AUTO_INCREMENT PRIMARY KEY,
    author_ID INT,
    title VARCHAR(255),
    category VARCHAR(255),
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE
);

CREATE TABLE thread_tags (
	thread_ID INT,
    tag_ID INT,
    PRIMARY KEY (thread_ID, tag_ID),
    FOREIGN KEY (thread_ID) REFERENCES threads(thread_ID) ON DELETE CASCADE,
    FOREIGN KEY (tag_ID) REFERENCES tags(tag_ID) ON DELETE CASCADE
);

CREATE TABLE thread_images (
	thread_ID INT, 
    image_ID INT,
    PRIMARY KEY (thread_ID, image_ID),
    FOREIGN KEY (thread_ID) REFERENCES threads(thread_ID) ON DELETE CASCADE,
    FOREIGN KEY (image_ID) REFERENCES images(image_ID) ON DELETE CASCADE
);

CREATE TABLE thread_answers (
	answer_ID INT AUTO_INCREMENT PRIMARY KEY,
    thread_ID INT,
    author_ID INT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    accepted ENUM('true', 'false') NOT NULL DEFAULT 'false',
    FOREIGN KEY (thread_ID) REFERENCES threads(thread_ID) ON DELETE CASCADE,
    FOREIGN KEY (author_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE
);

CREATE TABLE thread_answer_images (
	answer_ID INT, 
    image_ID INT,
    PRIMARY KEY (answer_ID, image_ID),
    FOREIGN KEY (answer_ID) REFERENCES thread_answers(answer_ID) ON DELETE CASCADE,
    FOREIGN KEY (image_ID) REFERENCES images(image_ID) ON DELETE CASCADE
);

CREATE TABLE thread_votes (
	thread_ID INT,
	voter_ID INT,
    vote_type ENUM('upvote', 'downvote'),
    PRIMARY KEY (thread_ID, voter_ID),
    FOREIGN KEY (thread_ID) REFERENCES threads(thread_ID) ON DELETE CASCADE,
    FOREIGN KEY (voter_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE
);

CREATE TABLE thread_answer_votes (
	answer_ID INT,
	voter_ID INT,
    vote_type ENUM('upvote', 'downvote'),
    PRIMARY KEY (answer_ID, voter_ID),
    FOREIGN KEY (answer_ID) REFERENCES thread_answers(answer_ID) ON DELETE CASCADE,
    FOREIGN KEY (voter_ID) REFERENCES user_auth(user_ID) ON DELETE CASCADE
);

-- DROP DATABASE hustera_db; 