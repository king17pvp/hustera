import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import React from "react";

const mockCourses = [
  {
    course_id: "C001",
    title: "Linear Algebra",
    instructor: "Dr. Alice Nguyen",
    category: "Mathematics",
    createdAt: "2023-09-01T10:15:00Z",
    enrolled: 95,
    rating: 4.7,
    lessons: [
      { title: "Introduction to Linear Algebra", completed: 92 },
      { title: "Matrix Transformations", completed: 85 },
      { title: "Vector Spaces", completed: 80 },
      { title: "Eigenvalues & Eigenvectors", completed: 75 }
    ],
    discussions: [
      { title: "What is a vector?", replies: 4 },
      { title: "Best resources for matrices?", replies: 2 }
    ]
  },
  {
    course_id: "C002",
    title: "React for Beginners",
    instructor: "Bob Tran",
    category: "Programming",
    createdAt: "2024-01-10T14:30:00Z",
    enrolled: 120,
    rating: 4.5,
    lessons: [
      { title: "JSX & Components", completed: 88 },
      { title: "Props & State", completed: 80 },
      { title: "Hooks", completed: 70 }
    ],
    discussions: [
      { title: "How to use useEffect?", replies: 5 }
    ]
  },
  {
    course_id: "C003",
    title: "UI/UX Fundamentals",
    instructor: "Fiona Tran",
    category: "Design",
    createdAt: "2023-06-20T12:00:00Z",
    enrolled: 60,
    rating: 4.2,
    lessons: [
      { title: "Principles of Design", completed: 90 },
      { title: "Wireframing", completed: 78 }
    ],
    discussions: []
  },
  {
    course_id: "C004",
    title: "Machine Learning Basics",
    instructor: "Ethan Do",
    category: "Data Science",
    createdAt: "2023-11-15T09:00:00Z",
    enrolled: 150,
    rating: 4.8,
    lessons: [
      { title: "Supervised Learning", completed: 95 },
      { title: "Unsupervised Learning", completed: 90 }
    ],
    discussions: [
      { title: "Best ML libraries?", replies: 3 }
    ]
  },
  {
    course_id: "C005",
    title: "Digital Forensics",
    instructor: "Tina Mai",
    category: "Cybersecurity",
    createdAt: "2024-02-20T11:20:00Z",
    enrolled: 40,
    rating: 4.0,
    lessons: [
      { title: "Introduction to Forensics", completed: 60 }
    ],
    discussions: []
  }
];

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [displayMode, setDisplayMode] = useState("lessons");

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    course_id: "",
    title: "",
    instructor: "",
    category: "all",
    startDate: "",
    endDate: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const uniqueCategories = Array.from(new Set(mockCourses.map(course => course.category)));

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const handleExpand = (courseId) => {
    setExpanded(expanded === courseId ? null : courseId);
  };

  const handleDelete = (courseId) => {
    setCourses(courses.filter((c) => c.course_id !== courseId));
  };

  const handleRemoveLesson = (courseId, lessonIdx) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.course_id === courseId ? { ...c, lessons: c.lessons.filter((_, i) => i !== lessonIdx) } : c
      )
    );
  };

  const handleRemoveStudent = (courseId, studentIdx) => {
    // Implementation for removing a student
    console.log(`Removing student ${studentIdx} from course ${courseId}`);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter(course => {
    const searchMatch = searchTerm === "" ||
      Object.values(course).some(val =>
        val && typeof val === 'string' &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const categoryMatch = filters.category === "all" || course.category === filters.category;

    let dateMatch = true;
    const courseDate = new Date(course.createdAt);

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      dateMatch = dateMatch && courseDate >= startDate;
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      dateMatch = dateMatch && courseDate <= endDate;
    }

    const otherFiltersMatch =
      (filters.course_id === "" || course.course_id.toLowerCase().includes(filters.course_id.toLowerCase())) &&
      (filters.title === "" || course.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.instructor === "" || course.instructor.toLowerCase().includes(filters.instructor.toLowerCase()));

    return searchMatch && categoryMatch && dateMatch && otherFiltersMatch;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Admin", "Course Management"]} />

      <div className="flex-grow px-4 py-8 w-full max-w-[1700px] mx-auto">
        <div className="w-full flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mt-10">
              Course Management
            </h2>
          </div>

          {/* Course listing table with filters under column names */}
          <div className="border-3 rounded-2xl bg-white overflow-hidden mb-6">
            <div className="overflow-y-auto max-h-[800px]">
              <table
                className="min-w-full font-avant-medium divide-y divide-gray-200"
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                }}
              >
                <colgroup>
                  <col style={{ width: "150px" }} />
                  <col style={{ width: "560px" }} />
                  <col style={{ width: "250px" }} />
                  <col style={{ width: "250px" }} />
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "1fr" }} />
                </colgroup>
                <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Course ID</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Title</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Instructor</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Category</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Creation Date</th>
                    <th className="px-6 pt-3 text-right text-xl font-semibold w-[250px]"></th>
                  </tr>
                  <tr>
                    <th className="px-6 py-2">
                      <input
                        type="text"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Filter ID..."
                        value={filters.course_id}
                        onChange={(e) => handleFilterChange("course_id", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <input
                        type="text"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Filter title..."
                        value={filters.title}
                        onChange={(e) => handleFilterChange("title", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <input
                        type="text"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Filter instructor..."
                        value={filters.instructor}
                        onChange={(e) => handleFilterChange("instructor", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <select
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        value={filters.category}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {uniqueCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </th>
                    <th className="px-6 py-2">
                      <div className="flex gap-1 items-center">
                        <input
                          type="date"
                          className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                          value={filters.startDate}
                          onChange={(e) => handleFilterChange("startDate", e.target.value)}
                        />
                        <span className="text-gray-400 text-lg px-1">to</span>
                        <input
                          type="date"
                          className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                          value={filters.endDate}
                          onChange={(e) => handleFilterChange("endDate", e.target.value)}
                        />
                      </div>
                    </th>
                    <th className="px-6 py-2 text-right">
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCourses.length > 0 ? (
                    currentCourses.map((course) => (
                      <React.Fragment key={course.course_id}>
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-900">{course.course_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-700">{course.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-700">{course.instructor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-700">
                            <span className="px-5 py-1 rounded-2xl bg-gray-200 text-gray-700 font-semibold text-lg">
                              {course.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-700">
                            {new Date(course.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-lg font-avant-medium align-middle">
                            <div className="flex w-full h-full">
                              <div className="flex gap-3 ml-[-30px]">
                                <button
                                  className="px-4 py-2 rounded-xl w-[120px] bg-blue-600 text-white font-avant-medium hover:bg-blue-800 transition cursor-pointer"
                                  onClick={() => handleExpand(course.course_id)}
                                >
                                  {expanded === course.course_id ? "Collapse" : "Details"}
                                </button>
                                <button
                                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer"
                                  onClick={() => handleDelete(course.course_id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expanded === course.course_id && (
                          <tr>
                            <td colSpan="7" className="bg-gray-50 px-12 py-6 border-b">
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in-down">
                                {/* Course Details */}
                                <div className="md:col-span-1 flex flex-col justify-center">
                                  <div className="mb-2 text-[21px] font-avant-medium font-semibold text-gray-800">
                                    Course Details
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Rating:</span> {course.rating}/5.0
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Enrolled:</span> {course.enrolled} students
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Lessons:</span> {course.lessons.length}
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Created:</span> {new Date(course.createdAt).toLocaleDateString()}
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Discussions:</span> {course.discussions.length}
                                  </div>
                                </div>
                                {/* Toggle + Content Container */}
                                <div className="md:col-span-4 flex flex-col md:flex-row font-avant-medium">
                                  <div className="flex flex-col items-start justify-center pr-8 mb-4 md:mb-0">
                                    <button
                                      className={`px-5 py-3 rounded-t-xl font-semibold border-3 w-36 cursor-pointer ${displayMode === "lessons"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-blue-600 border-blue-600"
                                        }`}
                                      onClick={() => setDisplayMode("lessons")}
                                    >
                                      Curriculum
                                    </button>
                                    <button
                                      className={`px-5 py-3 rounded-b-xl font-semibold border-3 w-36 cursor-pointer ${displayMode === "discussions"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-blue-600 border-blue-600"
                                        }`}
                                      onClick={() => setDisplayMode("discussions")}
                                    >
                                      Students Enrolled
                                    </button>
                                  </div>
                                  <div className="flex-1">
                                    {displayMode === "lessons" ? (
                                      <div className="space-y-2">
                                        {course.lessons.map((lesson, idx) => (
                                          <div key={idx} className="border border-gray-300 rounded-xl overflow-hidden">
                                            <div
                                              className="bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                                              onClick={() => setExpandedWeek(expandedWeek === idx ? null : idx)}
                                            >
                                              <h3 className="font-medium text-lg text-gray-900">
                                                Week {idx + 1}: {lesson.title}
                                              </h3>
                                              <svg
                                                className={`h-5 w-5 text-gray-500 transform ${expandedWeek === idx ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                              </svg>
                                            </div>
                                            {expandedWeek === idx && (
                                              <div className="p-4">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                  <thead className="bg-gray-50">
                                                    <tr>
                                                      <th scope="col" className="px-4 py-3 text-left text-[16px] font-medium text-gray-500 uppercase">Video Title</th>
                                                      <th scope="col" className="px-4 py-3 text-left text-[16px] font-medium text-gray-500 uppercase">Video URL</th>
                                                      <th scope="col" className="px-4 py-3 text-center text-[16px] font-medium text-gray-500 uppercase">Students Watched</th>
                                                      <th scope="col" className="px-4 py-3 text-right text-[16px] font-medium text-gray-500 uppercase">Actions</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                      <td className="px-4 py-3 text-[16px] text-gray-900">{lesson.title}</td>
                                                      <td className="px-4 py-3 text-[16px] text-blue-600">https://example.com/video{idx + 1}</td>
                                                      <td className="px-4 py-3 text-[16px] text-gray-900 text-center">
                                                        {lesson.completed}% ({Math.floor(course.enrolled * lesson.completed / 100)}/{course.enrolled})
                                                      </td>
                                                      <td className="px-4 py-3 text-right">
                                                        <button
                                                          className="text-red-600 hover:text-red-900"
                                                          onClick={() => handleRemoveLesson(course.course_id, idx)}
                                                        >
                                                          Remove
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="overflow-x-auto max-h-60">
                                        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
                                          <thead className="bg-gray-200">
                                            <tr>
                                              <th scope="col" className="px-4 py-3 text-left text-lg font-medium text-gray-500">Student Name</th>
                                              <th scope="col" className="px-4 py-3 text-center text-lg font-medium text-gray-500">Progress</th>
                                              <th scope="col" className="px-4 py-3 text-center text-lg font-medium text-gray-500">Enrolled Date</th>
                                              <th scope="col" className="px-4 py-3 text-right text-lg font-medium text-gray-500">Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                            {Array.from({ length: Math.min(5, course.enrolled) }).map((_, idx) => (
                                              <tr key={idx}>
                                                <td className="px-4 py-3 text-[16px] text-gray-900">Student {idx + 1}</td>
                                                <td className="px-4 py-3 text-[16px] text-gray-900 text-center">{Math.floor(Math.random() * 100)}%</td>
                                                <td className="px-4 py-3 text-[16px] text-gray-500 text-center">
                                                  {new Date(new Date(course.createdAt).getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                  <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleRemoveStudent(course.course_id, idx)}
                                                  >
                                                    Remove
                                                  </button>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-lg text-gray-500 font-avant-medium">
                        No courses found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-8 py-4 bg-gray-50 font-avant-medium border-t border-gray-200 flex items-center justify-between">
              <div className="text-gray-600">
                Showing {filteredCourses.length === 0 ? 0 : indexOfFirstCourse + 1}
                -
                {Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} courses
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                    }`}
                >
                  Previous
                </button>
                {(() => {
                  const pages = [];
                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 ||
                      i === totalPages ||
                      (i >= currentPage - 1 && i <= currentPage + 1)
                    ) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => paginate(i)}
                          className={`px-4 py-2 rounded-xl font-semibold transition ${currentPage === i
                            ? "bg-blue-100 text-blue-700 border border-blue-600"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                            }`}
                          style={{ minWidth: 44 }}
                        >
                          {i}
                        </button>
                      );
                    } else if (
                      (i === currentPage - 2 && currentPage > 3) ||
                      (i === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      pages.push(
                        <span
                          key={i}
                          className="px-3 py-2 text-gray-400 font-semibold"
                        >
                          ...
                        </span>
                      );
                    }
                  }
                  return pages;
                })()}
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${currentPage === totalPages || totalPages === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseManagement;