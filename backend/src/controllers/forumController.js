const forumService = require('../services/forumService');

exports.getForumOnClick = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const thread = await forumService.getForumOnClick({ threadId });
    console.log(threadId);
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
    console.log(filters);
    const threads = await forumService.getForum({
      category: filters.category,
      searchQuery: filters.searchQuery,
      tags: filters.tags,
      sortBy: filters.sortBy,
      page: filters.page,
    });

    res.status(200).json({ success: true, threads: threads });
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

exports.handlePostAnswer = async (req, res) => {
  const { threadId } = req.params;
  const { content } = req.body;
  const authorId = req.body?.user_ID; 

  if (!authorId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const answer = await forumService.postAnswer(threadId, authorId, content);
    res.status(201).json({ success: true, answer });
  } catch (err) {
    console.error("Post answer error:", err.message);
    res.status(400).json({ success: false, message: err.message });
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
    console.log(threadId);
    res.status(201).json({
      message: 'Thread uploaded successfully',
      threadId: threadId,
    });
  } catch (error) {
    console.error('Controller Error - uploadForum:', error);
    res.status(500).json({ message: 'Failed to upload thread' });
  }
};