// frontend/src/components/SectionHeader.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = ({ title }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchInput.trim()) {
      params.set('title', searchInput.trim());
    } else {
      params.delete('title');
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center w-full py-10">
      <h1 className="text-5xl font-avant-medium font-bold">{title}</h1>
      <form onSubmit={handleSearch} className="relative w-90">
        <input
          type="text"
          placeholder="Search"
          className="w-full border-b border-gray-400 focus:outline-none font-avant-medium text-xl text-gray-700 placeholder-gray-400 px-2 py-1 pr-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <svg
            className="h-7 w-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9 0 7 7 0 0 0 9.9 0" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
