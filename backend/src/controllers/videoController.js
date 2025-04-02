const videoService = require('../services/videoService');

// Get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).json({ success: true, videos });
    } catch (err) {
        console.error('Error getting videos:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get video by ID
exports.getVideoById = async (req, res) => {
    try {
        const videoID = req.params.videoID;
        const video = await videoService.getVideoById(videoID);
        
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        res.status(200).json({ success: true, video });
    } catch (err) {
        console.error('Error getting video by ID:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create new video
exports.createVideo = async (req, res) => {
    try {
        const newVideo = await videoService.createVideo(req.body);
        res.status(201).json({ success: true, video: newVideo });
    } catch (err) {
        console.error('Error creating video:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update video
exports.updateVideo = async (req, res) => {
    try {
        const videoID = req.params.videoID;
        const updatedVideo = await videoService.updateVideo(videoID, req.body);
        
        if (!updatedVideo) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }
        
        res.status(200).json({ success: true, video: updatedVideo });
    } catch (err) {
        console.error('Error updating video:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete video
exports.deleteVideo = async (req, res) => {
    try {
        const videoID = req.params.videoID;
        const isDeleted = await videoService.deleteVideo(videoID);
        
        if (!isDeleted) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }
        
        res.status(200).json({ success: true, message: 'Video deleted successfully' });
    } catch (err) {
        console.error('Error deleting video:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};