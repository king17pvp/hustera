const db = require('../config/db');

// Get all courses with basic information
exports.getAllCourses = async () => {
  const [rows] = await db.query(`
    SELECT c.course_ID, c.title, ui.name as instructor, c.category, c.created_at as createdAt
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    ORDER BY c.created_at DESC
  `);
  return rows;
};

// Get weeks for a specific course
exports.getCourseWeeks = async (courseId) => {
  const [rows] = await db.query(`
    SELECT week_ID, week_number, title
    FROM weeks
    WHERE course_ID = ?
    ORDER BY week_number
  `, [courseId]);
  return rows;
};

// Get videos for a specific week
exports.getWeekVideos = async (weekId) => {
  const [rows] = await db.query(`
    SELECT v.video_ID, v.title, v.url as videoUrl,
    (
      SELECT COUNT(*) * 100 / (SELECT COUNT(*) FROM course_enroll ce 
                              JOIN weeks w ON w.course_ID = ce.course_ID
                              WHERE w.week_ID = ?)
      FROM video_watch vw
      WHERE vw.video_ID = v.video_ID AND vw.status = 'completed'
    ) as completed
    FROM videos v
    WHERE v.week_ID = ?
  `, [weekId, weekId]);
  return rows;
};

// Get students enrolled in a specific course
exports.getCourseStudents = async (courseId) => {
  const [rows] = await db.query(`
    SELECT ua.user_ID as user_id, ui.name as user_name,
    (
      SELECT COUNT(vw.status) * 100 / 
      (
        SELECT COUNT(v.video_ID)
        FROM videos v
        JOIN weeks w ON v.week_ID = w.week_ID
        WHERE w.course_ID = ce.course_ID
      ) 
      FROM video_watch vw
      JOIN videos v ON vw.video_ID = v.video_ID
      JOIN weeks w ON v.week_ID = w.week_ID
      WHERE w.course_ID = ce.course_ID AND vw.student_ID = ua.user_ID AND vw.status = 'completed'
    ) as progress
    FROM course_enroll ce
    JOIN user_auth ua ON ce.student_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    WHERE ce.course_ID = ?
  `, [courseId]);
  return rows;
};

// Get reviews for a specific course
exports.getCourseReviews = async (courseId) => {
  const [rows] = await db.query(`
    SELECT cr.review_ID, cr.reviewer_ID as user_id, ui.name as user_name, 
           cr.review as content, cr.rating as star
    FROM course_reviews cr
    JOIN user_info ui ON cr.reviewer_ID = ui.user_ID
    WHERE cr.course_ID = ?
  `, [courseId]);
  return rows;
};

// Delete a course
exports.deleteCourse = async (courseId) => {
  await db.query('DELETE FROM courses WHERE course_ID = ?', [courseId]);
  return true;
};

// Remove a video
exports.removeVideo = async (videoId) => {
  await db.query('DELETE FROM videos WHERE video_ID = ?', [videoId]);
  return true;
};

// Remove a student from a course
exports.removeStudent = async (courseId, userId) => {
  await db.query('DELETE FROM course_enroll WHERE course_ID = ? AND student_ID = ?', [courseId, userId]);
  return true;
};

// Remove a review
exports.removeReview = async (reviewId) => {
  await db.query('DELETE FROM course_reviews WHERE review_ID = ?', [reviewId]);
  return true;
};