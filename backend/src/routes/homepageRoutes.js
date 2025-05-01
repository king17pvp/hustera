const express = require('express');
const homepageController = require('../controllers/homepageController');
const router = express.Router();

router.get('/categories', homepageController.fetchCategories);
router.get('/courses', homepageController.fetchCourses);
router.get('/threads', homepageController.fetchThreads);

module.exports = router;