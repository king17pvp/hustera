const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

// Basic CRUD operations
router.get('/', videoController.getAllVideos);
router.get('/:videoID', videoController.getVideoById);
router.post('/', videoController.createVideo);
router.put('/:videoID', videoController.updateVideo);
router.delete('/:videoID', videoController.deleteVideo);

// Additional routes for course functionality
router.get('/course/:courseID', videoController.getVideosByCourse);
router.get('/course/:courseID/week/:weekNumber', videoController.getVideosByWeek);
router.post('/:videoID/unlock', videoController.unlockVideo);
router.get('/latest', videoController.getLatestVideos);

module.exports = router;



//code SQL tao table videos (dummy)
/*
CREATE TABLE IF NOT EXISTS videos (
    videoID INT AUTO_INCREMENT PRIMARY KEY,
    courseID INT NOT NULL,
    weekNumber INT NOT NULL,
    videoTitle VARCHAR(255) NOT NULL,
    videoUrl VARCHAR(255) NOT NULL,
    transcript TEXT,
    isLocked BOOLEAN NOT NULL DEFAULT 0,
    duration TIME NOT NULL
  );
  
  INSERT INTO videos (courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration) 
  VALUES 
  (1, 1, 'Introduction to Database Design', 'https://example.com/courses/1/videos/1', 'Welcome to the Database Design course. In this video, we will cover the fundamentals of database architecture and design principles...', 0, '00:15:30'),
  (1, 1, 'Relational Database Basics', 'https://example.com/courses/1/videos/2', 'In this lesson, we will explore the core concepts of relational databases including tables, relationships, and keys...', 0, '00:22:45'),
  (1, 2, 'Normalization Forms', 'https://example.com/courses/1/videos/3', 'Today we will dive into database normalization, covering 1NF, 2NF, and 3NF with practical examples...', 0, '00:18:20'),
  (1, 2, 'Advanced SQL Queries', 'https://example.com/courses/1/videos/4', 'This video demonstrates complex SQL queries including joins, subqueries, and aggregations...', 1, '00:25:10'),
  (2, 1, 'Python Programming Fundamentals', 'https://example.com/courses/2/videos/1', 'Introduction to Python programming language, covering basic syntax, data types, and control structures...', 0, '00:20:15'),
  (2, 1, 'Working with Python Libraries', 'https://example.com/courses/2/videos/2', 'Learn how to use popular Python libraries for data analysis including NumPy and Pandas...', 0, '00:24:30'),
  (2, 2, 'Building Web Applications with Django', 'https://example.com/courses/2/videos/3', 'This tutorial walks through creating a basic web application using the Django framework...', 1, '00:35:45'),
  (3, 1, 'Machine Learning Concepts', 'https://example.com/courses/3/videos/1', 'An overview of fundamental machine learning concepts, algorithms, and applications...', 0, '00:28:15'),
  (3, 2, 'Neural Networks and Deep Learning', 'https://example.com/courses/3/videos/2', 'Explore the architecture and training of neural networks for various deep learning applications...', 1, '00:40:20'),
  (3, 3, 'Practical AI Project Implementation', 'https://example.com/courses/3/videos/3', 'Step-by-step guide to implementing a complete AI project from data preparation to deployment...', 1, '00:45:00');

*/