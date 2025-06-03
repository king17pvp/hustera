const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courseController");

router.get("/", coursesController.getCourses);
router.get('/get-tags', coursesController.getAllTags);
router.get("/filters", coursesController.getFilters);
router.get('/:courseId', coursesController.getCourseById);
router.get('/:courseID/reviews', coursesController.getCourseReviews);
router.post('/enroll-course', coursesController.enrollUserInCourse);
router.post('/post-review', coursesController.postCourseReview);
router.post('/upload', coursesController.uploadCourse);
router.post('/watch-video', coursesController.watchVideo);


module.exports = router;
