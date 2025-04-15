import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCardHorizontal from "../components/CourseCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import SearchBar from "../components/SectionHeader";

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
          className={`px-3 py-1 rounded ${
            currentPage === startPage + idx ? "bg-blue-600 text-white" : "bg-gray-200"
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

const InlineCourseFilter = ({ filterData, selectedFilters, setFilters }) => {
  const handleFilterClick = (type, value) => {
    const newValue = selectedFilters[type] === value ? "" : value;
    const updatedFilters = { ...selectedFilters, [type]: newValue };
    setFilters(updatedFilters);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      <ul>
        {filterData.categories?.length > 0 ? (
          filterData.categories.map((cat, idx) => (
            <li key={idx} className="mb-1">
              <button
                onClick={() => handleFilterClick("category", cat.category)}
                className={`px-2 py-1 rounded ${
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

      <h3 className="text-lg font-bold mt-4 mb-2">Instructors</h3>
      <ul>
        {filterData.instructors?.length > 0 ? (
          filterData.instructors.map((ins, idx) => (
            <li key={idx} className="mb-1">
              <button
                onClick={() => handleFilterClick("instructor", ins.instructor)}
                className={`px-2 py-1 rounded ${
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

      <h3 className="text-lg font-bold mt-4 mb-2">Levels</h3>
      <ul>
        {["Beginner", "Intermediate", "Advanced"].map((lvl, idx) => (
          <li key={idx} className="mb-1">
            <button
              onClick={() => handleFilterClick("level", lvl)}
              className={`px-2 py-1 rounded ${
                selectedFilters.level === lvl ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {lvl}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-4 mb-2">Price</h3>
      <ul>
        {[
          { label: "Under $30", value: "under30" },
          { label: "$30 - $50", value: "30to50" },
          { label: "Above $50", value: "above50" },
        ].map((prc, idx) => (
          <li key={idx} className="mb-1">
            <button
              onClick={() => handleFilterClick("price", prc.value)}
              className={`px-2 py-1 rounded ${
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

// Custom SearchBar component that preserves filters
const EnhancedSearchBar = ({ onSearch, currentSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(currentSearchTerm || "");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">All Courses</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses..."
          className="border rounded-l px-4 py-2 w-full"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </form>
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

  // Extract search term from URL on initial load
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
    
    // Set initial filters from URL if they exist
    setFilters({
      category: categoryParam || "",
      instructor: instructorParam || "",
      level: levelParam || "",
      price: priceParam || "",
    });
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
          <div className="w-full md:w-3/4">
            <EnhancedSearchBar onSearch={handleSearch} currentSearchTerm={searchTerm} />
            
            {/* Display active filters */}
            {(searchTerm || filters.category || filters.instructor || filters.level || filters.price) && (
              <div className="mb-4 p-3 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Active Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                      Search: {searchTerm}
                      <button 
                        onClick={() => handleSearch("")} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                      Category: {filters.category}
                      <button 
                        onClick={() => handleFilterChange({...filters, category: ""})} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.instructor && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                      Instructor: {filters.instructor}
                      <button 
                        onClick={() => handleFilterChange({...filters, instructor: ""})} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.level && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                      Level: {filters.level}
                      <button 
                        onClick={() => handleFilterChange({...filters, level: ""})} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.price && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                      Price: {filters.price === "under30" ? "Under $30" : 
                             filters.price === "30to50" ? "$30 - $50" : "Above $50"}
                      <button 
                        onClick={() => handleFilterChange({...filters, price: ""})} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(searchTerm || filters.category || filters.instructor || filters.level || filters.price) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setFilters({ category: "", instructor: "", level: "", price: "" });
                        updateURLWithParams("", { category: "", instructor: "", level: "", price: "" }, 1);
                      }}
                      className="text-red-600 hover:text-red-800 underline text-sm"
                    >
                      Clear All
                    </button>
                  )}
                </div>
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