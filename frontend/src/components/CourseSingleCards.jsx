import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CourseVideoOverlay from "./CourseVideoOverlay";
import { FaStar, FaReply, FaChevronLeft, FaChevronRight, FaCheck, FaLock, FaTimes, FaUsers, FaBookOpen, FaFacebook, FaPinterest, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const CourseSingleCards = ({ course, setCourse }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTab, setVideoTab] = useState("Notes");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [reviewStats, setReviewStats] = useState([
    { rating: 5, count: 7, percentage: 78 },
    { rating: 4, count: 2, percentage: 22 },
    { rating: 3, count: 0, percentage: 0 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 }
  ]);

  const [averageRating, setAverageRating] = useState(4.8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, token } = useSelector(state => state.auth);  
  

  const defaultInstructorImage = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetchReviews();
  }, [course.courseID]);

  useEffect(() => {
    if (activeTab === "Curriculum" && course.tabs.Curriculum && course.tabs.Curriculum.length > 0) {
      setExpandedSections(prev => ({ ...prev, 0: true }));
    }
  }, [activeTab, course.tabs.Curriculum]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/${course.courseID}/reviews`);
      const data = await response.json();

      if (data.success) {
        if (data.stats && data.stats.length > 0) {
          setReviewStats(data.stats.sort((a, b) => b.rating - a.rating));
        }

        if (data.averageRating) {
          setAverageRating(data.averageRating);
        }

        if (data.reviews) {
          setCourse(prev => ({
            ...prev,
            tabs: {
              ...prev.tabs,
              Reviews: data.reviews
            }
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Unable to load reviews');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user || !token) {      
      toast.error('Please log in to submit a review');
      return;
    }

    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/courses/${course.courseID}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          review: e.target.comment.value
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Review submitted successfully');
        await fetchReviews();
        e.target.reset();
        setRating(0);
        setCurrentPage(1);
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentReviews = course.tabs.Reviews ? 
    course.tabs.Reviews.slice(
      (currentPage - 1) * reviewsPerPage, 
      currentPage * reviewsPerPage
    ) : [];  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleVideoClick = (video) => {
    if (!video.isLocked) {
      setSelectedVideo(video.url);
    }
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const tabOrder = ["Overview", "Curriculum", "Instructor", "Reviews"];  

  return (
    <div className="w-[1100px] mt-8">
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
          {activeTab === "Reviews" ? (
            <div>
              <h3 className="text-xl font-bold">Comments</h3>
              <div className="flex items-center mt-2">
                <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index} 
                      className={`text-yellow-500 text-xl ${
                        index < Math.floor(averageRating) ? "" : "opacity-50"
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 ml-3">
                  based on {reviewStats.reduce((sum, stat) => sum + stat.count, 0)} ratings
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {reviewStats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center min-w-[50px]">
                      <span className="text-gray-600">{stat.rating}</span>
                      <FaStar className="text-yellow-500 ml-1" />
                    </div>
                    <div className="w-full bg-gray-200 rounded h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600">{Math.round(stat.percentage)}%</span>
                  </div>
                ))}
              </div>

              {currentReviews && currentReviews.length > 0 ? (
                <div className="mt-6 space-y-6">
                  {currentReviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl">
                      <div className="flex items-center">
                        <img
                          src={review.avatar_url || defaultInstructorImage}
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-[23px]">{review.email || "Anonymous"}</h4>
                          <p className="text-gray-500 text-lg">
                            {new Date(review.rated_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={`text-yellow-500 ${i < review.rating ? "" : "opacity-30"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.review}</p>
                      <button className="text-red-500 flex items-center mt-2 cursor-pointer">
                        <FaReply className="mr-2" /> Reply
                      </button> 
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-8 text-center text-gray-500">
                  <p className="text-xl">No reviews yet. Be the first to leave a review!</p>
                </div>
              )}

              {course.tabs.Reviews && course.tabs.Reviews.length > reviewsPerPage && (
                <div className="mt-6 flex justify-center items-center space-x-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  {[...Array(Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage))].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === idx + 1 ? "bg-black text-white" : "text-black hover:bg-gray-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => 
                      Math.min(Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage), prev + 1)
                    )}
                    disabled={currentPage >= Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage)}
                    className={`p-2 rounded-md ${
                      currentPage >= Math.ceil((course.tabs.Reviews?.length || 0) / reviewsPerPage)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black hover:bg-gray-200"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}

              <div className="mb-6 mt-10">
                <h3 className="text-xl font-bold mb-2">Rate this course</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-3xl cursor-pointer ${
                        (hoveredRating || rating) >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                  {(hoveredRating || rating) > 0 && (
                    <span className="ml-2 text-lg">
                      {["Poor", "Fair", "Good", "Very Good", "Excellent"][
                        (hoveredRating || rating) - 1
                      ]}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-[30px] font-avant-medium font-semibold">Leave A Comment</h2>
                <h2 className="text-[19px]">Your email will not be published. Required fields are marked*</h2>
                <form className="mt-5 space-y-4" onSubmit={(e) => handleSubmitReview(e)}>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      className="w-full border px-5 py-3 text-[18px] rounded-xl"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      className="w-full border px-5 py-3 text-[18px] rounded-xl"
                    />
                  </div>

                  <textarea
                    name="comment"
                    placeholder="Comment"
                    className="w-full h-[120px] border px-5 py-3 text-[18px] rounded-xl resize-none"
                  ></textarea>

                  <input type="hidden" name="rating" value={rating} />

                  <button 
                    type="submit"
                    className="bg-blue-600 text-white text-[18px] font-avant-medium px-5 py-3 rounded-xl cursor-pointer"
                    // disabled={!rating || isSubmitting} 
                  >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              </div>
            </div>
          ) : activeTab === "Instructor" ? (
            <div className="bg-gray p-2">
              {course.tabs.Instructor ? (
                <>
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
                </>
              ) : (
                <div className="text-center py-8">
                  <p>No instructor information available</p>
                </div>
              )}
            </div>
          ) : activeTab === "Curriculum" ? (
            <div className="space-y-4">
              {course.tabs.Curriculum && Array.isArray(course.tabs.Curriculum) && course.tabs.Curriculum.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 border-gray-200">
                  <button
                    className="w-full flex justify-between items-center px-2 py-1 text-[22px] text-black cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <span>{section.title}</span>
                    <span className="text-gray-500">
                      {expandedSections[index] ? "▲" : "▼"}
                    </span>
                  </button>

                  {expandedSections[index] && section.resources && (
                    <div className="mt-3 space-y-4">
                      {section.resources.map((resource, resourceIndex) => (
                        <div
                          key={resourceIndex}
                          className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-xl cursor-pointer group ml-2 mr-2"
                          onClick={() => resource.type === 'video' && handleVideoClick(resource)}
                        >
                          <span
                            className={`text-gray-800 text-[19px] ${
                              resource.isLocked ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            {resource.title}
                          </span>
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-600 px-2 text-[20px]">{resource.duration || (resource.type === 'video' ? '10:00' : 'Reading')}</span>
                            {resource.isLocked ? (
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
              {(!course.tabs.Curriculum || course.tabs.Curriculum.length === 0) && (
                <div className="text-center py-8">
                  <p>No curriculum information available</p>
                </div>
              )}
            </div>
          ) : (
            <p>{typeof course.tabs[activeTab] === "string" ? course.tabs[activeTab] : "Content unavailable."}</p>
          )}
        </div>
      </div>
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
