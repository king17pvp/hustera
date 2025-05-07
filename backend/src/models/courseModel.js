const db = require("../config/db");

exports.checkUserAlreadyReviewed = async (userID, courseID) => {
  const [rows] = await db.query(
    `
    SELECT COUNT(*) AS reviewCount
    FROM course_reviews
    WHERE reviewer_ID = ? AND course_ID = ?
    `,
    [userID, courseID]
  );
  return rows[0].reviewCount > 0;
};

exports.postCourseReview = async (userID, courseID, rating, review) => {
  const [result] = await db.query(
    `
    INSERT INTO course_reviews (reviewer_ID, course_ID, rating, review)
    VALUES (?, ?, ?, ?)
    `,
    [userID, courseID, rating, review]
  );
  return result;
};

exports.enrollUserInCourse = async (userID, courseID) => {
  const [result] = await db.query(
    `
    INSERT INTO course_enroll (student_ID, course_ID)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE enroll_date = CURRENT_TIMESTAMP
    `,
    [userID, courseID]
  );
  return result;
};

exports.getCourseBasicInfo = async (courseId) => {
  const [rows] = await db.query(`
    SELECT c.course_ID AS course_id, c.title, c.description, c.category, c.thumbnail_ID, c.thumbnail_url,
           c.price, c.duration, c.level, img.image AS thumbnail
    FROM courses c
    LEFT JOIN images img ON c.thumbnail_ID = img.image_ID
    WHERE c.course_ID = ?
  `, [courseId]);

  if (!rows[0]) return null;

  let thumbnailBase64 = null;
  if (rows[0].thumbnail) {
    const base64Data = Buffer.from(rows[0].thumbnail).toString('base64');
    thumbnailBase64 = `data:image/png;base64,${base64Data}`;
  }

  return {
    ...rows[0],
    thumbnail: thumbnailBase64,
  };
};

exports.getCourseReviews = async (courseId) => {
  const [rows] = await db.query(`
    SELECT ua.email AS reviewer_email, ui.name AS reviewer_name, ui.avatar_ID AS reviewer_avatar_id, img.image AS reviewer_avatar_image,
           cr.rating, cr.rated_at, cr.review
    FROM course_reviews cr
    JOIN user_auth ua ON cr.reviewer_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images img ON ui.avatar_ID = img.image_ID
    WHERE cr.course_ID = ?
  `, [courseId]);

  // Convert avatar image to base64 if present
  for (const row of rows) {
    if (row.reviewer_avatar_image) {
      const base64Data = Buffer.from(row.reviewer_avatar_image).toString('base64');
      row.reviewer_avatar_image = `data:image/png;base64,${base64Data}`;
    } else {
      row.reviewer_avatar_image = null;
    }
  }

  return rows;
};

exports.getCourseWeeksAndVideos = async (courseId) => {
  const [rows] = await db.query(`
    SELECT w.week_ID, w.title AS week_title, v.video_ID, v.title AS video_title, v.url
    FROM weeks w
    LEFT JOIN videos v ON w.week_ID = v.week_ID
    WHERE w.course_ID = ?
    ORDER BY w.week_number ASC, v.video_ID ASC
  `, [courseId]);
  return rows;
};

exports.getCourseInstructorInfo = async (courseId) => {
  const [rows] = await db.query(`
    SELECT ua.user_ID, ua.email, ui.name, ui.avatar_ID, img.image AS avatar_image,
      (SELECT COUNT(*) FROM courses WHERE instructor_ID = c.instructor_ID) AS num_courses,
      (SELECT COUNT(*) FROM course_enroll WHERE course_ID IN (SELECT course_ID FROM courses WHERE instructor_ID = c.instructor_ID)) AS num_students
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images img ON ui.avatar_ID = img.image_ID
    WHERE c.course_ID = ?
  `, [courseId]);

  let instructor = rows[0];
  if (instructor && instructor.avatar_image) {
    const base64Data = Buffer.from(instructor.avatar_image).toString('base64');
    instructor.avatar_image = `data:image/png;base64,${base64Data}`;
  } else if (instructor) {
    instructor.avatar_image = null;
  }
  return instructor;
};

exports.getCourseEnrollmentCount = async (courseId) => {
  const [rows] = await db.query(`
    SELECT COUNT(*) AS enrollment_count
    FROM course_enroll
    WHERE course_ID = ?
  `, [courseId]);
  return rows[0]?.enrollment_count || 0;
};

