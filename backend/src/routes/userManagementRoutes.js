const express = require('express');
const userManagementController = require('../controllers/userManagementController');
const router = express.Router();

// Main route to get all users with their details
router.get('/', userManagementController.getAllUsers);

// Routes for user management operations
router.delete('/delete', userManagementController.deleteUser);
router.delete('/remove-course', userManagementController.removeUserCourse);
router.delete('/remove-thread', userManagementController.removeUserThread);
router.delete('/remove-reply', userManagementController.removeUserReply);

module.exports = router;