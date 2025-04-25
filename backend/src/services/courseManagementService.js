const courseManagementModel = require('../models/courseManagementModel');

// Get all courses with related data
exports.getAllCourses = async () => {
  try {
    // Get all courses
    const courses = await courseManagementModel.getAllCourses();
    
    // For each course, get related data
    for (const course of courses) {
      // Get course weeks and videos
      const weeks = await courseManagementModel.getCourseWeeks(course.course_ID);
      
      for (const week of weeks) {
        // Get videos for each week
        const videos = await courseManagementModel.getWeekVideos(week.week_ID);
        week.videos = videos;
      }
      
      // Get enrolled students
      const students = await courseManagementModel.getCourseStudents(course.course_ID);
      
      // Get course reviews
      const reviews = await courseManagementModel.getCourseReviews(course.course_ID);
      
      // Calculate average rating
      let totalRating = 0;
      if (reviews.length > 0) {
        totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        course.rating = (totalRating / reviews.length).toFixed(1);
      } else {
        course.rating = 0;
      }
      
      // Add data to course object
      course.weeks = weeks;
      course.reviews = reviews;
      course.students = students;
      course.enrolled = students.length;
    }
    
    return courses;
  } catch (error) {
    throw new Error(`Error getting courses: ${error.message}`);
  }
};

// Delete a course
exports.deleteCourse = async (courseId) => {
  try {
    await courseManagementModel.deleteCourse(courseId);
    return true;
  } catch (error) {
    throw new Error(`Error deleting course: ${error.message}`);
  }
};

// Remove a video
exports.removeVideo = async (videoId) => {
  try {
    await courseManagementModel.removeVideo(videoId);
    return true;
  } catch (error) {
    throw new Error(`Error removing video: ${error.message}`);
  }
};

// Remove a student from a course
exports.removeStudent = async (courseId, userId) => {
  try {
    await courseManagementModel.removeStudent(courseId, userId);
    return true;
  } catch (error) {
    throw new Error(`Error removing student: ${error.message}`);
  }
};

// Remove a review
exports.removeReview = async (reviewId) => {
  try {
    await courseManagementModel.removeReview(reviewId);
    return true;
  } catch (error) {
    throw new Error(`Error removing review: ${error.message}`);
  }
};