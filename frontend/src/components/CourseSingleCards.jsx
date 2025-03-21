import React, { useState } from "react";

const CourseSingleCards = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-[1100px] mt-8">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex">
          {Object.keys(course.tabs).map((tab) => (
            <button
              key={tab}
              className={`py-5 px-6 flex-1 text-2xl border border-gray-100 border-b-gray-200 font-avant-medium font-semibold text-center transition-all duration-200 cursor-pointer 
                ${
                  activeTab === tab
                    ? "text-blue-600 bg-gray-100"
                    : "text-black "
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 font-avant-medium text-[18px] text-gray-700 bg-gray-100">
          {course.tabs[activeTab]}
        </div>
      </div>


      {/* Comment Section (Now placed directly below the tabbed content) */}
      <div className="mt-10">
        <h2 className="text-[30px] font-avant-medium font-semibold">Leave A Comment</h2>
        <h2 className="text-[19px]">Your email will not be published. Required fields are marked*</h2>
        <form className="mt-5 space-y-4">
          {/* Name & Email in the same row */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name*"
              className="w-full border px-5 py-3 text-[18px] rounded-xl"
            />
            <input
              type="email"
              placeholder="Email*"
              className="w-full border px-5 py-3 text-[18px] rounded-xl"
            />
          </div>

          {/* Comment field below */}
          <textarea
            placeholder="Comment"
            className="w-[1100px] h-[120px] border px-5 py-3 text-[18px] rounded-xl resize-none"
          ></textarea>



          {/* Post Comment Button */}
          <button className="bg-blue-600 text-white text-[18px] font-avant-medium px-5 py-3 rounded-xl cursor-pointer">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseSingleCards;
