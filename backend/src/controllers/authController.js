const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                user_ID: user.user_ID,
                email: user.email,
                role: user.role
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
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
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
}