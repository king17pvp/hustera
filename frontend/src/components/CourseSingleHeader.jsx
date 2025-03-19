import React, { useState } from "react";


const CourseSingleHeader = ({course}) => {
  // const [activeTab, setActiveTab] = useState("Curriculum");

  return (
    <div className="bg-black text-white p-6 flex relative h-72">
      {/* Course Info Section*/}
      <div className="flex-1 ml-70 mt-12">
        <span className="bg-gray-700 text-white px-3 py-1 rounded-full ">
          {course.category}
        </span>
        <span className="ml-2 text-gray-400">by {course.author}</span>
        <h1 className="text-5xl font-bold mt-2">{course.title}</h1>
        <div className="flex space-x-4 text-lg text-gray-400 mt-2">
          <span>📅 {course.duration}</span>
          <span>👨‍🎓 {course.students} Students</span>
          <span>📊 {course.level}</span>
          <span>📖 {course.lessons} Lessons</span>
          <span>📝 {course.quizzes} Quizzes</span>
        </div>
      </div>

      {/* Course Pricing Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center">
        {/* Image Section */}
        <div>
          <img src={course.image} alt="Course Preview" className="w-full rounded-lg" />
        </div>

        {/* Price & Button Section */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 line-through text-lg">${course.originalPrice}</p>
            <p className="text-2xl font-bold text-red-600">${course.discountedPrice}</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};


export default CourseSingleHeader;
