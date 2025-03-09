import { useState } from "react";
import logo from "../assets/logo1.png"; // Import the logo

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const navItems = ["Home", "Courses", "Forum", "FAQs"];

  return (
    <nav className="w-full max-w-[1680px] mx-auto flex justify-center items-center py-0 bg-white">
      {/* Logo Section */}
      <div className="w-1/3 flex justify-start">
        <img src={logo} alt="Hustera Logo" className="h-12 w-auto" />
      </div>

      {/* Navigation Links (Centered) */}
      <div className="w-1/3 flex justify-center">
        <div className="flex space-x-0">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-32 px-6 py-5 text-xl font-semibold text-center transition-colors duration-300 cursor-pointer ${
                active === item
                  ? "bg-gray-200 text-blue-600"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Login/Register Button (Right Aligned) */}
      <div className="w-1/3 flex justify-end">
        <button className="px-9 py-3 text-xl font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
