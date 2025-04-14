const db = require('../config/db');

exports.searchCoursesByTitle = async ({ title, page = 1, limit = 10 }) => {
  const query = `
    SELECT 
      c.course_ID AS courseID,
      c.title,
      c.thumbnail_ID,
      i.image_path AS thumbnailUrl,  -- Include the image path from the images table
      c.category,
      c.description AS summary,
      CONCAT(c.duration, ' weeks') AS duration,
      c.level,
      c.price,
      ui.name AS instructor
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images i ON c.thumbnail_ID = i.image_ID  -- Join images table to get image path
    WHERE c.title LIKE ?
    LIMIT ? OFFSET ?;
  `;
  const queryParams = [
    `%${title}%`,
    parseInt(limit),
    (parseInt(page) - 1) * parseInt(limit)
  ];

  const [courses] = await db.query(query, queryParams);

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM courses c
    JOIN user_auth ua ON c.instructor_ID = ua.user_ID
    JOIN user_info ui ON ua.user_ID = ui.user_ID
    LEFT JOIN images i ON c.thumbnail_ID = i.image_ID  -- Include images table in count query as well
    WHERE c.title LIKE ?;
  `;
  const [countResult] = await db.query(countQuery, [`%${title}%`]);
  const total = countResult[0].total;

  return {
    courses,
    totalPages: Math.ceil(total / limit)
  };
};