exports.getCourses = async ({ category, instructor, level, price, title, page = 1, limit = 10 }) => {
  let baseQuery = `
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images img ON c.thumbnail_ID = img.image_ID
    WHERE 1=1
  `;
  const queryParams = [];
  
  // Apply title search if provided
  if (title) {
    baseQuery += " AND c.title LIKE ?";
    queryParams.push(`%${title}%`);
  }

  // Filter by category
  if (category) {
    baseQuery += " AND c.category = ?";
    queryParams.push(category);
  }

  // Filter by instructor name
  if (instructor) {
    baseQuery += " AND ui.name = ?";
    queryParams.push(instructor);
  }

  // Filter by course level
  if (level) {
    baseQuery += " AND c.level = ?";
    queryParams.push(level);
  }

  // Filter by price range
  if (price) {
    if (price === "under30") {
      baseQuery += " AND c.price < 30";
    } else if (price === "30to50") {
      baseQuery += " AND c.price BETWEEN 30 AND 50";
    } else if (price === "above50") {
      baseQuery += " AND c.price > 50";
    }
  }

  // Final courses query with pagination
  const coursesQuery = `
    SELECT 
      c.course_ID AS courseID,
      c.title,
      c.category,
      c.description AS summary,
      CONCAT(c.duration, ' weeks') AS duration,
      c.level,
      c.price,
      img.image AS thumbnailUrl,
      c.thumbnail_url AS thumbnailUrl2,
      ui.name AS instructor,
      ua.email AS instructorEmail
    ${baseQuery}
    LIMIT ? OFFSET ?
  `;

  const coursesQueryParams = [...queryParams, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)];
  const [courses] = await db.query(coursesQuery, coursesQueryParams);

  for (const course of courses) {
    if (course.thumbnailUrl) {
      const base64Data = Buffer.from(course.thumbnailUrl).toString('base64');
      course.thumbnailUrl = `data:image/png;base64,${base64Data}`;
    } else {
      course.thumbnailUrl = null;
    }
  }

  // Get total count for pagination
  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
  const [countResult] = await db.query(countQuery, queryParams);
  const total = countResult[0].total;

  return {
    courses,
    totalPages: Math.ceil(total / limit),
    appliedFilters: {
      title: title || null,
      category: category || null,
      instructor: instructor || null,
      level: level || null,
      price: price || null
    }
  };
};

exports.getFilters = async () => {
  // Return all categories
  const [categories] = await db.query(`
    SELECT category, COUNT(*) AS count
    FROM courses
    GROUP BY category
    ORDER BY count DESC
  `);

  // Top 3 instructors by course count
  const [instructors] = await db.query(`
    SELECT ui.name AS instructor, COUNT(*) AS count
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    GROUP BY ui.name
    ORDER BY count DESC
    LIMIT 3
  `);

  return { categories, instructors };
};

exports.uploadCourse = async (instructor_id, title, description, category, tags, price, difficulty, thumbnail, curriculum) => {
  try {
    // Insert thumbnail into images table
    const [imageResult] = await db.query(
      'INSERT INTO images (image) VALUES (FROM_BASE64(?))',
      [thumbnail.replace(/^data:image\/\w+;base64,/, '')] // Remove base64 prefix if present
    );
    const thumbnailId = imageResult.insertId;

    // Insert course into courses table
    const [courseResult] = await db.query(
      `INSERT INTO courses (
        instructor_ID, 
        title, 
        description, 
        category, 
        thumbnail_ID, 
        price, 
        level, 
        duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        instructor_id,
        title,
        description,
        category,
        thumbnailId,
        price,
        difficulty,
        curriculum.length // Calculate duration based on number of weeks in curriculum
      ]
    );
    const courseId = courseResult.insertId;

    // Process tags
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Skip empty tags
        if (!tagName.trim()) continue;
        
        // Check if tag exists
        const [existingTags] = await db.query(
          'SELECT tag_ID FROM tags WHERE tag_name = ?',
          [tagName.trim()]
        );
        
        let tagId;
        if (existingTags.length === 0) {
          // Create new tag
          const [tagResult] = await db.query(
            'INSERT INTO tags (tag_name) VALUES (?)',
            [tagName.trim()]
          );
          tagId = tagResult.insertId;
        } else {
          tagId = existingTags[0].tag_ID;
        }
        
        // Link tag to course
        await db.query(
          'INSERT INTO course_tags (course_ID, tag_ID) VALUES (?, ?)',
          [courseId, tagId]
        );
      }
    }

    // Insert curriculum into weeks table
    for (let weekIndex = 0; weekIndex < curriculum.length; weekIndex++) {
      const week = curriculum[weekIndex];

      // Insert week
      const [weekResult] = await db.query(
        'INSERT INTO weeks (course_ID, week_number, title) VALUES (?, ?, ?)',
        [courseId, weekIndex + 1, week.title]
      );
      const weekId = weekResult.insertId;

      // Insert videos for this week
      for (const video of week.videos) {
        await db.query(
          'INSERT INTO videos (week_ID, title, url) VALUES (?, ?, ?)',
          [weekId, video.title, video.url]
        );
      }
    }
    return { success: true, courseId };
  } catch (error) {
    console.error("Error uploading course:", error);
    return { success: false, message: error.message };
  }
};

exports.getCourseTags = async (courseId) => {
  const [rows] = await db.query(`
    SELECT t.tag_name
    FROM course_tags ct
    JOIN tags t ON ct.tag_ID = t.tag_ID
    WHERE ct.course_ID = ?
  `, [courseId]);
  return rows.map(row => row.tag_name);
};

exports.getAllTags = async () => {
  const [rows] = await db.query(`
    SELECT DISTINCT tag_name AS tag FROM tags
  `);
  return rows.map(row => row.tag);
};

exports.watchVideo = async (userId, videoId) => {
  const [result] = await db.query(
    `
    INSERT INTO video_watch (student_ID, video_ID, status)
    VALUES (?, ?, 'completed')
    ON DUPLICATE KEY UPDATE status = 'completed'
    `,
    [userId, videoId]
  );
  return result;
}