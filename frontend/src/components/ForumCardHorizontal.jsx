import React from "react";

const ForumCardHorizontal = ({
  title,
  date,
  description, // thread content
  tags,
  views,
  answers,
  votes,
  author,
}) => {
  return (
    <div className="flex w-full max-w-[1230px] border border-gray-200 rounded-xl px-6 py-6 hover:shadow-md hover:-translate-y-1 transition cursor-pointer bg-white group">
      {/* Left: Stats */}
      <div className="flex flex-col justify-center items-end text-right mr-6 min-w-20 space-y-1">
        <div className="text-lg font-avant-medium text-gray-900">
          <span className="font-semibold">{votes}</span> votes
        </div>
        <div className="text-lg font-avant-medium text-gray-400">
          <span className="font-semibold">{answers}</span> answers
        </div>
        {/* <div className="text-lg font-avant-medium text-gray-400">
          <span className="font-semibold">{views}</span> views
        </div> */}
      </div>

      {/* Right: Content */}
      <div className="flex-1 ml-3">
        {/* Title */}
        <h3 className="text-blue-600 text-[25px] font-avant-medium font-semibold group-hover:text-blue-800">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xl mt-1 line-clamp-2">
          {description}
        </p>

        {/* Tags + Author */}
        <div className="flex justify-between items-center mt-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-[18px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author Info */}
          <div className="text-[18px] text-gray-500">
            <span className="font-avant-medium text-blue-500 group-hover:text-blue-800">{author}</span>{" "}
            asked on {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCardHorizontal;
