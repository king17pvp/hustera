const coursesService = require("../services/courseService");
const Course = require('../models/courseModel');
const Search = require('../models/searchModel');

exports.getCourseReviews = async (req, res) => {
  try {
    const { courseID } = req.params;
    const reviews = await coursesService.getCourseReviews(courseID);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
exports.postCourseReview = async (req, res) => {
  try {
    const { user_id, course_id, rating, review } = req.body;

    if (!user_id || !course_id || !rating || !review) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await coursesService.postCourseReview(user_id, course_id, rating, review);

    return res.status(201).json({ message: "Review posted successfully" });
  } catch (error) {
    console.error("Post review error:", error);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to post review";
    return res.status(statusCode).json({ message });
  }
};

exports.enrollUserInCourse = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({ message: "Missing user_id or course_id" });
    }

    await coursesService.enrollUserInCourse(user_id, course_id);

    return res.status(200).json({ message: "User enrolled successfully" });
  } catch (error) {
    console.error("Enroll user error:", error);
    return res.status(500).json({ message: "Failed to enroll user" });
  }
};


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

exports.uploadCourse = async (req, res) => {
  try {
    const { instructor_id, title, description, category, tags, price, difficulty, thumbnail, curriculum } = req.body;

    const newCourse = await coursesService.uploadCourse(
      instructor_id, 
      title, 
      description, 
      category, 
      tags,
      price, 
      difficulty, 
      thumbnail, 
      curriculum
    );

    return res.status(201).json({ message: "Course uploaded successfully", course: newCourse });
  } catch (error) {
    console.error("Upload course error:", error);
    return res.status(500).json({ message: "Failed to upload course" });
  }
}

exports.getAllTags = async (req, res) => {
  try {
    const tags = await coursesService.getAllTags();
    res.status(200).json({ success: true, tags: tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch tags" });
  }
};

exports.watchVideo = async (req, res) => {
  try {
    const { user_id, video_id } = req.body;
    await coursesService.watchVideo(user_id, video_id);

    return res.status(200).json({ message: "Video watched successfully" });
  } catch (error) {
    console.error("Watch video error:", error);
    return res.status(500).json({ message: "Failed to watch video" });
  }
}