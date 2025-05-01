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
        ui.name AS instructor,
        COUNT(ce.student_ID) AS studentCount
      FROM 
        courses c
        JOIN user_auth ua ON c.instructor_ID = ua.user_ID
        JOIN user_info ui ON ua.user_ID = ui.user_ID
        JOIN images img ON c.thumbnail_ID = img.image_ID
        LEFT JOIN course_enroll ce ON c.course_ID = ce.course_ID
      GROUP BY 
        c.course_ID, c.title, c.category, c.description, c.duration, 
        c.level, c.price, img.image, ui.name
      ORDER BY 
        studentCount DESC
      LIMIT 6
    `);
    
    return rows;
  } catch (error) {
    console.error('Database error when fetching popular courses:', error);
    throw error; // Re-throw for service to handle
  }
};