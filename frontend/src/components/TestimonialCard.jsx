import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ text, author, role }) => {
  return (
    <div className="w-100 h-145 bg-white rounded-2xl shadow-md p-10 flex flex-col justify-between text-left border border-gray-200">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-gray-300 text-7xl mb-7" />

      {/* Testimonial Content (Text + Author Info) */}
      <div className="flex flex-col flex-grow">
        {/* Testimonial Text */}
        <p className="text-black text-xl leading-relaxed flex-grow">{text}</p>

        {/* Author Info */}
        <div className="mt-6">
          <h3 className="text-black font-avant-medium font-bold text-3xl">{author}</h3>
          <p className="text-gray-500 text-xl">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
