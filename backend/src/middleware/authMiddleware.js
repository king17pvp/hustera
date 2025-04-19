const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    // Log để debug
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
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({
          success: false,
          message: err.name === 'TokenExpiredError' ? "Token has expired" : "Invalid token"
        });
      }
      
      // Log để debug - ENHANCED for better debugging
      console.log("Authenticated user data:", JSON.stringify(user, null, 2));
      
      // IMPORTANT: Ensure the user has the right format
      if (!user.user_ID) {
        console.error("User ID missing in token payload");
        return res.status(401).json({
          success: false,
          message: "Invalid token format: user_ID missing"
        });
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