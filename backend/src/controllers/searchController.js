const searchService = require('../services/searchService');

exports.searchCourses = async (req, res) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Missing search title' });
    }
    const results = await searchService.getSearchResults({ title, page, limit });
    res.json({
      success: true,
      courses: results.courses,
      totalPages: results.totalPages
    });
  } catch (error) {
    console.error('Error in search controller:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
