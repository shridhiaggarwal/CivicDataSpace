"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronDown, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (value: number) => void;
  onRowsChange: (value: number) => void;
}
export default function Pagination(props: PaginationProps) {
  const { currentPage, rowsPerPage, totalItems, onPageChange, onRowsChange } =
    props;
  const rowsOptions = [5, 10];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleRowsChange = (value: number) => {
    onRowsChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white p-4 border-r border-gray-200 shadow-sm rounded-lg flex items-center justify-end gap-4 flex-wrap">
      {/* Rows per page dropdown */}
      <div className="flex items-center gap-2">
        <span className=" text-gray-600">Rows per page</span>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {rowsPerPage}
            <FaChevronDown size={16} className="text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
              {rowsOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleRowsChange(option)}
                  className="block w-full px-3 py-2  text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Page info */}
      <div className=" text-gray-600">
        Page <span className="font-bold">{currentPage}</span> of {totalPages}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrevious}
          className={`p-2 rounded text-[#1f5f8d]  ${
            isFirstPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isFirstPage}
        >
          <FaChevronLeft size={16} className="text-[#1f5f8d]" />
        </button>

        <button
          onClick={handleNext}
          className={`p-2 rounded text-[#1f5f8d]  ${
            isLastPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isLastPage}
        >
          <FaChevronRight size={16} className="text-[#1f5f8d]" />
        </button>
      </div>
    </div>
  );
}
