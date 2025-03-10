import React from "react";
import Homepage from "./pages/Homepage";
import CourseListing from "./pages/CourseListing"

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

const sampleCourses = [
  {
    thumbnailUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg",
    category: "Programming",
    title: "Intro to JavaScript",
    author: "John Doe",
    duration: "3 Weeks",
    students: 150,
    price: 29.99,
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
  return (
    <CourseListing />
  );
};

export default App;