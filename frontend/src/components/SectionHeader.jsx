const SearchBar = ({ title }) => {
    return (
      <div className="flex justify-between items-center w-full py-10">
        {/* Dynamic Title */}
        <h1 className="text-5xl font-avant-medium font-bold">{title}</h1>
  
        {/* Search Input */}
        <div className="relative w-90">
          <input
            type="text"
            placeholder="Search"
            className="w-full border-b border-gray-400 focus:outline-none font-avant-medium text-xl text-gray-700 placeholder-gray-400 px-2 py-1 pr-10"
          />
          
          {/* Search Icon (SVG) */}
          <svg 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9 0 7 7 0 0 0 9.9 0" />
          </svg>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  