import React from "react";

const CourseCardHorizontal = ({ thumbnailUrl, category, title, author, duration, students, levels, lessons, price }) => {
  return (
    <div className="group relative h-80 w-310 flex bg-white rounded-2xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
      {/* Left: Image + Category Badge */}
      <div className="relative w-140 bg-gray-100">
        <img
          src={thumbnailUrl}
          alt="Course Thumbnail"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-xl">
          {category}
        </span>
      </div>

      {/* Right: Course Details */}
      <div className="p-7 flex flex-col flex-grow">
        <p className="text-black">
          by <span className="font-semibold">{author}</span>
        </p>
        <h3 className="text-3xl max-w-155 font-avant-medium font-bold text-black mt-2 transition-colors duration-200 group-hover:text-blue-700">
          {title}
        </h3>

        {/* Course Info */}
        <div className="flex items-center text-gray-500 text-lg mt-3 space-x-3 flex-wrap">
          <span>⏳ {duration}</span>
          <span>🎓 {students} Students</span>
          <span>📊 {levels}</span>
          <span>📖 {lessons} Lessons</span>
        </div>

        {/* Spacer to push price to the bottom */}
        <div className="flex-grow"></div>

        {/* Separating Line */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Price */}
        <div className="text-right">
          <p className="text-gray-700 font-semibold text-2xl">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
