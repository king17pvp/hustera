import React from "react";
import banner2 from "../assets/banner2.png"
import banner3 from "../assets/banner3.png"

const Banner2 = () => {
  return (
    <div className="w-full max-w-[1700px] h-90 mx-auto bg-gradient-to-r from-pink-200 to-blue-100 rounded-3xl p-20 flex items-center justify-between shadow-lg">
      {/* Image Section */}
      <div className="w-1/4 flex justify-start">
        <img
        src={banner3}
        className="h-82"
        />
      </div>
      {/* Text Section */}
      <div className="w-1/2 justify-center text-center">
        <p className="text-gray-600 text-xl text-center font-avant-medium font-bold">PROVIDING AMAZING</p>
        <h2 className="text-6xl font-avant-medium font-bold text-black mt-1">Learning Experiences</h2>
        <p className=" text-gray-600 text-xl mt-4">
            The next level of oneline learning platform. Learn and discuss anytime and anywhere
        </p>
      </div>
      {/* Image Section */}
      <div className="w-1/4 flex justify-end">
        <img
        src={banner2}
        className="h-85"
        />
      </div>
    </div>
  );
};

export default Banner2;
