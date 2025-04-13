const forumModel = require('../models/forumModel');

exports.getForumOnClick = async ({ threadId }) => {
  const thread = await forumModel.getThreadById(threadId);
  if (!thread) return null;

  const answers = await forumModel.getAnswersByThreadId(threadId);
  const answerIds = answers.map(a => a.answer_ID);
  const comments = await forumModel.getCommentsByAnswerIds(answerIds);
  const commentsByAnswer = comments.reduce((acc, c) => {
    const key = c.answer_ID;
    if (!acc[key]) acc[key] = [];
    acc[key].push({
      comment_id: c.comment_ID,
      author: c.author,
      content: c.content,
      score: 0, 
      created_utc: c.created_at.toISOString()
    });
    return acc;
  }, {});

  const formattedAnswers = answers.map(a => ({
    answer_id: a.answer_ID,
    author: a.author,
    content: a.content,
    is_accepted: a.accepted === 'true',
    score: a.score,
    created_utc: a.created_at.toISOString(),
    comments: commentsByAnswer[a.answer_ID] || []
  }));

  return {
    question_id: thread.thread_ID,
    title: thread.title,
    author: thread.author,
    created_utc: thread.created_at.toISOString(),
    tags: thread.tags ? thread.tags.split(',') : [],
    score: thread.score,
    content: thread.content,
    answers: formattedAnswers
  };
};

exports.getForum = async ({category, searchQuery, tags, sortBy, page}) => {
  try {
    
    const threads = await forumModel.getForum({
      category: category, 
      searchQuery: searchQuery, 
      tags: tags, 
      sortBy: sortBy, 
      page: page
    });
    return threads;
  } catch (err) {
    console.error('Error in forumService.getForum:', err);
    throw err;
  }
}

exports.addAnswerToThread = async ({ threadId, userId, content }) => {
  return await forumModel.insertAnswer({ threadId, userId, content });
};

exports.getFilters = async () => {
  return await forumModel.getFilters();
};