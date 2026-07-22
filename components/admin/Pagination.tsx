"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        title="Previous page"
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page number buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          title={`Page ${page}`}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
            page === currentPage
              ? "bg-blue-900 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        title="Next page"
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}