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
      
      // Log để debug
      console.log("Authenticated user:", user);
      
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

exports.isInstructor = (req, res, next) => {
    console.log('User in request:', req.user);
    
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (req.user.role !== 'instructor') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Instructor role required.',
            userRole: req.user.role 
        });
    }

    next();
};