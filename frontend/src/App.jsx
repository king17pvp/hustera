import React from "react";
import Homepage from "./pages/Homepage";

const sampleCategories = [
  { iconPath: "icons/art_design.png", title: "Art & Design", courseCount: 38 },
  { iconPath: "icons/development.png", title: "Development", courseCount: 22 },
  { iconPath: "icons/communication.png", title: "Communication", courseCount: 48 },
  { iconPath: "icons/videography.png", title: "Videography", courseCount: 30 },
  { iconPath: "icons/photography.png", title: "Photography", courseCount: 15 },
  { iconPath: "icons/marketing.png", title: "Marketing", courseCount: 20 },
  { iconPath: "icons/contentwriting.png", title: "Content Writing", courseCount: 25 },
  { iconPath: "icons/finance.png", title: "Finance", courseCount: 10 },
  { iconPath: "icons/science.png", title: "Science", courseCount: 35 },
  { iconPath: "icons/network.png", title: "Network", courseCount: 18 },
];

const sampleCourses = [
  {
    thumbnailUrl: "course1.png",
    category: "Programming",
    title: "Intro to JavaScript",
    author: "John Doe",
    duration: "3 Weeks",
    students: 150,
    price: 29.99,
  },
  { /* Add more courses */ },
  { /* Add more courses */ },
  { /* Add more courses */ },
  { /* Add more courses */ },
  { /* Add more courses */ },
];

const sampleTestimonials = [
  { text: "Great platform!", author: "Alice", role: "Designer" },
  { text: "Loved the courses!", author: "Bob", role: "Developer" },
  { text: "Highly recommended!", author: "Charlie", role: "Manager" },
  { text: "Fantastic learning experience!", author: "David", role: "Student" },
];

const sampleArticles = [
  {
    thumbnailUrl: "article1.png",
    title: "Best Online Courses 2025",
    date: "Mar 9, 2025",
    description: "Discover the top courses on Hustera.",
  },
  { /* Add more articles */ },
];

const App = () => {
  return (
    <Homepage
      categories={sampleCategories}
      courses={sampleCourses}
      testimonials={sampleTestimonials}
      articles={sampleArticles}
    />
  );
};

export default App;
