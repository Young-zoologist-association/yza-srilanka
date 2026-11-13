"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginatedItemsState } from "@/lib/pagination/types";

interface PdfArchivePaginationProps {
  pagination: Pick<
    PaginatedItemsState<unknown>,
    | "currentPage"
    | "totalPages"
    | "goNext"
    | "goPrevious"
    | "hasNext"
    | "hasPrevious"
    | "startIndex"
    | "endIndex"
    | "totalItems"
    | "showPagination"
  >;
  onPageChange?: () => void;
  className?: string;
  variant?: "default" | "compact";
  hideRangeSummary?: boolean;
}

export function PdfArchivePagination({
  pagination,
  onPageChange,
  className,
  variant = "default",
  hideRangeSummary = false,
}: PdfArchivePaginationProps) {
  if (!pagination.showPagination) return null;

  const handlePrevious = () => {
    pagination.goPrevious();
    onPageChange?.();
  };

  const handleNext = () => {
    pagination.goNext();
    onPageChange?.();
  };

  const isCompact = variant === "compact";
  const showCompactRange = isCompact && !hideRangeSummary;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="Pagination"
      className={`flex items-center justify-center gap-2 ${
        showCompactRange ? "flex-col gap-3 pt-4" : isCompact ? "" : "flex-col gap-3 pt-4 sm:flex-row sm:justify-between"
      } ${className ?? ""}`}
    >
      {!isCompact ? (
        <p
          className="text-sm text-[#5C7A63] order-2 sm:order-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Showing{" "}
          <span className="font-semibold text-[#1a2e1f]">
            {pagination.startIndex}–{pagination.endIndex}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[#1a2e1f]">{pagination.totalItems}</span>
        </p>
      ) : showCompactRange ? (
        <p className="text-xs text-[#5C7A63] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {pagination.startIndex}–{pagination.endIndex} of {pagination.totalItems}
        </p>
      ) : null}

      <div className={`flex items-center gap-2 ${isCompact ? "justify-center" : "order-1 sm:order-2"}`}>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={!pagination.hasPrevious}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#3F7A4E]/20 text-sm font-medium text-[#3F7A4E] hover:bg-[#3F7A4E]/5 disabled:opacity-40 disabled:pointer-events-none transition-colors ${
            isCompact ? "h-10 w-10 shrink-0 p-0" : "px-4 py-2.5"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          {!isCompact ? "Previous" : null}
        </button>

        <span
          className={`font-medium text-[#1a2e1f] text-center shrink-0 ${
            isCompact ? "px-2 text-xs min-w-[4.5rem]" : "px-3 py-2 text-sm min-w-[7rem]"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {pagination.currentPage} / {pagination.totalPages}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={!pagination.hasNext}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#3F7A4E] text-white text-sm font-medium hover:bg-[#2D5A3D] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-md shadow-[#3F7A4E]/20 ${
            isCompact ? "h-10 w-10 shrink-0 p-0" : "px-4 py-2.5"
          }`}
        >
          {!isCompact ? "Next" : null}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.nav>
  );
}
