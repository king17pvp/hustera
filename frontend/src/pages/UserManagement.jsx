import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";

// Mock data updated for demo
const mockUsers = [
  {
    user_id: "U001",
    name: "Alice Nguyen",
    email: "alice@example.com",
    role: "student",
    dob: "2002-05-10",
    gender: "Female",
    createdAt: "2023-09-01T10:15:00Z",
    enrolledCourses: [
      { name: "React Basics", progress: "5/10" },
      { name: "Data Science 101", progress: "7/12" },
      { name: "Python Intro", progress: "2/8" },
    ],
    threads: [
      { title: "How to use hooks?", upvotes: 12, downvotes: 1, answers: 3 },
      { title: "Best resources for JS?", upvotes: 7, downvotes: 0, answers: 2 },
      { title: "React state tips?", upvotes: 5, downvotes: 2, answers: 1 },
    ],
  },
  {
    user_id: "U002",
    name: "Bob Tran",
    email: "bob@example.com",
    role: "admin",
    dob: "1999-11-23",
    gender: "Male",
    createdAt: "2022-12-15T08:30:00Z",
    enrolledCourses: [
      { name: "Advanced CSS", progress: "10/10" },
      { name: "Node.js Fundamentals", progress: "8/10" },
    ],
    threads: [
      { title: "Deploying Node apps", upvotes: 3, downvotes: 0, answers: 1 },
      { title: "CSS Grid vs Flexbox", upvotes: 2, downvotes: 1, answers: 0 },
    ],
  },
  {
    user_id: "U003",
    name: "Charlie Le",
    email: "charlie@example.com",
    role: "student",
    dob: "2001-07-15",
    gender: "Male",
    createdAt: "2023-06-20T12:00:00Z",
    enrolledCourses: [
      { name: "Java Basics", progress: "4/10" },
      { name: "Spring Boot Essentials", progress: "1/5" },
    ],
    threads: [
      { title: "How to debug Java?", upvotes: 4, downvotes: 1, answers: 2 },
    ],
  },
  {
    user_id: "U004",
    name: "Diana Pham",
    email: "diana@example.com",
    role: "instructor",
    dob: "1995-04-01",
    gender: "Female",
    createdAt: "2021-09-10T14:45:00Z",
    enrolledCourses: [],
    threads: [
      { title: "Best practices for teaching online", upvotes: 10, downvotes: 0, answers: 5 },
    ],
  },
  {
    user_id: "U005",
    name: "Ethan Do",
    email: "ethan@example.com",
    role: "student",
    dob: "2003-01-30",
    gender: "Male",
    createdAt: "2024-01-05T09:25:00Z",
    enrolledCourses: [
      { name: "Machine Learning", progress: "3/10" },
      { name: "Deep Learning with PyTorch", progress: "0/8" },
    ],
    threads: [],
  },
  {
    user_id: "U006",
    name: "Fiona Tran",
    email: "fiona@example.com",
    role: "student",
    dob: "2000-08-12",
    gender: "Female",
    createdAt: "2023-03-18T17:00:00Z",
    enrolledCourses: [
      { name: "HTML & CSS", progress: "10/10" },
      { name: "Responsive Design", progress: "9/10" },
      { name: "UI/UX Fundamentals", progress: "6/10" },
    ],
    threads: [
      { title: "How to improve UI design?", upvotes: 9, downvotes: 0, answers: 2 },
    ],
  },
  {
    user_id: "U007",
    name: "George Vu",
    email: "george@example.com",
    role: "admin",
    dob: "1998-05-17",
    gender: "Male",
    createdAt: "2022-05-25T11:20:00Z",
    enrolledCourses: [],
    threads: [],
  },
  {
    user_id: "U008",
    name: "Hannah Ly",
    email: "hannah@example.com",
    role: "instructor",
    dob: "1996-03-09",
    gender: "Female",
    createdAt: "2021-11-01T16:30:00Z",
    enrolledCourses: [],
    threads: [
      { title: "How to structure advanced Python courses?", upvotes: 6, downvotes: 1, answers: 4 },
    ],
  },
  {
    user_id: "U009",
    name: "Isaac Ho",
    email: "isaac@example.com",
    role: "student",
    dob: "2004-06-22",
    gender: "Male",
    createdAt: "2024-02-10T10:00:00Z",
    enrolledCourses: [
      { name: "JavaScript Basics", progress: "1/10" },
      { name: "Game Development with Phaser", progress: "3/12" },
    ],
    threads: [],
  },
  {
    user_id: "U010",
    name: "Jasmine Vo",
    email: "jasmine@example.com",
    role: "student",
    dob: "2001-09-14",
    gender: "Female",
    createdAt: "2023-07-28T07:45:00Z",
    enrolledCourses: [
      { name: "Intro to AI", progress: "8/10" },
      { name: "Natural Language Processing", progress: "2/6" },
    ],
    threads: [
      { title: "Resources for learning AI?", upvotes: 11, downvotes: 0, answers: 3 },
    ],
  },
  {
    user_id: "U011",
    name: "Kevin Bui",
    email: "kevin@example.com",
    role: "student",
    dob: "2002-10-01",
    gender: "Male",
    createdAt: "2023-11-20T09:00:00Z",
    enrolledCourses: [
      { name: "Web Security", progress: "5/10" },
    ],
    threads: [],
  },
  {
    user_id: "U012",
    name: "Linda Phan",
    email: "linda@example.com",
    role: "instructor",
    dob: "1989-06-06",
    gender: "Female",
    createdAt: "2020-02-10T10:30:00Z",
    enrolledCourses: [],
    threads: [
      { title: "Teaching strategies for Gen Z", upvotes: 13, downvotes: 2, answers: 6 },
    ],
  },
  {
    user_id: "U013",
    name: "Mike Dang",
    email: "mike@example.com",
    role: "student",
    dob: "2001-04-12",
    gender: "Male",
    createdAt: "2024-03-01T12:10:00Z",
    enrolledCourses: [
      { name: "Algorithms", progress: "6/10" },
    ],
    threads: [],
  },
  {
    user_id: "U014",
    name: "Nina Le",
    email: "nina@example.com",
    role: "student",
    dob: "2003-09-22",
    gender: "Female",
    createdAt: "2023-08-15T08:50:00Z",
    enrolledCourses: [
      { name: "UI Animation", progress: "3/6" },
    ],
    threads: [
      { title: "Best tools for animation?", upvotes: 4, downvotes: 1, answers: 2 },
    ],
  },
  {
    user_id: "U015",
    name: "Oscar Tran",
    email: "oscar@example.com",
    role: "admin",
    dob: "1990-12-25",
    gender: "Male",
    createdAt: "2021-01-05T10:10:00Z",
    enrolledCourses: [],
    threads: [],
  },
  {
    user_id: "U016",
    name: "Phuong Hoang",
    email: "phuong@example.com",
    role: "student",
    dob: "2000-11-17",
    gender: "Female",
    createdAt: "2024-01-10T14:30:00Z",
    enrolledCourses: [
      { name: "Statistics", progress: "7/9" },
      { name: "Linear Algebra", progress: "4/6" },
    ],
    threads: [],
  },
  {
    user_id: "U017",
    name: "Quang Dinh",
    email: "quang@example.com",
    role: "student",
    dob: "2002-02-14",
    gender: "Male",
    createdAt: "2023-12-01T15:00:00Z",
    enrolledCourses: [
      { name: "Docker Basics", progress: "5/7" },
    ],
    threads: [
      { title: "Why use Docker for ML?", upvotes: 6, downvotes: 0, answers: 2 },
    ],
  },
  {
    user_id: "U018",
    name: "Rachel Ngo",
    email: "rachel@example.com",
    role: "instructor",
    dob: "1993-07-19",
    gender: "Female",
    createdAt: "2022-04-11T09:00:00Z",
    enrolledCourses: [],
    threads: [
      { title: "Creating inclusive content", upvotes: 8, downvotes: 0, answers: 3 },
    ],
  },
  {
    user_id: "U019",
    name: "Steven Lam",
    email: "steven@example.com",
    role: "student",
    dob: "2005-05-05",
    gender: "Male",
    createdAt: "2024-02-20T11:20:00Z",
    enrolledCourses: [
      { name: "Game Design", progress: "2/8" },
    ],
    threads: [],
  },
  {
    user_id: "U020",
    name: "Tina Mai",
    email: "tina@example.com",
    role: "student",
    dob: "2001-03-08",
    gender: "Female",
    createdAt: "2023-05-29T07:45:00Z",
    enrolledCourses: [
      { name: "Intro to Cybersecurity", progress: "6/10" },
      { name: "Digital Forensics", progress: "3/7" },
    ],
    threads: [
      { title: "What tools for beginners?", upvotes: 9, downvotes: 1, answers: 4 },
    ],
  },
];


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [displayMode, setDisplayMode] = useState("courses");

  // New state for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    user_id: "",
    name: "",
    email: "",
    role: "all", // Changed to "all" as default
    startDate: "",
    endDate: "" // Added end date
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleExpand = (userId) => {
    setExpanded(expanded === userId ? null : userId);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((u) => u.user_id !== userId));
  };

  const handleRemoveCourse = (userId, courseIdx) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId
          ? { ...u, enrolledCourses: u.enrolledCourses.filter((_, i) => i !== courseIdx) }
          : u
      )
    );
  };

  const handleRemoveThread = (userId, threadIdx) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId
          ? { ...u, threads: u.threads.filter((_, i) => i !== threadIdx) }
          : u
      )
    );
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Filter users based on search term and column filters
  const filteredUsers = users.filter(user => {
    // Check if user matches search term (across all fields)
    const searchMatch = searchTerm === "" ||
      Object.values(user).some(val =>
        val && typeof val === 'string' &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Role filter check
    const roleMatch = filters.role === "all" || user.role === filters.role;

    // Date range filter
    let dateMatch = true;
    const userDate = new Date(user.createdAt);

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      dateMatch = dateMatch && userDate >= startDate;
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      // Set time to end of day for inclusive range
      endDate.setHours(23, 59, 59, 999);
      dateMatch = dateMatch && userDate <= endDate;
    }

    // Check if user matches other column filters
    const otherFiltersMatch =
      (filters.user_id === "" || user.user_id.toLowerCase().includes(filters.user_id.toLowerCase())) &&
      (filters.name === "" || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.email === "" || user.email.toLowerCase().includes(filters.email.toLowerCase()));

    return searchMatch && roleMatch && dateMatch && otherFiltersMatch;
  });

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Admin", "User Management"]} />

      {/* Main Content Container */}
      <div className="flex-grow px-3 py-10 w-full max-w-[1700px] mx-auto">
        <div className="w-full flex-col">
          <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mt-10 mb-10">
            User Management
          </h2>

          <div className="border-3 rounded-2xl bg-white overflow-hidden">
            {/* Table Container with fixed height for scrolling */}
            <div className="overflow-y-auto max-h-[800px]">
              {/* Table Header with Filters */}
              <div className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-200">
                <div
                  className="px-8 py-4 font-avant-medium font-semibold text-[20px] text-gray-700"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 300px 400px 170px 220px 1fr",
                    columnGap: "24px",
                  }}
                >
                  <div className="flex flex-col">
                    <div className="mb-2">User ID</div>
                    <input
                      type="text"
                      className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                      placeholder="Filter ID..."
                      value={filters.user_id}
                      onChange={(e) => handleFilterChange("user_id", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2">Name</div>
                    <input
                      type="text"
                      className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                      placeholder="Filter name..."
                      value={filters.name}
                      onChange={(e) => handleFilterChange("name", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2">Email</div>
                    <input
                      type="text"
                      className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                      placeholder="Filter email..."
                      value={filters.email}
                      onChange={(e) => handleFilterChange("email", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2">Role</div>
                    <select
                      className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                      value={filters.role}
                      onChange={(e) => handleFilterChange("role", e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <div className="mb-2">Joined Date Range</div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="date"
                        className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Start date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange("startDate", e.target.value)}
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        className="px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="End date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange("endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <div key={user.user_id} className="border-b border-gray-100">
                    <div
                      className="font-avant-medium text-lg text-gray-600 items-center px-8 py-4"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 300px 400px 170px 220px 1fr",
                        columnGap: "24px",
                      }}
                    >
                      <div className="flex items-center text-black">{user.user_id}</div>
                      <div className="flex items-center">{user.name}</div>
                      <div className="flex items-center">{user.email}</div>
                      <div className="flex items-center">
                        <span className="px-5 py-1 rounded-2xl bg-gray-200 text-gray-700 font-semibold text-lg">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "-"}
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <button
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-avant-medium hover:bg-blue-800 transition cursor-pointer"
                          onClick={() => handleExpand(user.user_id)}
                        >
                          {expanded === user.user_id ? "Hide" : "View More"}
                        </button>
                        <button
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer"
                          onClick={() => handleDelete(user.user_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expanded === user.user_id && (
                      <div className="bg-gray-50 px-12 py-6 grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in-down">
                        {/* User Details */}
                        <div className="md:col-span-1 flex flex-col justify-center">
                          <div className="mb-2 text-[21px] font-avant-medium font-semibold text-gray-800">
                            User Details
                          </div>
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">Name:</span> {user.name}
                          </div>
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">DOB:</span> {user.dob}
                          </div>
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">Gender:</span> {user.gender}
                          </div>
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">Courses Enrolled:</span> {user.enrolledCourses.length}
                          </div>
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">Threads Started:</span> {user.threads.length}
                          </div>
                        </div>
                        {/* Toggle (vertical) + Table Container */}
                        <div className="md:col-span-4 flex flex-col md:flex-row font-avant-medium">
                          {/* Toggle vertical */}
                          <div className="flex flex-col items-start justify-center pr-8 mb-4 md:mb-0">
                            <button
                              className={`px-5 py-3 rounded-t-xl font-semibold border-3 w-36 cursor-pointer ${displayMode === "courses"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-blue-600 border-blue-600"
                                }`}
                              onClick={() => setDisplayMode("courses")}
                            >
                              Courses
                            </button>
                            <button
                              className={`px-5 py-3 rounded-b-xl font-semibold border-3 w-36 cursor-pointer ${displayMode === "threads"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-blue-600 border-blue-600"
                                }`}
                              onClick={() => setDisplayMode("threads")}
                            >
                              Threads
                            </button>
                          </div>
                          {/* Table area */}
                          <div className="flex-1">
                            {displayMode === "courses" ? (
                              <div className="overflow-x-auto max-h-60">
                                <table className="min-w-[400px] w-full text-left font-avant-medium border border-gray-300 rounded-xl overflow-hidden">
                                  <thead>
                                    <tr className="bg-gray-200 text-lg text-gray-700">
                                      <th className="py-2 px-4 w-[85%]">Course Name</th>
                                      <th className="py-2 px-4 w-[15%] text-center">Progress</th>
                                      <th className="py-2 px-4 w-0"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {user.enrolledCourses.length > 0 ? (
                                      user.enrolledCourses.map((course, idx) => (
                                        <tr key={idx} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                          <td className="py-2 px-4 w-[85%]">{course.name}</td>
                                          <td className="py-2 px-4 w-[15%] text-center">{course.progress}</td>
                                          <td className="py-2 px-4 text-right w-0">
                                            <button
                                              className="px-4 py-1 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-700"
                                              onClick={() => handleRemoveCourse(user.user_id, idx)}
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={3} className="py-2 px-4 text-gray-400">
                                          No courses
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="overflow-x-auto max-h-60">
                                <table className="min-w-[400px] w-full text-left font-avant-medium border border-gray-300 rounded-xl overflow-hidden">
                                  <thead>
                                    <tr className="bg-gray-200 text-lg text-gray-700">
                                      <th className="py-2 px-4 w-[70%]">Title</th>
                                      <th className="py-2 px-4 w-[10%] text-center">Upvotes</th>
                                      <th className="py-2 px-4 w-[10%] text-center">Downvotes</th>
                                      <th className="py-2 px-4 w-[10%] text-center">Answers</th>
                                      <th className="py-2 px-4 w-0"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {user.threads.length > 0 ? (
                                      user.threads.map((thread, idx) => (
                                        <tr key={idx} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                          <td className="py-2 px-4 w-[70%]">{thread.title}</td>
                                          <td className="py-2 px-4 w-[10%] text-center">{thread.upvotes}</td>
                                          <td className="py-2 px-4 w-[10%] text-center">{thread.downvotes}</td>
                                          <td className="py-2 px-4 w-[10%] text-center">{thread.answers}</td>
                                          <td className="py-2 px-4 text-right w-0">
                                            <button
                                              className="px-4 py-1 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-700"
                                              onClick={() => handleRemoveThread(user.user_id, idx)}
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={5} className="py-2 px-4 text-gray-400">
                                          No threads
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 font-avant-medium text-lg">
                  No users found matching your filters
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="px-8 py-4 bg-gray-50 font-avant-medium border-t border-gray-200 flex items-center justify-between">
              <div className="text-gray-600">
                Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl ${currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                    } transition`}
                >
                  Previous
                </button>

                {/* Limited pagination numbers logic */}
                {(() => {
                  const pageNumbers = [];
                  const maxButtons = 5; // Maximum number of page buttons to show

                  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

                  // Adjust if we're near the end
                  if (endPage - startPage + 1 < maxButtons && startPage > 1) {
                    startPage = Math.max(1, endPage - maxButtons + 1);
                  }

                  // First page
                  if (startPage > 1) {
                    pageNumbers.push(
                      <button
                        key={1}
                        onClick={() => paginate(1)}
                        className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                      >
                        1
                      </button>
                    );

                    // Ellipsis if needed
                    if (startPage > 2) {
                      pageNumbers.push(
                        <span key="start-ellipsis" className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                  }

                  // Visible page numbers
                  for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(
                      <button
                        key={i}
                        onClick={() => paginate(i)}
                        className={`px-4 py-2 rounded-xl ${currentPage === i
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          } transition`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // Last page
                  if (endPage < totalPages) {
                    // Ellipsis if needed
                    if (endPage < totalPages - 1) {
                      pageNumbers.push(
                        <span key="end-ellipsis" className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    pageNumbers.push(
                      <button
                        key={totalPages}
                        onClick={() => paginate(totalPages)}
                        className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pageNumbers;
                })()}

                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-4 py-2 rounded-xl ${currentPage === totalPages || totalPages === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                    } transition`}
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

export default UserManagement;