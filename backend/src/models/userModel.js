const db = require('../config/db');

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM user_auth WHERE email = ?', [email]);
    return rows[0];
};

exports.updateProfile = async (userId, name, dob, gender, avatar) => {
    // Insert new image and get its ID
    if (avatar) {
        // Convert base64 string to Buffer for storage
        const base64Data = avatar.split(';base64,').pop();
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Insert new image and get its ID
        const [imageResult] = await db.query(
            "INSERT INTO images (image) VALUES (?)",
            [imageBuffer]
        );
        avatarId = imageResult.insertId;
    }

    // Update user_info with new data and avatar_ID
    const [result] = await db.query(
        'UPDATE user_info SET name = ?, dob = ?, gender = ?, avatar_ID = ? WHERE user_ID = ?',
        [name, dob, gender, avatarId, userId]
    );
    return result.affectedRows > 0;
};

// Get user's profile information
exports.getUserInfo = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            ui.user_ID,
            ui.name,
            ui.dob,
            ui.gender,
            ui.avatar_ID,
            i.image as avatar
        FROM user_info ui
        LEFT JOIN images i ON ui.avatar_ID = i.image_ID
        WHERE ui.user_ID = ?`,
        [userId]
    );

    // If no user info found, return null
    if (rows.length === 0) {
        return null;
    }

    // Convert avatar buffer to base64 if exists
    let avatarBase64 = null;
    if (rows[0].avatar) {
        const base64Data = Buffer.from(rows[0].avatar).toString('base64');
        avatarBase64 = `data:image/png;base64,${base64Data}`;
    }


    // Return the specific fields
    return {
        user_ID: rows[0].user_ID,
        name: rows[0].name,
        dob: rows[0].dob,
        gender: rows[0].gender,
        avatar_ID: rows[0].avatar_ID,
        avatar: avatarBase64
    };
};

exports.getEnrolledCourses = async (userId) => {
    const [rows] = await db.query(
        `SELECT course_ID FROM course_enroll WHERE student_ID = ? ORDER BY enroll_date DESC`,
        [userId]
    );

    return rows.map(row => row.course_ID);
};

exports.getVotedThreads = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            t.thread_ID,
            tv.vote_type
         FROM thread_votes tv
         JOIN threads t ON tv.thread_ID = t.thread_ID
         WHERE tv.voter_ID = ?`,
        [userId]
    );

    // Return as list of { thread_ID, vote_type }
    return rows.map(row => ({
        thread_ID: row.thread_ID,
        vote_type: row.vote_type // 1 for upvote, -1 for downvote
    }));
};

exports.getVotedAnswers = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            ta.answer_ID,
            tav.vote_type
         FROM thread_answer_votes tav
         JOIN thread_answers ta ON tav.answer_ID = ta.answer_ID
         WHERE tav.voter_ID = ?`,
        [userId]
    );

    // Return as list of { answer_ID, vote_type }
    return rows.map(row => ({
        answer_ID: row.answer_ID,
        vote_type: row.vote_type // 1 for upvote, -1 for downvote
    }));
};

exports.createUser = async (email, password, role) => {
    const [result] = await db.query(
        'INSERT INTO user_auth (email, password, role) VALUES (?, ?, ?)',
        [email, password, role]
    );

    return { id: result.insertId, email: email, role: role };
};