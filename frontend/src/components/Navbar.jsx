import { useState } from "react";
import logo from "../assets/logo1.png"; 
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentState }) => {
  const [active, setActive] = useState(currentState);

  const navItems = [{ title: "Home", path: "/" }, 
                    { title: "Courses", path: "/courses" }, 
                    { title: "Forum", path: "/forum"}, 
                    { title: "FAQs", path: "/faqs"},
                  ];

  const navigate = useNavigate();

  return (
    <nav className="w-full h-20 max-w-[1680px] mx-auto flex justify-center items-center py-0 bg-white">
      {/* Logo Section */}
      <div className="w-1/3 flex justify-start">
        <img src={logo} alt="Hustera Logo" className="h-15 w-auto" />
      </div>

      {/* Navigation Links (Centered) */}
      <div className="w-1/3 flex justify-center">
        <div className="flex space-x-0">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {navigate(item.path), setActive(item.title)}}
              className={`w-36 px-6 py-5 h-20 text-xl font-avant-medium text-center transition-colors duration-300 cursor-pointer ${
                active === item.title
                  ? "bg-gray-200 text-blue-600"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Login/Register Button (Right Aligned) */}
      <div className="w-1/3 flex  justify-end">
        <button className="px-9 py-3 text-xl font-avant-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
