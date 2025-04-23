const courseManagementService = require('../services/courseManagementService');

// Get all courses with related data
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseManagementService.getAllCourses();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    await courseManagementService.deleteCourse(courseId);
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a video from a course
exports.removeVideo = async (req, res) => {
  const { courseId, weekId, videoId } = req.body;
  try {
    await courseManagementService.removeVideo(videoId);
    res.status(200).json({ success: true, message: 'Video removed successfully' });
  } catch (error) {
    console.error('Error removing video:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a student from a course
exports.removeStudent = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    await courseManagementService.removeStudent(courseId, userId);
    res.status(200).json({ success: true, message: 'Student removed from course successfully' });
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a review from a course
exports.removeReview = async (req, res) => {
  const { courseId, reviewId } = req.body;
  try {
    await courseManagementService.removeReview(reviewId);
    res.status(200).json({ success: true, message: 'Review removed successfully' });
  } catch (error) {
    console.error('Error removing review:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};