import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayMode, setDisplayMode] = useState("courses");
  const [threadDisplayMode, setThreadDisplayMode] = useState("threads");

  // New state for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    user_ID: "",
    name: "",
    email: "",
    role: "all", // Changed to "all" as default
    startDate: "",
    endDate: "" // Added end date
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/user-management`); // GET /
        if (response.data && response.data.success && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error("Unexpected data format received:", response.data);
          setError("Failed to load users: Unexpected data format from server.");
          setUsers([]);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(`Failed to load users: ${err.response?.data?.message || err.message}`);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleExpand = (userId) => {
    setExpanded(expanded === userId ? null : userId);
  };

  const handleDeleteUser = async (userIdToDelete) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to delete user ID ${userIdToDelete}? This action cannot be undone.`)) {
      return;
    }
    try {
      // Backend expects { user_id: ... }
      await axios.delete(`http://localhost:5000/admin/user-management/delete`, { data: { user_id: userIdToDelete } });
      setUsers((prev) => prev.filter((u) => u.user_ID !== userIdToDelete));
      if (expandedUserId === userIdToDelete) setExpandedUserId(null);
    } catch (err) {
      console.error(`Failed to delete user ${userIdToDelete}:`, err);
      setError(`Failed to delete user: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveCourse = async (userId, courseId) => {
    setError(null);
    if (!window.confirm(`Remove course ${courseId} from user ID ${userId}?`)) return;

    try {
      // Backend expects { user_id: ..., course_id: ... }
      await axios.delete(`http://localhost:5000/admin/user-management/remove-course`, { data: { user_id: userId, course_id: courseId } });
      // Update local state to reflect removal
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.user_ID === userId) {
            return {
              ...user,
              enrolledCourses: user.enrolledCourses?.filter(
                (course) => course.course_id !== courseId // Filter by formatted ID from data
              ),
            };
          }
          return user;
        })
      );
    } catch (err) {
      console.error(`Failed to remove course ${courseId} for user ${userId}:`, err);
      setError(`Failed to remove course: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveThread = async (userId, threadId) => {
    setError(null);
    if (!window.confirm(`Remove thread ${threadId} created by user ID ${userId}?`)) return;
    try {
      // Backend expects { user_id: ..., thread_id: ... }
      await axios.delete(`http://localhost:5000/admin/user-management/remove-thread`, { data: { user_id: userId, thread_id: threadId } });
      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.user_ID === userId) {
            return {
              ...user,
              threads: user.threads?.filter(
                (thread) => thread.thread_id !== threadId // Filter by formatted ID from data
              ),
            };
          }
          return user;
        })
      );
    } catch (err) {
      console.error(`Failed to remove thread ${formattedThreadId} for user ${userId}:`, err);
      setError(`Failed to remove thread: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveReply = async (userId, threadId, replyId) => {
    try {
      await axios.delete("/api/users/remove-reply", { data: { user_ID: userId, thread_id: threadId, reply_id: replyId } });
      setUsers((prev) =>
        prev.map((u) => {
          if (u.user_ID === userId) {
            const updatedThreads = u.threads.map((t) => {
              if (t.thread_id === threadId) {
                return {
                  ...t,
                  replies: t.replies.filter((r) => r.reply_id !== replyId)
                };
              }
              return t;
            });
            return { ...u, threads: updatedThreads };
          }
          return u;
        })
      );
    } catch (err) {
      console.error("Failed to remove reply", err);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    if (rating === null) return "Not rated";

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">★</span>);
    }

    // Half star
    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-500">★</span>);
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return (
      <div className="flex items-center">
        {stars} <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
      </div>
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
      (filters.user_ID === "" || user.user_ID.toLowerCase().includes(filters.user_ID.toLowerCase())) &&
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
                      value={filters.user_ID}
                      onChange={(e) => handleFilterChange("user_ID", e.target.value)}
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
                  <div key={user.user_ID} className="border-b border-gray-100">
                    <div
                      className="font-avant-medium text-lg text-gray-600 items-center px-8 py-4"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 300px 400px 170px 220px 1fr",
                        columnGap: "24px",
                      }}
                    >
                      <div className="flex items-center text-black">{user.user_ID}</div>
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
                          onClick={() => handleExpand(user.user_ID)}
                        >
                          {expanded === user.user_ID ? "Hide" : "View More"}
                        </button>
                        <button
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer"
                          onClick={() => handleDeleteUser(user.user_ID)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expanded === user.user_ID && (
                      <div className="bg-gray-50 px-12 py-6 grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in-down h-90">
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
                          <div className="font-avant-medium text-lg text-gray-700 mb-1">
                            <span className="font-semibold">Replies:</span> {user.threads.reduce((count, thread) => count + (thread.replies ? thread.replies.length : 0), 0)}
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
                              <div className="overflow-x-auto h-78">
                                <table className="min-w-[400px] w-full text-left font-avant-medium border border-gray-300 rounded-xl overflow-hidden">
                                  <thead>
                                    <tr className="bg-gray-200 text-lg text-gray-700">
                                      <th className="py-2 px-4 w-[40%]">Course Name</th>
                                      <th className="py-2 px-4 w-[10%] text-center">Progress</th>
                                      <th className="py-2 px-4 w-[40%]">Review</th>
                                      <th className="py-2 px-4 w-[10%]"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {user.enrolledCourses.length > 0 ? (
                                      user.enrolledCourses.map((course) => (
                                        <tr key={course.course_id} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                          <td className="py-2 px-4 w-[40%]">{course.name}</td>
                                          <td className="py-2 px-4 w-[10%] text-center">{course.progress}</td>
                                          <td className="py-2 px-4 w-[40%]">
                                            <div>
                                              {renderStars(course.review)}
                                              {course.reviewText && (
                                                <div className="text-sm text-gray-600 mt-1 italic">
                                                  "{course.reviewText}"
                                                </div>
                                              )}
                                            </div>
                                          </td>
                                          <td className="py-2 px-4 text-right w-[10%]">
                                            <button
                                              className="px-4 py-1 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-700"
                                              onClick={() => handleRemoveCourse(user.user_ID, course.course_id)}
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={4} className="py-2 px-4 text-gray-400">
                                          No courses
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="flex flex-col w-full">
                                {/* Thread type toggle */}
                                <div className="flex mb-4 text-lg border-b border-gray-300">
                                  <button
                                    className={`px-4 py-2 font-semibold ${threadDisplayMode === "threads"
                                      ? "border-b-2 border-blue-600 text-blue-600"
                                      : "text-gray-500"
                                      }`}
                                    onClick={() => setThreadDisplayMode("threads")}
                                  >
                                    Threads
                                  </button>
                                  <button
                                    className={`px-4 py-2 font-semibold ${threadDisplayMode === "replies"
                                      ? "border-b-2 border-blue-600 text-blue-600"
                                      : "text-gray-500"
                                      }`}
                                    onClick={() => setThreadDisplayMode("replies")}
                                  >
                                    Replies
                                  </button>
                                </div>

                                {threadDisplayMode === "threads" ? (
                                  <div className="overflow-x-auto h-60">
                                    <table className="min-w-[400px] w-full text-left font-avant-medium border border-gray-300 rounded-xl overflow-hidden">
                                      <thead>
                                        <tr className="bg-gray-200 text-lg text-gray-700">
                                          <th className="py-2 px-4 w-[55%]">Title</th>
                                          <th className="py-2 px-4 w-[10%] text-center">Upvotes</th>
                                          <th className="py-2 px-4 w-[10%] text-center">Downvotes</th>
                                          <th className="py-2 px-4 w-[10%] text-center">Answers</th>
                                          <th className="py-2 px-4 w-[15%]"></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {user.threads.length > 0 ? (
                                          user.threads.map((thread) => (
                                            <tr key={thread.thread_id} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                              <td className="py-2 px-4 w-[55%]">{thread.title}</td>
                                              <td className="py-2 px-4 w-[10%] text-center">{thread.upvotes}</td>
                                              <td className="py-2 px-4 w-[10%] text-center">{thread.downvotes}</td>
                                              <td className="py-2 px-4 w-[10%] text-center">{thread.answers}</td>
                                              <td className="py-2 px-4 text-right w-[15%]">
                                                <button
                                                  className="px-4 py-1 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-700"
                                                  onClick={() => handleRemoveThread(user.user_ID, thread.thread_id)}
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
                                ) : (
                                  <div className="overflow-x-auto h-60">
                                    <table className="min-w-[400px] w-full text-left font-avant-medium border border-gray-300 rounded-xl overflow-hidden">
                                      <thead>
                                        <tr className="bg-gray-200 text-lg text-gray-700">
                                          <th className="py-2 px-4 w-[20%]">Thread</th>
                                          <th className="py-2 px-4 w-[40%]">Reply Content</th>
                                          <th className="py-2 px-4 w-[10%] text-center">Upvotes</th>
                                          <th className="py-2 px-4 w-[10%] text-center">Downvotes</th>
                                          <th className="py-2 px-4 w-[20%]"></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {user.threads.some(thread => thread.replies && thread.replies.length > 0) ? (
                                          user.threads.flatMap(thread =>
                                            thread.replies && thread.replies.length > 0
                                              ? thread.replies.map(reply => (
                                                <tr key={reply.reply_id} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                                  <td className="py-2 px-4 w-[30%]">{thread.title}</td>
                                                  <td className="py-2 px-4 w-[40%]">{reply.content}</td>
                                                  <td className="py-2 px-4 w-[10%] text-center">{reply.upvotes}</td>
                                                  <td className="py-2 px-4 w-[10%] text-center">{reply.downvotes}</td>
                                                  <td className="py-2 px-4 text-right w-[10%]">
                                                    <button
                                                      className="px-4 py-1 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-700"
                                                      onClick={() => handleRemoveReply(user.user_ID, thread.thread_id, reply.reply_id)}
                                                    >
                                                      Remove
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))
                                              : []
                                          )
                                        ) : (
                                          <tr>
                                            <td colSpan={5} className="py-2 px-4 text-gray-400">
                                              No replies
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-lg font-avant-medium text-gray-500 text-center">No users found matching your filters.</div>
              )}
            </div>

            {/* Pagination */}
            <div className="px-8 py-4 bg-gray-50 font-avant-medium border-t border-gray-200 flex items-center justify-between">
              <div className="text-gray-600">
                Showing {filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1}
                -
                {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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

export default UserManagement;