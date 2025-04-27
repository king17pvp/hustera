const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.login = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    const userInfo = await userModel.getUserInfo(user.user_ID);
    const enrolledCourses = await userModel.getEnrolledCourses(user.user_ID);
    const votedThreads = await userModel.getVotedThreads(user.user_ID);
    const votedAnswers = await userModel.getVotedAnswers(user.user_ID);
    return {id: user.user_ID, email: user.email, role: user.role, user_info: userInfo, enrolled_courses: enrolledCourses, voted_threads: votedThreads, voted_answers: votedAnswers};
}