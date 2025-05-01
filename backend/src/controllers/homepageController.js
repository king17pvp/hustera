const homepageService = require('../services/homepageService');

exports.fetchCategories = async (req, res) => {
  try {
    // Call the service to get categories
    const categories = await homepageService.fetchCategories();
    
    // Return success response with categories
    return res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

exports.fetchCourses = async (req, res) => {
  try {
    // Call the service to get popular courses
    const popularCourses = await homepageService.fetchCourses();
    
    // Return success response with popular courses
    return res.status(200).json({
      success: true,
      data: popularCourses
    });
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch popular courses',
      error: error.message
    });
  }
};

exports.fetchThreads = async (req, res) => {

};