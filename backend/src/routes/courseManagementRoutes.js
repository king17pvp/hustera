const express = require('express');
const courseManagementController = require('../controllers/courseManagementController');
const router = express.Router();

// Main route to get all courses and related data
router.get('/', courseManagementController.getAllCourses);

// Delete a course
router.post('/delete-course', courseManagementController.deleteCourse);

// Remove video from a course
router.post('/remove-video', courseManagementController.removeVideo);

// Remove student from a course
router.post('/remove-student', courseManagementController.removeStudent);

// Remove review from a course
router.post('/remove-review', courseManagementController.removeReview);

module.exports = router;