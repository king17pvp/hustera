import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseSingleHeader from "../components/CourseSingleHeader";
import CourseSingleCards from "../components/CourseSingleCards";
import Breadcrumb from "../components/BreadCrumb";

const sampleCourse = {
  title: "The Ultimate Guide To The Best WordPress LMS Plugin",
  category: "Technology",
  author: "John Doe",
  duration: "2 Weeks",
  students: 156,
  level: "All Levels",
  lessons: 20,
  quizzes: 3,
  description: "LearnPress is a comprehensive WordPress LMS Plugin...",
  image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg",
  originalPrice: 59.0,
  discountedPrice: 49.99,
  tabs: {
    Overview: "LearnPress is one of the best WordPress LMS Plugins for creating and selling online courses.",
    Curriculum: [
      {
        title: "Lessons With Video Content",
        videos: [
          { title: "Introduction to LearnPress", duration: "12:30", url: "https://www.youtube.com/embed/1jF5l2hMkWA", isLocked: false },
          { title: "Installing LearnPress", duration: "10:05", url: "https://www.youtube.com/embed/2jK1R9bXTVc", isLocked: false },
          { title: "First Course Setup", duration: "2:25", url: "https://www.youtube.com/embed/3aQ15eHgUJ8", isLocked: true }
        ]
      },
      {
        title: "Advanced LearnPress",
        videos: [
          { title: "Adding Custom Quizzes", duration: "8:45", url: "https://www.youtube.com/embed/4bD1Rxh3K9s", isLocked: false },
          { title: "Integrating Payment Methods", duration: "6:30", url: "https://www.youtube.com/embed/5n3L6Rxx9fM", isLocked: true }
        ]
      }
    ],
    Instructor: {
      name: "ThimPress",
      bio: "LearnPress is a comprehensive WordPress LMS Plugin for WordPress.",
      totalStudents: 156,
      totalCourses: 20,
      iconUrl: "",
      socials: {
        facebook: "https://facebook.com/ThimPress",
        pinterest: "https://pinterest.com/ThimPress",
        twitter: "https://twitter.com/ThimPress",
        instagram: "https://instagram.com/ThimPress",
        youtube: "https://youtube.com/ThimPress"
      }
    },
    Reviews: [
      {
        user: "Laura Hipster",
        date: "October 03, 2022",
        comment: "This course was incredibly helpful!",
        userImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        rating: 4
      },
      {
        user: "Mark Johnson",
        date: "September 29, 2022",
        comment: "Loved the hands-on approach.",
        userImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        rating: 3
      },
      {
        user: "Sophie Lee",
        date: "September 15, 2022",
        comment: "Perfect for beginners!",
        userImage: "",
        rating: 5
      }
    ]
  }
};

const CourseSingle = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Curriculum");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses/" />

      <div className="flex-1">
        <Breadcrumb paths={["Homepage", "Courses", sampleCourse.title]} />
        <CourseSingleHeader course={sampleCourse} />

        <div className="flex flex-col items-center justify-center w-full p-6">
          {/* Course Tabs Section */}
          <div className="w-[1680px] items-center justify-between">
            <CourseSingleCards course={sampleCourse} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseSingle;
