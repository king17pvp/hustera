import React from "react";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="py-6 bg-gray-200 flex justify-center">
      <ul className="flex items-center justify-start w-[1670px] space-x-2 text-lg text-gray-400">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <span className={`text-xl font-avant-medium text-gray-${index === paths.length - 1 ? "400" : "600"}`}>
              {path}
            </span>
            {/* Show ">" separator if not last item */}
            {index !== paths.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
