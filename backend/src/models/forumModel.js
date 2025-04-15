const db = require('../config/db');

exports.getThreadById = async (threadId) => {
  const [rows] = await db.query(`
    SELECT 
      t.thread_ID,
      t.title,
      t.content,
      t.created_at,
      u.email AS author,
      tg.tag_name,
      (
        SELECT COUNT(*) FROM thread_votes 
        WHERE thread_ID = t.thread_ID AND vote_type = 'upvote'
      ) -
      (
        SELECT COUNT(*) FROM thread_votes 
        WHERE thread_ID = t.thread_ID AND vote_type = 'downvote'
      ) AS score,
      i.image AS image_blob
    FROM threads t
    JOIN user_auth u ON u.user_ID = t.author_ID
    LEFT JOIN thread_tags tt ON tt.thread_ID = t.thread_ID
    LEFT JOIN tags tg ON tg.tag_ID = tt.tag_ID
    LEFT JOIN thread_images ti ON ti.thread_ID = t.thread_ID
    LEFT JOIN images i ON i.image_ID = ti.image_ID
    WHERE t.thread_ID = ?
  `, [threadId]);

  if (!rows.length) return null;

  const thread = {
    thread_ID: rows[0].thread_ID,
    title: rows[0].title,
    content: rows[0].content,
    created_at: rows[0].created_at,
    author: rows[0].author,
    tags: [],
    score: rows[0].score,
    image_urls: [],
  };

  for (const row of rows) {
    if (row.tag_name && !thread.tags.includes(row.tag_name)) {
      thread.tags.push(row.tag_name);
    }

    if (row.image_blob) {
      const base64Image = `data:image/png;base64,${row.image_blob.toString('base64')}`;
      thread.image_urls.push(base64Image);
    }
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
      (
        SELECT COUNT(*) FROM thread_answer_votes av 
        WHERE av.answer_ID = a.answer_ID AND vote_type = 'upvote'
      ) -
      (
        SELECT COUNT(*) FROM thread_answer_votes av 
        WHERE av.answer_ID = a.answer_ID AND vote_type = 'downvote'
      ) AS score,
      i.image AS image_blob
    FROM thread_answers a
    JOIN user_auth u ON u.user_ID = a.author_ID
    LEFT JOIN thread_answer_images tai ON tai.answer_ID = a.answer_ID
    LEFT JOIN images i ON i.image_ID = tai.image_ID
    WHERE a.thread_ID = ?
  `, [threadId]);

  // Gom từng answer_ID → mảng ảnh
  const answerMap = {};

  for (const row of rows) {
    const answerId = row.answer_ID;

    if (!answerMap[answerId]) {
      answerMap[answerId] = {
        answer_ID: row.answer_ID,
        content: row.content,
        created_at: row.created_at,
        accepted: row.accepted,
        author: row.author,
        score: row.score,
        image_urls: [],
      };
    }

    if (row.image_blob) {
      const base64Image = `data:image/png;base64,${row.image_blob.toString('base64')}`;
      answerMap[answerId].image_urls.push(base64Image);
    }
  }

  return Object.values(answerMap);
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

exports.createAnswer = async (threadId, authorId, contents, attachments = []) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO thread_answers (thread_ID, author_ID, content) VALUES (?, ?, ?)`,
      [threadId, authorId, contents]
    );

    const answer_ID = result.insertId;

    for (const base64String of attachments) {
      const base64Data = base64String.split(';base64,').pop(); // strip prefix
      const buffer = Buffer.from(base64Data, 'base64');

      const [imgResult] = await db.execute(
        `INSERT INTO images (image) VALUES (?)`,
        [buffer]
      );

      const image_ID = imgResult.insertId;

      await db.execute(
        `INSERT INTO thread_answer_images (answer_ID, image_ID) VALUES (?, ?)`,
        [answer_ID, image_ID]
      );
    }
    return {
      answer_ID,
      thread_ID: threadId,
      author_ID: authorId,
      contents,
      created_at: new Date(),
      accepted: "false",
    };
  } catch (err) {
    console.error('Error uploading thread:', err);
    throw err;
  }
};


exports.uploadForum = async (threadData, authorId) => {
  const { title, body, tags, attachments } = threadData;
  let parsedTags = tags ? tags.split(',') : [];
  try {
    // Step 1: Insert thread
    const [threadResult] = await db.execute(
      `INSERT INTO threads (author_ID, title, category, content)
       VALUES (?, ?, ?, ?)`,
      [authorId, title, 'general', body]
    );
    console.log("TAGS TYPE:", typeof parsedTags, parsedTags);
    const threadId = threadResult.insertId;
    const uniqueTags = [...new Set(parsedTags.map(tag => tag.trim().toLowerCase()))];

    

    for (const tagName of uniqueTags) {
      const [tagRows] = await db.execute(
        `SELECT tag_ID FROM tags WHERE tag_name = ?`,
        [tagName]
      );
    
      let tagId;
      if (tagRows.length > 0) {
        tagId = tagRows[0].tag_ID;
      } else {
        const [tagInsert] = await db.execute(
          `INSERT INTO tags (tag_name) VALUES (?)`,
          [tagName]
        );
        tagId = tagInsert.insertId;
      }
    
      await db.execute(
        `INSERT INTO thread_tags (thread_ID, tag_ID) VALUES (?, ?)`,
        [threadId, tagId]
      );
    }
    for (const base64String of attachments || []) {
      const base64Data = base64String.split(';base64,').pop();
      const buffer = Buffer.from(base64Data, 'base64');

      const [imageResult] = await db.execute(
        `INSERT INTO images (image) VALUES (?)`,
        [buffer]
      );
      const imageId = imageResult.insertId;

      await db.execute(
        `INSERT INTO thread_images (thread_ID, image_ID) VALUES (?, ?)`,
        [threadId, imageId]
      );
    }
    return threadId;
  } catch (err) {
    console.error('Error uploading thread:', err);
    throw err;
  }
};