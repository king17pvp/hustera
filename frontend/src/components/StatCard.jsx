import React from "react";

const StatCard = ({ stats, title }) => {
  return (
    <div className="bg-gray-100 h-60 w-95 rounded-3xl p-6 flex flex-col items-center text-center justify-center transition-transform duration-300 border border-gray-100">
      {/* Course Count */}
      <p className="text-blue-800 font-avant-medium font-bold text-4xl transition-colors duration-200 mb-2">{stats}</p>
      
      {/* Title */}
      <h3 className="text-gray-700 text-2xl font-avant-medium mt-4">{title}</h3>

    </div>
  );
};

export default StatCard;
