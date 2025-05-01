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

const sampleTestimonials = [
  { text: "HUSTera has transformed my learning experience! The courses are well-structured, and the interactive exercises make complex topics easy to understand. The Q&A forum is super helpful, allowing me to clear doubts instantly. Highly recommend for any aspiring developer!", author: "Khue Nguyen", role: "Janitor" },
  { text: "I enrolled in the Python and AI courses, and I must say, they exceeded my expectations! The hands-on projects and real-world examples helped me grasp concepts better. Plus, the instructors are knowledgeable and always available for support. 10/10 experience!", author: "Hai Ta", role: "Developer" },
  { text: "As someone new to web development, HUSTera made learning HTML, CSS, and React so much fun. The step-by-step approach kept me engaged, and I could apply what I learned immediately. The best part? The platform’s community is incredibly supportive!", author: "Dang Nguyen", role: "Professional Sumo" },
  { text: "Balancing university studies with online courses can be tough, but HUSTera makes it easier. The flexible learning schedule and self-paced courses allow me to learn at my own speed. The quizzes and coding challenges keep me motivated. Love it!", author: "Khoat Than", role: "Robot" },
];

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const isAuthenticated = true;

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
                {/* <Route path="/courses/1" element={<CourseSingle courses={sampleCourses[0]} />} /> */}
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