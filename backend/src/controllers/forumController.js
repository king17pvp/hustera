const forumService = require('../services/forumService');

exports.getForumOnClick = async (req, res) => {
  try {
    const threadId = req.params.threadId;
    const data = await forumService.getForumOnClick({ threadId });

    if (!data) {
      return res.status(404).json({ message: 'Thread not found.' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching forum thread:', err);
    res.status(500).json({ message: 'Internal server error.' });
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
    const {category, searchQuery, sortBy, page} = req.query;
    const filters = {
      category: req.query.category || "",
      sortBy: req.query.sortBy || "",
      page: parseInt(req.query.page) || 1,
      tags: req.query.tags || ""
    };
    console.log(filters);
    const threads = await forumService.getForum({
      category,
      searchQuery,
      sortBy,
      page: parseInt(page) || 1,
    });

    res.status(200).json({ success: true, ...threads });
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
