const coursesModel = require("../models/courseModel");

exports.getCourses = async ({ category, instructor, level, price, page, limit }) => {
    return await coursesModel.getCourses({ category, instructor, level, price, page, limit });
};

exports.getFilters = async () => {
    return await coursesModel.getFilters();
};

exports.createCourse = async (courseData) => {
    return await coursesModel.createCourse(courseData);
};

exports.getCourseById = async (courseId) => {
    return await coursesModel.getCourseById(courseId);
};

exports.getRecommendedCourses = async (limit = 3) => {
    // You can customize this to get recommended courses based on different criteria
    return await coursesModel.getCourses({ page: 1, limit });
};

// Thêm hàm để tạo bài giảng text
exports.createLecture = async (weekId, title, content, orderIndex) => {
    return await coursesModel.createLecture(weekId, title, content, orderIndex);
};

// Thêm hàm để lấy bài giảng theo ID
exports.getLectureById = async (lectureId) => {
    return await coursesModel.getLectureById(lectureId);
};
