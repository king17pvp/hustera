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
    SELECT c.course_ID AS course_id, c.title, c.description, c.category, c.thumbnail_ID, 
           c.price, c.duration, c.level
    FROM courses c
    WHERE c.course_ID = ?
  `, [courseId]);
  return rows[0];
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

exports.getCourseReviews = async (courseId) => {
  const [rows] = await db.query(`
    SELECT ua.email AS reviewer_name, ui.avatar_ID AS reviewer_avatar_id,
           cr.rating, cr.rated_at, cr.review
    FROM course_reviews cr
    JOIN user_auth ua ON cr.reviewer_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    WHERE cr.course_ID = ?
  `, [courseId]);
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
    SELECT ua.user_ID, ua.email, ui.name, ui.avatar_ID,
      (SELECT COUNT(*) FROM courses WHERE instructor_ID = c.instructor_ID) AS num_courses,
      (SELECT COUNT(*) FROM course_enroll WHERE course_ID IN (SELECT course_ID FROM courses WHERE instructor_ID = c.instructor_ID)) AS num_students
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    WHERE c.course_ID = ?
  `, [courseId]);
  return rows[0];
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
    JOIN images img ON c.thumbnail_ID = img.image_ID
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
      ui.name AS instructor
    ${baseQuery}
    LIMIT ? OFFSET ?
  `;

  const coursesQueryParams = [...queryParams, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)];
  const [courses] = await db.query(coursesQuery, coursesQueryParams);

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