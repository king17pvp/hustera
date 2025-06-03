import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  enrolledCourses: [],
  votedThreads: [],
  votedAnswers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Optionally set these if returned from backend
      state.enrolledCourses = action.payload.enrolled_courses || [];
      state.votedThreads = action.payload.voted_threads || [];
      state.votedAnswers = action.payload.voted_answers || [];
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.enrolledCourses = [];
      state.votedThreads = [];
      state.votedAnswers = [];
    },
    updateUserInfo: (state, action) => {
      if (state.user && state.user.user_info) {
        state.user.user_info = {
          ...state.user.user_info,
          ...action.payload
        };
      }
    },
    enrollCourse: (state, action) => {
      // action.payload: course_ID
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
      }
    },
    voteThread: (state, action) => {
      // action.payload: { thread_ID, vote_type }
      const idx = state.votedThreads.findIndex(
        (t) => t.thread_ID === action.payload.thread_ID
      );
      if (action.payload.vote_type === null) {
        // Remove vote if vote_type is null
        if (idx !== -1) {
          state.votedThreads.splice(idx, 1);
        }
      } else if (idx !== -1) {
        state.votedThreads[idx].vote_type = action.payload.vote_type;
      } else {
        state.votedThreads.push(action.payload);
      }
    },
    voteAnswer: (state, action) => {
      // action.payload: { answer_ID, vote_type }
      const idx = state.votedAnswers.findIndex(
        (a) => a.answer_ID === action.payload.answer_ID
      );
      if (action.payload.vote_type === null) {
        // Remove vote if vote_type is null
        if (idx !== -1) {
          state.votedAnswers.splice(idx, 1);
        }
      } else if (idx !== -1) {
        state.votedAnswers[idx].vote_type = action.payload.vote_type;
      } else {
        state.votedAnswers.push(action.payload);
      }
    },
  },
});

export const {
  login,
  logout,
  updateUserInfo,
  enrollCourse,
  voteThread,
  voteAnswer
} = authSlice.actions;
export default authSlice.reducer;