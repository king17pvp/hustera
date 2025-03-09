import React from "react";

const ForumCard = ({ thumbnailUrl, title, date, description }) => {
  return (
    <div className="relative bg-white rounded-4xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 w-135 h-135 cursor-pointer flex flex-col group border border-gray-200">
      {/* Thumbnail */}
      <img 
        src={thumbnailUrl} 
        alt="Article Thumbnail" 
        className="w-full h-80 object-cover rounded-t-3xl"
      />

      {/* Article Info */}
      <div className="p-7 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-black font-avant-medium font-bold text-2xl mt-2 transition-colors duration-200 group-hover:text-blue-700">
          {title}
        </h3>
        
        {/* Date */}
        <p className="text-gray-500 text-xl mt-2">📅 {date}</p>

        {/* Description */}
        <p className="text-gray-600 text-xl mt-3">{description}</p>

      </div>
    </div>
  );
};

export default ForumCard;
