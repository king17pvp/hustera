import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseSingleHeader from "../components/CourseSingleHeader";
import CourseSingleCards from "../components/CourseSingleCards";
import Breadcrumb from "../components/BreadCrumb";
import { useParams } from "react-router-dom";

const CourseSingle = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState(null); // course data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/courses/${courseID}`);
        console.log("Course data:", response.data);
        setCourse(response.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseID]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading course...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Course not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses/" />

      <div className="flex-1">
        <Breadcrumb paths={["Homepage", "Courses", course.title]} />
        <CourseSingleHeader course={course} />

        <div className="flex flex-col items-center justify-center w-full p-6">
          <div className="w-[1680px] items-center justify-between">
            <CourseSingleCards course={course} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default CourseSingle;