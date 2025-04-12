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
exports.getForum = async ({ category, searchQuery, tag, sortBy = 'latest', page = 1}) => {
  const limit = 9;
  const offset = (page - 1) * limit; // Calculate the offset for pagination
  const params = [];
  const conditions = [];

  // Filter by category
  if (category) {
    conditions.push('t.category = ?');
    params.push(category);
  }
  const searchTerm = `%${searchQuery}%`;
  // Filter by search (title or content)
  if (!searchQuery) {
    searchQuery = "";
    conditions.push('(t.title LIKE ? OR t.content LIKE ?)');
    const searchTerm = `%${searchQuery}%`;
    params.push(searchTerm, searchTerm);  // Two parameters for LIKE
  }

  // Filter by tag name (join with thread_tags and tags)
  let tagJoin = '';
  if (tag) {
    tagJoin = `
      JOIN thread_tags tt ON t.thread_ID = tt.thread_ID
      JOIN tags tg ON tt.tag_ID = tg.tag_ID
    `;
    conditions.push('tg.tag_name = ?');
    params.push(tag);
  }

  // // Create WHERE clause
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // // Sorting logic
  let orderByClause = 'ORDER BY t.created_at DESC'; // Default to latest threads
  let activeSelect = 't.created_at AS last_active';

  // if (sortBy === 'oldest') {
  //   orderByClause = 'ORDER BY t.created_at ASC';  // Sort by oldest
  // } else if (sortBy === 'active') {
  //   // Sort by most recently commented thread
  //   activeSelect = `
  //     GREATEST(
  //       IFNULL(MAX(ta.created_at), 0),
  //       t.created_at
  //     ) AS last_active
  //   `;
  //   orderByClause = 'ORDER BY last_active DESC'; // Sort by most recent comment
  // }

  // // SQL query to fetch threads based on the conditions and sorting
  const query = `
    SELECT 
      t.thread_ID,
      t.title,
      t.content,
      t.category,
      t.created_at,
      ua.user_ID,
      ua.email,
      ui.name AS author_name,
      COUNT(DISTINCT tv.voter_ID) AS vote_count,
      COUNT(DISTINCT ta.answer_ID) AS answer_count
      FROM threads t
      JOIN user_auth ua ON t.author_ID = ua.user_ID
      LEFT JOIN user_info ui ON ua.user_ID = ui.user_ID
      LEFT JOIN thread_votes tv ON t.thread_ID = tv.thread_ID
      LEFT JOIN thread_answers ta ON t.thread_ID = ta.thread_ID
      GROUP BY t.thread_ID
      LIMIT 9;
  `;
  // const query = `
  //   SELECT 
  //     t.thread_ID,
  //     t.title,
  //     t.content,
  //     t.category,
  //     t.created_at,
  //     ua.user_ID,
  //     ua.email,
  //     ui.name AS author_name,
  //     COUNT(DISTINCT tv.voter_ID) AS vote_count,
  //     COUNT(DISTINCT ta.answer_ID) AS answer_count
  //   FROM threads t
  //   JOIN user_auth ua ON t.author_ID = ua.user_ID
  //   LEFT JOIN user_info ui ON ua.user_ID = ui.user_ID
  //   LEFT JOIN thread_votes tv ON t.thread_ID = tv.thread_ID
  //   LEFT JOIN thread_answers ta ON t.thread_ID = ta.thread_ID
  //   GROUP BY t.thread_ID
  //   LIMIT 9;
  // `;
  console.log('Executing query:', query);
  console.log('With parameters:', params);
  // Add pagination parameters
  params.push(limit, offset);

  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.error('Error executing query in getForum:', err);
    throw err;
  }
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

exports.getFilters = async () => {
  try {
    const [categories] = await db.execute(`
      SELECT 
        category as name, 
        COUNT(*) AS thread_count
      FROM 
        threads
      WHERE 
        category IS NOT NULL
      GROUP BY 
        category;
    `);

    const [tags] = await db.execute(`
      SELECT tag_name FROM tags;
    `);

    return {
      categories,
      tags
    };
  } catch (err) {
    console.error('Error in getFilters:', err);
    throw err;
  }
};
