const db = require('../config/db');

// Get all users with basic information
exports.getAllUsers = async () => {
  const query = `
    SELECT 
      ua.user_ID, 
      ua.email, 
      ua.role, 
      ua.created_at,
      ui.name, 
      ui.dob, 
      ui.gender
    FROM 
      user_auth ua
    LEFT JOIN 
      user_info ui ON ua.user_ID = ui.user_ID
    ORDER BY 
      ua.created_at DESC
  `;
  
  const [rows] = await db.query(query);
  return rows;
};

// Get courses enrolled by a user with progress and reviews
exports.getUserCourses = async (userId) => {
  const query = `
    SELECT 
      c.course_ID,
      c.title AS name,
      CONCAT(
        (SELECT COUNT(*) FROM video_watch vw 
         JOIN videos v ON vw.video_ID = v.video_ID
         JOIN weeks w ON v.week_ID = w.week_ID
         WHERE w.course_ID = c.course_ID AND vw.student_ID = ? AND vw.status = 'completed'),
        '/',
        (SELECT COUNT(*) FROM videos v 
         JOIN weeks w ON v.week_ID = w.week_ID 
         WHERE w.course_ID = c.course_ID)
      ) AS progress,
      cr.rating AS review,
      cr.review AS reviewText
    FROM 
      course_enroll ce
    JOIN 
      courses c ON ce.course_ID = c.course_ID
    LEFT JOIN 
      course_reviews cr ON ce.course_ID = cr.course_ID AND ce.student_ID = cr.reviewer_ID
    WHERE 
      ce.student_ID = ?
  `;
  
  const [rows] = await db.query(query, [userId, userId]);
  
  // Format course_id as C001, C002, etc.
  return rows.map(course => ({
    course_id: `C${course.course_ID.toString().padStart(3, '0')}`,
    name: course.name,
    progress: course.progress,
    review: course.rating !== null ? parseFloat(course.rating) : null,
    reviewText: course.reviewText
  }));
};

// Get threads created by a user
exports.getUserThreads = async (userId) => {
  const query = `
    SELECT 
      t.thread_ID,
      t.title,
      (SELECT COUNT(*) FROM thread_votes tv WHERE tv.thread_ID = t.thread_ID AND tv.vote_type = 'upvote') AS upvotes,
      (SELECT COUNT(*) FROM thread_votes tv WHERE tv.thread_ID = t.thread_ID AND tv.vote_type = 'downvote') AS downvotes,
      (SELECT COUNT(*) FROM thread_answers ta WHERE ta.thread_ID = t.thread_ID) AS answers
    FROM 
      threads t
    WHERE 
      t.author_ID = ?
  `;
  
  const [rows] = await db.query(query, [userId]);
  
  // Format thread_id as T001, T002, etc.
  return rows.map(thread => ({
    thread_id: `T${thread.thread_ID.toString().padStart(3, '0')}`,
    title: thread.title,
    upvotes: thread.upvotes,
    downvotes: thread.downvotes,
    answers: thread.answers,
    replies: [] // Will be populated later
  }));
};

// Get replies for a thread
exports.getThreadReplies = async (threadId) => {
  const query = `
    SELECT 
      ta.answer_ID,
      ta.content,
      (SELECT COUNT(*) FROM thread_answer_votes tav WHERE tav.answer_ID = ta.answer_ID AND tav.vote_type = 'upvote') AS upvotes,
      (SELECT COUNT(*) FROM thread_answer_votes tav WHERE tav.answer_ID = ta.answer_ID AND tav.vote_type = 'downvote') AS downvotes
    FROM 
      thread_answers ta
    WHERE 
      ta.thread_ID = ?
  `;
  
  const [rows] = await db.query(query, [threadId]);
  
  // Format reply_id as R001, R002, etc.
  return rows.map(reply => ({
    reply_id: `R${reply.answer_ID.toString().padStart(3, '0')}`,
    content: reply.content,
    upvotes: reply.upvotes,
    downvotes: reply.downvotes
  }));
};

// Delete a user
exports.deleteUser = async (userId) => {
  // Using foreign key constraints with ON DELETE CASCADE to automatically remove related data
  const query = 'DELETE FROM user_auth WHERE user_ID = ?';
  return await db.query(query, [userId]);
};

// Remove a course from user's enrolled courses
exports.removeUserCourse = async (userId, courseId) => {
  const query = 'DELETE FROM course_enroll WHERE student_ID = ? AND course_ID = ?';
  return await db.query(query, [userId, courseId]);
};

// Remove a thread created by a user
exports.removeUserThread = async (userId, threadId) => {
  // First verify the thread belongs to the user
  const query = 'DELETE FROM threads WHERE thread_ID = ? AND author_ID = ?';
  return await db.query(query, [threadId, userId]);
};

// Remove a reply from a thread
exports.removeUserReply = async (userId, threadId, replyId) => {
  // First verify the thread belongs to the user and the reply is in that thread
  const query = `
    DELETE ta FROM thread_answers ta
    JOIN threads t ON ta.thread_ID = t.thread_ID
    WHERE ta.answer_ID = ? AND t.thread_ID = ? AND t.author_ID = ?
  `;
  return await db.query(query, [replyId, threadId, userId]);
};