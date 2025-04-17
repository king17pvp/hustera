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

const sampleCategories = [
  { iconPath: "icons/art_design.png", title: "Art & Design", courseCount: 38 },
  { iconPath: "icons/development.png", title: "Development", courseCount: 22 },
  { iconPath: "icons/communication.png", title: "Communication", courseCount: 48 },
  { iconPath: "icons/videography.png", title: "Videography", courseCount: 30 },
  { iconPath: "icons/photography.png", title: "Photography", courseCount: 15 },
  { iconPath: "icons/marketing.png", title: "Marketing", courseCount: 20 },
  { iconPath: "icons/contentwriting.png", title: "Content Writing", courseCount: 25 },
  { iconPath: "icons/finance.png", title: "Finance", courseCount: 10 },
  { iconPath: "icons/science.png", title: "Science", courseCount: 35 },
  { iconPath: "icons/network.png", title: "Network", courseCount: 18 },
];
const sampleThread = {
  "question_id": 987654,
  "title": "How do I merge two dictionaries in Python?",
  "author": "codeMaster77",
  "created_utc": "2025-03-23T12:15:00Z",
  "tags": ["python", "dictionary", "merge"],
  "score": 124,
  "content": "I'm trying to merge two Python dictionaries. I want to combine their keys and values into one. What is the most Pythonic way to do this in Python 3.9 or later?",
  "answers": [
    {
      "answer_id": 2001,
      "author": "devStack",
      "created_utc": "2025-03-23T13:00:00Z",
      "content": "In Python 3.9 and later, you can use the merge operator `|`:\n```python\ndict1 = {'a': 1, 'b': 2}\ndict2 = {'b': 3, 'c': 4}\nmerged = dict1 | dict2\n```\nThis will result in `{'a': 1, 'b': 3, 'c': 4}` — keys in the second dict will override those in the first.",
      "score": 182,
      "is_accepted": true,
      "comments": [
        {
          "comment_id": 1002,
          "author": "py_noob",
          "content": "That `|` operator is new to me, thanks!",
          "score": 9,
          "created_utc": "2025-03-23T13:15:00Z"
        }, 
        {
          "comment_id": 1001,
          "author": "py_fan",
          "content": "Are there any edge cases we should consider like overlapping keys?",
          "score": 12,
          "created_utc": "2025-03-23T12:30:00Z"
        }
      ]
    },
    {
      "answer_id": 2002,
      "author": "oldTimer",
      "created_utc": "2025-03-23T13:45:00Z",
      "content": "If you're using Python < 3.9, you can merge using:\n```python\nmerged = {**dict1, **dict2}\n```\nIt's clean and works well, though `dict2` values still overwrite `dict1` in case of key collisions.",
      "score": 97,
      "is_accepted": false,
      "comments": []
    }
  ]
};
const sampleCourses = [
  {
    courseId: 1,
    thumbnailUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg",
    category: "Programming",
    title: "Intro to JavaScript",
    author: "John Doe",
    duration: "3 Weeks",
    students: 150,
    price: 29.99,
    lessons: 20,
    quizzes: 3,
    description: "LearnPress is a comprehensive WordPress LMS Plugin...",
    image: "/learnpress-banner.png",
    level: "All Levels",
    originalPrice: 59.0,
    discountedPrice: 49.0
  },
  {
    thumbnailUrl: "https://beecrowd.com/wp-content/uploads/2024/04/2022-07-19-Melhores-cursos-de-Python.jpg",
    category: "Programming",
    title: "Python for Beginners",
    author: "Alice Johnson",
    duration: "5 Weeks",
    students: 200,
    price: 39.99,
  },
  {
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    category: "Web Development",
    title: "Mastering JavaScript ES6+",
    author: "Robert Brown",
    duration: "6 Weeks",
    students: 180,
    price: 44.99,
  },
  {
    thumbnailUrl: "https://toidicodedao.com/wp-content/uploads/2018/07/react.png?w=1200",
    category: "Frontend Development",
    title: "React from Scratch",
    author: "Emily Davis",
    duration: "4 Weeks",
    students: 250,
    price: 49.99,
  },
  {
    thumbnailUrl: "https://m.media-amazon.com/images/M/MV5BNzU5NzM4OTQxNV5BMl5BanBnXkFtZTgwOTQ5NjU0NzE@._V1_QL75_UX500_CR0,47,500,281_.jpg",
    category: "Backend Development",
    title: "Django for Web Apps",
    author: "Michael Wilson",
    duration: "6 Weeks",
    students: 120,
    price: 59.99,
  },
  {
    thumbnailUrl: "https://cnet.edu.vn/storage/blog/html-css/html.jpg",
    category: "Web Development",
    title: "HTML & CSS Mastery",
    author: "Sophia Martinez",
    duration: "3 Weeks",
    students: 300,
    price: 24.99,
  }  
];

