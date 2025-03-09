import React from "react";

const ArticleCard = ({ thumbnailUrl, title, date, description }) => {
  return (
    <div className="relative bg-white rounded-4xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 w-120 h-120 cursor-pointer flex flex-col group border border-gray-200">
      {/* Thumbnail */}
      <img 
        src={thumbnailUrl} 
        alt="Article Thumbnail" 
        className="w-full h-70 object-cover rounded-t-3xl"
      />

      {/* Article Info */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-black font-bold text-2xl mt-2 transition-colors duration-200 group-hover:text-blue-500">
          {title}
        </h3>
        
        {/* Date */}
        <p className="text-gray-500 text-lg mt-2">📅 {date}</p>

        {/* Description */}
        <p className="text-gray-600 text-lg mt-3">{description}</p>

      </div>
    </div>
  );
};

export default ArticleCard;
