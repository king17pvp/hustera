const userManagementService = require('../services/userManagementService'); // Adjust path if needed

exports.getAllUsers = async (req, res) => {
  try {
    const basicUsers = await userManagementService.getAllUsers();

    const usersWithDetails = await Promise.all(basicUsers.map(async (user) => {
        // Pass the correct numeric user.user_ID to the service functions
        const enrolledCourses = await userManagementService.getUserCourses(user.user_ID);
        const threads = await userManagementService.getUserThreads(user.user_ID);

        return {
            ...user,
            enrolledCourses: enrolledCourses,
            threads: threads
        };
    }));

    res.status(200).json({ success: true, users: usersWithDetails });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.body; // Assuming numeric ID in body
  try {
    if (isNaN(parseInt(user_id))) throw new Error("Invalid User ID format in request");
    await userManagementService.deleteUser(parseInt(user_id));
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

exports.removeUserCourse = async (req, res) => {
  const { user_id, course_id } = req.body; // Assuming numeric IDs in body
  try {
     if (isNaN(parseInt(user_id)) || isNaN(parseInt(course_id))) throw new Error("Invalid ID format in request");
    await userManagementService.removeUserCourse(parseInt(user_id), parseInt(course_id));
    res.status(200).json({ success: true, message: 'Course removed from user successfully' });
  } catch (error) {
    console.error('Error removing course from user:', error);
    res.status(500).json({ success: false, message: 'Failed to remove course from user' });
  }
};

exports.removeUserThread = async (req, res) => {
  const { user_id, thread_id } = req.body; // Assuming numeric IDs in body
  try {
     if (isNaN(parseInt(user_id)) || isNaN(parseInt(thread_id))) throw new Error("Invalid ID format in request");
    await userManagementService.removeUserThread(parseInt(user_id), parseInt(thread_id));
    res.status(200).json({ success: true, message: 'Thread removed successfully' });
  } catch (error) {
    console.error('Error removing thread:', error);
    res.status(500).json({ success: false, message: 'Failed to remove thread' });
  }
};

exports.removeUserReply = async (req, res) => {
  const { user_id, thread_id, reply_id } = req.body; // Assuming numeric IDs in body
  try {
     if (isNaN(parseInt(user_id)) || isNaN(parseInt(thread_id)) || isNaN(parseInt(reply_id))) throw new Error("Invalid ID format in request");
    await userManagementService.removeUserReply(parseInt(user_id), parseInt(thread_id), parseInt(reply_id));
    res.status(200).json({ success: true, message: 'Reply removed successfully' });
  } catch (error) {
    console.error('Error removing reply:', error);
    res.status(500).json({ success: false, message: 'Failed to remove reply' });
  }
};
