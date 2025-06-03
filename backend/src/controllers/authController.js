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

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
}

exports.updateProfile = async (req, res) => {
    const { userId, name, dob, gender, avatar } = req.body;
    try {
        const updatedUser = await authService.updateProfile(userId, name, dob, gender, avatar);
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}