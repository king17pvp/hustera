import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import CoursesCard from "../components/CoursesCard";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Banner2 from "../components/Banner2";
import TestimonialCard from "../components/TestimonialCard";
import ForumCard from "../components/ForumCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const testimonials = [
    { text: "HUSTera has transformed my learning experience! The courses are well-structured, and the interactive exercises make complex topics easy to understand. The Q&A forum is super helpful, allowing me to clear doubts instantly. Highly recommend for any aspiring developer!", author: "Khue Nguyen", role: "Janitor" },
    { text: "I enrolled in the Python and AI courses, and I must say, they exceeded my expectations! The hands-on projects and real-world examples helped me grasp concepts better. Plus, the instructors are knowledgeable and always available for support. 10/10 experience!", author: "Hai Ta", role: "Developer" },
    { text: "As someone new to web development, HUSTera made learning HTML, CSS, and React so much fun. The step-by-step approach kept me engaged, and I could apply what I learned immediately. The best part? The platform’s community is incredibly supportive!", author: "Dang Nguyen", role: "Professional Sumo" },
    { text: "Balancing university studies with online courses can be tough, but HUSTera makes it easier. The flexible learning schedule and self-paced courses allow me to learn at my own speed. The quizzes and coding challenges keep me motivated. Love it!", author: "Khoat Than", role: "Robot" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/homepage/categories');
        console.log('Categories response:', response);

        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/homepage/courses');
        console.log('Courses response:', response);
  
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/homepage/threads');
        console.log('Threads response:', response);
  
        if (response.data.success) {
          setThreads(response.data.data);
        } else {
          setError('Failed to fetch Threads');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
        console.error('Error fetching Threads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);

  const navigate = useNavigate();
  const handleAllCoursesClick = () => {
    navigate("/courses");
  }
  const handleAllThreadsClick = () => {
    navigate("/forum");
  }

  return (
    <>
      <Navbar currentState="Home" />
      <HeroSection />

      {/* Categories Section */}
      <div className="max-w-[1780px] mx-auto px-10 mt-25">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 p-1">
          <div>
            <h2 className="text-4xl font-avant-medium font-bold text-black mb-3">Top Categories</h2>
            <p className="text-gray-500 font-avant-medium text-xl">Explore our Popular Categories</p>
          </div>
        </div>

        {/* Categories Grid (2 rows, 5 columns) */}
        <div className="grid grid-cols-5 grid-rows-2 gap-5 h-[660px]">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              iconPath={category.iconPath}
              title={category.title}
              courseCount={category.courseCount}
            />
          ))}
        </div>
      </div>


      <div className="max-w-[1780px] mx-auto px-10 mt-25 mb-20">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 p-1">
          <div>
            <h2 className="text-4xl font-avant-medium font-bold text-black mb-3">Featured Courses</h2>
            <p className="text-gray-500 font-avant-medium text-xl">Explore our Popular Courses</p>
          </div>
          <button onClick={handleAllCoursesClick} className="px-6 py-2 border-3 border-black rounded-full text-black text-xl font-avant-medium hover:bg-gray-100 transition cursor-pointer">
            All Courses
          </button>
        </div>
        {/* Courses Grid (2 rows, 3 columns) */}
        <div className="grid grid-cols-3 grid-rows-2 gap-7">
          {courses.map((course, index) => (
            <CoursesCard
              key={index}
              course={course}
            />
          ))}
        </div>
      </div>

      <Banner />

      <div className="max-w-[1780px] mx-auto px-10 mt-20 mb-20">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 p-1">
          <div>
            <h2 className="text-4xl font-avant-medium font-bold text-black mb-3">Hottest Topics</h2>
            <p className="text-gray-500 font-avant-medium text-xl">Find out what is currently being discussed</p>
          </div>
          <button onClick={handleAllThreadsClick} className="px-6 py-2 border-3 border-black rounded-full text-black text-xl font-avant-medium hover:bg-gray-100 transition cursor-pointer">
            All Threads
          </button>
        </div>
        {/* Articles Grid (1 row, 3 columns) */}
        <div className="grid grid-cols-3 grid-rows-2 gap-7 mt-10">
          {threads.map((thread, index) => (
            <ForumCard
              key={index}
              thread={thread}
            />
          ))}
        </div>
      </div>

      <Banner2 />

      <div className="max-w-[1780px] mx-auto px-10 mt-20 mb-20">
        {/* Header Section */}
        <div className="flex justify-center items-center text-center mb-6 p-1">
          <div>
            <h2 className="text-4xl font-avant-medium font-bold text-black mb-3">Student Feedbacks</h2>
            <p className="text-gray-500 text-xl">What students say about HUSTera E-Learning Platform</p>
          </div>
        </div>
        {/* Testimonials Grid (1 row, 4 columns) */}
        <div className="grid grid-cols-4 grid-rows-1 gap-6 mt-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
