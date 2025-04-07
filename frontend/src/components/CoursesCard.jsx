import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courseID, thumbnailUrl, category, title, author, duration, students, price }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/courses/${courseID}`);
  };
  
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
    return `http://localhost:5000${url}`;
  };
  
  return (
    <div 
      className="relative bg-white rounded-4xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 hover:bg-gray-50 w-135 h-140 cursor-pointer flex flex-col group border border-gray-200"
      onClick={handleCardClick}
    >
      {/* Badge */}
      <div className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-xl">
        {category}
      </div>

      {/* Thumbnail */}
      <img 
        src={getImageUrl(thumbnailUrl)}
        alt="Category Thumbnail" 
        className="w-full h-85 object-cover rounded-t-3xl"
        onError={(e) => {
          console.error('Image failed to load:', e.target.src);
          e.target.src = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714150931/JavaScript-Introduction.jpg";
        }}
      />

      {/* Course Info (Flexible Container) */}
      <div className="p-7 flex-grow flex flex-col">
        <p className="text-gray-500 mb-1">
          by <span className="text-black font-semibold">{author}</span>
        </p>
        <h3 className="text-black font-avant-medium font-bold text-2xl transition-colors duration-200 group-hover:text-blue-700">
          {title}
        </h3>

        {/* Duration & Students */}
        <div className="flex items-center text-gray-500 mt-2 space-x-4">
          <span>⏳ {duration}</span>
          <span>🎓 {students} Students</span>
        </div>

        {/* Price Section (Fixes Positioning) */}
        <div className="mt-auto">
          <div className="mx-auto border-t border-gray-300 mb-3"></div>
          <div className="text-center text-sm">
            <span className="text-gray-700 font-semibold text-xl">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
