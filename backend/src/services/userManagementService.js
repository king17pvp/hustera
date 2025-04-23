const userManagementModel = require('../models/userManagementModel');

// Get all users with their detailed information
exports.getAllUsers = async () => {
  // Get basic user information
  const users = await userManagementModel.getAllUsers();
  
  // For each user, fetch related information
  const usersWithDetails = await Promise.all(users.map(async (user) => {
    // Get enrolled courses with progress and reviews
    const enrolledCourses = await userManagementModel.getUserCourses(user.user_id);
    
    // Get threads created by the user
    const threads = await userManagementModel.getUserThreads(user.user_id);
    
    // For each thread, get replies
    for (const thread of threads) {
      thread.replies = await userManagementModel.getThreadReplies(thread.thread_id);
    }
    
    return {
      user_id: `U${user.user_ID.toString().padStart(3, '0')}`, // Format as U001, U002, etc.
      name: user.name,
      email: user.email,
      role: user.role,
      dob: user.dob ? user.dob.toISOString().split('T')[0] : null,
      gender: user.gender,
      createdAt: user.created_at.toISOString(),
      enrolledCourses,
      threads
    };
  }));
  
  return usersWithDetails;
};

// Delete a user
exports.deleteUser = async (user_id) => {
  // Extract numeric ID from format like U001
  const numericId = parseInt(user_id.substring(1));
  return await userManagementModel.deleteUser(numericId);
};

// Remove a course from user's enrolled courses
exports.removeUserCourse = async (user_id, course_id) => {
  const numericUserId = parseInt(user_id.substring(1));
  const numericCourseId = parseInt(course_id.substring(1));
  return await userManagementModel.removeUserCourse(numericUserId, numericCourseId);
};

// Remove a thread created by a user
exports.removeUserThread = async (user_id, thread_id) => {
  const numericUserId = parseInt(user_id.substring(1));
  const numericThreadId = parseInt(thread_id.substring(1));
  return await userManagementModel.removeUserThread(numericUserId, numericThreadId);
};

// Remove a reply from a thread
exports.removeUserReply = async (user_id, thread_id, reply_id) => {
  const numericUserId = parseInt(user_id.substring(1));
  const numericThreadId = parseInt(thread_id.substring(1));
  const numericReplyId = parseInt(reply_id.substring(1));
  return await userManagementModel.removeUserReply(numericUserId, numericThreadId, numericReplyId);
};