const coursesService = require("../services/courseService");
const Course = require('../models/courseModel');
const Search = require('../models/searchModel');

// Get all courses with optional filtering and search
exports.getCourses = async (req, res) => {
  try {
    const { category, instructor, level, price, title, page, limit } = req.query;
    const result = await Course.getCourses({
      category,
      instructor,
      level,
      price,
      title,
      page,
      limit
    });

    res.json({
      success: true,
      courses: result.courses,
      totalPages: result.totalPages,
      appliedFilters: result.appliedFilters
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ success: false, message: 'Failed to get courses' });
  }
};

// Get filter options
exports.getFilters = async (req, res) => {
  try {
    const filters = await Course.getFilters();
    res.json({
      success: true,
      ...filters
    });
  } catch (error) {
    console.error('Error getting filters:', error);
    res.status(500).json({ success: false, message: 'Failed to get filters' });
  }
};

// Search courses (this will now use the updated searchModel that integrates with courseModel)
exports.searchCourses = async (req, res) => {
  try {
    const { title, category, instructor, level, price, page, limit } = req.query;
    const result = await Search.searchCoursesByTitle({
      title,
      category,
      instructor,
      level,
      price,
      page,
      limit
    });

    res.json({
      success: true,
      courses: result.courses,
      totalPages: result.totalPages,
      appliedFilters: result.appliedFilters
    });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ success: false, message: 'Failed to search courses' });
  }
};