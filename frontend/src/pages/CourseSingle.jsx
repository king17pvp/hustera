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
    Curriculum: "This course includes 20 lessons and 3 quizzes designed to help you master LearnPress.",
    Instructor: "John Doe is a WordPress expert with over 10 years of experience in LMS development.",
    Reviews: "No comments yet! You be the first to comment."
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
