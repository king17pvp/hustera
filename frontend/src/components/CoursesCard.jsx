import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/courses/${course.courseId}`);
  };

  return (
    <div onClick={handleCardClick} className="relative bg-white rounded-4xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 hover:bg-gray-50 w-135 h-140 cursor-pointer flex flex-col group border border-gray-200">
      {/* Badge */}
      <div className="absolute top-6 left-6 bg-gray-800 text-white font-avant-medium px-4 py-2 rounded-xl">
        {course.category
          ? course.category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          : ""}
      </div>

      {/* Thumbnail */}
      <img
        src={course.thumbnailUrl || course.thumbnail}
        alt="Category Thumbnail"
        className="w-full h-85 object-fill rounded-t-3xl"
      />

      {/* Course Info (Flexible Container) */}
      <div className="p-7 flex-grow font-avant-medium flex flex-col">
        <p className="text-gray-500 mb-1">
          by <span className="text-black font-semibold">{course.author}</span>
        </p>
        <h3 className="text-black font-avant-medium font-bold text-2xl transition-colors duration-200 group-hover:text-blue-700 line-clamp-1">
          {course.title}
        </h3>

        <div className="flex items-center text-gray-500 text-lg mt-2 space-x-4">
          <span>⏳ {course.duration} Weeks</span>
          <span>🎓 {course.students} Students</span>
          <span>⭐ {course.level}</span>
        </div>

        {/* Price Section (Fixes Positioning) */}
        <div className="mt-auto">
          <div className="mx-auto border-t border-gray-300 mb-3"></div>
          <div className="text-center text-base">
            <span className="text-gray-700 font-semibold text-xl">
              {course.price === "0.00" ? "Free" : `$${course.price}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
