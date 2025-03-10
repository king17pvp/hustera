import React from "react";
import bannerLogo from "../assets/banner.png"

const Banner = () => {
  return (
    <div className="w-full max-w-[1700px] h-90 mx-auto bg-gradient-to-r from-teal-200 to-rose-200 rounded-3xl p-30 flex items-center justify-between shadow-lg">
      {/* Text Section */}
      <div className="w-1/2 px-10">
        <p className="text-gray-600 text-xl font-avant-medium font-bold">UNLOCK YOUR POTENTIAL WITH</p>
        <h2 className="text-6xl font-avant-medium font-bold text-black mt-1">HUSTera E-Learning</h2>
        <p className="max-w-3/4 text-gray-600 text-xl mt-2">
            Elevate your skills with expert-led courses. 
            From technology to business, Hustera empowers learners worldwide with flexible, high-quality education.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-1/2 flex justify-end px-10">
        <img
          src={bannerLogo}
          className="w-130 h-90"
        />
      </div>
    </div>
  );
};

export default Banner;
