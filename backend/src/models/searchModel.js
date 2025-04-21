const db = require('../config/db');

// This is a lightweight wrapper that uses the courseModel
exports.searchCoursesByTitle = async ({ title, category, instructor, level, price, page = 1, limit = 10 }) => {
  // Import courseModel
  const courseModel = require('./courseModel');
  
  // Use the getCourses function directly, ensuring all filters are applied
  return await courseModel.getCourses({
    title,
    category,
    instructor,
    level,
    price,
    page,
    limit
  });
};