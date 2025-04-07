const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", coursesController.getCourses);
router.get("/filters", coursesController.getFilters);
router.get("/:id", coursesController.getCourseById);
router.post("/create", authMiddleware.verifyToken, authMiddleware.isInstructor, coursesController.createCourse);

// Thêm routes cho bài giảng
router.post("/lecture", authMiddleware.verifyToken, authMiddleware.isInstructor, coursesController.createLecture);
router.get("/lecture/:id", coursesController.getLectureById);

module.exports = router;
