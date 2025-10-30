import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/BreadCrumb";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import React from "react";

// Character limits
const THREAD_CONTENT_LIMIT = 150;
const ANSWER_CONTENT_LIMIT = 120;

const ForumManagement = () => {
  const [threads, setThreads] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [expandedContent, setExpandedContent] = useState({});
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    startDate: "",
    endDate: "",
    minUpvotes: "",
    minDownvotes: "",
    minAnswers: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/admin/forum-management/`);
        if (response.data && Array.isArray(response.data.threads)) {
          setThreads(response.data.threads);
        } else {
          console.error("Unexpected data format received:", response.data);
          setError("Failed to load data: Unexpected format.");
          setThreads([]);
        }
      } catch (err) {
        console.error("Failed to fetch threads:", err);
        setError(`Failed to load forum threads: ${err.message}`);
        setThreads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);

  // Handlers
  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDeleteThread = async (id) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to remove this thread? This action cannot be undone.`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/admin/forum-management/delete-thread`, { data: { thread_id: id } });
      setThreads((prev) => prev.filter((t) => t.id !== id));
      if (expanded === id) setExpanded(null);
      setError(null);
    } catch (err) {
      console.error("Failed to delete thread", err);
      setError(`Failed to delete thread: ${err.message}`);
    }
  };

  const handleDeleteAnswer = async (threadId, answerId) => {
    setError(null);
    if (!window.confirm(`Are you sure you want to remove this answer? This action cannot be undone.`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/admin/forum-management/delete-answer`, { data: { thread_id: threadId, answer_id: answerId } });
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, answers: t.answers.filter((a) => a.id !== answerId) }
            : t
        )
      );
      setError(null);
    } catch (err) {
      console.error("Failed to delete answer", err);
      setError(`Failed to delete answer: ${err.message}`);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const toggleExpandContent = (id) => {
    setExpandedContent(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExpandAnswer = (id) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtering logic
  const filteredThreads = threads.filter((thread) => {
    const titleMatch =
      filters.title === "" ||
      thread.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch =
      filters.author === "" ||
      thread.author.toLowerCase().includes(filters.author.toLowerCase());
    const upvotesMatch =
      filters.minUpvotes === "" ||
      thread.upvotes >= parseInt(filters.minUpvotes, 10);
    const downvotesMatch =
      filters.minDownvotes === "" ||
      thread.downvotes >= parseInt(filters.minDownvotes, 10);
    const answersMatch =
      filters.minAnswers === "" ||
      thread.answers.length >= parseInt(filters.minAnswers, 10);

    let dateMatch = true;
    const threadDate = new Date(thread.createdAt);
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      dateMatch = dateMatch && threadDate >= startDate;
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      dateMatch = dateMatch && threadDate <= endDate;
    }

    return titleMatch && authorMatch && upvotesMatch && downvotesMatch && answersMatch && dateMatch;
  });

  // Pagination
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(indexOfFirstThread, indexOfLastThread);
  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar currentState={null} />
      <Breadcrumb paths={["Admin", "Forum Management"]} />

      <div className="flex-grow px-4 py-8 w-full max-w-[1700px] mx-auto">
        <div className="w-full flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl md:text-5xl font-avant-medium font-semibold text-gray-800 mt-10">
              Forum Management
            </h2>
          </div>

          {/* Thread listing table with filters under column names */}
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
                  <col style={{ width: "500px" }} />
                  <col style={{ width: "250px" }} />
                  <col style={{ width: "130px" }} />
                  <col style={{ width: "130px" }} />
                  <col style={{ width: "130px" }} />
                  <col style={{ width: "300px" }} />
                  <col style={{ width: "1fr" }} />
                </colgroup>
                <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Title</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Author</th>
                    <th className="px-6 pt-3 text-center text-xl font-semibold">Upvotes</th>
                    <th className="px-6 pt-3 text-center text-xl font-semibold">Downvotes</th>
                    <th className="px-6 pt-3 text-center text-xl font-semibold">Answers</th>
                    <th className="px-6 pt-3 text-left text-xl font-semibold">Creation Date</th>
                    <th className="px-6 pt-3 text-right text-xl font-semibold"></th>
                  </tr>
                  <tr>
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
                        placeholder="Filter author..."
                        value={filters.author}
                        onChange={(e) => handleFilterChange("author", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <input
                        type="number"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Min"
                        value={filters.minUpvotes}
                        onChange={(e) => handleFilterChange("minUpvotes", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <input
                        type="number"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Min"
                        value={filters.minDownvotes}
                        onChange={(e) => handleFilterChange("minDownvotes", e.target.value)}
                      />
                    </th>
                    <th className="px-6 py-2">
                      <input
                        type="number"
                        className="w-full px-3 py-1 text-[16px] border border-gray-300 rounded-xl"
                        placeholder="Min"
                        value={filters.minAnswers}
                        onChange={(e) => handleFilterChange("minAnswers", e.target.value)}
                      />
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
                    <th className="px-6 py-2"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {currentThreads.length > 0 ? (
                    currentThreads.map((thread) => (
                      <React.Fragment key={thread.id}>
                        <tr className="border-b border-gray-100">
                          <td className="px-6 py-4 text-lg font-avant-medium text-blue-700 font-semibold">{thread.title}</td>
                          <td className="px-6 py-4 text-lg font-avant-medium text-gray-700">{thread.author}</td>
                          <td className="px-6 py-4 text-lg font-avant-medium text-gray-700 text-center">{thread.upvotes}</td>
                          <td className="px-6 py-4 text-lg font-avant-medium text-gray-700 text-center">{thread.downvotes}</td>
                          <td className="px-6 py-4 text-lg font-avant-medium text-gray-700 text-center">{thread.answers.length}</td>
                          <td className="px-6 py-4 text-lg font-avant-medium text-gray-700">
                            {new Date(thread.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-6 py-4 text-lg font-avant-medium align-middle">
                            <div className="flex gap-3 justify-end">
                              <button
                                className="px-4 py-2 rounded-xl w-[120px] bg-blue-600 text-white font-avant-medium hover:bg-blue-800 transition cursor-pointer"
                                onClick={() => handleExpand(thread.id)}
                              >
                                {expanded === thread.id ? "Collapse" : "Details"}
                              </button>
                              <button
                                className="px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer"
                                onClick={() => handleDeleteThread(thread.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expanded === thread.id && (
                          <tr>
                            <td colSpan="7" className="bg-gray-50 px-12 py-6 border-b border-t border-gray-300">
                              <div className="max-h-[500px] overflow-y-auto animate-fade-in-down">
                                <div className="mb-4">
                                  <div className="text-[22px] font-semibold text-gray-800 mb-2">{thread.title}</div>
                                  <div className="text-gray-600 mb-1">
                                    <span className="font-semibold">Author:</span> {thread.author}
                                  </div>
                                  <div className="text-gray-600 mb-1">
                                    <span className="font-semibold">Created:</span>{" "}
                                    {new Date(thread.createdAt).toLocaleString()}
                                  </div>
                                  <div className="text-gray-600 mb-1">
                                    <span className="font-semibold">Upvotes:</span> {thread.upvotes} &nbsp;
                                    <span className="font-semibold">Downvotes:</span> {thread.downvotes}
                                  </div>

                                  {/* Thread content with show more/less */}
                                  <div className="mt-4 bg-white p-4 rounded-xl border border-gray-200">
                                    <div className="font-semibold text-gray-800 mb-2">Thread Content:</div>
                                    <div className="text-gray-700">
                                      {thread.content && (
                                        <>
                                          {expandedContent[thread.id] || thread.content.length <= THREAD_CONTENT_LIMIT ? (
                                            <ReactMarkdown>{thread.content}</ReactMarkdown>
                                          ) : (
                                            <ReactMarkdown>
                                              {`${thread.content.substring(0, THREAD_CONTENT_LIMIT)}...`}
                                            </ReactMarkdown>
                                          )}
                                          {thread.content.length > THREAD_CONTENT_LIMIT && (
                                            <button
                                              onClick={() => toggleExpandContent(thread.id)}
                                              className="ml-2 text-blue-600 hover:underline"
                                            >
                                              {expandedContent[thread.id] ? "Show less" : "Show more"}
                                            </button>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[22px] font-semibold mb-2 text-blue-700">Answers</div>
                                  {thread.answers.length > 0 ? (
                                    <div className="space-y-4">
                                      {thread.answers.map((answer) => (
                                        <div
                                          key={answer.id}
                                          className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-start md:justify-between"
                                        >
                                          <div className="flex-1 mr-4">
                                            <div className="text-gray-800 text-lg">
                                              {expandedAnswers[answer.id] || answer.content.length <= ANSWER_CONTENT_LIMIT ? (
                                                <ReactMarkdown>{answer.content}</ReactMarkdown>
                                              ) : (
                                                <ReactMarkdown>
                                                  {`${answer.content.substring(0, ANSWER_CONTENT_LIMIT)}...`}
                                                </ReactMarkdown>
                                              )}
                                              {answer.content.length > ANSWER_CONTENT_LIMIT && (
                                                <button
                                                  onClick={() => toggleExpandAnswer(answer.id)}
                                                  className="ml-2 text-blue-600 hover:underline"
                                                >
                                                  {expandedAnswers[answer.id] ? "Show less" : "Show more"}
                                                </button>
                                              )}
                                            </div>
                                            <div className="text-gray-500 text-[16px] mt-1">
                                              By {answer.author} &middot;{" "}
                                              {new Date(answer.createdAt).toLocaleString()}
                                            </div>
                                            <div className="text-gray-500 text-[16px] mt-1">
                                              Upvotes: {answer.upvotes} &nbsp; Downvotes: {answer.downvotes}
                                            </div>
                                          </div>
                                          <button
                                            className="mt-2 md:mt-0 px-4 py-2 rounded-xl bg-red-500 text-white font-avant-medium hover:bg-red-700 transition cursor-pointer whitespace-nowrap"
                                            onClick={() => handleDeleteAnswer(thread.id, answer.id)}
                                          >
                                            Delete Answer
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-gray-400">No answers yet.</div>
                                  )}
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
                        No threads found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-8 py-4 bg-gray-50 font-avant-medium border-t border-gray-200 flex items-center justify-between">
              <div className="text-gray-600">
                Showing {filteredThreads.length === 0 ? 0 : indexOfFirstThread + 1}
                -
                {Math.min(indexOfLastThread, filteredThreads.length)} of {filteredThreads.length} threads
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

export default ForumManagement;