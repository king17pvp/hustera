-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: hustera_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course_enroll`
--

DROP TABLE IF EXISTS `course_enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_enroll` (
  `student_ID` int NOT NULL,
  `course_ID` int NOT NULL,
  `enroll_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_ID`,`course_ID`),
  KEY `course_ID` (`course_ID`),
  CONSTRAINT `course_enroll_ibfk_1` FOREIGN KEY (`student_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `course_enroll_ibfk_2` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enroll`
--

LOCK TABLES `course_enroll` WRITE;
/*!40000 ALTER TABLE `course_enroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_reviews`
--

DROP TABLE IF EXISTS `course_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_reviews` (
  `review_ID` int NOT NULL AUTO_INCREMENT,
  `course_ID` int DEFAULT NULL,
  `reviewer_ID` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `rated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `review` text,
  PRIMARY KEY (`review_ID`),
  KEY `reviewer_ID` (`reviewer_ID`),
  KEY `course_ID` (`course_ID`),
  CONSTRAINT `course_reviews_ibfk_1` FOREIGN KEY (`reviewer_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `course_reviews_ibfk_2` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`) ON DELETE CASCADE,
  CONSTRAINT `course_reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reviews`
--

LOCK TABLES `course_reviews` WRITE;
/*!40000 ALTER TABLE `course_reviews` DISABLE KEYS */;
INSERT INTO `course_reviews` VALUES (29,4,2,5,'2025-04-12 22:14:34',''),(30,4,2,5,'2025-04-12 22:34:41',''),(31,4,2,1,'2025-04-12 22:41:54','khoa nhu cac bạn oi '),(32,4,2,2,'2025-04-12 22:43:17','dsafjksd'),(33,4,2,3,'2025-04-12 22:43:33','gdshjsdf'),(34,4,2,4,'2025-04-12 22:43:57','jlksdfljk'),(44,1,1,5,'2023-09-10 15:30:00','Great course! I learned a lot and the instructor was very clear.'),(45,1,2,5,'2023-10-15 09:45:00','This course exceeded my expectations. The content is comprehensive and well-structured.'),(46,1,3,5,'2023-11-20 14:20:00','Absolutely loved this course. Very practical examples.'),(47,1,3,4,'2023-12-05 10:10:00','Good course but could use more examples in some sections.'),(48,1,2,5,'2024-01-12 16:05:00','The instructor explains complex concepts in an easy-to-understand way.'),(49,1,1,5,'2024-02-18 11:30:00','Very engaging content. I completed it in one week!'),(50,1,2,4,'2024-03-21 09:15:00','Really helpful for beginners. Would recommend.'),(51,1,1,5,'2024-04-02 13:45:00','Exactly what I needed to advance in my career.'),(52,1,2,5,'2024-04-15 17:20:00','Well worth the price. Great value.'),(53,2,1,4,'2023-08-15 10:30:00','Solid course with good explanations.'),(54,2,3,5,'2023-09-20 14:15:00','One of the best courses I\'ve taken on this subject.'),(55,2,2,4,'2023-10-25 11:45:00','Very detailed content, though some parts were a bit advanced.'),(56,2,2,3,'2023-11-12 16:30:00','Good overall, but some sections need updating.'),(57,2,2,5,'2024-01-05 09:20:00','Excellent course! I\'m recommending it to all my colleagues.'),(58,3,2,5,'2023-07-10 13:15:00','Perfect introduction to the subject.'),(59,3,1,5,'2023-08-22 15:40:00','Clear explanations and practical assignments.'),(60,3,1,4,'2023-09-30 10:25:00','Very informative course. Helped me a lot with my project.'),(61,3,3,5,'2023-11-18 12:35:00','Great pacing and structure. Learned a lot.'),(62,3,1,2,'2024-01-25 14:50:00','The content is good but needs more real-world examples.'),(63,3,3,4,'2024-03-10 11:10:00','Solid foundation in the subject matter.'),(64,2,2,3,'2025-04-13 00:52:14','sfjlkdajklsa'),(65,4,2,4,'2025-04-21 21:07:03','dcm met vl\n');
/*!40000 ALTER TABLE `course_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_tags`
--

DROP TABLE IF EXISTS `course_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_tags` (
  `course_ID` int NOT NULL,
  `tag_ID` int NOT NULL,
  PRIMARY KEY (`course_ID`,`tag_ID`),
  KEY `tag_ID` (`tag_ID`),
  CONSTRAINT `course_tags_ibfk_1` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`) ON DELETE CASCADE,
  CONSTRAINT `course_tags_ibfk_2` FOREIGN KEY (`tag_ID`) REFERENCES `tags` (`tag_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_tags`
--

LOCK TABLES `course_tags` WRITE;
/*!40000 ALTER TABLE `course_tags` DISABLE KEYS */;
INSERT INTO `course_tags` VALUES (1,1),(2,2),(3,3),(1,4),(3,4),(2,5);
/*!40000 ALTER TABLE `course_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_ID` int NOT NULL AUTO_INCREMENT,
  `instructor_ID` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `thumbnail_ID` int DEFAULT '2',
  `price` decimal(6,2) NOT NULL,
  `duration` int NOT NULL,
  `level` enum('Beginner','Intermediate','Expert') NOT NULL,
  PRIMARY KEY (`course_ID`),
  KEY `instructor_ID` (`instructor_ID`),
  KEY `thumbnail_ID` (`thumbnail_ID`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`thumbnail_ID`) REFERENCES `images` (`image_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,1,'JavaScript Fundamentals','A comprehensive course covering JavaScript basics to advanced concepts. Learn about variables, functions, DOM manipulation, and modern ES6+ features.','Programming',1,49.99,6,'Beginner'),(2,2,'Python for Data Science','Master Python programming with a focus on data science. Learn pandas, numpy, and data visualization techniques.','Data Science',2,59.99,8,'Intermediate'),(3,1,'React.js Mastery','Build modern web applications with React.js. Learn hooks, context, Redux, and best practices for component design.','Web Development',3,69.99,10,'Expert'),(4,2,'Best React course in the world','Want to learn something useful in your life FOR ONCE?','Web development',1,20.99,1,'Beginner'),(5,2,'tôi muốn tắt nắng đi ','nsfdk','dkfsl',1,25.00,45,'Beginner'),(6,2,'sfad','gasf','photography',1,32.00,1,'Beginner'),(7,2,'kkk','kkk','communication',1,32.00,1,'Beginner'),(8,2,'asf','afsd','content-writing',1,32.00,1,'Intermediate'),(9,1,'gsds','arsf','finance',1,32.00,1,'Beginner');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `enrollment_ID` int NOT NULL AUTO_INCREMENT,
  `course_ID` int NOT NULL,
  `user_ID` int NOT NULL,
  `enrollment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `completion_status` varchar(20) DEFAULT 'In Progress',
  PRIMARY KEY (`enrollment_ID`),
  KEY `course_ID` (`course_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`),
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `user_auth` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,1,1,'2025-04-07 15:16:17','In Progress'),(2,2,1,'2025-04-07 15:16:17','In Progress'),(3,3,1,'2025-04-07 15:16:17','In Progress'),(4,1,2,'2025-04-07 15:16:17','In Progress');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_ID` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'default_avatar.jpg'),(2,'default_course_thumbnail.jpg'),(3,'javascript_course.jpg'),(4,'python_course.jpg'),(5,'react_course.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `lecture_ID` int NOT NULL AUTO_INCREMENT,
  `week_ID` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `order_index` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lecture_ID`),
  KEY `week_ID` (`week_ID`),
  CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`week_ID`) REFERENCES `weeks` (`week_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (3,1,'Getting Started with Web Development','<h2>Getting Started with Web Development</h2><p>Welcome to the course! In this lecture, we will explore the fundamental concepts of web development and set up our development environment.</p><h3>What is Web Development?</h3><p>Web development refers to building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet (i.e., websites).</p><h3>Frontend vs Backend</h3><p>Web development is divided into two broad sections:</p><ul><li><strong>Frontend Development:</strong> It deals with the visual aspects of a website that users interact with directly. It includes HTML, CSS, and JavaScript.</li><li><strong>Backend Development:</strong> It consists of the server, application, and database that work behind the scenes to deliver information to the user. It includes languages like Node.js, Python, Ruby, and databases like MySQL.</li></ul><h3>Setting Up Your Development Environment</h3><p>For this course, you will need:</p><ol><li>A modern web browser like Chrome, Firefox, or Edge</li><li>A code editor like Visual Studio Code</li><li>Node.js installed on your computer</li></ol><h3>Your First Assignment</h3><p>Install all the required software and familiarize yourself with the VS Code interface. In the next lecture, we will dive into HTML basics.</p>',2,'2025-04-07 14:56:21','2025-04-07 14:56:21'),(4,2,'CSS Styling Principles','<h2>CSS Styling Principles</h2><p>In this lecture, we will learn how to style our HTML documents using CSS (Cascading Style Sheets).</p><h3>What is CSS?</h3><p>CSS stands for Cascading Style Sheets. It is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p><h3>CSS Syntax</h3><p>CSS consists of a selector and a declaration block:</p><pre><code>selector {<br>  property: value;<br>  property: value;<br>}</code></pre><h3>Ways to Insert CSS</h3><p>There are three ways to insert CSS into your HTML:</p><ol><li><strong>External CSS:</strong> Link to an external .css file</li><li><strong>Internal CSS:</strong> Use a &lt;style&gt; element in the &lt;head&gt; section</li><li><strong>Inline CSS:</strong> Use the style attribute directly in HTML elements</li></ol><h3>CSS Selectors</h3><p>CSS selectors are used to \"find\" (or select) the HTML elements you want to style. Here are some key selectors:</p><ul><li>Element selector (e.g., h1, p, div)</li><li>ID selector (e.g., #header, #footer)</li><li>Class selector (e.g., .button, .navigation)</li><li>Universal selector (*)</li></ul><h3>Assignment</h3><p>Create a simple webpage with HTML and style it using both internal and external CSS. Include:</p><ul><li>Different text formatting</li><li>Custom colors and backgrounds</li><li>Simple layout with margins and padding</li></ul>',2,'2025-04-07 14:56:21','2025-04-07 14:56:21');
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_ID` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tag_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'JavaScript'),(2,'Python'),(3,'React'),(4,'Web Development'),(5,'Data Science');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_answer_images`
--

DROP TABLE IF EXISTS `thread_answer_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_answer_images` (
  `answer_ID` int NOT NULL,
  `image_ID` int NOT NULL,
  PRIMARY KEY (`answer_ID`,`image_ID`),
  KEY `image_ID` (`image_ID`),
  CONSTRAINT `thread_answer_images_ibfk_1` FOREIGN KEY (`answer_ID`) REFERENCES `thread_answers` (`answer_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_answer_images_ibfk_2` FOREIGN KEY (`image_ID`) REFERENCES `images` (`image_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_answer_images`
--

LOCK TABLES `thread_answer_images` WRITE;
/*!40000 ALTER TABLE `thread_answer_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_answer_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_answer_votes`
--

DROP TABLE IF EXISTS `thread_answer_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_answer_votes` (
  `answer_ID` int NOT NULL,
  `voter_ID` int NOT NULL,
  `vote_type` enum('upvote','downvote') DEFAULT NULL,
  PRIMARY KEY (`answer_ID`,`voter_ID`),
  KEY `voter_ID` (`voter_ID`),
  CONSTRAINT `thread_answer_votes_ibfk_1` FOREIGN KEY (`answer_ID`) REFERENCES `thread_answers` (`answer_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_answer_votes_ibfk_2` FOREIGN KEY (`voter_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_answer_votes`
--

LOCK TABLES `thread_answer_votes` WRITE;
/*!40000 ALTER TABLE `thread_answer_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_answer_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_answers`
--

DROP TABLE IF EXISTS `thread_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_answers` (
  `answer_ID` int NOT NULL AUTO_INCREMENT,
  `thread_ID` int DEFAULT NULL,
  `author_ID` int DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `accepted` enum('true','false') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`answer_ID`),
  KEY `thread_ID` (`thread_ID`),
  KEY `author_ID` (`author_ID`),
  CONSTRAINT `thread_answers_ibfk_1` FOREIGN KEY (`thread_ID`) REFERENCES `threads` (`thread_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_answers_ibfk_2` FOREIGN KEY (`author_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_answers`
--

LOCK TABLES `thread_answers` WRITE;
/*!40000 ALTER TABLE `thread_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_images`
--

DROP TABLE IF EXISTS `thread_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_images` (
  `thread_ID` int NOT NULL,
  `image_ID` int NOT NULL,
  PRIMARY KEY (`thread_ID`,`image_ID`),
  KEY `image_ID` (`image_ID`),
  CONSTRAINT `thread_images_ibfk_1` FOREIGN KEY (`thread_ID`) REFERENCES `threads` (`thread_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_images_ibfk_2` FOREIGN KEY (`image_ID`) REFERENCES `images` (`image_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_images`
--

LOCK TABLES `thread_images` WRITE;
/*!40000 ALTER TABLE `thread_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_tags`
--

DROP TABLE IF EXISTS `thread_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_tags` (
  `thread_ID` int NOT NULL,
  `tag_ID` int NOT NULL,
  PRIMARY KEY (`thread_ID`,`tag_ID`),
  KEY `tag_ID` (`tag_ID`),
  CONSTRAINT `thread_tags_ibfk_1` FOREIGN KEY (`thread_ID`) REFERENCES `threads` (`thread_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_tags_ibfk_2` FOREIGN KEY (`tag_ID`) REFERENCES `tags` (`tag_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_tags`
--

LOCK TABLES `thread_tags` WRITE;
/*!40000 ALTER TABLE `thread_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_votes`
--

DROP TABLE IF EXISTS `thread_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_votes` (
  `thread_ID` int NOT NULL,
  `voter_ID` int NOT NULL,
  `vote_type` enum('upvote','downvote') DEFAULT NULL,
  PRIMARY KEY (`thread_ID`,`voter_ID`),
  KEY `voter_ID` (`voter_ID`),
  CONSTRAINT `thread_votes_ibfk_1` FOREIGN KEY (`thread_ID`) REFERENCES `threads` (`thread_ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_votes_ibfk_2` FOREIGN KEY (`voter_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_votes`
--

LOCK TABLES `thread_votes` WRITE;
/*!40000 ALTER TABLE `thread_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `threads` (
  `thread_ID` int NOT NULL AUTO_INCREMENT,
  `author_ID` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thread_ID`),
  KEY `author_ID` (`author_ID`),
  CONSTRAINT `threads_ibfk_1` FOREIGN KEY (`author_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth`
--

DROP TABLE IF EXISTS `user_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','instructor','student') NOT NULL DEFAULT 'student',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth`
--

LOCK TABLES `user_auth` WRITE;
/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */;
INSERT INTO `user_auth` VALUES (1,'concac@gmail.com','$2b$10$XAzH4pKkYCCIpnArTy0qOOqiJIluQ5icE2/vy/Pa0Bi9eb3UeYTAe','student'),(2,'admin@gmail.com','$2b$10$RirfmZnmQTxv4IQpgz1QVeJRelmXowdItrcqvfnIrcs0dlhC.Mob.','instructor'),(3,'ducan@gmail.com','$2b$10$3ev6mI4Rv3CkFhxsMuRdxOzfZ/2/z26776bOph5AEA/B17WrkM2rG','instructor');
/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_ID` int NOT NULL,
  `avatar_ID` int DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  PRIMARY KEY (`user_ID`),
  KEY `avatar_ID` (`avatar_ID`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `user_info_ibfk_2` FOREIGN KEY (`avatar_ID`) REFERENCES `images` (`image_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,1,'John Doe','1985-01-15','male'),(2,1,'Alice Smith','1990-03-20','female');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_video_notes`
--

DROP TABLE IF EXISTS `user_video_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_video_notes` (
  `note_ID` int NOT NULL AUTO_INCREMENT,
  `video_ID` int DEFAULT NULL,
  `user_ID` int DEFAULT NULL,
  `note_content` text,
  PRIMARY KEY (`note_ID`),
  KEY `user_ID` (`user_ID`),
  KEY `video_ID` (`video_ID`),
  CONSTRAINT `user_video_notes_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `user_video_notes_ibfk_2` FOREIGN KEY (`video_ID`) REFERENCES `videos` (`video_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_video_notes`
--

LOCK TABLES `user_video_notes` WRITE;
/*!40000 ALTER TABLE `user_video_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_video_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_watch`
--

DROP TABLE IF EXISTS `video_watch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_watch` (
  `student_ID` int DEFAULT NULL,
  `video_ID` int DEFAULT NULL,
  `status` enum('completed','incomplete') NOT NULL DEFAULT 'incomplete',
  KEY `student_ID` (`student_ID`),
  KEY `video_ID` (`video_ID`),
  CONSTRAINT `video_watch_ibfk_1` FOREIGN KEY (`student_ID`) REFERENCES `user_auth` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `video_watch_ibfk_2` FOREIGN KEY (`video_ID`) REFERENCES `videos` (`video_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_watch`
--

LOCK TABLES `video_watch` WRITE;
/*!40000 ALTER TABLE `video_watch` DISABLE KEYS */;
/*!40000 ALTER TABLE `video_watch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `video_ID` int NOT NULL AUTO_INCREMENT,
  `week_ID` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `resource_type` enum('video','text') DEFAULT 'video',
  `order_index` int DEFAULT '0',
  PRIMARY KEY (`video_ID`),
  KEY `week_ID` (`week_ID`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`week_ID`) REFERENCES `weeks` (`week_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,1,'Variables and Data Types','https://example.com/js-basics-1','video',1),(2,1,'Control Flow','https://example.com/js-basics-2','video',1),(3,2,'Function Declaration','https://example.com/js-functions-1','video',1),(4,3,'Python Setup','https://example.com/python-1','video',1),(5,4,'Pandas Introduction','https://example.com/pandas-1','video',1),(6,5,'React Components','https://example.com/react-1','video',1),(7,7,'How to get along well with ANYBODY?','https://www.youtube.com/embed/d8dc2agonsY','video',1),(8,1,'Introduction to the Course','https://www.youtube.com/embed/PkZNo7MFNFg','video',1),(9,2,'HTML Basics - Structure of a Webpage','https://www.youtube.com/embed/qz0aGYrrlhU','video',1),(10,10,'klfs','https://www.youtube.com/embed/d8dc2agonsY','video',1),(11,11,'','','video',1),(12,12,'fga','https://www.facebook.com/','video',1),(13,13,'kkk','https://www.facebook.com/','video',0),(14,14,'sdfa','https://www.youtube.com/watch?v=Nv8KAgBOjAI&list=RDNv8KAgBOjAI&start_radio=1','video',0),(15,15,'asfsefa','https://www.youtube.com/watch?v=0qBOVUo4Ckc','video',0);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weeks`
--

DROP TABLE IF EXISTS `weeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weeks` (
  `week_ID` int NOT NULL AUTO_INCREMENT,
  `course_ID` int DEFAULT NULL,
  `week_number` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`week_ID`),
  KEY `course_ID` (`course_ID`),
  CONSTRAINT `weeks_ibfk_1` FOREIGN KEY (`course_ID`) REFERENCES `courses` (`course_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weeks`
--

LOCK TABLES `weeks` WRITE;
/*!40000 ALTER TABLE `weeks` DISABLE KEYS */;
INSERT INTO `weeks` VALUES (1,1,1,'JavaScript Basics'),(2,1,2,'Functions and Objects'),(3,2,1,'Python Fundamentals'),(4,2,2,'Data Analysis with Pandas'),(5,3,1,'React Fundamentals'),(6,3,2,'State Management'),(7,4,1,'Introduction to basic C'),(8,1,1,'Introduction to Web Development'),(9,1,2,'HTML and CSS Fundamentals'),(10,5,1,'klfsd'),(11,5,2,''),(12,6,1,'fgdsg'),(13,7,1,'kkk'),(14,8,1,'fsaa'),(15,9,1,'asgfds');
/*!40000 ALTER TABLE `weeks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 22:36:46
