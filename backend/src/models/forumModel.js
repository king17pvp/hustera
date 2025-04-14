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
      (SELECT COUNT(*) FROM thread_votes WHERE thread_ID = t.thread_ID AND vote_type = 'downvote') AS score,
      GROUP_CONCAT(i.image_path) AS image_urls
    FROM threads t
    JOIN user_auth u ON u.user_ID = t.author_ID
    LEFT JOIN thread_tags tt ON tt.thread_ID = t.thread_ID
    LEFT JOIN tags tg ON tg.tag_ID = tt.tag_ID
    LEFT JOIN thread_images ti ON ti.thread_ID = t.thread_ID
    LEFT JOIN images i ON i.image_ID = ti.image_ID
    WHERE t.thread_ID = ?
    GROUP BY t.thread_ID
  `, [threadId]);
  
  const thread = rows[0];
  // console.log(thread);
  if (thread?.image_urls) {
    thread.image_urls = thread.image_urls.split(',');
  } else {
    thread.image_urls = [];
  }
  return thread;

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
      (SELECT COUNT(*) FROM thread_answer_votes av WHERE av.answer_ID = a.answer_ID AND vote_type = 'downvote') AS score,
      GROUP_CONCAT(i.image_path) AS image_urls
    FROM thread_answers a
    JOIN user_auth u ON u.user_ID = a.author_ID
    LEFT JOIN thread_answer_images tai ON tai.answer_ID = a.answer_ID
    LEFT JOIN images i ON i.image_ID = tai.image_ID
    WHERE a.thread_ID = ?
    GROUP BY a.answer_ID
  `, [threadId]);

  // split image URLs into array per answer
  
  const answers = rows.map((row) => ({
    ...row,
    image_urls: row.image_urls ? row.image_urls.split(',') : [],
  }));
  // console.log(answers);
  return rows;
};

exports.getForum = async ({ category, searchQuery, tags, sortBy = 'latest', page = 1}) => {
  const limit = 9;
  const offset = (page - 1) * limit; // Calculate the offset for pagination
  const params = [];
  const conditions = [];
  // console.log(category);
  // console.log(searchQuery);
  // console.log(tags);
  // console.log(sortBy);
  // console.log(page);
  // Filter by category
  if (category) {
    conditions.push('t.category = ?');
    params.push(category);
  } else {
    searchQuery = "";
    conditions.push('t.category LIKE ?')
    params.push(`%%`);
  }
  let searchTerm = ``;
  conditions.push('(t.title LIKE ? OR t.content LIKE ?)');
  if (!searchQuery) {
    searchQuery = "";
  }
  searchTerm = `%${searchQuery}%`;
  params.push(searchTerm, searchTerm);  // Two parameters for LIKE
  // Filter by tag name (join with thread_tags and tags)
  let tagJoin = '';
  if (tags && (Array.isArray(tags) ? tags.length > 0 : tags !== '')) {
    tagJoin = `
      JOIN thread_tags tt ON t.thread_ID = tt.thread_ID
      JOIN tags tg ON tt.tag_ID = tg.tag_ID
    `;
  
    // Always treat tags as an array
    const tagArray = Array.isArray(tags) ? tags : [tags];
  
    // Add condition
    conditions.push(`tg.tag_name IN (${tagArray.map(() => '?').join(',')})`);
  
    // Add values
    params.push(...tagArray);
  } else {
    let tag = '';
    tagJoin = `
      JOIN thread_tags tt ON t.thread_ID = tt.thread_ID
      JOIN tags tg ON tt.tag_ID = tg.tag_ID
    `;
    conditions.push('tg.tag_name LIKE ?');
    const tagSearch = `%${tag}%`;
    params.push(tagSearch);
  }

  // // Create WHERE clause
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // // Sorting logic
  let orderByClause = 'ORDER BY t.created_at DESC'; // Default to latest threads
  let activeSelect = 't.created_at AS last_active';

  if (sortBy === 'oldest') {
    orderByClause = 'ORDER BY t.created_at ASC';
  } else if (sortBy === 'recentComment') {
    activeSelect = `
      GREATEST(
        IFNULL(MAX(ta.created_at), 0),
        t.created_at
      ) AS last_active
    `;
    orderByClause = 'ORDER BY last_active DESC';
  } else {
    orderByClause = 'ORDER BY t.created_at DESC';
  }

  // // SQL query to fetch threads based on the conditions and sorting
  const query = `
    SELECT 
      t.thread_ID,
      t.title,
      t.content as description,
      t.category,
      t.created_at as date,
      ua.user_ID,
      ua.email,
      ui.name AS author,
      GROUP_CONCAT(DISTINCT tg.tag_name) AS tags,
      COUNT(DISTINCT tv.voter_ID) AS votes,
      COUNT(DISTINCT ta.answer_ID) AS answers,
      ${activeSelect}
      FROM threads t
      JOIN user_auth ua ON t.author_ID = ua.user_ID
      JOIN thread_tags tt ON t.thread_ID = tt.thread_ID
      JOIN tags tg ON tt.tag_ID = tg.tag_ID
      LEFT JOIN user_info ui ON ua.user_ID = ui.user_ID
      LEFT JOIN thread_votes tv ON t.thread_ID = tv.thread_ID
      LEFT JOIN thread_answers ta ON t.thread_ID = ta.thread_ID
      ${whereClause}
      GROUP BY t.thread_ID
      ${orderByClause}
      LIMIT 9;
  `;
  console.log('Executing query:', query);
  console.log('With parameters:', params);
  console.log(tags);
  console.log(searchQuery);
  // Add pagination parameters
  // params.push(limit, offset);

  try {
    const [rows] = await db.execute(query, params);
    const formattedRows = rows.map(row => ({
      ...row,
      tags: row.tags ? row.tags.split(',') : [],  // convert to array
    }));
    
    return formattedRows;
  } catch (err) {
    console.error('Error executing query in getForum:', err);
    throw err;
  }
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

exports.upsertAnswerVote = async (answerId, userId, voteType) => {
  // Kiểm tra đã vote chưa
  const [existing] = await db.query(
    `SELECT * FROM thread_answer_votes WHERE answer_ID = ? AND voter_ID = ?`,
    [answerId, userId]
  );

  if (existing.length > 0) {
    // Nếu voteType giống -> remove vote
    if (existing[0].vote_type === voteType) {
      await db.query(
        `DELETE FROM thread_answer_votes WHERE answer_ID = ? AND voter_ID = ?`,
        [answerId, userId]
      );
      return { removed: true };
    } else {
      // Nếu khác -> update vote
      await db.query(
        `UPDATE thread_answer_votes SET vote_type = ? WHERE answer_ID = ? AND voter_ID = ?`,
        [voteType, answerId, userId]
      );
      return { updated: true };
    }
  } else {
    // Chưa vote -> insert mới
    await db.query(
      `INSERT INTO thread_answer_votes (answer_ID, voter_ID, vote_type) VALUES (?, ?, ?)`,
      [answerId, userId, voteType]
    );
    return { inserted: true };
  }
};

exports.createAnswer = async (threadId, authorId, content) => {
  const [result] = await db.query(
    `INSERT INTO thread_answers (thread_ID, author_ID, content) VALUES (?, ?, ?)`,
    [threadId, authorId, content]
  );

  return {
    answer_ID: result.insertId,
    thread_ID: threadId,
    author_ID: authorId,
    content,
    created_at: new Date(), // giả định thời gian hiện tại
    accepted: "false",
  };
};