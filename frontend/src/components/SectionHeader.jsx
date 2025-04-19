// frontend/src/components/SectionHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SectionHeader = ({ title, showSearch = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?title=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-avant-medium font-bold mb-4">{title}</h2>
      
      {showSearch && (
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            className="w-full font-avant-medium text-[19px] text-gray-600 border-3 border-gray-300 px-5 py-3 rounded-xl pr-12"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

export default SectionHeader;
