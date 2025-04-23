const db = require('../config/db');

exports.getAllThreadsWithDetails = async () => {
  const [threads] = await db.query(`
    SELECT 
      t.thread_ID AS id,
      t.title,
      t.content,
      t.created_at AS createdAt,
      ui.name AS author,
      (SELECT COUNT(*) FROM thread_votes WHERE thread_ID = t.thread_ID AND vote_type = 'upvote') AS upvotes,
      (SELECT COUNT(*) FROM thread_votes WHERE thread_ID = t.thread_ID AND vote_type = 'downvote') AS downvotes
    FROM threads t
    LEFT JOIN user_info ui ON t.author_ID = ui.user_ID
    ORDER BY t.created_at DESC
  `);

  const processedThreads = await Promise.all(threads.map(async (thread) => {
    const [answers] = await db.query(`
      SELECT 
        a.answer_ID AS answer_ID,
        a.content,
        a.created_at AS created_at,
        ui.name AS author,
        (SELECT COUNT(*) FROM thread_answer_votes WHERE answer_ID = a.answer_ID AND vote_type = 'upvote') AS upvotes,
        (SELECT COUNT(*) FROM thread_answer_votes WHERE answer_ID = a.answer_ID AND vote_type = 'downvote') AS downvotes
      FROM thread_answers a
      LEFT JOIN user_info ui ON a.author_ID = ui.user_ID
      WHERE a.thread_ID = ?
      ORDER BY a.created_at ASC
    `, [thread.id]);

    return {
      ...thread,
      answers: answers.map(answer => ({
        answer_ID: answer.answer_ID,
        content: answer.content,
        author: answer.author || "Unknown",
        created_at: answer.created_at,
        upvotes: answer.upvotes,
        downvotes: answer.downvotes
      }))
    };
  }));

  return processedThreads;
};

exports.deleteThread = async (threadId) => {
  await db.query('DELETE FROM threads WHERE thread_ID = ?', [threadId]);
};

exports.deleteAnswer = async (answerId) => {
  await db.query('DELETE FROM thread_answers WHERE answer_ID = ?', [answerId]);
};
