import React, { useState } from "react";

const CourseSingleCards = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        {Object.keys(course.tabs).map((tab) => (
          <button
            key={tab}
            className={`py-3 px-8 flex-1 text-lg font-semibold text-center transition-colors duration-200
              ${activeTab === tab ? "bg-gray-200 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 mt-4 rounded-lg text-gray-700 transition-colors duration-200 bg-gray-100">
        {course.tabs[activeTab]}
      </div>
    </div>
  );
};

export default CourseSingleCards;
