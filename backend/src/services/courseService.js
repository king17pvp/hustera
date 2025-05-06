const coursesModel = require("../models/courseModel");

exports.postCourseReview = async (userID, courseID, rating, review) => {
  const alreadyReviewed = await coursesModel.checkUserAlreadyReviewed(userID, courseID);
  
  if (alreadyReviewed) {
    const error = new Error("You have already reviewed this course");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  return await coursesModel.postCourseReview(userID, courseID, rating, review);
  // return await coursesModel.postCourseReview(userID, courseID, rating, review);
};

exports.getCourseReviews = async (courseID) => {
  return await coursesModel.getCourseReviews(courseID);
};
exports.enrollUserInCourse = async (userID, courseID) => {
  return await coursesModel.enrollUserInCourse(userID, courseID);
};


exports.getCourses = async ({ category, instructor, level, price, page, limit }) => {
    return await coursesModel.getCourses({ category, instructor, level, price, page, limit });
};

exports.getFilters = async () => {
    return await coursesModel.getFilters();
};

exports.getCourseById = async (courseId) => {
    const course = await coursesModel.getCourseBasicInfo(courseId);
    if (!course) {
      return null;
    }
  
    const [tags, reviews, weeksVideos, instructor, enrollmentCount] = await Promise.all([
      coursesModel.getCourseTags(courseId),
      coursesModel.getCourseReviews(courseId),
      coursesModel.getCourseWeeksAndVideos(courseId),
      coursesModel.getCourseInstructorInfo(courseId),
      coursesModel.getCourseEnrollmentCount(courseId)
    ]);
  
    // Structure weeks and videos
    const weeksMap = new Map();
    for (const row of weeksVideos) {
      if (!weeksMap.has(row.week_ID)) {
        weeksMap.set(row.week_ID, {
          title: row.week_title,
          videos: []
        });
      }
      if (row.video_ID) {
        weeksMap.get(row.week_ID).videos.push({
          video_id: row.video_ID,
          title: row.video_title,
          url: row.url
        });
      }
    }
    const weeks = Array.from(weeksMap.values());
  
    return {
      ...course,
      tags,
      reviews,
      weeks,
      instructor,
      enrollment_count: enrollmentCount
    };
  };

exports.uploadCourse = async (instructor, title, description, category, tags, price, difficulty, thumbnail, curriculum) => {
  try {
    const courseId = await coursesModel.uploadCourse(instructor, title, description, category, tags, price, difficulty, thumbnail, curriculum);
    return courseId;
  } catch (error) {
    console.error('Service Error - uploadCourse:', error);
    throw error;
  }
};

exports.getAllTags = async () => {
  try {
    const tags = await coursesModel.getAllTags();
    return tags;
  } catch (error) {
    console.error('Service Error - getAllTags:', error);
    throw error;
  }
};