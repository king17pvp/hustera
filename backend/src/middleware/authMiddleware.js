const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);
    
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    console.log('Extracted Token:', token);
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    try {
        console.log('JWT Secret:', process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token',
            error: error.message 
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