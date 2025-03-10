import React, { useState } from "react";

const CourseFilter = ({ categories, instructors }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    instructor: "",
    price: ["All"], // Default selected
    level: [],
  });

  const handleSingleSelect = (section, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section] === value ? "" : value, // Uncheck if already selected
    }));
  };

  const toggleFilter = (section, value) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };

      if (section === "price") {
        updated.price = value === "All" ? ["All"] : [value]; // Ensure only one price option is checked
      } else {
        updated[section] = prev[section].includes(value)
          ? prev[section].filter((item) => item !== value) // Remove if already selected
          : [...prev[section], value]; // Add if not selected
      }

      return updated;
    });
  };

  return (
    <div className="w-85 p-6 text-black">
      {/* Course Category (Single Selection) */}
      <FilterSection title="Course Category">
        {categories.map(({ name, count }) => (
          <RadioCheckbox
            key={name}
            label={name}
            count={count}
            checked={selectedFilters.category === name}
            onChange={() => handleSingleSelect("category", name)}
          />
        ))}
      </FilterSection>

      {/* Instructors (Single Selection) */}
      <FilterSection title="Instructors">
        {instructors.map(({ name, count }) => (
          <RadioCheckbox
            key={name}
            label={name}
            count={count}
            checked={selectedFilters.instructor === name}
            onChange={() => handleSingleSelect("instructor", name)}
          />
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        {["All", "Free", "Paid"].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selectedFilters.price.includes(item)}
            onChange={() => toggleFilter("price", item)}
          />
        ))}
      </FilterSection>

      {/* Level */}
      <FilterSection title="Level">
        {["All levels", "Beginner", "Intermediate", "Expert"].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selectedFilters.level.includes(item)}
            onChange={() => toggleFilter("level", item)}
          />
        ))}
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
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        className="w-5 h-5 cursor-pointer" 
      />
      <span className="text-gray-600">{label}</span>
    </div>
    {count !== undefined && <span className="text-gray-600">{count}</span>}
  </label>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex justify-between items-center cursor-pointer text-xl mb-3">
    <div className="flex items-center space-x-3">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        className="w-5 h-5 cursor-pointer" 
      />
      <span className="text-gray-600">{label}</span>
    </div>
  </label>
);

export default CourseFilter;
