import React from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGENATION } from "@/constants";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <Button
        variant="Ghost"
        width={85}
        height={38}
        leftIcon={<ChevronLeft width={20} height={20} style={{ opacity: 1 }} />}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {PAGENATION.PREV}
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          className={`rounded px-3 py-1 ${
            pageNum === currentPage
              ? "font-semibold text-white"
              : "text-text-muted hover:bg-gray-100"
          }`}
          style={pageNum === currentPage ? { backgroundColor: "#3E3E3E" } : {}}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <Button
        variant="Ghost"
        width={85}
        height={38}
        rightIcon={
          <ChevronRight width={20} height={20} style={{ opacity: 1 }} />
        }
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {PAGENATION.NEXT}
      </Button>
    </div>
  );
}
