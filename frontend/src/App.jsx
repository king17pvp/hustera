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

const sampleThreads = [
  {
    title: "Best Online Courses 2025",
    date: "2025-03-09T14:30:00",
    description: "Discover the top courses on Hustera. I'm looking for recommendations in web development and data science fields that offer certifications.",
    tags: ["Courses", "Recommendations", "Certifications"],
    category: "General",
    answers: 12,
    votes: 35,
    author: "JaneDoe"
  },
  {
    title: "How to Excel in Online Learning",
    date: "2025-02-20T09:15:00",
    description: "Tips and strategies to stay productive while learning online. What are your best approaches for managing time between multiple courses?",
    tags: ["Study Tips", "Productivity", "Time Management"],
    category: "Learning",
    answers: 24,
    votes: 47,
    author: "ProductivityPro"
  },
  {
    title: "Top 10 Programming Languages to Learn",
    date: "2025-01-15T18:22:00",
    description: "Explore the most in-demand programming languages this year. Is Python still dominating or should I focus on Rust and Go?",
    tags: ["Programming", "Career", "Tech Skills"],
    category: "Programming",
    answers: 18,
    votes: 63,
    author: "CodeMaster"
  },
  {
    title: "AI & Machine Learning: The Future of Tech",
    date: "2024-12-10T11:45:00",
    description: "How AI is revolutionizing industries and what you should learn. Lookin g for course recommendations to transition into AI from web development.",
    tags: ["AI", "Machine Learning", "Career Change"],
    category: "Technology",
    answers: 9,
    votes: 41,
    author: "TechFuturist"
  },
  {
    title: "Mastering Web Development in 2025",
    date: "2024-11-05T16:20:00",
    description: "A complete guide to becoming a full-stack web developer. What's the optimal learning path from beginner to employment ready?",
    tags: ["Web Dev", "Full Stack", "Career Path"],
    category: "Programming",
    answers: 31,
    votes: 52,
    author: "WebDevGuru"
  },
  {
    title: "The Importance of Data Science in Business",
    date: "2024-10-22T08:30:00",
    description: "Why every company needs data science and how to get started. Seeking advice on transitioning from analytics to data science roles.",
    tags: ["Data Science", "Business", "Career"],
    category: "Business",
    answers: 16,
    votes: 38,
    author: "DataDriven"
  }
];


const sampleStats = [
  { stat: "25K+", title: "Active Students" },
  { stat: "899", title: "Total Courses" },
  { stat: "158", title: "Instructors" },
  { stat: "100%", title: "Satisfaction Rate" },

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
                <Route path="/" element={<Homepage
                  testimonials={sampleTestimonials}
                  threads={sampleThreads}
                  stats={sampleStats} />} />
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