const sampleTestimonials = [
  { text: "HUSTera has transformed my learning experience! The courses are well-structured, and the interactive exercises make complex topics easy to understand. The Q&A forum is super helpful, allowing me to clear doubts instantly. Highly recommend for any aspiring developer!", author: "Khue Nguyen", role: "Janitor" },
  { text: "I enrolled in the Python and AI courses, and I must say, they exceeded my expectations! The hands-on projects and real-world examples helped me grasp concepts better. Plus, the instructors are knowledgeable and always available for support. 10/10 experience!", author: "Hai Ta", role: "Developer" },
  { text: "As someone new to web development, HUSTera made learning HTML, CSS, and React so much fun. The step-by-step approach kept me engaged, and I could apply what I learned immediately. The best part? The platform’s community is incredibly supportive!", author: "Dang Nguyen", role: "Professional Sumo" },
  { text: "Balancing university studies with online courses can be tough, but HUSTera makes it easier. The flexible learning schedule and self-paced courses allow me to learn at my own speed. The quizzes and coding challenges keep me motivated. Love it!", author: "Khoat Than", role: "Robot" },
];

const sampleThreads = [
  {
    thumbnailUrl: "https://knowledge.hubspot.com/hubfs/freeonlinecourses-1.webp",
    title: "Best Online Courses 2025",
    date: "Mar 9, 2025",
    description: "Discover the top courses on Hustera.",
  },
  {
    thumbnailUrl: "https://imageio.forbes.com/specials-images/imageserve/5f8472dc6a02f19410b389be/Online-business-class--alternative-to-MBA/960x0.jpg?format=jpg&width=960",
    title: "How to Excel in Online Learning",
    date: "Feb 20, 2025",
    description: "Tips and strategies to stay productive while learning online.",
  },
  {
    thumbnailUrl: "https://extension.harvard.edu/wp-content/uploads/sites/8/2020/10/computer-programming.jpg",
    title: "Top 10 Programming Languages to Learn",
    date: "Jan 15, 2025",
    description: "Explore the most in-demand programming languages this year.",
  },
  {
    thumbnailUrl: "https://ant.ncc.asia/wp-content/uploads/2024/05/8212123_What-is-Artiificial-IntelligenceAI.webp",
    title: "AI & Machine Learning: The Future of Tech",
    date: "Dec 10, 2024",
    description: "How AI is revolutionizing industries and what you should learn.",
  },
  {
    thumbnailUrl: "https://caodang.fpt.edu.vn/wp-content/uploads/2-595.jpg",
    title: "Mastering Web Development in 2025",
    date: "Nov 5, 2024",
    description: "A complete guide to becoming a full-stack web developer.",
  },
  {
    thumbnailUrl: "https://cloud.z.com/vn/wp-content/uploads/2023/06/what-is-data-science.jpg",
    title: "The Importance of Data Science in Business",
    date: "Oct 22, 2024",
    description: "Why every company needs data science and how to get started.",
  },
];


const sampleStats = [
  { stat: "25K+", title: "Active Students" },
  { stat: "899", title: "Total Courses" },
  { stat: "158", title: "Instructors" },
  { stat: "100%", title: "Satisfaction Rate" },

];

const App = () => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = true;

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
                  courses={sampleCourses}
                  categories={sampleCategories}
                  testimonials={sampleTestimonials}
                  threads={sampleThreads}
                  stats={sampleStats} />} />
                <Route path="/courses" element={<CourseListing />} />
                <Route path="/courses/1" element={<CourseSingle courses={sampleCourses[0]} />} />
                {/* <Route path="/forum/1" element={<ForumSingle thread={sampleThread} />} /> */}
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
              </>
            )}

        </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;