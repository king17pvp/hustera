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
      tags: thread.tags ? thread.tags.split(',') : [],
      score: thread.score,
      content: thread.content,
      answers: answers.map((ans) => ({
        answer_id: ans.answer_ID,
        author: ans.author,
        created_utc: new Date(ans.created_at).toISOString(),
        content: ans.content,
        score: ans.score,
        is_accepted: ans.accepted === 'true',  // nếu kiểu dữ liệu là chuỗi
        comments: [] // placeholder, nếu sau này muốn thêm comments
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

exports.voteAnswer = async (answerId, userId, voteType) => {
  if (!["upvote", "downvote"].includes(voteType)) {
    throw new Error("Invalid vote type");
  }

  const result = await forumModel.upsertAnswerVote(answerId, userId, voteType);
  return result;
};

exports.postAnswer = async (threadId, authorId, content) => {
  if (!content || content.trim() === "") {
    throw new Error("Answer content cannot be empty");
  }

  const answer = await forumModel.createAnswer(threadId, authorId, content);
  return answer;
};