import React from "react";

const CategoryCard = ({ iconPath, title, courseCount }) => {
  return (
    <div className="bg-white h-80 w-80 rounded-3xl p-6 flex flex-col items-center text-center justify-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border border-gray-200">
      {/* Icon (Image) */}
      <img src={iconPath} alt={title} className="mb-6 w-15 h-15" />

      {/* Title */}
      <h3 className="text-black font-bold text-3xl font-avant-medium transition-colors duration-200 group-hover:text-blue-800 mb-2">{title}</h3>

      {/* Course Count */}
      <p className="text-gray-500 text-xl">{courseCount} Courses</p>
    </div>
  );
};

export default CategoryCard;
