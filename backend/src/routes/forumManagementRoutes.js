const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumManagementController');

// Public endpoints
router.get('/', forumController.getAllThreads);

// Admin-protected endpoints
router.post('/delete-thread', forumController.deleteThread);
router.post('/delete-answer', forumController.deleteAnswer);

module.exports = router;
