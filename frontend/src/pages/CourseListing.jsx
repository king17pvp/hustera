import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
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
          className={`px-4 py-2 font-avant-medium text-gray-600 text-2xl rounded-xl cursor-pointer ${currentPage === startPage + idx ? "bg-blue-600 text-white" : "bg-gray-200"
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

const InlineCourseFilter = ({ filterData, setFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    instructor: "",
    level: "",
    price: "",
  });

  const handleFilterClick = (type, value) => {
    const newValue = selectedFilters[type] === value ? "" : value;
    const updatedFilters = { ...selectedFilters, [type]: newValue };
    setSelectedFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  return (
    <div>
      {/* Category Filter */}
      <h3 className="text-3xl font-avant-medium font-bold mb-5 mt-10">Categories</h3>
      <ul>
        {filterData.categories?.length > 0 ? (
          filterData.categories.map((cat, idx) => (
            <li key={idx} className="mb-1">
              <button
                onClick={() => handleFilterClick("category", cat.category)}
                className={`px-4 py-2 font-avant-medium text-gray-600 text-xl rounded-xl cursor-pointer ${selectedFilters.category === cat.category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
                  }`}
              >
                {cat.category} ({cat.count})
              </button>
            </li>
          ))
        ) : (
          <li className="font-avant-medium text-xl text-gray-600">No categories</li>
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
                className={`px-4 py-2 font-avant-medium text-gray-600 text-xl rounded-xl cursor-pointer ${selectedFilters.instructor === ins.instructor
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
              className={`px-4 py-2 font-avant-medium text-gray-600 text-xl rounded-xl cursor-pointer ${selectedFilters.level === lvl ? "bg-blue-600 text-white" : "bg-gray-200"
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
              className={`px-4 py-2 font-avant-medium text-gray-600 text-xl rounded-xl cursor-pointer ${selectedFilters.price === prc.value ? "bg-blue-600 text-white" : "bg-gray-200"
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
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const titleQuery = searchParams.get("title");

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let endpoint = "";
        if (titleQuery) {
          endpoint = `http://localhost:5000/search?title=${encodeURIComponent(titleQuery)}&page=${currentPage}&limit=6`;
        } else {
          const params = new URLSearchParams({
            page: currentPage,
            limit: 6,
            category: filters.category,
            instructor: filters.instructor,
            level: filters.level,
            price: filters.price,
          });
          endpoint = `http://localhost:5000/courses?${params.toString()}`;
        }
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
  }, [currentPage, filters, titleQuery]);

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

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentState="Courses" />
      <Breadcrumb paths={["Homepage", "Courses"]} />
      <div className="flex-grow flex justify-center w-full">
        <div className="flex flex-col md:flex-row justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">
          <div className="w-full md:w-3/4">
            <SearchBar title="All Courses" />

            {/* 🆕 Create New Course button */}
            {user?.role !== "student" && (
              <div className="my-4 flex justify-end">
                <button
                  onClick={() => {
                    navigate("/courses/upload");
                  }} // Navigate to the create course page
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
              <p className="text-center font-avant-medium text-xl text-gray-600">No courses available</p>
            )}
            <div className="mt-6 flex justify-center">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <InlineCourseFilter filterData={filterData} setFilters={setFilters} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseListing;
