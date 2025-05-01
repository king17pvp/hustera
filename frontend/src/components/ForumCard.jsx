import React from "react";

const ForumCard = ({ 
  title, 
  date, 
  description,
  tags,
  category,
  answers,
  votes,
  author 
}) => {
  return (
    <div className="relative bg-white p-2 rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-gray-50 border border-gray-200 cursor-pointer flex flex-col group">
      {/* Category Badge */}
      <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-xl text-lg font-avant-medium z-10">
        {category}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-blue-600 text-2xl w-5/6 font-avant-medium font-semibold group-hover:text-blue-800 pr-20 mb-3 h-15">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-[18px] mt-2 line-clamp-3 h-22">
          {description}
        </p>

        {/* Tags */}
        <div className="flex font-avant-medium flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-base font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-100 p-4">
        <div className="flex justify-between items-center">
          {/* Stats */}
          <div className="flex space-x-4">
            <div className="text-base font-avant-medium text-gray-600">
              <span className="font-semibold text-gray-900">{votes}</span> votes
            </div>
            <div className="text-base font-avant-medium text-gray-600">
              <span className="font-semibold text-gray-900">{answers}</span> answers
            </div>
          </div>

          {/* Author */}
          <div className="text-lg text-gray-500">
            <span className="font-avant-medium text-blue-500 group-hover:text-blue-800">{author}</span>
          </div>
        </div>
        
        {/* Date */}
        <div className="text-lg text-gray-400">
          Asked on {new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default ForumCard;