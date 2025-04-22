import React from "react";
import { useSelector } from "react-redux";

const CourseSingleHeader = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  // Calculate total number of videos across all weeks
  const totalVideos = course.weeks.reduce((total, week) => {
    return total + week.videos.length;
  }, 0);

  const handleStartNow = async () => {
    if (!user) {
      alert("You must be logged in to start the course.");
      return;
    }
    try {
      await axios.post("/api/user/enroll-course", {
        user_id: user.id,
        course_id: course.course_id,
      });
      // Need something to refresh course UI to manage registered course here //
    } catch (err) {
      console.error("Failed to enroll in course", err);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white p-6 relative font-avant-medium h-80 flex justify-center items-center">
      <div className="max-w-[1680px] w-full flex justify-between items-center relative">
        {/* Course Info Section */}
        <div className="text-left max-w-[1100px]">
          <div className="flex items-center space-x-4">
            <span className="bg-gray-700 text-xl text-white px-4 py-2 rounded-xl">
              {course.category}
            </span>
            <span className="text-xl text-gray-400">
              by {course.instructor.name}
            </span>
          </div>
          <h1 className="text-5xl leading-[1.2] font-avant-medium font-bold mt-3">
            {course.title}
          </h1>
          <div className="flex space-x-4 text-[20px] text-gray-400 mt-4">
            <span>📅 {course.duration} Weeks</span>
            <span>👨‍🎓 {course.enrollment_count} Students</span>
            <span>📊 {course.level}</span>
            <span>📖 {totalVideos} Videos</span>
          </div>
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 items-center text-[18px]">
              <span className="text-[22px] font-bold">Tags: </span>
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white px-4 py-1 rounded-xl"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Course Pricing Section (Falling Out of Bounds) */}
        <div className="absolute right-0 bottom-5 translate-y-1/2 bg-white rounded-2xl shadow-lg w-[510px] h-95 text-center z-10">
          {/* Image Section - Using placeholder with thumbnail_ID reference */}
          <div>
            <img
              src={course.thumbnail_ID}
              alt="Course Preview"
              className="w-full h-70 object-cover rounded-t-xl"
            />
          </div>

          {/* Price & Button Section */}
          <div className="p-6 ml-15 mr-15 flex justify-between items-center">
            <p className="text-2xl font-avant-medium font-bold text-gray-700">
              ${course.price}
            </p>
            <button
              onClick={handleStartNow} 
              className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-avant-medium hover:bg-blue-700 transition cursor-pointer">
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingleHeader;