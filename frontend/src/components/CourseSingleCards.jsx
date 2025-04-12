import React, { useState } from "react";
import CourseVideoOverlay from "./CourseVideoOverlay";
import {FaStar, FaReply, FaChevronLeft, FaChevronRight, FaCheck, FaLock, FaTimes, FaUsers, FaBookOpen, FaFacebook, FaPinterest, FaTwitter, FaInstagram, FaYoutube, FaVideo, FaFileAlt, FaClock } from "react-icons/fa";

const CourseSingleCards = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTab, setVideoTab] = useState("Notes");
  const [hovered, setHovered] = useState(0); 
  const [rating, setRating] = useState(0);   

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
  const currentReviews = course.tabs.Reviews?.slice(indexOfFirstReview, indexOfLastReview) || [];
  
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

  // Estimate duration of a lesson
  const getEstimatedDuration = (index) => {
    const durations = ["10 min", "15 min", "20 min", "12 min", "18 min"];
    return durations[index % durations.length];
  };
  
  // Get icon for resource based on type
  const getResourceIcon = (type) => {
    return type === 'video' ? <FaVideo className="mr-2 text-blue-500" /> : <FaFileAlt className="mr-2 text-green-500" />;
  };

  // Define fixed tab order
  const tabOrder = ["Overview", "Curriculum", "Instructor", "Reviews"];

  return (
    <div className="w-[1100px] mt-8">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex">
          {tabOrder.map((tab) => (
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

        <div className="p-8 font-avant-medium text-[20px] text-gray-700 bg-gray-100">
          {activeTab === "Instructor" ? (
            <div className="bg-gray p-2">
              {/* Instructor Info */}
              <div className="flex items-center">
                <img
                  src={course.tabs.Instructor.iconUrl || defaultInstructorImage}
                  alt="Instructor"
                  className="w-35 h-35 rounded-lg object-cover mr-6"
                />
                <div>
                  <h2 className="text-3xl font-bold">{course.tabs.Instructor.name}</h2>
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
              {/* Curriculum - Expandable Weeks */}
              {course.tabs.Curriculum.map((week, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <button
                    className="w-full flex justify-between items-center p-4 text-[22px] text-black cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <span className="font-semibold">Week {index + 1}: {week.title}</span>
                    </div>
                    <span className="text-gray-500">
                      {expandedSections[index] ? 
                        <FaChevronRight className="transform rotate-90" /> : 
                        <FaChevronRight />
                      }
                    </span>
                  </button>

                  {/* Resources List - Shown when expanded */}
                  {expandedSections[index] && (
                    <div className="border-t border-gray-200 bg-gray-50 p-2">
                      {week.resources && week.resources.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {week.resources.map((resource, resIndex) => (
                            <li 
                              key={resIndex} 
                              className="px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center">
                                {getResourceIcon(resource.type)}
                                <span className={resource.isLocked ? "text-gray-400" : ""}>
                                  {resource.title}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-3 text-sm flex items-center text-gray-500">
                                  <FaClock className="mr-1" /> {getEstimatedDuration(resIndex)}
                                </span>
                                {resource.isLocked ? 
                                  <FaLock className="text-gray-400" /> : 
                                  <FaCheck className="text-green-500" />
                                }
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center py-4 text-gray-500">No resources available for this week</p>
                      )}
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
                {currentReviews.length > 0 ? (
                  currentReviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl">
                      <div className="flex items-center">
                        <img
                          src={review.userImage || "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-[23px]">{review.user}</h4>
                          <p className="text-gray-500 text-lg">{review.date}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                      <button className="text-red-500 flex items-center mt-2 cursor-pointer">
                        <FaReply className="mr-2" /> Reply
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-500">No reviews yet. Be the first to review this course!</p>
                )}
              </div>


              {/* Pagination */}
              {currentReviews.length > 0 && (
                <div className="mt-6 flex justify-center items-center space-x-3">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"}`}
                  >
                    <FaChevronLeft />
                  </button>
                  {[...Array(Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage))].map((_, index) => (
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
                    disabled={currentPage === Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage)}
                    className={`p-2 rounded-md ${
                      currentPage === Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}

              {/* Comment Section - Only show in Reviews tab */}
              <div className="mt-10">
                <h2 className="text-[30px] font-avant-medium font-semibold">Leave A Comment</h2>
                <form className="mt-2 space-y-4">
                  {/* Star Rating System */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[22px] font-avant-medium">Your Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={32}
                          className="cursor-pointer transition-colors duration-200"
                          color={(hovered || rating) >= star ? "#facc15" : "#d1d5db"} // yellow-400 : gray-300
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>

                    {/* Inline Satisfaction Label */}
                    {(hovered || rating) > 0 && (
                      <span className="text-[22px] text-black font-medium">
                        {["😞 Very Bad", "😕 Bad", "😐 Okay", "🙂 Good", "🤩 Excellent"][(hovered || rating) - 1]}
                      </span>
                    )}
                  </div>

                  {/* Comment field */}
                  <textarea
                    placeholder="Comment"
                    className="w-[1100px] h-[120px] border px-5 py-3 text-[20px] rounded-xl resize-none"
                  ></textarea>

                  {/* Post Comment Button */}
                  <button className="bg-blue-600 text-white text-[18px] font-avant-medium px-5 py-3 rounded-xl cursor-pointer">
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <p>{typeof course.tabs[activeTab] === "string" ? course.tabs[activeTab] : "Content unavailable."}</p>
          )}
        </div>
      </div>
      
      {/* Video Overlay */}
      <CourseVideoOverlay
        course={course}
        selectedVideo={selectedVideo}
        closeVideo={closeVideo}
        handleVideoClick={(video) => {
          if (!video.isLocked) setSelectedVideo(video.url);
        }}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
    </div>
  );
};

export default CourseSingleCards;
