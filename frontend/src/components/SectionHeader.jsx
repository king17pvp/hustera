// frontend/src/components/SectionHeader.jsx
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search query from URL params
  const params = new URLSearchParams(location.search);
  const defaultValue = params.get('title') || '';

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    
    // Only add search parameter if there's a query
    if (searchQuery) {
      navigate(`/courses?title=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-4xl font-avant-medium font-bold">{title}</h1>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search courses..."
          className="px-5 py-3 w-[400px] border-2 border-gray-300 rounded-xl text-lg focus:border-black outline-none"
        />
      </form>
    </div>
  );
};

export default SearchBar;
