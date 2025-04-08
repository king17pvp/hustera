const searchModel = require('../models/searchModel');

exports.getSearchResults = async ({ title, page, limit }) => {
  try {
    const results = await searchModel.searchCoursesByTitle({ title, page, limit });
    return results;
  } catch (error) {
    throw new Error('Error fetching search results: ' + error.message);
  }
};
