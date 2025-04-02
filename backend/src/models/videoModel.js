const db = require('../config/db');

// Get all videos
exports.getAllVideos = async () => {
    const [rows] = await db.query('SELECT * FROM videos');
    return rows;
};

// Get video by ID
exports.getVideoById = async (videoID) => {
    const [rows] = await db.query('SELECT * FROM videos WHERE videoID = ?', [videoID]);
    return rows[0]; // Return the first video if exists
};

// Get videos by course ID
exports.getVideosByCourseId = async (courseId) => {
    const [rows] = await db.query('SELECT * FROM videos WHERE courseID = ?', [courseId]);
    return rows;
};

// Add a new video
exports.addVideo = async (courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration) => {
    const [result] = await db.query(
        'INSERT INTO videos (courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration]
    );
    
    return { 
        videoID: result.insertId, 
        courseID, 
        weekNumber, 
        videoTitle, 
        videoUrl, 
        transcript, 
        isLocked, 
        duration 
    };
};

// Update video
exports.updateVideo = async (videoID, videoTitle, videoUrl, transcript, isLocked, duration) => {
    const [result] = await db.query(
        'UPDATE videos SET videoTitle = ?, videoUrl = ?, transcript = ?, isLocked = ?, duration = ? WHERE videoID = ?', 
        [videoTitle, videoUrl, transcript, isLocked, duration, videoID]
    );
    
    return result.affectedRows > 0;
};

// Delete video
exports.deleteVideo = async (videoID) => {
    const [result] = await db.query('DELETE FROM videos WHERE videoID = ?', [videoID]);
    return result.affectedRows > 0;
};