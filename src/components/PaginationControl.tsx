"use client";
import React from "react";
import { Icon } from "@iconify/react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}: Props) => {
  return (
    <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 mt-2 gap-y-2">
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="p-1 sm:p-2 rounded-md w-16 border border-gray-300 text-xs sm:text-sm"
          aria-label="Items per page"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
        <span className="hidden xs:inline">Items per page</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`hover:bg-red-100 p-1 sm:p-2 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous page"
        >
          <Icon
            icon="akar-icons:chevron-left"
            className="text-base sm:text-lg"
          />
        </button>

        <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm">
          {currentPage}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`hover:bg-red-100 p-1 sm:p-2 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Next page"
        >
          <Icon
            icon="akar-icons:chevron-right"
            className="text-base sm:text-lg"
          />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
