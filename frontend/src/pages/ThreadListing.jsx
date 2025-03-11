import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForumCardHorizontal from "../components/ForumCardHorizontal";
import Breadcrumb from "../components/BreadCrumb";
import ForumFilter from "../components/ForumFilter";
import SearchBar from "../components/SectionHeader";
import Pagination from "../components/Pagination";
import { useState } from "react";

const sampleThreads = [
    {
      thumbnailUrl: "https://knowledge.hubspot.com/hubfs/freeonlinecourses-1.webp",
      title: "Best Online Courses 2025",
      date: "Mar 9, 2025",
      description: "Discover the top courses on Hustera.",
      tags: ["React", "Beginner", "JavaScript"],
    },
    {
      thumbnailUrl: "https://imageio.forbes.com/specials-images/imageserve/5f8472dc6a02f19410b389be/Online-business-class--alternative-to-MBA/960x0.jpg?format=jpg&width=960",
      title: "How to Excel in Online Learning",
      date: "Feb 20, 2025",
      description: "Tips and strategies to stay productive while learning online.",
      tags: ["React", "Beginner", "JavaScript"],
    },
    {
      thumbnailUrl: "https://extension.harvard.edu/wp-content/uploads/sites/8/2020/10/computer-programming.jpg",
      title: "Top 10 Programming Languages to Learn",
      date: "Jan 15, 2025",
      description: "Explore the most in-demand programming languages this year.",
      tags: ["React", "Beginner", "JavaScript"],
    },
    {
      thumbnailUrl: "https://ant.ncc.asia/wp-content/uploads/2024/05/8212123_What-is-Artiificial-IntelligenceAI.webp",
      title: "AI & Machine Learning: The Future of Tech",
      date: "Dec 10, 2024",
      description: "How AI is revolutionizing industries and what you should learn.",
      tags: ["React", "Beginner", "JavaScript"],
    },
    {
      thumbnailUrl: "https://caodang.fpt.edu.vn/wp-content/uploads/2-595.jpg",
      title: "Mastering Web Development in 2025",
      date: "Nov 5, 2024",
      description: "A complete guide to becoming a full-stack web developer.",
      tags: ["React", "Beginner", "JavaScript"],
    },
    {
      thumbnailUrl: "https://cloud.z.com/vn/wp-content/uploads/2023/06/what-is-data-science.jpg",
      title: "The Importance of Data Science in Business",
      date: "Oct 22, 2024",
      description: "Why every company needs data science and how to get started.",
      tags: ["React", "Beginner", "JavaScript"],
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
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
  
    return (
      <>
        <Navbar currentState="Forum"/>
        <Breadcrumb paths={["Homepage", "Forum"]} />
  
        {/* Center Everything */}
        <div className="flex justify-center w-full">
          <div className="flex justify-between gap-10 px-6 py-13 max-w-[1720px] w-full">
            
            {/* Left Section: Search & Courses */}
            <div className="w-3/4">
              <SearchBar title="All Threads" />
  
              {/* Courses Grid (6x1) */}
              <div className="grid grid-rows-6 gap-7">
                {sampleThreads.slice(0, 6).map((thread, index) => (
                  <ForumCardHorizontal key={index} {...thread} />
                ))}
              </div>
  
              {/* Pagination Below Courses */}
              <div className="mt-6 flex justify-center">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
              </div>
            </div>
  
            {/* Right Section: Course Filters */}
            <div className="w-1/4">
              <ForumFilter categories={categories} instructors={instructors} tags={tags} />
            </div>
  
          </div>
        </div>
  
        <Footer />
      </>
    );
  };
  
export default ThreadListing;
  
