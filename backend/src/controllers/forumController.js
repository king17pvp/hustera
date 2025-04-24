const forumService = require('../services/forumService');

exports.getForumOnClick = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const thread = await forumService.getForumOnClick({ threadId });
    // console.log(threadId);
    if (!thread) {
      return res.status(404).json({ success: false, message: 'Thread not found.' });
    }

    res.status(200).json({ success: true, thread });
  } catch (err) {
    console.error('Error fetching forum thread:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.postAnswer = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: 'Missing userId or content.' });
    }

    const result = await forumService.addAnswerToThread({ threadId, userId, content });

    res.status(201).json({
      message: 'Answer posted successfully!',
      answer_id: result.insertId,
    });
  } catch (err) {
    console.error('Error posting answer:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getForum = async (req, res) => {
  try {
    // const {category, searchQuery, sortBy, page} = req.query;
    const filters = {
      searchQuery: req.query.searchQuery || "",
      category: req.query.category || "",
      sortBy: req.query.sortBy || "",
      page: parseInt(req.query.page) || 1,
      tags: req.query.tags || ""
    };
    // console.log(filters);
    const {threads, totalPages} = await forumService.getForum({
      category: filters.category,
      searchQuery: filters.searchQuery,
      tags: filters.tags,
      sortBy: filters.sortBy,
      page: filters.page,
    });
    // console.log(threads, totalPages);

    res.status(200).json({ success: true, threads: threads, totalPages: totalPages});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getFilters = async (req, res) => {
  try {
    const filters = await forumService.getFilters();
    res.status(200).json({ success: true, ...filters });
  } catch (err) {
    console.error('Error in getFilters:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.handleVoteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { vote_type } = req.body;
  const userId = req.body?.user_ID || 1;


  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await forumService.voteAnswer(answerId, userId, vote_type);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.handleVoteThread = async (req, res) => {
  const { threadId } = req.params;
  const { vote_type } = req.body;
  const userId = req.body?.user_ID;
  // console.log("Thread ID", threadId);
  // console.log("Vote type", vote_type);
  // console.log("User Id", userId); 

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await forumService.voteThread(threadId, userId, vote_type);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.handleGetVoteAnswer = async (req, res) => {
  console.log("IT IS CALLING");
  const { answerId, userId } = req.params;
  // const userId = req.body?.user_ID;
  console.log("answer ID", answerId);
  // console.log("Vote type", vote_type);
  console.log("User Id", userId); 

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await forumService.getAnswerVote(answerId, userId);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
exports.handleGetVoteThread = async (req, res) => {
  const { threadId, userId } = req.params;
  // const userId = req.body?.user_ID;
  // console.log("Thread ID", threadId);
  // console.log("Vote type", vote_type);
  // console.log("User Id", userId); 
  
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await forumService.getThreadVote(threadId, userId);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
}
exports.postAnswer = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const { user_ID: userId, content} = req.body;
    const contents = content.content;
    const attachments = content.attachments;
    if (!userId || !contents) {
      return res.status(400).json({ message: 'Missing user ID or content.' });
    }

    const result = await forumService.addAnswerToThread({
      threadId,
      userId,
      contents,
      attachments,
    });

    res.status(201).json({
      success: true,
      message: 'Answer posted successfully!',
      answer_id: result.answer_ID,
    });
  } catch (err) {
    console.error('Controller Error - postAnswer:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.uploadForum = async (req, res) => {
  try {
    const authorId = req.body?.user_ID;  // Assumes user is attached to req (e.g., via middleware)
    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const threadData = req.body;
    // console.log("Thread data", threadData);
    const threadId = await forumService.uploadForum(threadData, authorId);
    // console.log(threadId);
    res.status(201).json({
      message: 'Thread uploaded successfully',
      threadId: threadId,
    });
  } catch (error) {
    console.error('Controller Error - uploadForum:', error);
    res.status(500).json({ message: 'Failed to upload thread' });
  }
};