const db = require('../config/db'); // Ensure this path is correct

exports.getAllUsers = async () => {
  const query = `
    SELECT
      ua.user_ID,
      ua.email,
      ua.role,
      ua.created_at AS createdAt,
      ui.name,
      ui.dob,
      ui.gender
    FROM
      user_auth ua
    LEFT JOIN
      user_info ui ON ua.user_ID = ui.user_ID
    WHERE
      ua.role != 'admin'
    ORDER BY
      ua.created_at DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

exports.getUserCourses = async (userId) => {
  const query = `
    SELECT
      c.course_ID,
      c.title AS name,
      CONCAT(
        (SELECT COUNT(*) FROM video_watch vw
         JOIN videos v ON vw.video_ID = v.video_ID
         JOIN weeks w ON v.week_ID = w.week_ID
         WHERE w.course_ID = c.course_ID AND vw.student_ID = ce.student_ID AND vw.status = 'completed'),
        '/',
        (SELECT COUNT(*) FROM videos v
         JOIN weeks w ON v.week_ID = w.week_ID
         WHERE w.course_ID = c.course_ID)
      ) AS progress,
      cr.rating AS rating,
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
  const [rows] = await db.query(query, [userId]);
  return rows.map(course => ({
    course_id: course.course_ID,
    name: course.name,
    progress: course.progress,
    review: course.rating !== null ? parseFloat(course.rating) : null,
    reviewText: course.reviewText
  }));
};

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
  return rows.map(thread => ({
    thread_id: thread.thread_ID,
    title: thread.title,
    upvotes: thread.upvotes,
    downvotes: thread.downvotes,
    answers: thread.answers,
    replies: []
  }));
};

exports.deleteUser = async (userId) => {
  const query = 'DELETE FROM user_auth WHERE user_ID = ?';
  const [result] = await db.query(query, [userId]);
  return result;
};

exports.removeUserCourse = async (userId, courseId) => {
  const query = 'DELETE FROM course_enroll WHERE student_ID = ? AND course_ID = ?';
  const [result] = await db.query(query, [userId, courseId]);
  return result;
};

exports.removeUserThread = async (userId, threadId) => {
  const query = 'DELETE FROM threads WHERE thread_ID = ? AND author_ID = ?';
  const [result] = await db.query(query, [threadId, userId]);
  return result;
};

exports.removeUserReply = async (userId, threadId, replyId) => {
  const query = `
    DELETE ta FROM thread_answers ta
    JOIN threads t ON ta.thread_ID = t.thread_ID
    WHERE ta.answer_ID = ? AND t.thread_ID = ? AND t.author_ID = ?
  `;
  const [result] = await db.query(query, [replyId, threadId, userId]);
  return result;
};
