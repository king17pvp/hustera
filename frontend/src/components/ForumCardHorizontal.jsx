import React from "react";

const ForumCardHorizontal = ({ thumbnailUrl, title, date, description, tags }) => {
  return (
    <div className="group relative h-80 w-310 flex bg-white rounded-2xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-gray-50 cursor-pointer">
      {/* Left: Image */}
      <div className="relative min-w-140 max-w-140 bg-gray-100">
        <img
          src={thumbnailUrl}
          alt="Forum Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Forum Details */}
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="text-3xl max-w-155 font-avant-medium font-bold text-black mt-2 transition-colors duration-200 group-hover:text-blue-700">
          {title}
        </h3>

        {/* Forum Info */}
        <div className="flex-col items-center text-gray-500 text-lg mt-3 space-x-3 flex-wrap">
          <p className="text-gray-500 text-xl mt-2">📅 {date}</p>
          <p className="text-gray-700 text-xl mt-4">{description}</p>
        </div>

        {/* Spacer to push content down */}
        <div className="flex-grow"></div>

        {/* Separating Line */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Tags Section */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-black font-semibold text-xl">Tags:</span>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-lg font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCardHorizontal;
