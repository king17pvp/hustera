const express = require('express');
const registerController = require('../controllers/registerController')
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const db = require('../config/db');
const router = express.Router()

router.post('/', registerController.register);

// Route to create a test user
router.post('/create-test-user', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await userModel.findByEmail('admin@gmail.com');
        if (existingUser) {
            // If user exists but is not an instructor, update their role
            if (existingUser.role !== 'instructor') {
                await db.query('UPDATE user_auth SET role = ? WHERE email = ?', ['instructor', 'admin@gmail.com']);
                return res.status(200).json({ 
                    success: true, 
                    message: 'Test user role updated to instructor' 
                });
            }
            return res.status(200).json({ 
                success: true, 
                message: 'Test user already exists' 
            });
        }

        // Create hashed password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create user auth with explicit instructor role
        const user = await userModel.createUser('admin@gmail.com', hashedPassword, 'instructor');

        // Create user info
        await userModel.createUserInfo(user.id, 'Admin User', 'male');

        res.status(201).json({ 
            success: true, 
            message: 'Test user created successfully as instructor' 
        });
    } catch (error) {
        console.error('Error creating test user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating test user: ' + error.message 
        });
    }
});

module.exports = router;