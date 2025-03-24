const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.checkSession = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ success: true, user: req.session.user });
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