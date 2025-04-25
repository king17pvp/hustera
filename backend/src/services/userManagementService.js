const userManagementModel = require('../models/userManagementModel'); // Adjust path if needed

exports.getAllUsers = async () => {
  return await userManagementModel.getAllUsers();
};

exports.getUserCourses = async (userId) => {
  // Ensure userId is the numeric ID expected by the model
  if (isNaN(parseInt(userId))) {
      console.error("Service: Invalid userId passed to getUserCourses:", userId);
      return []; // Return empty array or throw error for invalid ID
  }
  return await userManagementModel.getUserCourses(parseInt(userId));
};

exports.getUserThreads = async (userId) => {
  // Ensure userId is the numeric ID expected by the model
  if (isNaN(parseInt(userId))) {
      console.error("Service: Invalid userId passed to getUserThreads:", userId);
      return []; // Return empty array or throw error for invalid ID
  }
  return await userManagementModel.getUserThreads(parseInt(userId));
};

// --- Delete/Remove Functions ---
// Pass numeric IDs directly to the model. Parsing happens in controller or here.

exports.deleteUser = async (userId) => {
    // Assuming userId received is numeric
    if (isNaN(parseInt(userId))) throw new Error("Invalid User ID");
    return await userManagementModel.deleteUser(parseInt(userId));
};

exports.removeUserCourse = async (userId, courseId) => {
    // Assuming IDs received are numeric
    if (isNaN(parseInt(userId)) || isNaN(parseInt(courseId))) throw new Error("Invalid User or Course ID");
    return await userManagementModel.removeUserCourse(parseInt(userId), parseInt(courseId));
};

exports.removeUserThread = async (userId, threadId) => {
    // Assuming IDs received are numeric
    if (isNaN(parseInt(userId)) || isNaN(parseInt(threadId))) throw new Error("Invalid User or Thread ID");
    return await userManagementModel.removeUserThread(parseInt(userId), parseInt(threadId));
};

exports.removeUserReply = async (userId, threadId, replyId) => {
    // Assuming IDs received are numeric
    if (isNaN(parseInt(userId)) || isNaN(parseInt(threadId)) || isNaN(parseInt(replyId))) throw new Error("Invalid User, Thread or Reply ID");
    return await userManagementModel.removeUserReply(parseInt(userId), parseInt(threadId), parseInt(replyId));
};
