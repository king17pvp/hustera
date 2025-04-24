const forumModel = require('../models/forumModel');

exports.getForumOnClick = async ({ threadId }) => {
  try {
    const thread = await forumModel.getThreadById(threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    const answers = await forumModel.getAnswersByThreadId(threadId);
    const formattedThread = {
      question_id: thread.thread_ID,
      title: thread.title,
      author: thread.author,
      created_utc: new Date(thread.created_at).toISOString(),
      tags: thread.tags ? thread.tags : [],
      score: thread.score,
      content: thread.content,
      attachments: Array.isArray(thread.image_urls)
      ? thread.image_urls
      : typeof thread.image_urls === 'string'
        ? [thread.image_urls]
        : [],
      answers: answers.map((ans) => ({
        answer_id: ans.answer_ID,
        author: ans.author,
        created_utc: new Date(ans.created_at).toISOString(),
        content: ans.content,
        score: ans.score,
        is_accepted: ans.accepted === 'true',  // nếu kiểu dữ liệu là chuỗi
        comments: [], // placeholder, nếu sau này muốn thêm comments
        attachments: Array.isArray(ans.image_urls)
        ? ans.image_urls
        : typeof ans.image_urls === 'string'
          ? [ans.image_urls]
          : []
      }))
    };
    return formattedThread;
  } catch (error) {
    console.error('Error in forumService.getForumOnClick:', error.message);
    throw error;
  }
};

exports.getForum = async ({category, searchQuery, tags, sortBy, page}) => {
  try {
    // console.log("Category from forum service", category);
    const threads = await forumModel.getForum({
      category: category, 
      searchQuery: searchQuery, 
      tags: tags, 
      sortBy: sortBy, 
      page: page
    });
    const totalPages = await forumModel.getTotalPages({
      category: category, 
      searchQuery: searchQuery, 
      tags: tags, 
    })
    return {threads, totalPages};
  } catch (err) {
    console.error('Error in forumService.getForum:', err);
    throw err;
  }
}

exports.addAnswerToThread = async ({ threadId, userId, contents, attachments }) => {
  return await forumModel.createAnswer(threadId, userId, contents, attachments);
};

exports.getFilters = async () => {
  return await forumModel.getFilters();
};

exports.voteAnswer = async (answerId, userId, voteType) => {
  if (!["upvote", "downvote"].includes(voteType)) {
    throw new Error("Invalid vote type");
  }

  const result = await forumModel.upsertAnswerVote(answerId, userId, voteType);
  return result;
};

exports.voteThread = async (threadId, userId, voteType) => {
  if (!["upvote", "downvote"].includes(voteType)) {
    throw new Error("Invalid vote type");
  }

  const result = await forumModel.upsertThreadVote(threadId, userId, voteType);
  return result;
};

exports.getThreadVote = async (threadId, userId) => {
  const result = await forumModel.getThreadVote(threadId, userId);
  return result;
}


exports.getAnswerVote = async (answerId, userId) => {
  const result = await forumModel.getAnswerVote(answerId, userId);
  console.log("ALO ALO", result);
  return result;
}

exports.postAnswer = async (threadId, authorId, content) => {
  if (!content || content.trim() === "") {
    throw new Error("Answer content cannot be empty");
  }

  const answer = await forumModel.createAnswer(threadId, authorId, content);
  return answer;
};

exports.uploadForum = async (threadData, authorId) => {
  try {
    const threadId = await forumModel.uploadForum(threadData, authorId);
    return threadId;
  } catch (error) {
    console.error('Service Error - uploadForum:', error);
    throw error;
  }
};