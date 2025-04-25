const db = require('../config/db');

exports.getAllThreadsWithDetails = async () => {
  // Get all threads with basic info
  const [threads] = await db.query(`
    SELECT 
      t.thread_ID AS id,
      t.title,
      t.content,
      t.created_at AS createdAt,
      ui.name AS author,
      COALESCE(tv.upvotes, 0) AS upvotes,
      COALESCE(tv.downvotes, 0) AS downvotes
    FROM threads t
    LEFT JOIN user_info ui ON t.author_ID = ui.user_ID
    LEFT JOIN (
      SELECT 
        thread_ID,
        COUNT(CASE WHEN vote_type = 'upvote' THEN 1 END) AS upvotes,
        COUNT(CASE WHEN vote_type = 'downvote' THEN 1 END) AS downvotes
      FROM thread_votes
      GROUP BY thread_ID
    ) tv ON t.thread_ID = tv.thread_ID
    ORDER BY t.created_at DESC
  `);

  // Get all answers in a single query
  const [allAnswers] = await db.query(`
    SELECT 
      a.thread_ID,
      a.answer_ID AS id,
      a.content,
      a.created_at AS createdAt,
      ui.name AS author,
      COALESCE(av.upvotes, 0) AS upvotes,
      COALESCE(av.downvotes, 0) AS downvotes
    FROM thread_answers a
    LEFT JOIN user_info ui ON a.author_ID = ui.user_ID
    LEFT JOIN (
      SELECT 
        answer_ID,
        COUNT(CASE WHEN vote_type = 'upvote' THEN 1 END) AS upvotes,
        COUNT(CASE WHEN vote_type = 'downvote' THEN 1 END) AS downvotes
      FROM thread_answer_votes
      GROUP BY answer_ID
    ) av ON a.answer_ID = av.answer_ID
    ORDER BY a.created_at ASC
  `);

  // Map answers to threads
  const answerMap = allAnswers.reduce((acc, answer) => {
    if (!acc[answer.thread_ID]) acc[answer.thread_ID] = [];
    acc[answer.thread_ID].push({
      ...answer,
      author: answer.author || "Unknown"
    });
    return acc;
  }, {});

  return threads.map(thread => ({
    ...thread,
    answers: answerMap[thread.id] || []
  }));
};

exports.deleteThread = async (threadId) => {
  await db.query('DELETE FROM threads WHERE thread_ID = ?', [threadId]);
};

exports.deleteAnswer = async (answerId) => {
  await db.query('DELETE FROM thread_answers WHERE answer_ID = ?', [answerId]);
};
