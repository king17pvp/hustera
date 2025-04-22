import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseSingleHeader from "../components/CourseSingleHeader";
import CourseSingleCards from "../components/CourseSingleCards";
import Breadcrumb from "../components/BreadCrumb";

const sampleCourse = {
  course_id: 1,
  title: "The Ultimate Guide To The Best WordPress LMS Plugin",
  description: "LearnPress is a comprehensive WordPress LMS Plugin for creating and selling online courses. LearnPress is one of the best WordPress LMS Plugins for creating and selling online courses.",
  category: "Technology",
  thumbnail_id: 25, // Change this to base64 encoded string later when backend is ready
  price: 49.99,
  duration: 2, // in weeks
  level: "Intermediate",
  
  // Tags from course_tags join with tags table
  tags: ["WordPress", "LMS" ,"Plugin"],
  
  // Reviews from course_reviews table
  reviews: [
    {
      reviewer_name: "John Doeny",
      reviewer_avatar_id: 401, // Change this to base64 encoded string later when backend is ready
      rating: 4,
      rated_at: "2022-10-03 14:30:00",
      review: "This course was incredibly helpful!"
    },
    {
      reviewer_name: "Jane Smith",
      reviewer_avatar_id: 402, // Change this to base64 encoded string later when backend is ready
      rating: 3,
      rated_at: "2022-09-29 09:15:00",
      review: "Loved the hands-on approach."
    },
    {
      reviewer_name: "Alice Johnson",
      reviewer_avatar_id: 403, // Change this to base64 encoded string later when backend is ready
      rating: 5,
      rated_at: "2022-09-15 16:45:00",
      review: "Perfect for beginners!"
    }
  ],
  
  // Weeks and videos structure
  weeks: [
    {
      title: "Lessons With Video Content",
      videos: [
        { 
          video_id: 23,
          title: "Introduction to LearnPress", 
          url: "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran"
        },
        { 
          video_id: 12,
          title: "Installing LearnPress", 
          url: "https://www.youtube.com/embed/2jK1R9bXTVc"
        },
        { 
          video_id: 21,
          title: "First Course Setup", 
          url: "https://www.youtube.com/embed/3aQ15eHgUJ8"
        }
      ]
    },
    {
      title: "Advanced LearnPress",
      videos: [
        { 
          video_id: 1,
          title: "Adding Custom Quizzes", 
          url: "https://www.youtube.com/embed/4bD1Rxh3K9s"
        },
        { 
          video_id: 145,
          title: "Integrating Payment Methods", 
          url: "https://www.youtube.com/embed/5n3L6Rxx9fM"
        }
      ]
    }
  ],
  
  // Instructor info
  instructor: {
    user_id: 101,
    email: "john.doe@example.com",
    name: "John Doe",
    num_courses: 5,
    num_students: 200,
    avatar_id: 150 // Change this to base64 encoded string later when backend is ready
  },
  
  // Enrollment count
  enrollment_count: 156
};

const CourseSingle = ({ course = sampleCourse }) => {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses/" />

      <div className="flex-1">
        <Breadcrumb paths={["Homepage", "Courses", course.title]} />
        <CourseSingleHeader course={course} />

        <div className="flex flex-col items-center justify-center w-full p-6">
          {/* Course Tabs Section */}
          <div className="w-[1680px] items-center justify-between">
            <CourseSingleCards 
              course={course} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseSingle;