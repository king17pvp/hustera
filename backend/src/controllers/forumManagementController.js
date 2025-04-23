const forumService = require('../services/forumManagementService');

exports.getAllThreads = async (req, res) => {
  try {
    const threads = await forumService.getAllThreads();
    res.status(200).json({ success: true, threads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch threads" });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const { thread_id } = req.body;
    await forumService.deleteThread(thread_id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete thread" });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const { answer_id } = req.body;
    await forumService.deleteAnswer(answer_id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete answer" });
  }
};
