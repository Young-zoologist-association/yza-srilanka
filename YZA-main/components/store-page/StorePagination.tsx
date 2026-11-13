"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginatedItemsState } from "@/lib/pagination/types";
import { STORE_THEME } from "@/lib/store-page/storeTheme";

interface StorePaginationProps {
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
}

export function StorePagination({ pagination, onPageChange }: StorePaginationProps) {
  if (!pagination.showPagination) return null;

  const handlePrevious = () => {
    pagination.goPrevious();
    onPageChange?.();
  };

  const handleNext = () => {
    pagination.goNext();
    onPageChange?.();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Store pagination"
      className="flex flex-col items-center gap-4 pt-10 sm:flex-row sm:justify-between"
    >
      <p
        className="text-sm order-2 sm:order-1"
        style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
      >
        Showing{" "}
        <span className="font-semibold" style={{ color: STORE_THEME.forest }}>
          {pagination.startIndex}–{pagination.endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold" style={{ color: STORE_THEME.forest }}>
          {pagination.totalItems}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-2 order-1 sm:order-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={!pagination.hasPrevious}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-40 hover:scale-[1.02]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            borderColor: `${STORE_THEME.amber}55`,
            color: STORE_THEME.forest,
            backgroundColor: "white",
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <span
          className="min-w-[7rem] px-3 py-2 text-center text-sm font-semibold"
          style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.bark }}
        >
          {pagination.currentPage} / {pagination.totalPages}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={!pagination.hasNext}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-lg transition-all disabled:pointer-events-none disabled:opacity-40 hover:scale-[1.02]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            backgroundColor: STORE_THEME.terracotta,
            boxShadow: `0 10px 24px -8px ${STORE_THEME.terracotta}88`,
          }}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.nav>
  );
}
