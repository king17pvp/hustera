const db = require('../config/db');

exports.getThreadById = async (threadId) => {
  const [rows] = await db.query(`
    SELECT 
      t.thread_ID,
      t.title,
      t.content,
      t.created_at,
      u.email AS author,
      GROUP_CONCAT(DISTINCT tg.tag_name) AS tags,
      (SELECT COUNT(*) FROM thread_votes WHERE thread_ID = t.thread_ID AND vote_type = 'upvote') -
      (SELECT COUNT(*) FROM thread_votes WHERE thread_ID = t.thread_ID AND vote_type = 'downvote') AS score
    FROM threads t
    JOIN user_auth u ON u.user_ID = t.author_ID
    LEFT JOIN thread_tags tt ON tt.thread_ID = t.thread_ID
    LEFT JOIN tags tg ON tg.tag_ID = tt.tag_ID
    WHERE t.thread_ID = ?
    GROUP BY t.thread_ID
  `, [threadId]);
  
  return rows[0]; 
};

exports.getAnswersByThreadId = async (threadId) => {
  const [rows] = await db.query(`
    SELECT 
      a.answer_ID,
      a.content,
      a.created_at,
      a.accepted,
      u.email AS author,
      (SELECT COUNT(*) FROM thread_answer_votes av WHERE av.answer_ID = a.answer_ID AND vote_type = 'upvote') -
      (SELECT COUNT(*) FROM thread_answer_votes av WHERE av.answer_ID = a.answer_ID AND vote_type = 'downvote') AS score
    FROM thread_answers a
    JOIN user_auth u ON u.user_ID = a.author_ID
    WHERE a.thread_ID = ?
  `, [threadId]);

  return rows;
};

exports.getCommentsByAnswerIds = async (answerIds) => {
  if (answerIds.length === 0) return [];

  const [rows] = await db.query(`
    SELECT 
      c.comment_ID,
      c.answer_ID,
      c.content,
      c.created_at,
      u.email AS author
    FROM thread_answer_comments c
    JOIN user_auth u ON u.user_ID = c.author_ID
    WHERE c.answer_ID IN (?)
  `, [answerIds]);

  return rows;
};

exports.insertAnswer = async ({ threadId, userId, content }) => {
  const [result] = await db.query(`
    INSERT INTO thread_answers (thread_ID, author_ID, content)
    VALUES (?, ?, ?)
  `, [threadId, userId, content]);

  return result;
};
