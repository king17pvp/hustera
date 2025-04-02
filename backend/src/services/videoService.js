const db = require('../config/db');
const videoModel = require('../models/videoModel');

// Get all videos
exports.getAllVideos = async () => {
    return await videoModel.getAllVideos();
};

// Get video by ID
exports.getVideoById = async (videoID) => {
    return await videoModel.getVideoById(videoID);
};

// Create a new video
exports.createVideo = async (videoData) => {
    const { courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration } = videoData;
    return await videoModel.addVideo(courseID, weekNumber, videoTitle, videoUrl, transcript, isLocked, duration);
};

// Update video
exports.updateVideo = async (videoID, videoData) => {
    const { videoTitle, videoUrl, transcript, isLocked, duration } = videoData;
    const updated = await videoModel.updateVideo(videoID, videoTitle, videoUrl, transcript, isLocked, duration);
    
    if (updated) {
        return await videoModel.getVideoById(videoID);
    }
    return null;
};

// Delete video
exports.deleteVideo = async (videoID) => {
    return await videoModel.deleteVideo(videoID);
};