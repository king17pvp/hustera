const coursesService = require("../services/courseService");
const Course = require('../models/courseModel');
const Search = require('../models/searchModel');

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await coursesService.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log("Courses retrieved: ", course);
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

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