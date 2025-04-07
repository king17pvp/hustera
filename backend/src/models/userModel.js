const db = require('../config/db');

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM user_auth WHERE email = ?', [email]);
    return rows[0];
};

exports.createUser = async (email, password, role) => {
    const [result] = await db.query(
        'INSERT INTO user_auth (email, password, role) VALUES (?, ?, ?)',
        [email, password, role]
    );

    return {id: result.insertId, email: email, role: role};
};

exports.createUserInfo = async (userId, name, gender) => {
    const [result] = await db.query(
        'INSERT INTO user_info (user_ID, name, gender) VALUES (?, ?, ?)',
        [userId, name, gender]
    );

    return result.insertId;
};