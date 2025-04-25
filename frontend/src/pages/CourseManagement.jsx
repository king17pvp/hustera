import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";
import React from "react";

// Updated mock data structure with weeks containing videos
const mockCourses = [
  {
    course_ID: "C001",
    title: "Linear Algebra",
    instructor: "Dr. Alice Nguyen",
    category: "Mathematics",
    createdAt: "2023-09-01T10:15:00Z",
    rating: 4.7,
    enrolled: 100, // Added enrolled count
    weeks: [
      {
        week_ID: "W001",
        title: "Introduction to Linear Algebra",
        videos: [
          {
            video_ID: "V001",
            title: "Vectors and Spaces",
            videoUrl: "https://example.com/video/C001/W001/V001",
            completed: 92
          },
          {
            video_ID: "V002",
            title: "Linear Combinations",
            videoUrl: "https://example.com/video/C001/W001/V002",
            completed: 88
          }
        ]
      },
      {
        week_ID: "W002",
        title: "Matrix Transformations",
        videos: [
          {
            video_ID: "V003",
            title: "Matrix Multiplication",
            videoUrl: "https://example.com/video/C001/W002/V003",
            completed: 85
          },
          {
            video_ID: "V004",
            title: "Matrix Inverse",
            videoUrl: "https://example.com/video/C001/W002/V004",
            completed: 82
          }
        ]
      },
      {
        week_ID: "W003",
        title: "Vector Spaces",
        videos: [
          {
            video_ID: "V005",
            title: "Subspaces",
            videoUrl: "https://example.com/video/C001/W003/V005",
            completed: 80
          }
        ]
      },
      {
        week_ID: "W004",
        title: "Eigenvalues & Eigenvectors",
        videos: [
          {
            video_ID: "V006",
            title: "Introduction to Eigenvalues",
            videoUrl: "https://example.com/video/C001/W004/V006",
            completed: 75
          },
          {
            video_ID: "V007",
            title: "Eigenvector Computation",
            videoUrl: "https://example.com/video/C001/W004/V007",
            completed: 70
          }
        ]
      }
    ],
    reviews: [
      {
        review_id: "R001",
        user_id: "U003",
        user_name: "Charlie Le",
        content: "Can someone explain vectors in simple terms?",
        star: 4
      },
      {
        review_id: "R002",
        user_id: "U001",
        user_name: "Alice Nguyen",
        content: "Looking for solid resources to understand matrix operations.",
        star: 5
      },
      {
        review_id: "R003",
        user_id: "U003",
        user_name: "Alice Nguyen",
        content: "Looking for solid resources to understand matrix operations.",
        star: 5
      },
      {
        review_id: "R004",
        user_id: "U004",
        user_name: "Alice Nguyen",
        content: "Looking for solid resources to understand matrix operations.",
        star: 5
      }
    ],
    students: [
      { user_id: "U003", user_name: "Charlie Le", progress: 85 },
      { user_id: "U001", user_name: "Alice Nguyen", progress: 95 },
      { user_id: "U004", user_name: "Minh Vu", progress: 70 }
    ]
  },
  {
    course_ID: "C002",
    title: "React for Beginners",
    instructor: "Bob Tran",
    category: "Programming",
    createdAt: "2024-01-10T14:30:00Z",
    rating: 4.5,
    enrolled: 150,
    weeks: [
      {
        week_ID: "W001",
        title: "Introduction to React",
        videos: [
          {
            video_ID: "V008",
            title: "What is React?",
            videoUrl: "https://example.com/video/C002/W001/V008",
            completed: 90
          },
          {
            video_ID: "V009",
            title: "Setting up your environment",
            videoUrl: "https://example.com/video/C002/W001/V009",
            completed: 88
          }
        ]
      },
      {
        week_ID: "W002",
        title: "JSX & Components",
        videos: [
          {
            video_ID: "V010",
            title: "Understanding JSX",
            videoUrl: "https://example.com/video/C002/W002/V010",
            completed: 85
          },
          {
            video_ID: "V011",
            title: "Creating Your First Component",
            videoUrl: "https://example.com/video/C002/W002/V011",
            completed: 82
          }
        ]
      },
      {
        week_ID: "W003",
        title: "Props & State",
        videos: [
          {
            video_ID: "V012",
            title: "Working with Props",
            videoUrl: "https://example.com/video/C002/W003/V012",
            completed: 80
          },
          {
            video_ID: "V013",
            title: "Managing State",
            videoUrl: "https://example.com/video/C002/W003/V013",
            completed: 75
          }
        ]
      }
    ],
    reviews: [
      {
        review_id: "R003",
        user_id: "U005",
        user_name: "Ethan Do",
        content: "Still confused about the dependency array in useEffect.",
        star: 4
      }
    ],
    students: [
      { user_id: "U005", user_name: "Ethan Do", progress: 65 },
      { user_id: "U006", user_name: "Linh Pham", progress: 90 }
    ]
  },
  {
    course_ID: "C003",
    title: "UI/UX Fundamentals",
    instructor: "Fiona Tran",
    category: "Design",
    createdAt: "2023-06-20T12:00:00Z",
    rating: 4.2,
    enrolled: 75,
    weeks: [
      {
        week_ID: "W001",
        title: "Principles of Design",
        videos: [
          {
            video_ID: "V014",
            title: "Design Theory Basics",
            videoUrl: "https://example.com/video/C003/W001/V014",
            completed: 90
          },
          {
            video_ID: "V015",
            title: "Color Theory",
            videoUrl: "https://example.com/video/C003/W001/V015",
            completed: 85
          }
        ]
      },
      {
        week_ID: "W002",
        title: "Wireframing",
        videos: [
          {
            video_ID: "V016",
            title: "Introduction to Wireframes",
            videoUrl: "https://example.com/video/C003/W002/V016",
            completed: 78
          },
          {
            video_ID: "V017",
            title: "Creating Effective Wireframes",
            videoUrl: "https://example.com/video/C003/W002/V017",
            completed: 75
          }
        ]
      }
    ],
    reviews: [],
    students: [
      { user_id: "U007", user_name: "Nam Bui", progress: 88 }
    ]
  },
  {
    course_ID: "C004",
    title: "Machine Learning Basics",
    instructor: "Ethan Do",
    category: "Data Science",
    createdAt: "2023-11-15T09:00:00Z",
    rating: 4.8,
    enrolled: 200,
    weeks: [
      {
        week_ID: "W001",
        title: "Introduction to ML",
        videos: [
          {
            video_ID: "V018",
            title: "What is Machine Learning?",
            videoUrl: "https://example.com/video/C004/W001/V018",
            completed: 96
          },
          {
            video_ID: "V019",
            title: "Types of ML Algorithms",
            videoUrl: "https://example.com/video/C004/W001/V019",
            completed: 94
          }
        ]
      },
      {
        week_ID: "W002",
        title: "Supervised Learning",
        videos: [
          {
            video_ID: "V020",
            title: "Classification vs Regression",
            videoUrl: "https://example.com/video/C004/W002/V020",
            completed: 95
          },
          {
            video_ID: "V021",
            title: "Decision Trees",
            videoUrl: "https://example.com/video/C004/W002/V021",
            completed: 92
          }
        ]
      },
      {
        week_ID: "W003",
        title: "Unsupervised Learning",
        videos: [
          {
            video_ID: "V022",
            title: "Clustering Algorithms",
            videoUrl: "https://example.com/video/C004/W003/V022",
            completed: 90
          },
          {
            video_ID: "V023",
            title: "Dimensionality Reduction",
            videoUrl: "https://example.com/video/C004/W003/V023",
            completed: 88
          }
        ]
      }
    ],
    reviews: [
      {
        review_id: "R004",
        user_id: "U001",
        user_name: "Alice Nguyen",
        content: "What libraries should I start with for ML in Python?",
        star: 5
      }
    ],
    students: [
      { user_id: "U001", user_name: "Alice Nguyen", progress: 96 },
      { user_id: "U005", user_name: "Ethan Do", progress: 93 }
    ]
  },
  {
    course_ID: "C005",
    title: "Digital Forensics",
    instructor: "Tina Mai",
    category: "Cybersecurity",
    createdAt: "2024-02-20T11:20:00Z",
    rating: 4.0,
    enrolled: 50,
    weeks: [
      {
        week_ID: "W001",
        title: "Introduction to Forensics",
        videos: [
          {
            video_ID: "V024",
            title: "What is Digital Forensics?",
            videoUrl: "https://example.com/video/C005/W001/V024",
            completed: 60
          },
          {
            video_ID: "V025",
            title: "Legal Aspects of Digital Forensics",
            videoUrl: "https://example.com/video/C005/W001/V025",
            completed: 55
          }
        ]
      }
    ],
    reviews: [],
    students: [
      { user_id: "U008", user_name: "Thu Hoang", progress: 60 }
    ]
  }
];

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [displayMode, setDisplayMode] = useState("lessons");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    course_ID: "",
    title: "",
    instructor: "",
    category: "all",
    startDate: "",
    endDate: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/course-management`); // GET /admin/course-management/
        if (response.data && response.data.success && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          const categories = Array.from(new Set(response.data.courses.map(course => course.category).filter(Boolean)));
          setUniqueCategories(categories);
        } else {
          console.error("Unexpected data format received:", response.data);
          setError("Failed to load courses: Unexpected data format from server.");
          setCourses([]);
          setUniqueCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(`Failed to load courses: ${err.response?.data?.message || err.message}`);
        setCourses([]);
        setUniqueCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleExpand = (courseId) => {
    setExpanded(expanded === courseId ? null : courseId);
    setExpandedWeek(null); // Reset expanded week when collapsing or expanding a course
  };

  const handleDelete = async (courseIdToDelete) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to delete user ID ${userIdToDelete}? This action cannot be undone.`)) {
      return;
    }
    try {
      // Controller expects `courseId` in body
      await axios.delete(`http://localhost:5000/admin/course-management/delete-course`, { data: { courseId: courseIdToDelete } });
      setCourses((prev) => prev.filter((c) => c.course_ID !== courseIdToDelete));
      if (expanded === courseIdToDelete) setExpanded(null);
    } catch (err) {
      console.error("Failed to delete course:", err);
      setError(`Failed to delete course: ${err.response?.data?.message || err.message}`);
    }
  };

  // Remove video by courseId, weekId, and videoId
  const handleRemoveVideo = async (courseId, weekId, videoIdToRemove) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to delete this video? This action cannot be undone.`)) {
      return;
    }
    try {
      // Controller expects `videoId` in body
      await axios.delete(`http://localhost:5000/admin/course-management/remove-video`, { data: { videoId: videoIdToRemove } });
      setCourses((prev) =>
        prev.map((c) =>
          c.course_ID === courseId
            ? {
              ...c,
              weeks: c.weeks?.map((w) =>
                w.week_ID === weekId
                  ? { ...w, videos: w.videos?.filter((v) => v.video_ID !== videoIdToRemove) }
                  : w
              ) || [],
            }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to remove video:", err);
      setError(`Failed to remove video: ${err.response?.data?.message || err.message}`);
    }
  };

  // Remove student by courseId + userId
  const handleRemoveStudent = async (courseId, userIdToRemove) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to remove this student from the course? This action cannot be undone.`)) {
      return;
    }
    try {
      // Controller expects `courseId` and `userId` in body
      await axios.delete(`http://localhost:5000/admin/course-management/remove-student`, { data: { courseId: courseId, userId: userIdToRemove } });
      setCourses((prev) =>
        prev.map((c) =>
          c.course_ID === courseId
            ? { ...c, students: c.students?.filter((s) => s.user_ID !== userIdToRemove) || [] }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to remove student:", err);
      setError(`Failed to remove student: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveReview = async (courseId, reviewIdToRemove) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to remove this review from the course? This action cannot be undone.`)) {
      return;
    }
    try {
      // Controller expects `reviewId` in body
      await axios.delete(`http://localhost:5000/admin/course-management/remove-review`, { data: { reviewId: reviewIdToRemove } });
      setCourses((prev) =>
        prev.map((c) =>
          c.course_ID === courseId
            ? { ...c, reviews: c.reviews?.filter((r) => r.review_ID !== reviewIdToRemove) || [] }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to remove review:", err);
      setError(`Failed to remove review: ${err.response?.data?.message || err.message}`);
    }
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
      (filters.course_ID === "" || course.course_ID.toLowerCase().includes(filters.course_ID.toLowerCase())) &&
      (filters.title === "" || course.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.instructor === "" || course.instructor.toLowerCase().includes(filters.instructor.toLowerCase()));

    return searchMatch && categoryMatch && dateMatch && otherFiltersMatch;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Calculate total videos for a course
  const getTotalVideos = (course) => {
    return course.weeks.reduce((total, week) => total + week.videos.length, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
                    <th className="px-6 pt-3 text-right text-xl font-semibold w-[253px]"></th>
                  </tr>
                  <tr>
                    <th className="px-6 py-2">
                      <input
                        type="text"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Filter ID..."
                        value={filters.course_ID}
                        onChange={(e) => handleFilterChange("course_ID", e.target.value)}
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
                      <React.Fragment key={course.course_ID}>
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium text-gray-900">{course.course_ID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-avant-medium font-semibold text-blue-700">{course.title}</td>
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
                                  onClick={() => handleExpand(course.course_ID)}
                                >
                                  {expanded === course.course_ID ? "Collapse" : "Details"}
                                </button>
                                <button
                                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer"
                                  onClick={() => handleDelete(course.course_ID)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expanded === course.course_ID && (
                          <tr>
                            <td colSpan="7" className="bg-gray-50 px-12 py-6 border-b border-t border-gray-300">
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
                                    <span className="font-semibold">Enrolled:</span> {course.students.length} students
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Weeks:</span> {course.weeks.length}
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Videos:</span> {getTotalVideos(course)}
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Created:</span> {new Date(course.createdAt).toLocaleDateString()}
                                  </div>
                                  <div className="font-avant-medium text-lg text-gray-700 mb-1">
                                    <span className="font-semibold">Reviews:</span> {course.reviews.length}
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
                                      className={`px-5 py-3 rounded-none font-semibold border-3 w-36 cursor-pointer mt-[-5px] ${displayMode === "students"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-blue-600 border-blue-600"
                                        }`}
                                      onClick={() => setDisplayMode("students")}
                                    >
                                      Students
                                    </button>
                                    <button
                                      className={`px-5 py-3 rounded-b-xl font-semibold border-3 w-36 cursor-pointer mt-[-5px] ${displayMode === "reviews"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-blue-600 border-blue-600"
                                        }`}
                                      onClick={() => setDisplayMode("reviews")}
                                    >
                                      Reviews
                                    </button>
                                  </div>
                                  <div className="flex-1">
                                    {displayMode === "lessons" ? (
                                      <div className="space-y-2 h-[240px] overflow-y-auto">
                                        {course.weeks.map((week, weekIdx) => (
                                          <div key={weekIdx} className="border border-gray-300 rounded-xl overflow-hidden">
                                            <div
                                              className="bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                                              onClick={() => setExpandedWeek(expandedWeek === weekIdx ? null : weekIdx)}
                                            >
                                              <h3 className="font-medium text-lg text-gray-900">
                                                Week {weekIdx + 1}: {week.title}
                                              </h3>
                                              <svg
                                                className={`h-5 w-5 text-gray-500 transform ${expandedWeek === weekIdx ? 'rotate-180' : ''}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                              </svg>
                                            </div>
                                            {expandedWeek === weekIdx && (
                                              <div className="px-4 py-1">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                  <thead>
                                                    <tr>
                                                      <th className="px-3 py-2 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "40%" }}>Title</th>
                                                      <th className="px-3 py-2 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "40%" }}>Url</th>
                                                      <th className="px-3 py-2 text-center text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>Completion</th>
                                                      <th className="px-3 py-2 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>Actions</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody className="bg-white divide-y divide-gray-200">
                                                    {week.videos.map((video) => (
                                                      <tr key={video.video_ID}>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-600" style={{ width: "40%" }}>{video.title}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-600" style={{ width: "40%" }}>
                                                          {video.videoUrl.length > 50
                                                            ? (
                                                              <a
                                                                href={video.videoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 underline"
                                                              >
                                                                {video.videoUrl.slice(0, 50) + "..."}
                                                              </a>
                                                            )
                                                            : (
                                                              <a
                                                                href={video.videoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 underline"
                                                              >
                                                                {video.videoUrl}
                                                              </a>
                                                            )
                                                          }
                                                        </td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-center text-gray-600" style={{ width: "10%" }}>{video.completed}%</td>
                                                        <td className="px-3 py-2 whitespace-nowrap text-gray-600" style={{ width: "10%" }}>
                                                          <button
                                                            onClick={() => handleRemoveVideo(course.course_ID, week.week_ID, video.video_ID)}
                                                            className="text-red-600 hover:text-red-900"
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
                                        ))}
                                      </div>
                                    ) : displayMode === "students" ? (
                                      <div className="space-y-2 h-[240px] overflow-y-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>ID</th>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "50%" }}>Name</th>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "30%" }}>Progress</th>
                                              <th className="px-6 py-3 text-center text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                            {course.students.map((student) => (
                                              <tr key={student.user_id}>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "10%" }}>{student.user_id}</td>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "50%" }}>{student.user_name}</td>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "30%" }}>
                                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                      className="bg-blue-600 h-2.5 rounded-full"
                                                      style={{ width: `${student.progress}%` }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-sm text-gray-500">{student.progress}%</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap" style={{ width: "10%" }}>
                                                  <button
                                                    onClick={() => handleRemoveStudent(course.course_ID, student.user_id)}
                                                    className="text-red-600 hover:text-red-900"
                                                  >
                                                    Remove
                                                  </button>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    ) : (
                                      <div className="space-y-2 h-[240px] overflow-y-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "30%" }}>User</th>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>Rating</th>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "50%" }}>Content</th>
                                              <th className="px-6 py-3 text-left text-[16px] font-semibold text-gray-800 uppercase tracking-wider" style={{ width: "10%" }}>Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                            {course.reviews.map((review) => (
                                              <tr key={review.review_id}>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "30%" }}>{review.user_name}</td>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "10%" }}>
                                                  <div className="flex">{renderStars(review.star)}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ width: "50%" }}>
                                                  <div className="max-w-[470px] truncate">{review.content}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                  <button
                                                    onClick={() => handleRemoveReview(course.course_ID, review.review_id)}
                                                    className="text-red-600 hover:text-red-900"
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
                      <td colSpan="7" className="px-6 py-4 text-lg text-center text-gray-500">
                        No courses found matching your filters.
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
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-semibold transition ${currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                    }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 rounded-xl font-semibold transition ${currentPage === i
                      ? "bg-blue-100 text-blue-700 border border-blue-600"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                      }`}
                    style={{ minWidth: 44 }}
                  >
                    {i}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
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