import React from "react";
import logo from "../assets/logo2.png"; // Import correct logo

const Footer = () => {
  return (
    <footer className="flex-col justify-center bg-gray-100 py-12">
      <div className="mx-auto max-w-[1720px] flex justify-center text-gray-600 space-x-43">
        {/* Left Section - Enlarged Logo & Description */}
        <div className="w-1/5 flex-col">
          <img src={logo} alt="Hustera Logo" className="h-20 mb-2" /> {/* Increased size */}
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex space-x-43">
          {/* Get Help */}
          <div>
            <h3 className="font-avant-medium font-bold text-2xl text-gray-900">GET HELP</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Latest Articles</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">FAQs</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-avant-medium font-bold text-2xl text-gray-900">PROGRAMS</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Art & Design</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Business</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">IT & Software</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Languages</a></li>
              <li><a href="#" className="hover:text-blue-600 text-xl transition">Programming</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-avant-medium font-bold text-2xl text-gray-900">CONTACT US</h3>
            <p className="mt-2 text-xl">
              Address: 1 Dai Co Viet, Bach Khoa, Hai Ba Trung, Ha Noi, Viet Nam
            </p>
            <p className="mt-2 text-xl">Tel: + (84) 911674187</p>
            <p className="mt-1 text-xl">Mail: khue.nvn225519@sis.hust.edu.vn</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-[1700px] mx-auto justify-center text-center text-lg text-gray-500 mt-10 border-t-2 border-zinc-300 pt-5">
        Copyright © 2025 HUSTera | Powered by HQKDA
      </div>
    </footer>
  );
};

export default Footer;
