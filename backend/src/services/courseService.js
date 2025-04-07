const coursesModel = require("../models/courseModel");

exports.getCourses = async ({ category, instructor, level, price, page, limit }) => {
    return await coursesModel.getCourses({ category, instructor, level, price, page, limit });
};

exports.getFilters = async () => {
    return await coursesModel.getFilters();
};
