import React, { useState, useEffect } from "react";

const ForumFilter = ({ categories, tags, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    sortBy: "recentComment", // Default sorting option
    tags: [],
  });
  
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
  }, [selectedFilters]);
  
  // Handles single-selection filters (Sort By)
  const handleSingleSelect = (section, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section] === value ? "" : value, // Deselect if clicked again
    }));
  };

  // Handle category selection (single selection)
  const toggleCategory = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category, // Deselect if clicked again
    }));
  };

  // Handles multi-selection filters (Tags)
  const toggleTag = (tag) => {
    setSelectedFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag) // Remove if already selected
        : [...prev.tags, tag], // Add if not selected
    }));
  };

  return (
    <div className="w-100 px-3  font-avant-medium text-black">
      {/* Category Section */}
      <FilterSection title="Thread Category">
        <div className="flex flex-wrap gap-3">
          {categories.map(({ name, thread_count }) => (
            <button
              key={name}
              onClick={() => toggleCategory(name)}
              className={`px-4 py-2 rounded-xl font-avant-medium text-lg border transition cursor-pointer flex justify-between items-center ${
                selectedFilters.category === name
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span>{name}</span>
              {thread_count !== undefined && (
                <span className="ml-2 text-sm px-2 py-1 rounded-full bg-opacity-20 bg-gray-200">
                  {thread_count}
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Sort By Section */}
      <FilterSection title="Sort By">
        <RadioCheckbox
          label="Most Recent Comment"
          checked={selectedFilters.sortBy === "recentComment"}
          onChange={() => handleSingleSelect("sortBy", "recentComment")}
        />
        <RadioCheckbox
          label="Date (Newest to Oldest)"
          checked={selectedFilters.sortBy === "newest"}
          onChange={() => handleSingleSelect("sortBy", "newest")}
        />
        <RadioCheckbox
          label="Date (Oldest to Newest)"
          checked={selectedFilters.sortBy === "oldest"}
          onChange={() => handleSingleSelect("sortBy", "oldest")}
        />
      </FilterSection>

      {/* Tags Section */}
      <FilterSection title="Tags">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-xl font-avant-medium text-lg text-gray-600 border transition cursor-pointer ${
                selectedFilters.tags.includes(tag)
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

/* Reusable Components */
const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-avant-medium font-bold text-3xl mb-5 mt-10">{title}</h3>
    {children}
  </div>
);

const RadioCheckbox = ({ label, count, checked, onChange }) => (
  <label className="flex justify-between items-center cursor-pointer text-xl mb-3">
    <div className="flex items-center space-x-3">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 cursor-pointer"
      />
      <span className="text-gray-600">{label}</span>
    </div>
    {count !== undefined && <span className="text-gray-600">{count}</span>}
  </label>
);

export default ForumFilter;