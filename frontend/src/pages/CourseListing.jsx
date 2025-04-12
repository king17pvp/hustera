// frontend/src/pages/CourseListing.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCardHorizontal from "../components/CourseCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import SearchBar from "../components/SectionHeader";
import CreateCourseForm from "../components/CreateCourseForm";

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

// Inline Course Filter Component
const InlineCourseFilter = ({ filterData, setFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    instructor: "",
    level: "",
    price: "",
  });

  const handleFilterClick = (type, value) => {
    setSelectedFilters((prev) => {
      const newValue = prev[type] === value ? "" : value;
      setFilters((prevFilters) => ({ ...prevFilters, [type]: newValue }));
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <div>
      {/* Category Filter */}
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

      {/* Instructor Filter */}
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

      {/* Level Filter */}
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

      {/* Price Filter */}
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

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [filterData, setFilterData] = useState({ categories: [], instructors: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ category: "", instructor: "", level: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Extract search query from URL if present
  const searchParams = new URLSearchParams(location.search);
  const titleQuery = searchParams.get("title");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let endpoint = "";
        if (titleQuery) {
          // When there's a search query, use the /search endpoint.
          endpoint = `http://localhost:5000/search?title=${encodeURIComponent(titleQuery)}&page=${currentPage}&limit=6`;
        } else {
          // Otherwise, use the regular courses endpoint with filters.
          const params = new URLSearchParams({
            page: currentPage,
            limit: 6,
          });
          
          if (filters.category) params.append('category', filters.category);
          if (filters.instructor) params.append('instructor', filters.instructor);
          if (filters.level) params.append('level', filters.level);
          if (filters.price) params.append('price', filters.price);
          
          endpoint = `http://localhost:5000/courses?${params.toString()}`;
        }
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
  }, [currentPage, filters, location.search, titleQuery]);

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
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <SearchBar title="All Courses" />
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Course
              </button>
            </div>

            {showCreateForm ? (
              <CreateCourseForm />
            ) : (
              <>
                {loading ? (
                  <p>Loading courses...</p>
                ) : courses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-7">
                    {courses.map((course) => (
                      <CourseCardHorizontal key={course.courseID} {...course} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">No courses available</p>
                )}
                <div className="mt-6 flex justify-center">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-full md:w-1/4">
            <InlineCourseFilter filterData={filterData} setFilters={setFilters} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseListing;
