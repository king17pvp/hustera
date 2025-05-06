import React, { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaUsers, FaBookOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const CourseVideoOverlay = ({ course, selectedVideo, closeVideo, handleVideoClick, expandedSections, toggleSection }) => {
  if (!selectedVideo) return null;

  // Function to extract YouTube video ID from various YouTube URL formats
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    // If it's already an embed URL, return it
    if (url.includes('youtube.com/embed/')) return url;

    // Extract the video ID from various YouTube URL formats
    let videoId = "";

    // Format: youtube.com/watch?v=VIDEO_ID
    const watchRegex = /youtube\.com\/watch\?v=([^&]+)/;
    const watchMatch = url.match(watchRegex);

    // Format: youtu.be/VIDEO_ID
    const shortRegex = /youtu\.be\/([^?]+)/;
    const shortMatch = url.match(shortRegex);

    // Format: youtube.com/v/VIDEO_ID
    const vRegex = /youtube\.com\/v\/([^?]+)/;
    const vMatch = url.match(vRegex);

    if (watchMatch) videoId = watchMatch[1];
    else if (shortMatch) videoId = shortMatch[1];
    else if (vMatch) videoId = vMatch[1];
    else videoId = url; // Assume it's just the ID

    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Get the proper embed URL
  const embedUrl = getYouTubeEmbedUrl(selectedVideo.url || selectedVideo);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="text-blue-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-13 w-13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </span>
            {selectedVideo.title || "Course Video"}
          </h2>
          <button
            onClick={closeVideo}
            className="text-gray-500 hover:text-gray-800 transition duration-150 bg-gray-100 rounded-full p-2 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Now on the left */}
          <div className="w-1/4 flex flex-col border-r border-gray-200 bg-gray-50">
            {/* Curriculum Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-bold text-2xl text-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Course Curriculum
              </h3>
            </div>

            {/* Curriculum Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2 p-3">
                {course.weeks.map((week, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <button
                      className="w-full flex justify-between items-center p-3 text-left font-medium text-gray-800 hover:bg-gray-50 transition duration-150"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-2 font-bold text-lg">
                          {index + 1}
                        </div>
                        <span className="text-[22px] font-semibold truncate">{week.title}</span>
                      </div>
                      <span className="text-gray-500 transition-transform duration-200" style={{ transform: expandedSections[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {expandedSections[index] && (
                      <div className="border-t border-gray-200 divide-y divide-gray-200">
                        {week.videos.map((video, vidIndex) => (
                          <div
                            key={vidIndex}
                            className={`p-2 pl-8 hover:bg-gray-50 cursor-pointer transition duration-150 flex items-center ${selectedVideo === video ||
                              (selectedVideo.url && video.url && selectedVideo.url === video.url) ||
                              (typeof selectedVideo === 'string' && typeof video === 'string' && selectedVideo === video)
                              ? 'bg-blue-50'
                              : ''
                              }`}
                            onClick={() => handleVideoClick(video)}
                          >
                            <div className="mr-2 text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                            <span className="text-lg text-gray-700 truncate">{video.title || video}</span>
                            {video.duration && (
                              <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {video.duration}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Player - Now with more space */}
          <div className="w-3/4 bg-black relative">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
              {selectedVideo.duration || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseSingleCards = ({ course }) => {
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hovered, setHovered] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [reloadFlag, setReloadFlag] = useState(false);
  const reviewsPerPage = 3;

  const { user, enrolledCourses } = useSelector((state) => state.auth);
  const isEnrolled = enrolledCourses.includes(course.course_id) || false;

  // Calculate average rating
  const totalRatings = course.reviews.length;
  const avgRating = totalRatings > 0
    ? (course.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings).toFixed(1)
    : 0;

  // Generate rating breakdown
  const ratingCounts = [0, 0, 0, 0, 0]; // For 1-5 stars
  course.reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const ratingStats = ratingCounts.map((count, index) => {
    const stars = index + 1;
    const percentage = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
    return { stars, percentage };
  }).reverse();

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = course.reviews.slice(indexOfFirstReview, indexOfLastReview);
  
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
  const handleVideoClick = async (video) => {
    if (!isEnrolled) {
      alert("You must be enrolled in this course to watch the videos.");
      return;
    }
    setSelectedVideo(video);
    const payload = {
      user_id: user.id,
      video_id: video.video_id,
    };
    try {
      await axios.post("http://localhost:5000/courses/watch-video", payload);
      // Optionally handle response or show a notification
    } catch (err) {
      console.error("Failed to update watched video", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/courses/${course.course_id}/reviews`);
      const updatedReviews = response.data.reviews;
      course.reviews = updatedReviews;    // <- directly update course.reviews
      setCurrentPage(1);                  // optional: go back to page 1 after posting
    } catch (error) {
      console.error("Failed to fetch updated reviews", error);
    }
  };

  const handlePostComment = async (e) => {
  e.preventDefault();
  let hasError = false;

  if (!user) {
    setRatingError("You must be logged in to post a comment.");
    hasError = true;
  } else {
    setRatingError("");
  }

  if (!isEnrolled) {
    setRatingError("You must be enrolled in this course to post a review.");
    hasError = true;
  } else {
    if (!rating) {
      setRatingError("Please select a rating.");
      hasError = true;
    } else if (user && isEnrolled) {
      setRatingError("");
    }
  
    if (!comment.trim()) {
      setCommentError("Please enter a comment.");
      hasError = true;
    } else {
      setCommentError("");
    }
  
    if (hasError) return;
  
    const payload = {
      user_id: user?.id,
      course_id: course.course_id,
      rating,
      review: comment.trim(),
    };
    try {
      console.log("Posting review:", payload);
      await axios.post("http://localhost:5000/courses/post-review", payload);
      setComment("");
      setRating(0);
      setHovered(0);
      setRatingError("");
      setCommentError("");
      await fetchReviews();
    } catch (err) {
      if (err.response?.status === 400) {
        setRatingError(err.response.data.message); 
      } else {
        setRatingError("Failed to post review. Please try again.");
      }
    }
  }
};

  // Function to close video modal
  const closeVideo = () => {
    setSelectedVideo(null);
  };

  // Format date from database timestamp
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full max-w-[1100px] font-avant-medium mt-8">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex">
          {["Overview", "Curriculum", "Instructor", "Reviews"].map((tab) => (
            <button
              key={tab}
              className={`py-5 px-6 flex-1 text-2xl border border-gray-100 border-b-gray-200 font-bold text-center transition-all duration-200 cursor-pointer 
                ${activeTab === tab ? "text-blue-600 bg-gray-100" : "text-black"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8 text-lg text-gray-700 bg-gray-100">
          {activeTab === "Overview" ? (
            <p>{course.description}</p>
          ) : activeTab === "Instructor" ? (
            <div className="bg-gray p-2">
              {/* Instructor Info */}
              <div className="flex items-center">
                <img
                  src={course.instructor.avatar_image || `https://i.ytimg.com/vi/Sk0RvHrQ_NE/sd2.jpg?sqp=-oaymwEoCIAFEOAD8quKqQMcGADwAQH4Ab4EgALABIoCDAgAEAEYZSBVKEkwDw==&rs=AOn4CLBIcYMt0XHF2Q0Ey-kukRFtHrW_TA`}
                  alt="Instructor"
                  className="w-32 h-32 rounded-lg object-cover mr-6"
                />
                <div>
                  <h2 className="text-3xl font-bold">{course.instructor.name}</h2>
                  <p className="text-gray-600">{course.instructor.email}</p>
                  <div className="mt-2">
                    <div className="flex items-center text-gray-700">
                      <FaUsers className="mr-2 text-yellow-500" /> {course.instructor.num_students} Students
                    </div>
                    <div className="flex items-center text-gray-700 mt-1">
                      <FaBookOpen className="mr-2 text-orange-500" /> {course.instructor.num_courses} Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "Curriculum" ? (
            <div className="space-y-4">
              {/* Curriculum - Expandable */}
              {course.weeks.map((week, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 border-gray-200">
                  <button
                    className="w-full flex justify-between items-center px-2 py-1 text-xl text-black cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <span>Week {index + 1}: {week.title}</span>
                    <span className="text-gray-500">
                      {expandedSections[index] ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Videos - Expandable */}
                  {expandedSections[index] && (
                    <div className="mt-3 space-y-4">
                      {week.videos.map((video, vidIndex) => (
                        <div
                          key={vidIndex}
                          className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-xl cursor-pointer group ml-2 mr-2"
                          onClick={() => handleVideoClick(video)}
                        >
                          <span className="text-gray-800 text-lg cursor-pointer">
                            Lesson {vidIndex + 1}: {video.title}
                          </span>
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
                <span className="text-3xl font-bold">{avgRating}</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`text-yellow-500 text-xl ${index < Math.round(avgRating) ? "" : "opacity-50"}`} />
                  ))}
                </div>
                <span className="text-gray-500 ml-3">based on {totalRatings} ratings</span>
              </div>

              {/* Rating Breakdown */}
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
                  <div key={index} className="bg-white px-6 py-4 rounded-xl">
                    <div className="flex items-center">
                      <img
                        src={review.reviewer_avatar_image || "https://www.svgrepo.com/show/5125/avatar.svg"}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-xl">{review.reviewer_name || review.reviewer_email}</h4>
                        <p className="text-gray-500 text-base">{formatDate(review.rated_at)}</p>
                      </div>
                    </div>

                    {/* Comment content */}
                    <p className="mt-2 text-gray-700">{review.review}</p>

                    {/* Star rating */}
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={20}
                          className="mr-1"
                          color={review.rating >= star ? "#facc15" : "#d1d5db"}
                        />
                      ))}
                    </div>
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
                {[...Array(Math.ceil(course.reviews.length / reviewsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-black text-white" : "text-black hover:bg-gray-200"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(course.reviews.length / reviewsPerPage)}
                  className={`p-2 rounded-md ${currentPage === Math.ceil(course.reviews.length / reviewsPerPage)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:bg-gray-200"
                    }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ) : (
            <p>Content unavailable.</p>
          )}
        </div>
      </div>

      {/* Video Overlay Component */}
      <CourseVideoOverlay
        course={course}
        selectedVideo={selectedVideo}
        closeVideo={closeVideo}
        handleVideoClick={handleVideoClick}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Leave A Comment</h2>
        <form className="mt-2 space-y-4">
          {/* Star Rating System */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-colors duration-200 ${ratingError ? "text-red-500" : ""}`}
                  color={(hovered || rating) >= star ? "#facc15" : "#d1d5db"}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => {
                    setRating(star);
                    setRatingError("");
                  }}
                />
              ))}
            </div>
            {(hovered || rating) > 0 && !ratingError && (
              <span className="text-lg text-black font-medium">
                {["😞 Very Bad", "😕 Bad", "😐 Okay", "🙂 Good", "🤩 Excellent"][(hovered || rating) - 1]}
              </span>
            )}
            {ratingError && (
              <span className="ml-4 text-red-600 text-lg">{ratingError}</span>
            )}
          </div>

          {/* Comment field */}
          <textarea
            placeholder="Comment"
            className={`w-full h-32 border-3 px-5 py-3 text-lg rounded-xl resize-none ${commentError ? "border-red-500" : ""}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            onClick={handlePostComment}
            className="bg-blue-600 text-white text-lg font-medium px-5 py-2 rounded-xl cursor-pointer"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseSingleCards;