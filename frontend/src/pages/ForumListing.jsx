import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForumCardHorizontal from "../components/ForumCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import ForumFilter from "../components/ForumFilter";
import SearchBar from "../components/SectionHeader";
import Pagination from "../components/Pagination";
import faqImage from "../assets/faqs.png"; 
import { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

const sampleThreads = [
  {
    title: "Best Online Courses 2025",
    date: "Mar 9, 2025",
    description: "Discover the top courses on Hustera.",
    votes: 12,
    answers: 3,
    views: 45,
    author: "John Doe",
    tags: ["hustera", "online-courses", "learning"],
  },
  {
    title: "How to Excel in Online Learning",
    date: "Feb 20, 2025",
    description: "Tips and strategies to stay productive while learning online.",
    votes: 7,
    answers: 1,
    views: 30,
    author: "Jane Smith",
    tags: ["productivity", "learning", "self-study"],
  },
  {
    title: "Top 10 Programming Languages to Learn",
    date: "Jan 15, 2025",
    description: "Explore the most in-demand programming languages this year.",
    votes: 20,
    answers: 5,
    views: 100,
    author: "Dev Guru",
    tags: ["programming", "languages", "career"],
  },
  {
    title: "AI & Machine Learning: The Future of Tech",
    date: "Dec 10, 2024",
    description: "How AI is revolutionizing industries and what you should learn.",
    votes: 15,
    answers: 4,
    views: 80,
    author: "AI Whisperer",
    tags: ["ai", "machine-learning", "tech-trends"],
  },
  {
    title: "Mastering Web Development in 2025",
    date: "Nov 5, 2024",
    description: "A complete guide to becoming a full-stack web developer.",
    votes: 9,
    answers: 2,
    views: 60,
    author: "Frontend Fox",
    tags: ["web-dev", "fullstack", "career"],
  },
  {
    title: "The Importance of Data Science in Business",
    date: "Oct 22, 2024",
    description: "Why every company needs data science and how to get started.",
    votes: 18,
    answers: 6,
    views: 95,
    author: "Data Queen",
    tags: ["data-science", "business", "analytics"],
  },
  {
    title: "Mastering Web Development in 2025",
    date: "Nov 5, 2024",
    description: "A complete guide to becoming a full-stack web developer.",
    votes: 9,
    answers: 2,
    views: 60,
    author: "Frontend Fox",
    tags: ["web-dev", "fullstack", "career"],
  },
  {
    title: "The Importance of Data Science in Business",
    date: "Oct 22, 2024",
    description: "Why every company needs data science and how to get started.",
    votes: 18,
    answers: 6,
    views: 95,
    author: "Data Queen",
    tags: ["data-science", "business", "analytics"],
  },
  {
    title: "Mastering Web Development in 2025",
    date: "Nov 5, 2024",
    description: "A complete guide to becoming a full-stack web developer.",
    votes: 9,
    answers: 2,
    views: 60,
    author: "Frontend Fox",
    tags: ["web-dev", "fullstack", "career"],
  },
  {
    title: "The Importance of Data Science in Business",
    date: "Oct 22, 2024",
    description: "Why every company needs data science and how to get started.",
    votes: 18,
    answers: 6,
    views: 95,
    author: "Data Queen",
    tags: ["data-science", "business", "analytics"],
  },
];


const categories = [
  { name: "Programming", count: 20 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
  { name: "Design", count: 15 },
  { name: "Marketing", count: 10 },
];

const instructors = [
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
  { name: "John Doe", count: 8 },
  { name: "Jane Smith", count: 12 },
];

const tags = ["Free courses", "Marketing", "Idea", "LMS", "LearnPress", "Instructor"];

const ThreadListing = () => {
  const [threads, setThreads] = useState([]);
  const [filterData, setFilterData] = useState({ categories: [], tags: []});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ category: "", tags: [], sortBy: "" });
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract search query from URL if present (same as CourseListing)
  const searchParams = new URLSearchParams(location.search);
  const titleQuery = searchParams.get("title");
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        let endpoint = "";
        const params = new URLSearchParams();
        params.append("page", currentPage);
        if (titleQuery) params.append("searchQuery", titleQuery);
        if (filters.category) params.append("category", filters.category);
        if (filters.sortBy) params.append("sortBy", filters.sortBy);
        if (filters.tags.length > 0) {
          filters.tags.forEach(tag => params.append("tags", tag));
        }
        endpoint = `http://localhost:5000/forum?${params.toString()}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("Fetched threads data:", data);
        if (data.success) {
          setThreads(data.threads);
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch threads:", data.message);
        }
      } catch (error) {
        console.error("Error fetching threads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [currentPage, filters, location.search, titleQuery]);

  // Fetch available filters (categories, instructors, tags)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/forum/filters");
        const data = await response.json();
        // console.log("Fetched filter data:", data);
        if (data.success) {
          console.log("Fetched successfully!");
          setFilterData({
            categories: data.categories,
            tags: data.tags.map(tags => tags.tag_name),
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
    useEffect(() => {
      console.log("Updated filterData:", filterData);
    }, [filterData]);

  const navigate = useNavigate();

  return (
    <>
      <Navbar currentState="Forum" />
      <Breadcrumb paths={["Homepage", "Forum"]} />
      {/* Center Everything */}
      <div className="flex justify-center w-full">
        <div className="flex justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">

          {/* Left Section: Search & Courses */}
          <div className="w-3/4">
            <SearchBar title="All Threads" />

            {/* "Start a New Thread" Button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => navigate("/forum/upload")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-avant-medium py-2 px-5 rounded-xl shadow-md transition duration-300 cursor-pointer">
                + Start a New Thread
              </button>
            </div>

            {/* Courses Grid (6x1) */}           
            <div className="grid grid-rows-9 gap-5">
              {loading ? (
                <p>Loading threads...</p> // This will show when loading is true
              ) : Array.isArray(threads) && threads.length > 0 ? (
                threads.slice(0, 9).map((thread, index) => (
                  <ForumCardHorizontal key={index} {...thread} />
                ))
              ) : (
                <p className="text-center text-gray-600">No threads available</p> // This will show if no threads are found
              )}

            </div>

            {/* Pagination Below Courses */}
            <div className="mt-6 flex justify-center">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>

          {/* Right Section: Welcome + Banner + Course Filters */}
          <div className="w-1/4 space-y-6 mt-15">

            {/* Welcome to Forum box */}
            <div className="p-5 max-w-[390px] bg-yellow-50 border-3 border-yellow-500 rounded-xl text-lg space-y-4 mb-8">
              <div>
                <h3 className="font-bold font-avant-medium text-[27px] text-gray-800 mb-4">Welcome to the Forum 👋</h3>
                <p className="text-gray-700 text-xl">
                  This is your space to ask questions, share insights, and collaborate with others on your learning journey.
                </p>
                <ul className="list-disc text-xl list-inside mt-4 text-gray-700 space-y-1">
                  <li>Ask and answer questions</li>
                  <li>Use tags to find topics of interest</li>
                  <li>Vote for answers</li>
                  <li>Connect with instructors and peers</li>
                </ul>
              </div>
            </div>

            {/* Hustera Banner */}
            <div className="max-w-[390px] rounded-xl p-5 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md text-white text-center">
              <h3 className="text-5xl font-avant-medium font-bold tracking-wide">hustera</h3>
              <p className="text-md font-avant-medium">education for everyone</p>
            </div>

            {/* Course Filters */}
            <ForumFilter categories={filterData.categories} tags={filterData.tags} onFilterChange={setFilters} />

            
            <div className="mt-20">
              <img
                src={faqImage}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ThreadListing;