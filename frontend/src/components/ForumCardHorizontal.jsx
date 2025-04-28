import React from "react";

const ForumCardHorizontal = ({
  title,
  date,
  description, // thread content
  tags,
  category,
  answers,
  votes,
  author,
}) => {
  return (
    <div className="flex w-full max-w-[1230px] h-46 border border-gray-200 rounded-xl px-6 py-6 hover:shadow-md hover:-translate-y-1 transition cursor-pointer bg-white group relative">
      {/* Category Badge */}
      <div className="absolute top-4 right-6 bg-gray-500 text-white px-5 py-1 rounded-xl text-[18px] font-avant-medium z-10">
        {category}
      </div>

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
        <p className="text-gray-600 text-xl mt-1 line-clamp-2 h-14 flex">
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
            asked on {new Date(date).toLocaleString("en-US", {
              year: "numeric",
              month: "long", // or 'short' for "Mar"
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCardHorizontal;