const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        
        // Generate JWT token with MUCH longer expiration - 1 year
        const token = jwt.sign(
            { 
                user_ID: user.user_ID,
                email: user.email,
                role: user.role
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '365d' }  // Extended from 30d to 365 days (1 year)
        );

        res.status(200).json({ 
            success: true, 
            user,
            token
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.checkSession = async (req, res) => {
    if (req.session.user) {
        // Generate new token for session check
        const token = jwt.sign(
            { 
                user_ID: req.session.user.user_ID,
                email: req.session.user.email,
                role: req.session.user.role
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            success: true, 
            user: req.session.user,
            token
        });
    } else {
        res.status(401).json({ success: false, message: 'User not logged in' });
    }
};

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};

exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ 
                success: false, 
                message: 'Refresh token is required' 
            });
        }
        
        // Verify the expired token to get the user data
        let userData;
        try {
            // Allow decoding of expired tokens
            userData = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        } catch (error) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid token format'
            });
        }
        
        // Generate a new token with 1 year expiration
        const newToken = jwt.sign(
            { 
                user_ID: userData.user_ID,
                email: userData.email,
                role: userData.role
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '365d' }  // Extended to 1 year as well
        );
        
        res.status(200).json({
            success: true,
            token: newToken
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to refresh token'
        });
    }
};