import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseSingleHeader from "../components/CourseSingleHeader";
import CourseSingleCards from "../components/CourseSingleCards";
import Breadcrumb from "../components/BreadCrumb";

const CourseSingle = () => {
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        const data = await response.json();
        
        if (data.success && data.course) {
          // Hàm xây dựng URL hình ảnh
          const getImageUrl = (url) => {
            if (!url) {
              return "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg";
            }
            
            // Nếu đã là URL đầy đủ, sử dụng nó
            if (url.startsWith('http')) {
              return url;
            }
            
            // Thêm tiền tố server
            return `http://localhost:5000/public/images/${url}`;
          };
          
          // Format the course data to match what the components expect
          const formattedCourse = {
            ...data.course,
            // Normalize image URL for display
            image: getImageUrl(data.course.thumbnailUrl),
            thumbnailUrl: getImageUrl(data.course.thumbnailUrl),
            discountedPrice: data.course.price,
            originalPrice: data.course.price * 1.2, // Just an example calculation
          };
          
          setCourse(formattedCourse);
        } else {
          setError("Course not found");
          navigate("/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar currentState="Courses/" />
        <p className="text-xl">Loading course information...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar currentState="Courses/" />
        <p className="text-xl text-red-500">{error || "Course not found"}</p>
      </div>
    );
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
        <Breadcrumb paths={["Homepage", "Courses", course.title]} />
        <CourseSingleHeader course={course} />

        <div className="flex flex-col items-center justify-center w-full p-6">
          {/* Course Tabs Section */}
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
