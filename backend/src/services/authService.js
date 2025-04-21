const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.login = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return {id: user.user_ID, email: user.email, role: user.role};
}