import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Breadcrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const CourseVideoOverlay = ({ course, selectedVideo, closeVideo, handleVideoClick, expandedSections, toggleSection }) => {
  return (
    selectedVideo && (
        
      <div className="fixed inset-0 z-50 bg-white flex">
        
        {/* Sidebar: Curriculum */}
        <div className="w-[18%] bg-gray-100 border-r overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          {course.tabs?.Curriculum?.map((section, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left font-semibold text-[20px] mb-2"
                onClick={() => toggleSection(index)}
              >
                {section.title} {expandedSections[index] ? "▲" : "▼"}
              </button>
              {expandedSections[index] && (
                <ul className="pl-4 space-y-2">
                  {section.videos.map((video, vidIndex) => (
                    <li
                      key={vidIndex}
                      className={`cursor-pointer text-[18px] ${
                        video.isLocked ? "text-gray-400" : "text-blue-600 hover:underline"
                      }`}
                      onClick={() => handleVideoClick(video)}
                    >
                      {video.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Main: Video and Notes */}
        <div className="flex-1 relative p-8 bg-white flex flex-col items-center">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-black"
            onClick={closeVideo}
          >
            <FaTimes />
          </button>

          {/* Video Player */}
          <iframe
            className="rounded-lg w-full h-[60vh] max-w-5xl"
            src={selectedVideo}
            title="Selected Lesson"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Notes Section */}
          <div className="w-full max-w-5xl mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Notes</h2>
            <textarea
              placeholder="Write your notes here..."
              className="w-full h-[150px] p-4 rounded-lg border border-gray-300 resize-none text-[16px]"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CourseVideoOverlay;
