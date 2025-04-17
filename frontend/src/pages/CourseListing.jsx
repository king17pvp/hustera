// frontend/src/pages/CourseListing.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCardHorizontal from "../components/CourseCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";

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
        <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(startPage + idx)}
          className={`w-14 h-14 flex items-center text-xl font-avant-medium justify-center rounded-full border cursor-pointer ${
            currentPage === startPage + idx ? "bg-black text-white font-bold" : "hover:bg-gray-200"
          }`}
        >
          {startPage + idx}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

const EnhancedSearchBar = ({ onSearch, currentSearchTerm, title }) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm || "");

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
      <ul>
        {filterData.categories?.length > 0 ? (
          filterData.categories.map((cat, idx) => (
            <li key={idx} className="mb-1">
              <button
                onClick={() => handleFilterClick("category", cat.category)}
                className={`px-4 py-2 font-avant-medium text-gray-600 rounded-xl cursor-pointer ${
                  selectedFilters.category === cat.category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat.category} ({cat.count})
              </button>
            </li>
          ))
        ) : (
          <li>No categories</li>
        )}
      </ul>

      {/* Instructor Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Instructors</h3>
      <ul>
        {filterData.instructors?.length > 0 ? (
          filterData.instructors.map((ins, idx) => (
            <li key={idx} className="mb-1">
              <button
                onClick={() => handleFilterClick("instructor", ins.instructor)}
                className={`px-4 py-2 font-avant-medium text-gray-600 rounded-xl cursor-pointer ${
                  selectedFilters.instructor === ins.instructor
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {ins.instructor} ({ins.count})
              </button>
            </li>
          ))
        ) : (
          <li>No instructors</li>
        )}
      </ul>

      {/* Level Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Levels</h3>
      <ul>
        {["Beginner", "Intermediate", "Advanced"].map((lvl, idx) => (
          <li key={idx} className="mb-1">
            <button
              onClick={() => handleFilterClick("level", lvl)}
              className={`px-4 py-2 font-avant-medium text-gray-600 rounded-xl cursor-pointer ${
                selectedFilters.level === lvl ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {lvl}
            </button>
          </li>
        ))}
      </ul>

      {/* Price Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mt-4 mb-3">Price</h3>
      <ul>
        {[
          { label: "Under $30", value: "under30" },
          { label: "$30 - $50", value: "30to50" },
          { label: "Above $50", value: "above50" },
        ].map((prc, idx) => (
          <li key={idx} className="mb-1">
            <button
              onClick={() => handleFilterClick("price", prc.value)}
              className={`px-4 py-2 font-avant-medium text-gray-600 rounded-xl cursor-pointer ${
                selectedFilters.price === prc.value ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {prc.label}
            </button>
          </li>
        ))}
      </ul>
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
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  // Extract search term and filters from URL on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("title");
    if (title) {
      setSearchTerm(title);
    }
    
    // Extract any filters from URL
    const categoryParam = searchParams.get("category");
    const instructorParam = searchParams.get("instructor");
    const levelParam = searchParams.get("level");
    const priceParam = searchParams.get("price");
    const pageParam = searchParams.get("page");
    
    // Set initial filters from URL if they exist
    setFilters({
      category: categoryParam || "",
      instructor: instructorParam || "",
      level: levelParam || "",
      price: priceParam || "",
    });
    
    // Set page if it exists in URL
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, [location.search]);

  // Reset page when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  // Handle search submission
  const handleSearch = (term) => {
    setSearchTerm(term);
    updateURLWithParams(term, filters, 1);
  };

  // Update URL with current params
  const updateURLWithParams = (title, currentFilters, page) => {
    const params = new URLSearchParams();
    
    if (title) params.set("title", title);
    if (currentFilters.category) params.set("category", currentFilters.category);
    if (currentFilters.instructor) params.set("instructor", currentFilters.instructor);
    if (currentFilters.level) params.set("level", currentFilters.level);
    if (currentFilters.price) params.set("price", currentFilters.price);
    if (page > 1) params.set("page", page.toString());
    
    navigate(`/courses?${params.toString()}`);
  };

  // Update filters and URL
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateURLWithParams(searchTerm, newFilters, 1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURLWithParams(searchTerm, filters, page);
  };

  useEffect(() => {
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
        
        // Use a consistent endpoint that supports both search and filters
        const endpoint = `http://localhost:5000/courses?${params.toString()}`;
        
        const response = await fetch(endpoint);
        const data = await response.json();
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
  }, [currentPage, filters, searchTerm]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/courses/filters");
        const data = await response.json();
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
      <div className="flex justify-center w-full">
        <div className="flex flex-col md:flex-row justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">
          <div className="w-full md:w-4/5">
            <EnhancedSearchBar onSearch={handleSearch} currentSearchTerm={searchTerm} title="All Courses" />
            
            {/* Create New Course button for non-students */}
            {user?.role !== "student" && (
              <div className="my-4 flex justify-end">
                <button
                  onClick={() => {
                    navigate("/courses/upload");
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-avant-medium text-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  + Create New Course
                </button>
              </div>
            )}

            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 gap-7">
                {courses.map((course) => (
                  <CourseCardHorizontal key={course.courseID} {...course} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No courses match your criteria</p>
            )}
            <div className="mt-6 flex justify-center">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <InlineCourseFilter 
              filterData={filterData} 
              selectedFilters={filters} 
              setFilters={handleFilterChange} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseListing;