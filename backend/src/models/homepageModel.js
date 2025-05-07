const db = require('../config/db');

exports.fetchCategories = async () => {
  try {
    // Based on the database schema, we need to count courses by category
    const [rows] = await db.query(`
      SELECT 
        category, 
        COUNT(*) AS courseCount 
      FROM 
        courses 
      GROUP BY 
        category 
      ORDER BY 
        category
    `);

    return rows;
  } catch (error) {
    console.error('Database error when fetching categories:', error);
    throw error; // Re-throw for service to handle
  }
};

exports.fetchCourses = async () => {
  try {
    // Query to get top 6 courses with most students enrolled
    const [rows] = await db.query(`
      SELECT 
        c.course_ID AS courseID,
        c.title,
        c.category,
        c.description AS summary,
        c.duration AS duration,
        c.level,
        c.price,
        img.image AS thumbnail,
        c.thumbnail_url AS thumbnailUrl,
        ui.name AS instructor,
        COUNT(ce.student_ID) AS studentCount
      FROM 
        courses c
        JOIN user_auth ua ON c.instructor_ID = ua.user_ID
        JOIN user_info ui ON ua.user_ID = ui.user_ID
        LEFT JOIN images img ON c.thumbnail_ID = img.image_ID
        LEFT JOIN course_enroll ce ON c.course_ID = ce.course_ID
      GROUP BY 
        c.course_ID, c.title, c.category, c.description, c.duration, 
        c.level, c.price, img.image, ui.name
      ORDER BY 
        studentCount DESC
      LIMIT 6
    `);

    // Convert image buffer to base64 if needed
    const courses = rows.map(course => {
      let thumbnailBase64 = null;
      if (course.thumbnail) {
        const base64Data = Buffer.from(course.thumbnail).toString('base64');
        thumbnailBase64 = `data:image/png;base64,${base64Data}`;
      }
      return {
        ...course,
        thumbnail: thumbnailBase64
      };
    });

    return courses;
  } catch (error) {
    console.error('Database error when fetching popular courses:', error);
    throw error; // Re-throw for service to handle
  }
};

exports.fetchThreads = async () => {
  try {
    // Query to get the 6 highest scored threads
    const query = `
      SELECT 
        t.thread_ID,
        t.title,
        t.created_at as date,
        t.content as description,
        t.category,
        u.email as author_email,
        ui.name as author_name,
        COUNT(DISTINCT ta.answer_ID) as answers,
        COALESCE(SUM(CASE WHEN tv.vote_type = 'upvote' THEN 1
                    WHEN tv.vote_type = 'downvote' THEN -1
                    ELSE 0 END), 0) as votes
      FROM 
        threads t
      LEFT JOIN 
        thread_answers ta ON t.thread_ID = ta.thread_ID
      LEFT JOIN 
        thread_votes tv ON t.thread_ID = tv.thread_ID
      JOIN 
        user_auth u ON t.author_ID = u.user_ID
      LEFT JOIN
        user_info ui ON u.user_ID = ui.user_ID
      GROUP BY 
        t.thread_ID
      ORDER BY 
        votes DESC, t.created_at DESC
      LIMIT 6;
    `;

    // Execute the query
    const [threads] = await db.query(query);

    // Get tags for each thread
    const formattedThreads = await Promise.all(threads.map(async (thread) => {
      // Query to get tags for this thread
      const tagsQuery = `
        SELECT 
          t.tag_name
        FROM 
          thread_tags tt
        JOIN 
          tags t ON tt.tag_ID = t.tag_ID
        WHERE 
          tt.thread_ID = ?;
      `;

      const [tagsResult] = await db.query(tagsQuery, [thread.thread_ID]);
      const tags = tagsResult.map(tag => tag.tag_name);

      // Format the result to match the expected output
      return {
        threadId: thread.thread_ID,
        title: thread.title,
        date: thread.date.toISOString(),
        description: thread.description,
        tags: tags,
        category: thread.category,
        answers: thread.answers,
        votes: thread.votes,
        author: thread.author_name || thread.author_email.split('@')[0]  // Use name if available, otherwise use email username
      };
    }));

    return formattedThreads;
  } catch (error) {
    console.error('Error fetching top threads:', error);
    throw error;
  }
};