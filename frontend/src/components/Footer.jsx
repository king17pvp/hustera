import React from "react";
import logo from "../assets/logo2.png"; // Import correct logo

const Footer = () => {
  return (
    <footer className="flex-col justify-center bg-gray-100 py-12">
      <div className="mx-auto px-20 flex justify-center text-gray-600 space-x-20">
        {/* Left Section - Enlarged Logo & Description */}
        <div className="w-1/5 flex-col">
          <img src={logo} alt="Hustera Logo" className="h-20 mb-2" /> {/* Increased size */}
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex space-x-30">
          {/* Get Help */}
          <div>
            <h3 className="font-bold text-xl text-gray-900">GET HELP</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Latest Articles</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">FAQs</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-xl text-gray-900">PROGRAMS</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Art & Design</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Business</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">IT & Software</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Languages</a></li>
              <li><a href="#" className="hover:text-blue-600 text-lg transition">Programming</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-xl text-gray-900">CONTACT US</h3>
            <p className="mt-2 text-lg">
              Address: 1 Dai Co Viet, Bach Khoa, Hai Ba Trung, Ha Noi, Viet Nam
            </p>
            <p className="mt-2 text-lg">Tel: + (84) 911674187</p>
            <p className="mt-1 text-lg">Mail: khue.nvn225519@sis.hust.edu.vn</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-4/5 mx-auto justify-center text-center text-lg text-gray-500 mt-10 border-t-2 border-zinc-300 pt-5">
        Copyright © 2025 HUSTera | Powered by HQKDA
      </div>
    </footer>
  );
};

export default Footer;
