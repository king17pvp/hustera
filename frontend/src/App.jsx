import React from "react";
import Homepage from "./pages/Homepage";
import CourseListing from "./pages/CourseListing"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForumListing from "./pages/ForumListing.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FAQs from "./pages/FAQs";
import UserSettings from "./pages/UserSettings";
import CourseSingle from "./pages/CourseSingle.jsx";
import { useSelector } from 'react-redux';
import ForumSingle from "./pages/ForumSingle.jsx";
import CourseUpload from "./pages/CourseUpload.jsx";
import ForumUpload from "./pages/ForumUpload.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import CourseManagement from "./pages/CourseManagement.jsx";
import ForumManagement from "./pages/ForumManagement.jsx";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated ?
            (
              <>
                <Route path='*' element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </>
            )
            :
            (
              <>
                <Route path="/" element={<Homepage/>} />
                <Route path="/courses" element={<CourseListing />} />
                <Route path="/courses/:courseID" element={<CourseSingle/>}/>
                <Route path="/forum" element={<ForumListing />} />
                <Route path="/forum/:threadId" element={<ForumSingle/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/courses/upload" element={<CourseUpload />} />
                <Route path="/forum/upload" element={<ForumUpload />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
                <Route path="/admin/course-management" element={<CourseManagement />} />
                <Route path="/admin/forum-management" element={<ForumManagement />} />
              </>
            )}

        </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;