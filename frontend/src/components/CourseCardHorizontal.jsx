import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseCardHorizontal = ({
  thumbnailUrl,
  thumbnailUrl2,
  category,
  title,
  instructor,
  instructorEmail,     // renamed from author
  // renamed from author
  duration,
  level,          // renamed from levels
  price,
  courseID,
}) => {
  const course = {
    thumbnailUrl,
    thumbnailUrl2,
    category,
    title,
    instructor,
    instructorEmail,     // renamed from author
    // renamed from author
    duration,
    level,          // renamed from levels
    price,
    courseID,
  }
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/courses/${courseID}`); // <-- Navigate to detail page
  };
  return (
    <div
      className="group relative h-80 w-310 flex bg-white rounded-2xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-gray-50 cursor-pointer"
      onClick={handleClick}
    >
      {/* Left: Image + Category Badge */}
      <div className="relative w-140 bg-gray-100">
        {thumbnailUrl || thumbnailUrl2 ? (
          <img
            src={thumbnailUrl || thumbnailUrl2}
            alt="Course Thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex justify-center items-center">
            <span>Image Not Available</span>
          </div>
        )}
        <span className="absolute top-6 left-6 font-avant-medium text-gray-200 bg-gray-700 px-4 py-2 rounded-xl">
          {category
            ? category
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
            : ""}
        </span>
      </div>

      {/* Right: Course Details */}
      <div className="p-7 flex flex-col flex-grow">
        <p className="text-black">
          by{" "}
          <span className="font-semibold">
            {instructor
              ? instructor.split("@")[0]
              : instructorEmail
                ? instructorEmail.split("@")[0]
                : ""}
          </span>
        </p>
        <h3 className="text-3xl max-w-155 font-avant-medium font-bold text-black mt-2 transition-colors duration-200 group-hover:text-blue-700">
          {title}
        </h3>

        {/* Course Info */}
        <div className="flex items-center text-gray-500 text-lg mt-3 space-x-4 flex-wrap">
          {duration && <span>⏳ {duration}</span>}
          {level && <span>📊 {level}</span>}
        </div>

        {/* Spacer to push price to the bottom */}
        <div className="flex-grow"></div>

        {/* Separating Line */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Price */}
        <div className="text-right">
          <p className="text-gray-700 font-semibold text-2xl">
            {price === "0.00" ? "Free" : `$${price}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
