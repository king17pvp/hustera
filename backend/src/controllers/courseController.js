const coursesService = require("../services/courseService");

exports.getCourses = async (req, res) => {
    try {
        const filters = {
            category: req.query.category || "",
            instructor: req.query.instructor || "",
            level: req.query.level || "",
            price: req.query.price || "",
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 6
        };

        const data = await coursesService.getCourses(filters);
        res.status(200).json({ success: true, ...data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getFilters = async (req, res) => {
    try {
        const filterData = await coursesService.getFilters();
        res.status(200).json({ success: true, ...filterData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
