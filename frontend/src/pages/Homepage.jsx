import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import CoursesCard from "../components/CoursesCard";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import TestimonialCard from "../components/TestimonialCard";
import ArticleCard from "../components/ArticleCard";

const Homepage = ({ categories, courses, testimonials, articles }) => {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Categories Section */}
      <div className="max-w-[1780px] mx-auto px-10 mt-25">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 p-1">
            <div>
            <h2 className="text-4xl font-bold text-black mb-3">Top Categories</h2>
            <p className="text-gray-500 text-xl">Explore our Popular Categories</p>
            </div>
            <button className="px-6 py-2 border-3 border-black rounded-full text-black text-xl font-semibold hover:bg-gray-100 transition cursor-pointer">
            All Categories
            </button>
        </div>

        {/* Categories Grid (2 rows, 5 columns) */}
        <div className="grid grid-cols-5 grid-rows-2 gap-5 h-[660px]">
            {categories.map((category, index) => (
            <CategoryCard
                key={index}
                iconPath={category.iconPath}
                title={category.title}
                courseCount={category.courseCount}
            />
            ))}
        </div>
      </div>

        
      <div className="max-w-[1780px] mx-auto px-10 mt-25">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 p-1">
            <div>
            <h2 className="text-4xl font-bold text-black mb-3">Featured Courses</h2>
            <p className="text-gray-500 text-xl">Explore our Popular Courses</p>
            </div>
            <button className="px-6 py-2 border-3 border-black rounded-full text-black text-xl font-semibold hover:bg-gray-100 transition cursor-pointer">
            All Courses
            </button>
        </div>  
        {/* Courses Grid (2 rows, 3 columns) */}
        <div className="grid grid-cols-3 grid-rows-2 gap-7">
            {courses.map((course, index) => (
            <CoursesCard
                key={index}
                thumbnailUrl={course.thumbnailUrl}
                category={course.category}
                title={course.title}
                author={course.author}
                duration={course.duration}
                students={course.students}
                price={course.price}
            />
            ))}
        </div>
      </div>

      <Banner />

      {/* Testimonials Grid (1 row, 4 columns) */}
      <div className="grid grid-cols-4 grid-rows-1 gap-6 px-10 mt-10">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            author={testimonial.author}
            role={testimonial.role}
          />
        ))}
      </div>

      {/* Articles Grid (1 row, 3 columns) */}
      <div className="grid grid-cols-3 grid-rows-1 gap-6 px-10 mt-10">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            thumbnailUrl={article.thumbnailUrl}
            title={article.title}
            date={article.date}
            description={article.description}
          />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
