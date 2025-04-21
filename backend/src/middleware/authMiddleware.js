const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    // Log for debugging
    console.log("Auth header:", authHeader);
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required"
      });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required (format: Bearer TOKEN)"
      });
    }

    // For development purposes - check if token starts with "temp_token"
    // This is a temporary workaround since we're using generated tokens from frontend
    if (token.startsWith('temp_token_')) {
      console.log("Using development fallback for temp token");
      // Create a mock user object for development
      req.user = {
        user_ID: 1, // Default to admin user
        email: "admin@gmail.com",
        role: "instructor"
      };
      return next();
    }
    
    // If it's a real token, verify it properly
    const JWT_SECRET = process.env.JWT_SECRET || 'hustera_development_secret';
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({
          success: false,
          message: err.name === 'TokenExpiredError' ? "Token has expired" : "Invalid token"
        });
      }
      
      // Log user data
      console.log("Authenticated user data:", JSON.stringify(user, null, 2));
      
      // Make authentication more flexible - accept various user ID formats
      if (!user.user_ID && !user.id && !user.userId) {
        console.error("User ID missing in token payload");
        return res.status(401).json({
          success: false,
          message: "Invalid token format: user identification missing"
        });
      }
      
      // Normalize the user object to ensure user_ID is available
      if (!user.user_ID) {
        user.user_ID = user.id || user.userId;
      }
      
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error"
    });
  }
};

// Make sure this middleware is still allowing all users to pass through
exports.isInstructor = (req, res, next) => {
    // Temporarily allow all authenticated users to act as instructors 
    // for debugging purposes
    console.log("DEBUG: Bypassing instructor check - allowing user:", req.user);
    return next();
};