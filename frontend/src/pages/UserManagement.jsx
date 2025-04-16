import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";

// Mock data updated for demo (add progress and thread stats)
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
      { name: "Data Science 101 iuhiu iuhhiuf 5edrf s4strsde", progress: "7/12" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
      { name: "Python Intro", progress: "2/8" },
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
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  // Toggle state: "courses" or "threads"
  const [displayMode, setDisplayMode] = useState("courses");

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const handleExpand = (userId) => {
    setExpanded(expanded === userId ? null : userId);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((u) => u.user_id !== userId));
  };

  // Remove course for a user
  const handleRemoveCourse = (userId, courseIdx) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId
          ? { ...u, enrolledCourses: u.enrolledCourses.filter((_, i) => i !== courseIdx) }
          : u
      )
    );
  };

  // Remove thread for a user
  const handleRemoveThread = (userId, threadIdx) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId
          ? { ...u, threads: u.threads.filter((_, i) => i !== threadIdx) }
          : u
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Admin", "User Management"]} />

      {/* Main Content Container */}
      <div className="flex-grow px-3 py-10 w-[1700px] mx-auto">
        <div className="w-[1680px] flex-col">
          <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mb-6">
            User Management
          </h2>
          <div className="border-3 rounded-2xl bg-white">
            {/* Table Header */}
            <div
              className="px-8 py-4 border-b-2 border-gray-200 font-avant-medium font-semibold text-[22px] text-gray-700"
              style={{
                display: "grid",
                gridTemplateColumns: "160px 220px 340px 150px 220px 1fr 1fr 1fr",
                columnGap: "32px",
              }}
            >
              <div className="flex items-center">User ID</div>
              <div className="flex items-center">Name</div>
              <div className="flex items-center">Email</div>
              <div className="flex items-center">Role</div>
              <div className="flex items-center">Joined At</div>
              <div className="flex items-center justify-end col-span-3">Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.user_id} className="border-b border-gray-100">
                <div
                  className="font-avant-medium text-lg text-gray-600 items-center px-8 py-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 220px 320px 170px 220px 1fr 1fr 1fr",
                    columnGap: "32px",
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
                  <div className="flex items-center justify-end col-span-3 gap-3">
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
                  <div className="bg-gray-50 px-12 py-6 grid grid-cols-5 gap-8 h-73 animate-fade-in-down">
                    {/* User Details */}
                    <div className="col-span-1 flex flex-col justify-center">
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
                    <div className="col-span-4 flex font-avant-medium">
                      {/* Toggle vertical */}
                      <div className="flex flex-col items-start justify-center pr-8">
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
                                  <th className="py-2 px-4">Course Name</th>
                                  <th className="py-2 px-4">Progress</th>
                                  <th className="py-2 px-4"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.enrolledCourses.length > 0 ? (
                                  user.enrolledCourses.map((course, idx) => (
                                    <tr key={idx} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                      <td className="py-2 px-4">{course.name}</td>
                                      <td className="py-2 px-4">{course.progress}</td>
                                      <td className="py-2 px-4 text-right">
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
                                  <th className="py-2 px-4">Title</th>
                                  <th className="py-2 px-4">Upvotes</th>
                                  <th className="py-2 px-4">Downvotes</th>
                                  <th className="py-2 px-4">Answers</th>
                                  <th className="py-2 px-4"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.threads.length > 0 ? (
                                  user.threads.map((thread, idx) => (
                                    <tr key={idx} className="border-b bg-gray-100 text-lg text-gray-700 border-gray-300">
                                      <td className="py-2 px-4">{thread.title}</td>
                                      <td className="py-2 px-4">{thread.upvotes}</td>
                                      <td className="py-2 px-4">{thread.downvotes}</td>
                                      <td className="py-2 px-4">{thread.answers}</td>
                                      <td className="py-2 px-4 text-right">
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
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserManagement;