// frontend/src/pages/CourseListing.jsx
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCardHorizontal from "../components/CourseCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import axios from "axios";

// Pagination Component
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  return (
    <div className="flex space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-14 h-14 flex items-center justify-center rounded-full border text-xl font-avant-medium cursor-pointer bg-white hover:bg-gray-200"
          aria-label="Previous Page"
        >
          &lt;
        </button>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(startPage + idx)}
          className={`w-14 h-14 flex items-center text-xl font-avant-medium justify-center rounded-full border cursor-pointer ${currentPage === startPage + idx
            ? "bg-black text-white font-bold"
            : "bg-white hover:bg-gray-200"
            }`}
        >
          {startPage + idx}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-14 h-14 flex items-center justify-center rounded-full border text-xl font-avant-medium cursor-pointer bg-white hover:bg-gray-200"
          aria-label="Next Page"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

const EnhancedSearchBar = ({ onSearch, currentSearchTerm, title }) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm || "");

  useEffect(() => {
    setSearchTerm(currentSearchTerm || "");
  }, [currentSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mt-10 mb-3 flex items-center justify-between">
      <h2 className="text-5xl font-avant-medium font-bold">{title}</h2>
      <form onSubmit={handleSubmit} className="relative w-90">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses..."
          className="w-full border-b border-gray-400 focus:outline-none font-avant-medium text-xl text-gray-700 placeholder-gray-400 px-2 py-1 pr-10"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <svg
            className="h-7 w-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9 0 7 7 0 0 0 9.9 0"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

// Inline Course Filter Component
const InlineCourseFilter = ({ filterData, selectedFilters, setFilters }) => {
  const handleFilterClick = (type, value) => {
    const newValue = selectedFilters[type] === value ? "" : value;
    const updatedFilters = { ...selectedFilters, [type]: newValue };
    setFilters(updatedFilters);
  };

  return (
    <div className="mt-12">
      {/* Category Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Categories</h3>
      <ul className="flex flex-wrap gap-2">
        {filterData.categories?.length > 0 ? (
          filterData.categories.map((cat, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleFilterClick("category", cat.category)}
                className={`px-4 py-2 rounded-xl font-avant-medium text-lg border transition cursor-pointer flex items-center ${selectedFilters.category === cat.category
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100 text-gray-600"
                  }`}
              >
                <span>
                  {cat.category
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                  }
                </span>
                <span
                  className={`ml-2 text-sm px-2 py-1 rounded-full bg-opacity-20 ${selectedFilters.category === cat.category
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            </li>
          ))
        ) : (
          <li>No categories</li>
        )}
      </ul>

      {/* Instructor Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Instructors</h3>
      <ul className="flex flex-wrap gap-2">
        {filterData.instructors?.length > 0 ? (
          filterData.instructors.map((ins, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleFilterClick("instructor", ins.instructor)}
                className={`px-4 py-2 font-avant-medium text-lg border rounded-xl transition cursor-pointer flex items-center ${selectedFilters.instructor === ins.instructor
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100 text-gray-600"
                  }`}
              >
                <span>{ins.instructor}</span>
                <span
                  className={`ml-2 text-sm px-2 py-1 rounded-full bg-opacity-20 ${selectedFilters.instructor === ins.instructor
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {ins.count}
                </span>
              </button>
            </li>
          ))
        ) : (
          <li>No instructors</li>
        )}
      </ul>

      {/* Level Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Levels</h3>
      <div className="relative bg-gray-200 rounded-full p-1 flex w-full max-w-xl mt-2 mb-6">
        <div className="relative flex w-full px-1">
          {/* Highlight bar only if a level is selected */}
          {["Beginner", "Intermediate", "Advanced"].includes(selectedFilters.level) && (
            <div
              className="absolute top-0 bottom-0 w-1/3 rounded-full bg-gray-800 z-0 transition-all"
              style={{
                left: `${["Beginner", "Intermediate", "Advanced"].indexOf(selectedFilters.level) * 33.3333}%`,
              }}
            />
          )}
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
            <button
              key={lvl}
              onClick={() =>
                handleFilterClick("level", selectedFilters.level === lvl ? "" : lvl)
              }
              className={`relative z-10 w-1/3 text-center py-2 rounded-full transition-all font-avant-medium text-[17px] cursor-pointer ${selectedFilters.level === lvl ? "text-white" : "text-gray-700"
                }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Price</h3>
      <div className="relative bg-gray-200 rounded-full p-1 flex w-full max-w-xl mt-2 mb-6">
        <div className="relative flex w-full px-1">
          {/* Highlight bar only if a price is selected */}
          {["under30", "30to50", "above50"].includes(selectedFilters.price) && (
            <div
              className="absolute top-0 bottom-0 w-1/3 rounded-full bg-blue-600 z-0 transition-all"
              style={{
                left: `${["under30", "30to50", "above50"].indexOf(selectedFilters.price) * 33.3333}%`,
              }}
            />
          )}
          {[
            { label: "Under $30", value: "under30" },
            { label: "$30 - $50", value: "30to50" },
            { label: "Above $50", value: "above50" },
          ].map((prc) => (
            <button
              key={prc.value}
              onClick={() =>
                handleFilterClick("price", selectedFilters.price === prc.value ? "" : prc.value)
              }
              className={`relative z-10 w-1/3 text-center py-2 rounded-full transition-all font-avant-medium text-[17px] cursor-pointer ${selectedFilters.price === prc.value ? "text-white" : "text-gray-700"
                }`}
            >
              {prc.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [filterData, setFilterData] = useState({ categories: [], instructors: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ category: "", instructor: "", level: "", price: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // Function to parse URL parameters - extracted for reuse
  const parseUrlParams = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      title: searchParams.get("title") || "",
      category: searchParams.get("category") || "",
      instructor: searchParams.get("instructor") || "",
      level: searchParams.get("level") || "",
      price: searchParams.get("price") || "",
      page: parseInt(searchParams.get("page") || "1")
    };
  }, [location.search]);

  // Extract search term and filters from URL on initial load
  useEffect(() => {
    const params = parseUrlParams();

    // Only update state if we're actually changing something to avoid rerenders
    if (params.title !== searchTerm) {
      setSearchTerm(params.title);
    }

    const newFilters = {
      category: params.category,
      instructor: params.instructor,
      level: params.level,
      price: params.price
    };

    // Check if filters actually changed before updating
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
    }

    if (params.page !== currentPage) {
      setCurrentPage(params.page);
    }

    // Mark that we've processed the initial URL parameters
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [location.search, isInitialLoad]);

  // Update URL with current params - extracted for reuse
  const updateURLWithParams = useCallback((title, currentFilters, page) => {
    const params = new URLSearchParams();

    if (title) params.set("title", title);
    if (currentFilters.category) params.set("category", currentFilters.category);
    if (currentFilters.instructor) params.set("instructor", currentFilters.instructor);
    if (currentFilters.level) params.set("level", currentFilters.level);
    if (currentFilters.price) params.set("price", currentFilters.price);
    if (page > 1) params.set("page", page.toString());

    // Avoid unnecessary navigation if the URL is already correct
    const newUrl = `/courses?${params.toString()}`;
    if (location.pathname + location.search !== newUrl) {
      navigate(newUrl);
    }
  }, [navigate, location]);

  // Handle search submission
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 when searching
    updateURLWithParams(term, filters, 1);
  }, [filters, updateURLWithParams]);

  // Update filters and URL
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filtering
    updateURLWithParams(searchTerm, newFilters, 1);
  }, [searchTerm, updateURLWithParams]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    updateURLWithParams(searchTerm, filters, page);
  }, [searchTerm, filters, updateURLWithParams]);

  // Fetch courses whenever pagination, filters, or search term change
  useEffect(() => {
    // Skip the initial render since we'll load from URL params
    if (isInitialLoad) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Build query parameters for the API call
        const params = new URLSearchParams({
          page: currentPage,
          limit: 6
        });

        // Add search term if exists
        if (searchTerm) {
          params.append("title", searchTerm);
        }

        // Add filters if they exist
        if (filters.category) params.append("category", filters.category);
        if (filters.instructor) params.append("instructor", filters.instructor);
        if (filters.level) params.append("level", filters.level);
        if (filters.price) params.append("price", filters.price);

        const endpoint = `http://localhost:5000/courses?${params.toString()}`;

        const response = await axios.get(endpoint);
        const data = response.data;
        console.log("Fetched courses data:", data);

        if (data.success) {
          setCourses(data.courses);
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, filters, searchTerm, isInitialLoad]);

  // Fetch filter data only once when component mounts
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses/filters");
        const data = response.data;
        console.log("Fetched filter data:", data);

        if (data.success) {
          setFilterData({
            categories: data.categories,
            instructors: data.instructors,
          });
        } else {
          console.error("Failed to fetch filters:", data.message);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <>
      <Navbar currentState="Courses" />
      <Breadcrumb paths={["Homepage", "Courses"]} />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center w-full">
          <div className="flex flex-col md:flex-row justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">
            <div className="w-full md:w-72/100">
              <EnhancedSearchBar
                onSearch={handleSearch}
                currentSearchTerm={searchTerm}
                title="All Courses"
              />

              {/* Create New Course button for non-students */}
              {user?.role !== "student" && (
                <div className="my-4 flex justify-end">
                  <button
                    onClick={() => navigate("/courses/upload")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-avant-medium text-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    + Create New Course
                  </button>
                </div>
              )}

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600">Loading courses...</p>
                </div>
              ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 gap-7">
                  {courses.map((course) => (
                    <CourseCardHorizontal key={course.courseID} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600">No courses match your criteria</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            <div className="w-full md:w-28/100">
              {/* Welcome to Courses box */}
              <div className="p-5 max-w-[450px] bg-blue-50 border-3 border-blue-500 rounded-xl text-lg space-y-4 mt-10 mb-8">
                <div>
                  <h3 className="font-bold font-avant-medium text-[27px] text-gray-800 mb-4">Welcome to Courses 📚</h3>
                  <p className="text-gray-700 text-xl">
                    Discover a wide range of courses to boost your knowledge and skills. Use the filters below to find the perfect course for you!
                  </p>
                  <ul className="list-disc text-xl list-inside mt-4 text-gray-700 space-y-1">
                    <li>Browse by category, instructor, level, or price</li>
                    <li>Search for specific topics</li>
                    <li>Enroll and start learning instantly</li>
                    <li>Track your progress and achievements</li>
                  </ul>
                </div>
              </div>

              {/* Hustera Banner */}
              <div className="max-w-[450px] rounded-xl p-5 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md text-white text-center mb-8">
                <h3 className="text-5xl font-avant-medium font-bold tracking-wide">hustera</h3>
                <p className="text-md font-avant-medium">education for everyone</p>
              </div>

              <InlineCourseFilter
                filterData={filterData}
                selectedFilters={filters}
                setFilters={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CourseListing;