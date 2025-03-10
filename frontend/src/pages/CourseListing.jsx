import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCardHorizontal from "../components/CourseCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import CourseFilter from "../components/CourseFilter";
import SearchBar from "../components/SectionHeader";
import Pagination from "../components/Pagination";
import { useState } from "react";

const sampleCourses = [
  {
    thumbnailUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg",
    category: "Programming",
    title: "Intro to JavaScript",
    author: "John Doe",
    duration: "3 Weeks",
    students: 150,
    levels: "Intermediate",
    lessons: 200,
    price: 29.99,
  },
  {
    thumbnailUrl: "https://www.python.org/static/community_logos/python-logo.png",
    category: "Programming",
    title: "Master Python",
    author: "Jane Smith",
    duration: "4 Weeks",
    students: 200,
    levels: "Beginner",
    lessons: 180,
    price: 39.99,
  },
  {
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    category: "Programming",
    title: "Advanced JavaScript",
    author: "Alice Johnson",
    duration: "5 Weeks",
    students: 250,
    levels: "Advanced",
    lessons: 250,
    price: 49.99,
  },
  {
    thumbnailUrl: "https://www.courses.com/react.jpg",
    category: "Frontend",
    title: "React for Beginners And Intensive Minecraft Players",
    author: "John Doe",
    duration: "3 Weeks",
    students: 300,
    levels: "Intermediate",
    lessons: 190,
    price: 34.99,
  },
  {
    thumbnailUrl: "https://www.designcourse.com/uiux.jpg",
    category: "UI/UX",
    title: "UI/UX Design",
    author: "Jane Doe",
    duration: "6 Weeks",
    students: 120,
    levels: "Intermediate",
    lessons: 220,
    price: 59.99,
  },
  {
    thumbnailUrl: "https://www.designcourse.com/uiux.jpg",
    category: "UI/UX",
    title: "UI/UX Design",
    author: "Jane Doe",
    duration: "6 Weeks",
    students: 120,
    levels: "Intermediate",
    lessons: 220,
    price: 59.99,
  },
];

const categories = [
  { name: "Programming", count: 20 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
];

const instructors = [
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
];

const CourseListing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
  
    return (
      <>
        <Navbar />
        <Breadcrumb paths={["Homepage", "Courses"]} />
  
        {/* Center Everything */}
        <div className="flex justify-center w-full">
          <div className="flex justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">
            
            {/* Left Section: Search & Courses */}
            <div className="w-3/4">
              <SearchBar title="All Courses" />
  
              {/* Courses Grid (6x1) */}
              <div className="grid grid-rows-6 gap-7">
                {sampleCourses.slice(0, 6).map((course, index) => (
                  <CourseCardHorizontal key={index} {...course} />
                ))}
              </div>
  
              {/* Pagination Below Courses */}
              <div className="mt-6 flex justify-center">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
              </div>
            </div>
  
            {/* Right Section: Course Filters */}
            <div className="w-1/4">
              <CourseFilter categories={categories} instructors={instructors} />
            </div>
  
          </div>
        </div>
  
        <Footer />
      </>
    );
  };
  
export default CourseListing;
  
