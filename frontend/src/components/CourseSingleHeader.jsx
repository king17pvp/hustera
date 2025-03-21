import React from "react";

const CourseSingleHeader = ({ course }) => {
  return (
    <div className="bg-black text-white p-6 relative h-75 flex justify-center items-center">
      <div className="max-w-[1680px] w-full flex justify-between items-center relative">
        {/* Course Info Section */}
        <div className="text-left max-w-[1100px]">
          <div className="flex items-center space-x-4">
            <span className="bg-gray-700 text-xl text-white px-4 py-2 rounded-xl">
              {course.category}
            </span>
            <span className="text-xl text-gray-400">by {course.author}</span>
          </div>
          <h1 className="text-5xl leading-[1.2] font-avant-medium font-bold mt-3">
            {course.title}
          </h1>
          <div className="flex space-x-4 text-lg text-gray-400 mt-4">
            <span>📅 {course.duration}</span>
            <span>👨‍🎓 {course.students} Students</span>
            <span>📊 {course.level}</span>
            <span>📖 {course.lessons} Lessons</span>
            <span>📝 {course.quizzes} Quizzes</span>
          </div>
        </div>

        {/* Course Pricing Section (Falling Out of Bounds) */}
        <div className="absolute right-0 bottom-5 translate-y-1/2 bg-white rounded-2xl shadow-lg max-w-[510px] h-95 text-center z-10">
          {/* Image Section */}
          <div>
            <img
              src={course.image}
              alt="Course Preview"
              className="w-full h-70 object-cover rounded-t-xl"
            />
          </div>

          {/* Price & Button Section */}
          <div className="p-6 ml-15 mr-15 flex justify-between items-center">
            <p className="text-2xl font-avant-medium font-bold text-gray-700">${course.discountedPrice}</p>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-avant-medium hover:bg-blue-700 transition">
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingleHeader;
