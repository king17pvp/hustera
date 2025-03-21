import React, { useState } from "react";
import {FaStar, FaReply, FaChevronLeft, FaChevronRight, FaCheck, FaLock, FaTimes, FaUsers, FaBookOpen, FaFacebook, FaPinterest, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const CourseSingleCards = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const defaultInstructorImage = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  // Dummy rating breakdown
  const ratingStats = [
    { stars: 5, percentage: 90 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = course.tabs.Reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Toggle function for expanding/collapsing lesson sections
  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to handle video selection
  const handleVideoClick = (video) => {
    if (!video.isLocked) {
      setSelectedVideo(video.url);
    }
  };

  // Function to close video modal
  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-[1100px] mt-8">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex">
          {Object.keys(course.tabs).map((tab) => (
            <button
              key={tab}
              className={`py-5 px-6 flex-1 text-2xl border border-gray-100 border-b-gray-200 font-avant-medium font-semibold text-center transition-all duration-200 cursor-pointer 
                ${activeTab === tab ? "text-blue-600 bg-gray-100" : "text-black"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8 font-avant-medium text-[18px] text-gray-700 bg-gray-100">
          {activeTab === "Instructor" ? (
            <div className="bg-gray p-6 rounded-lg shadow-lg">
              {/* Instructor Info */}
              <div className="flex items-center">
                <img
                  src={course.tabs.Instructor.iconUrl || defaultInstructorImage}
                  alt="Instructor"
                  className="w-24 h-24 rounded-lg object-cover mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold">{course.tabs.Instructor.name}</h2>
                  <p className="text-gray-600">{course.tabs.Instructor.bio}</p>
                  <div className="mt-2">
                    <div className="flex items-center text-gray-700">
                      <FaUsers className="mr-2 text-yellow-500" /> {course.tabs.Instructor.totalStudents} Students
                    </div>
                    <div className="flex items-center text-gray-700 mt-1">
                      <FaBookOpen className="mr-2 text-orange-500" /> {course.tabs.Instructor.totalCourses} Lessons
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {course.tabs.Instructor.socials && (
                <div className="mt-4 flex items-center space-x-4">
                  <p className="text-gray-700 font-semibold">Follow:</p>
                  <div className="flex space-x-3">
                    {course.tabs.Instructor.socials.facebook && (
                      <a href={course.tabs.Instructor.socials.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
                      </a>
                    )}
                    {course.tabs.Instructor.socials.pinterest && (
                      <a href={course.tabs.Instructor.socials.pinterest} target="_blank" rel="noopener noreferrer">
                        <FaPinterest className="text-red-600 text-2xl hover:text-red-800" />
                      </a>
                    )}
                    {course.tabs.Instructor.socials.twitter && (
                      <a href={course.tabs.Instructor.socials.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600" />
                      </a>
                    )}
                    {course.tabs.Instructor.socials.instagram && (
                      <a href={course.tabs.Instructor.socials.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700" />
                      </a>
                    )}
                    {course.tabs.Instructor.socials.youtube && (
                      <a href={course.tabs.Instructor.socials.youtube} target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="text-red-500 text-2xl hover:text-red-700" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "Curriculum" && Array.isArray(course.tabs.Curriculum) ? (
            <div className="space-y-4">
              {/* Curriculum - Expandable */}
              {course.tabs.Curriculum.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
                  <button
                    className="w-full flex justify-between items-center text-lg font-semibold text-black"
                    onClick={() => toggleSection(index)}
                  >
                    <span>{section.title}</span>
                    <span className="text-gray-500">
                      {expandedSections[index] ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Lessons - Expandable */}
                  {expandedSections[index] && (
                    <div className="mt-3 space-y-3">
                      {section.videos.map((video, vidIndex) => (
                        <div
                          key={vidIndex}
                          className="flex justify-between items-center bg-gray-100 p-3 rounded-md cursor-pointer"
                          onClick={() => handleVideoClick(video)}
                        >
                          <span
                            className={`text-gray-700 font-semibold ${
                              video.isLocked ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            {video.title}
                          </span>
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-600">{video.duration}</span>
                            {video.isLocked ? (
                              <FaLock className="text-gray-400" />
                            ) : (
                              <FaCheck className="text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : activeTab === "Reviews" ? (
            <div>
              {/* Review Summary */}
              <h3 className="text-xl font-bold">Comments</h3>
              <div className="flex items-center mt-2">
                <span className="text-3xl font-bold">4.0</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`text-yellow-500 text-xl ${index < 4 ? "" : "opacity-50"}`} />
                  ))}
                </div>
                <span className="text-gray-500 ml-3">based on 146,951 ratings</span>
              </div>

              {/* Rating Breakdown (Fixed Alignment) */}
              <div className="mt-4 space-y-2">
                {ratingStats.map((rating, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center min-w-[50px]">
                      <span className="text-gray-600">{rating.stars}</span>
                      <FaStar className="text-yellow-500 ml-1" />
                    </div>
                    <div className="w-full bg-gray-200 rounded h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600">{rating.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Reviews List */}
              <div className="mt-6 space-y-6">
                {currentReviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <img
                        src={review.userImage || "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{review.user}</h4>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                    <button className="text-red-500 flex items-center mt-2">
                      <FaReply className="mr-2" /> Reply
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center items-center space-x-3">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"}`}
                >
                  <FaChevronLeft />
                </button>
                {[...Array(Math.ceil(course.tabs.Reviews.length / reviewsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1 ? "bg-black text-white" : "text-black hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(course.tabs.Reviews.length / reviewsPerPage)}
                  className={`p-2 rounded-md ${
                    currentPage === Math.ceil(course.tabs.Reviews.length / reviewsPerPage)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:bg-gray-200"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ) : (
            <p>{typeof course.tabs[activeTab] === "string" ? course.tabs[activeTab] : "Content unavailable."}</p>
          )}
        </div>
      </div>
      {/* Video Modal - Dark Overlay with Reduced Opacity */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50"
          onClick={closeVideo} // Clicking outside closes the modal
        >
          <div className="relative p-4 rounded-lg shadow-lg w-[80%] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-blue" onClick={closeVideo}>
              <FaTimes />
            </button>
            <iframe
              className="rounded-lg w-full h-[500px]"
              src={selectedVideo}
              title="Selected Lesson"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

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
