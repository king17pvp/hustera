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
  discountedPrice: 49.0,
  tabs: {
    Overview: "LearnPress is one of the best WordPress LMS Plugins for creating and selling online courses.",
    Curriculum: "This course includes 20 lessons and 3 quizzes designed to help you master LearnPress.",
    Instructor: "John Doe is a WordPress expert with over 10 years of experience in LMS development.",
    FAQs: "Q: Is this course free? A: No, but it's available at a discounted price.",
    Reviews: "No comments yet! You be the first to comment."
  }
};
const CourseSingle= ({ course }) => {
  const [activeTab, setActiveTab] = useState("Curriculum");

  return (
    <>
        <Navbar currentState="Courses/"/>
        <Breadcrumb paths={["Homepage", "Courses", sampleCourse.title]} />
        <CourseSingleHeader course={sampleCourse}/>
        <div className="max-w-5xl mx-auto p-6">
        <CourseSingleCards course={sampleCourse} />

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Leave A Comment</h2>
          <form className="mt-4 space-y-4">
            {/* Name & Email in the same row */}
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name*" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email*" className="w-full border p-2 rounded" />
            </div>

            {/* Comment field below */}
            <textarea placeholder="Comment" className="w-full border p-2 rounded h-24"></textarea>

            {/* Save Info Checkbox */}
            <div>
              <input type="checkbox" id="save-info" className="mr-2" />
              <label htmlFor="save-info">Save my name, email for next time</label>
            </div>

            {/* Post Comment Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Post Comment</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseSingle;
