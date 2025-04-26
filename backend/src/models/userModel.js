const db = require('../config/db');

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM user_auth WHERE email = ?', [email]);
    return rows[0];
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
            i.image_path as avatar_path
        FROM user_info ui
        LEFT JOIN images i ON ui.avatar_ID = i.image_ID
        WHERE ui.user_ID = ?`,
        [userId]
    );

    // If no user info found, return null
    if (rows.length === 0) {
        return null;
    }

    // Return the specific fields
    return {
        user_ID: rows[0].user_ID,
        name: rows[0].name,
        dob: rows[0].dob,
        gender: rows[0].gender,
        avatar_ID: rows[0].avatar_ID,
        avatar_path: rows[0].avatar_path
    };
};

exports.getEnrolledCourses = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            c.course_ID,
            c.instructor_ID,
            c.title,
            c.description,
            c.category,
            c.thumbnail_ID,
            c.price,
            c.duration,
            c.created_at,
            c.level,
            ce.enroll_date,
            i.image_path as thumbnail_path
         FROM course_enroll ce
         JOIN courses c ON ce.course_ID = c.course_ID
         LEFT JOIN images i ON c.thumbnail_ID = i.image_ID
         WHERE ce.student_ID = ?
         ORDER BY ce.enroll_date DESC`,
        [userId]
    );

    return rows.map(row => ({
        course_ID: row.course_ID,
        instructor_ID: row.instructor_ID,
        title: row.title,
        description: row.description,
        category: row.category,
        thumbnail_ID: row.thumbnail_ID,
        price: row.price,
        duration: row.duration,
        created_at: row.created_at,
        level: row.level,
        enroll_date: row.enroll_date,
        thumbnail_path: row.thumbnail_path
    }));
};

exports.getVotedThreads = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            t.thread_ID,
            t.author_ID,
            t.title,
            t.category,
            t.content,
            t.created_at,
            tv.vote_type
         FROM thread_votes tv
         JOIN threads t ON tv.thread_ID = t.thread_ID
         WHERE tv.voter_ID = ?`,
        [userId]
    );

    return rows.map(row => ({
        thread_ID: row.thread_ID,
        author_ID: row.author_ID,
        title: row.title,
        category: row.category,
        content: row.content,
        created_at: row.created_at,
        vote_type: row.vote_type
    }));
};

exports.getVotedAnswers = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            ta.answer_ID,
            ta.thread_ID,
            ta.author_ID,
            ta.content,
            ta.created_at,
            ta.accepted,
            tav.vote_type,
            t.title as thread_title
         FROM thread_answer_votes tav
         JOIN thread_answers ta ON tav.answer_ID = ta.answer_ID
         JOIN threads t ON ta.thread_ID = t.thread_ID
         WHERE tav.voter_ID = ?`,
        [userId]
    );

    return rows.map(row => ({
        answer_ID: row.answer_ID,
        thread_ID: row.thread_ID,
        author_ID: row.author_ID,
        content: row.content,
        created_at: row.created_at,
        accepted: row.accepted,
        vote_type: row.vote_type,
        thread_title: row.thread_title
    }));
};

exports.createUser = async (email, password, role) => {
    const [result] = await db.query(
        'INSERT INTO user_auth (email, password, role) VALUES (?, ?, ?)',
        [email, password, role]
    );

    return { id: result.insertId, email: email, role: role };
};