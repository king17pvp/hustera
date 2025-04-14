const db = require("../config/db");

exports.getCourses = async ({ category, instructor, level, price, page = 1, limit = 10 }) => {
  let baseQuery = `
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    JOIN images img ON c.thumbnail_ID = img.image_ID  -- Joining the images table to get the thumbnail path
    WHERE 1=1
  `;
  const queryParams = [];

  // 🗂️ Filter by category
  if (category) {
    baseQuery += " AND c.category = ?";
    queryParams.push(category);
  }

  // 👤 Filter by instructor name
  if (instructor) {
    baseQuery += " AND ui.name = ?";
    queryParams.push(instructor);
  }

  // 🎓 Filter by course level
  if (level) {
    baseQuery += " AND c.level = ?";
    queryParams.push(level);
  }

  // 💵 Filter by price range
  if (price) {
    if (price === "under30") {
      baseQuery += " AND c.price < 30";
    } else if (price === "30to50") {
      baseQuery += " AND c.price BETWEEN 30 AND 50";
    } else if (price === "above50") {
      baseQuery += " AND c.price > 50";
    }
  }

  // 🧾 Final courses query with pagination
  const coursesQuery = `
    SELECT 
      c.course_ID AS courseID,
      c.title,
      c.category,
      c.description AS summary,
      CONCAT(c.duration, ' weeks') AS duration,
      c.level,
      c.price,
      img.image_path AS thumbnailUrl,  -- Selecting the image path from the images table
      ui.name AS instructor
    ${baseQuery}
    LIMIT ? OFFSET ?
  `;

  const coursesQueryParams = [...queryParams, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)];
  const [courses] = await db.query(coursesQuery, coursesQueryParams);

  // 📊 Get total count for pagination
  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
  const [countResult] = await db.query(countQuery, queryParams);
  const total = countResult[0].total;

  return {
    courses,
    totalPages: Math.ceil(total / limit),
  };
};

exports.getFilters = async () => {
  // ✅ Return all categories
  const [categories] = await db.query(`
    SELECT category, COUNT(*) AS count
    FROM courses
    GROUP BY category
    ORDER BY count DESC
  `);

  // 🏆 Top 3 instructors by course count
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
