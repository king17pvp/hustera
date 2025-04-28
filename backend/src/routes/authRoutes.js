const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/', authController.login);
router.post('/settings/user-info', authController.updateProfile);

module.exports = router;