const db = require("../config/db");

exports.getCourses = async ({ category, instructor, level, price, page = 1, limit = 10 }) => {
  let baseQuery = `
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    WHERE 1=1
  `;
  const queryParams = [];

  if (category) {
    baseQuery += " AND c.category = ?";
    queryParams.push(category);
  }

  if (instructor) {
    baseQuery += " AND ui.name = ?";
    queryParams.push(instructor);
  }

  if (level) {
    baseQuery += " AND c.level = ?";
    queryParams.push(level);
  }

  if (price) {
    if (price === "under30") {
      baseQuery += " AND c.price < 30";
    } else if (price === "30to50") {
      baseQuery += " AND c.price BETWEEN 30 AND 50";
    } else if (price === "above50") {
      baseQuery += " AND c.price > 50";
    }
  }

  const coursesQuery = `
    SELECT 
      c.course_ID AS courseID,
      c.title,
      c.category,
      c.description AS summary,
      CONCAT(c.duration, ' weeks') AS duration,
      c.level,
      c.price,
      c.thumbnail_ID,
      ui.name AS instructor
    ${baseQuery}
    LIMIT ? OFFSET ?
  `;
  const coursesQueryParams = [...queryParams, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)];
  const [courses] = await db.query(coursesQuery, coursesQueryParams);

  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
  const [countResult] = await db.query(countQuery, queryParams);
  const total = countResult[0].total;

  return {
    courses,
    totalPages: Math.ceil(total / limit),
  };
};

exports.getFilters = async () => {
  const [categories] = await db.query(`
    SELECT category, COUNT(*) AS count
    FROM courses
    GROUP BY category
    ORDER BY count DESC
    LIMIT 5
  `);

  const [instructors] = await db.query(`
    SELECT ui.name AS instructor, COUNT(*) AS count
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    GROUP BY ui.name
    ORDER BY count DESC
    LIMIT 5
  `);

  return { categories, instructors };
};
