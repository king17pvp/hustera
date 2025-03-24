const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.register = async (email, password, role) => {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser(email, hashedPassword, role);

    return { id: newUser.id, email: newUser.email, role: newUser.role };
};
