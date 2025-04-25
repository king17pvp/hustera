const forumModel = require('../models/forumManagementModel');

exports.getAllThreads = async () => {
  return forumModel.getAllThreadsWithDetails();
};

exports.deleteThread = async (threadId) => {
  return forumModel.deleteThread(threadId);
};

exports.deleteAnswer = async (answerId) => {
  return forumModel.deleteAnswer(answerId);
};
