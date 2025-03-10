import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null; // No pagination needed if only one page

  const getPageNumbers = () => {
    if (totalPages <= 4) return [...Array(totalPages)].map((_, i) => i + 1);

    if (currentPage <= 2) return [1, 2, 3, 4];
    if (currentPage >= totalPages - 1) return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Previous Button */}
      <button
        className={`w-14 h-14 flex items-center text-xl font-avant-medium justify-center rounded-full border cursor-pointer ${
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`w-14 h-14 flex items-center text-xl font-avant-medium justify-center rounded-full border cursor-pointer ${
            currentPage === page ? "bg-black text-white font-bold" : "hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`w-14 h-14 flex items-center text-xl font-avant-medium justify-center rounded-full border cursor-pointer ${
          currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
