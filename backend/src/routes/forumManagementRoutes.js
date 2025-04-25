const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumManagementController');

// Public endpoints
router.get('/', forumController.getAllThreads);

// Admin-protected endpoints
router.delete('/delete-thread', forumController.deleteThread);
router.delete('/delete-answer', forumController.deleteAnswer);

module.exports = router;
