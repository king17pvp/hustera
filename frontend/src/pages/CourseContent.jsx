import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChevronDown, FaChevronUp, FaPlay, FaBook, FaCheckCircle } from "react-icons/fa";

const CourseContent = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [completedResources, setCompletedResources] = useState([]);
  const videoRef = useRef(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        const data = await response.json();
        
        if (data.success && data.course) {
          console.log("Course data:", data.course);
          
          // Thêm xử lý dữ liệu trước khi hiển thị
          const processedCourse = {
            ...data.course,
            tabs: {
              ...data.course.tabs,
              Curriculum: data.course.tabs.Curriculum.map(week => ({
                ...week,
                resources: week.resources.map(resource => ({
                  ...resource,
                  // Đảm bảo URL video là đường dẫn có ý nghĩa (không phải example.com)
                  url: resource.type === 'video' && resource.url && resource.url.includes('example.com')
                    ? 'https://www.youtube.com/embed/W6NZfCO5SIk' // Default JavaScript tutorial
                    : resource.url
                }))
              }))
            }
          };
          
          setCourse(processedCourse);
          
          // Expand the first week by default
          if (processedCourse.tabs.Curriculum?.length > 0) {
            setExpandedWeeks({ 0: true });
            
            // Select the first resource of the first week by default
            const firstWeek = processedCourse.tabs.Curriculum[0];
            if (firstWeek?.resources?.length > 0) {
              setSelectedResource(firstWeek.resources[0]);
            }
          }
        } else {
          setError("Course not found");
          navigate("/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseContent();
    }
  }, [id, navigate]);

  const toggleWeek = (index) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const selectResource = (resource) => {
    setSelectedResource(resource);
    // Scroll to top of content area when new resource is selected
    window.scrollTo(0, 0);
  };
  
  const markAsCompleted = (resourceId) => {
    setCompletedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar currentState="Courses" />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading course content...</p>
        </div>
      </div>
    );
  }
  
  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar currentState="Courses" />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-red-500">{error || "Course not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentState="Courses" />
      
      <div className="flex flex-grow">
        {/* Left Sidebar - Course Navigation */}
        <div className="w-1/4 bg-gray-100 p-6 border-r overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.author}</p>
          </div>
          
          {/* Course Curriculum Navigation */}
          <div className="space-y-4">
            {course.tabs.Curriculum.map((week, weekIndex) => (
              <div key={weekIndex} className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                {/* Week Header - Clickable */}
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-semibold hover:bg-gray-50 focus:outline-none"
                  onClick={() => toggleWeek(weekIndex)}
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {weekIndex + 1}
                    </span>
                    <span className="text-lg">Week {weekIndex + 1}: {week.title}</span>
                  </span>
                  <span>
                    {expandedWeeks[weekIndex] ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                
                {/* Resources List - Shown when expanded */}
                {expandedWeeks[weekIndex] && week.resources && week.resources.length > 0 ? (
                  <div className="border-t border-gray-300">
                    {week.resources.map((resource, resourceIndex) => (
                      <button
                        key={resourceIndex}
                        className={`w-full text-left p-4 pl-12 flex items-center gap-3 hover:bg-gray-50 ${
                          selectedResource?.id === resource.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => selectResource(resource)}
                      >
                        {/* Resource Icon based on type */}
                        <span className={`${
                          completedResources.includes(resource.id) ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {completedResources.includes(resource.id) ? (
                            <FaCheckCircle size={18} />
                          ) : resource.type === 'video' ? (
                            <FaPlay size={14} />
                          ) : (
                            <FaBook size={14} />
                          )}
                        </span>
                        
                        {/* Resource Title */}
                        <span className={`flex-grow ${
                          completedResources.includes(resource.id) ? 'line-through text-gray-500' : ''
                        }`}>
                          {resource.title}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : expandedWeeks[weekIndex] ? (
                  <div className="border-t border-gray-300 p-4 text-center text-gray-500">
                    No lessons available for this week.
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="w-3/4 p-8 overflow-y-auto">
          {selectedResource ? (
            <div>
              <h1 className="text-3xl font-bold mb-6">{selectedResource.title}</h1>
              
              {/* Resource Content - Video or Text */}
              <div className="mb-8">
                {selectedResource.type === 'video' && selectedResource.url ? (
                  <div className="aspect-w-16 aspect-h-9 mb-6">
                    <iframe
                      className="w-full h-[500px] rounded-lg"
                      src={selectedResource.url}
                      title={selectedResource.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      ref={videoRef}
                    ></iframe>
                  </div>
                ) : selectedResource.type === 'text' && selectedResource.content ? (
                  <div className="prose prose-lg max-w-none bg-white p-6 rounded-lg shadow">
                    <div 
                      dangerouslySetInnerHTML={{ __html: selectedResource.content }} 
                      className="lecture-content"
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    Content not available for this resource.
                  </div>
                )}
              </div>
              
              {/* Mark as Completed Button */}
              <div className="flex justify-end mt-6">
                <button
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium ${
                    completedResources.includes(selectedResource.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                  onClick={() => markAsCompleted(selectedResource.id)}
                >
                  {completedResources.includes(selectedResource.id) ? (
                    <>
                      <FaCheckCircle /> Marked as Complete
                    </>
                  ) : (
                    <>
                      <FaCheckCircle /> Mark as Complete
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl text-gray-500">
                Select a resource from the course navigation to start learning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
