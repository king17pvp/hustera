const userManagementService = require('../services/userManagementService');

// Get all users with their details for admin panel
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userManagementService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { user_id } = req.body;
  
  try {
    await userManagementService.deleteUser(user_id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

// Remove a course from user's enrolled courses
exports.removeUserCourse = async (req, res) => {
  const { user_id, course_id } = req.body;
  
  try {
    await userManagementService.removeUserCourse(user_id, course_id);
    res.status(200).json({ success: true, message: 'Course removed from user successfully' });
  } catch (error) {
    console.error('Error removing course from user:', error);
    res.status(500).json({ success: false, message: 'Failed to remove course from user' });
  }
};

// Remove a thread created by a user
exports.removeUserThread = async (req, res) => {
  const { user_id, thread_id } = req.body;
  
  try {
    await userManagementService.removeUserThread(user_id, thread_id);
    res.status(200).json({ success: true, message: 'Thread removed successfully' });
  } catch (error) {
    console.error('Error removing thread:', error);
    res.status(500).json({ success: false, message: 'Failed to remove thread' });
  }
};

// Remove a reply from a thread
exports.removeUserReply = async (req, res) => {
  const { user_id, thread_id, reply_id } = req.body;
  
  try {
    await userManagementService.removeUserReply(user_id, thread_id, reply_id);
    res.status(200).json({ success: true, message: 'Reply removed successfully' });
  } catch (error) {
    console.error('Error removing reply:', error);
    res.status(500).json({ success: false, message: 'Failed to remove reply' });
  }
};