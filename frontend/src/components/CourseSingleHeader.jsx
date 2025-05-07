import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import qrcode from "../assets/qrcode.png"; // Placeholder for QR code image
import axios from "axios";
import { enrollCourse } from "../redux/features/authSlice";

const CourseSingleHeader = ({ course }) => {
  const { user, enrolledCourses } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("User from Redux:", enrolledCourses);
  const [showQRModal, setShowQRModal] = useState(false);
  const isEnrolled = enrolledCourses.includes(course.course_id) || false;
  console.log("ALO ALO", course);

  // Calculate total number of videos across all weeks
  const totalVideos = course.weeks.reduce((total, week) => {
    return total + week.videos.length;
  }, 0);

  const isFree = course.price === "0.00";

  const handleStartNow = async () => {
    if (!user) {
      alert("You must be logged in to start the course.");
      return;
    }

    if (isFree) {
      try {
        await axios.post(`http://localhost:5000/courses/enroll-course`, {
          user_id: user?.id,
          course_id: course.course_id,
        });

        // Dispatch to Redux store
        dispatch(enrollCourse(course.course_id));
        navigate(`/courses/${course.course_id}`); // Redirect to courses page

        alert("You are now enrolled in this free course!");
      } catch (err) {
        console.error("Failed to enroll in course", err);
        alert("Failed to enroll in course. Please try again.");
      }
    } else {
      // Show QR code modal for paid courses
      setShowQRModal(true);
    }
  };

  const handleEnrollAfterPayment = async () => {
    try {
      await axios.post(`http://localhost:5000/courses/enroll-course`, {
        user_id: user?.id,
        course_id: course.course_id,
      });

      // Close the QR modal
      setShowQRModal(false);

      // Dispatch to Redux store
      dispatch(enrollCourse(course.course_id));
      navigate(`/courses/${course.course_id}`);

      alert("Payment received! You are now enrolled in the course.");
    } catch (err) {
      console.error("Failed to enroll in course", err);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white p-6 relative font-avant-medium h-80 flex justify-center items-center">
      <div className="max-w-[1680px] w-full flex justify-between items-center relative">
        {/* Course Info Section */}
        <div className="text-left max-w-[1100px]">
          <div className="flex items-center space-x-4">
            <span className="bg-gray-700 text-xl text-white px-4 py-2 rounded-xl">
              {course.category
                ? course.category
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                : ""}
            </span>
            <span className="text-xl text-gray-400">
              by {course.instructor.name}
            </span>
          </div>
          <h1 className="text-5xl leading-[1.2] font-avant-medium font-bold mt-3">
            {course.title}
          </h1>
          <div className="flex space-x-4 text-[20px] text-gray-400 mt-4">
            <span>📅 {course.duration} Weeks</span>
            <span>👨‍🎓 {course.enrollment_count} Students</span>
            <span>📊 {course.level}</span>
            <span>📖 {totalVideos} Videos</span>
          </div>
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 items-center text-[18px]">
              <span className="text-[22px] font-bold">Tags: </span>
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white px-4 py-1 rounded-xl"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Course Pricing Section (Falling Out of Bounds) */}
        <div className="absolute right-0 bottom-5 translate-y-1/2 bg-white rounded-2xl shadow-lg w-[510px] h-95 text-center z-10">
          {/* Image Section - Using placeholder with thumbnail_ID reference */}
          <div>
            <img
              src={course.thumbnail || course.thumbnail_url}
              alt="Course Preview"
              className="w-full h-70 object-cover rounded-t-xl"
            />
          </div>

          {/* Price & Button Section */}
          <div className="p-6 h-25 ml-15 mr-15 flex justify-between items-center">
            <p className="text-2xl font-avant-medium font-bold text-gray-700">
              {isFree ? "Free" : `$${course.price}`}
            </p>
            {!isEnrolled && (
              <button
                onClick={handleStartNow}
                className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-avant-medium hover:bg-blue-700 transition cursor-pointer">
                Start Now
              </button>
            )}
            {isEnrolled && (
              <span className="text-green-600 font-bold text-2xl">Enrolled</span>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Payment Modal - with blur effect instead of dark overlay */}
      {showQRModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-black shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Payment</h2>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-700 text-xl mb-2">Scan the QR code to pay</p>
              <p className="text-2xl font-bold text-gray-800">${course.price}</p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Display QR code image instead of SVG */}
                <img
                  src={qrcode} // Placeholder for QR code image
                  alt="QR Code for Payment"
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="text-gray-600 text-lg mb-4 text-center">
              <p>After payment, you'll get immediate access</p>
            </div>

            {/* In a real implementation, this button would be activated after payment verification */}
            <div className="flex justify-center">
              <button
                onClick={handleEnrollAfterPayment}
                className="bg-green-600 text-white py-2 px-6 rounded-full text-lg font-medium hover:bg-green-700 transition"
              >
                I've Completed Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSingleHeader;