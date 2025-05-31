import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice"; // Ensure the correct path
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Importing dropdown icon

const Navbar = ({ currentState }) => {
  const [active, setActive] = useState(currentState);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Courses", path: "/courses" },
    { title: "Forum", path: "/forum" },
    { title: "FAQs", path: "/faqs" },
  ];

  const handleNavClick = (item) => {
    navigate(item.path);
    setActive(item.title);
  };

  const handleLoginClick = () => {
    setActive(null);
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-20 max-w-[1760px] mx-auto flex justify-center items-center py-0 bg-white overflow-visible">
      {/* Logo Section */}
      <div className={`${user ? "w-1/3" : "w-1/2"} flex justify-start ml-10`}>
        <img src={logo} alt="Hustera Logo" className="h-15 w-auto" />
      </div>

      {/* Navigation Links (Centered) - Show only if user exists */}
      {user && (
        <div className="w-1/3 flex justify-center">
          <div className="flex space-x-0">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`w-36 px-6 py-5 h-20 text-xl font-avant-medium text-center transition-colors duration-300 cursor-pointer ${active === item.title
                  ? "bg-gray-200 text-blue-600"
                  : "text-black hover:bg-gray-200"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Login / User Dropdown Menu */}
      <div className={`${user ? "w-1/3" : "w-1/2"} flex justify-end relative`}>
        {user ? (
          <div
            ref={dropdownRef}
            className="relative flex items-center space-x-3 px-3 py-2 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {/* User Name (Fixed Width) */}
            <span className="text-[24px] font-medium truncate max-w-[300px] text-right">
              {user.user_info.name || user.email}
            </span>

            {/* User Avatar (Fixed Size) */}
            <img
              src={user.user_info.avatar || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"}
              alt="User Avatar"
              className="w-15 h-15 rounded-full border border-gray-300 flex-shrink-0 object-cover"
            />

            {/* Dropdown Arrow (Fixed Size Container to Prevent Jiggling) */}
            <div className="w-6 h-6 flex items-center justify-center">
              {isDropdownOpen ? (
                <FiChevronUp className="w-5 h-5 text-gray-600 transition-transform duration-200" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-200" />
              )}
            </div>

            {/* Dropdown Menu - Absolutely Positioned Below */}
            <div
              className={`absolute right-0 top-full mt-2 w-70 bg-white shadow-md rounded-lg overflow-hidden z-50 transition-opacity duration-200 ${isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              <button
                onClick={() => navigate("/settings")}
                className="block w-full px-7 py-2 text-left text-[21px] font-avant-medium hover:bg-gray-200 cursor-pointer">
                Settings
              </button>
              {user.role === "admin" && (
                <>
                  <button
                    onClick={() => navigate("/admin/user-management")}
                    className="block w-full px-7 py-2 text-left text-[21px] font-avant-medium hover:bg-gray-200 cursor-pointer"
                  >
                    User Management
                  </button>
                  <button
                    onClick={() => navigate("/admin/course-management")}
                    className="block w-full px-7 py-2 text-left text-[21px] font-avant-medium hover:bg-gray-200 cursor-pointer"
                  >
                    Course Management
                  </button>
                  <button
                    onClick={() => navigate("/admin/forum-management")}
                    className="block w-full px-7 py-2 text-left text-[21px] font-avant-medium hover:bg-gray-200 cursor-pointer"
                  >
                    Forum Management
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block w-full px-7 py-2 text-left text-[21px] font-avant-medium text-red-600 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="px-9 py-3 text-xl font-avant-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
