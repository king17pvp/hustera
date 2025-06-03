import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ iconPath, title, courseCount }) => {
  const navigate = useNavigate();

  // Handle click to navigate to courses page with category filter
  const handleCategoryClick = () => {
    // Navigate to the courses page with the filter applied
    navigate(`/courses?category=${encodeURIComponent(title)}`);
  };

  return (
    <div 
      onClick={handleCategoryClick}
      className="bg-white h-80 w-80 rounded-3xl p-6 flex flex-col items-center text-center justify-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50 cursor-pointer group border border-gray-200"
    >
      {/* Icon (Image) */}
      <img src={iconPath} alt={title} className="mb-6 w-15 h-15" />

      {/* Title */}
      <h3 className="text-black font-bold text-[28px] font-avant-medium transition-colors duration-200 group-hover:text-blue-800 mb-2">
        {title
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        }
      </h3>
      {/* Course Count */}
      <p className="text-gray-500 font-avant-medium text-xl">{courseCount} Courses</p>
    </div>
  );
};

export default CategoryCard;