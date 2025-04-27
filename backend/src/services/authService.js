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
    const userInfo = await userModel.getUserInfo(2);
    const enrolledCourses = await userModel.getEnrolledCourses(7);
    const votedThreads = await userModel.getVotedThreads(2);
    const votedAnswers = await userModel.getVotedAnswers(9);
    return {id: user.user_ID, email: user.email, role: user.role, user_info: userInfo, enrolled_courses: enrolledCourses, voted_threads: votedThreads, voted_answers: votedAnswers};
}