const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Add debugging middleware to log requests
router.use((req, res, next) => {
  console.log(`Auth Route Request: ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// Login route
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;