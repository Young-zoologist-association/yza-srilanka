"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PaginatedItemsState } from "./types";

export function usePaginatedItems<T>(
  items: T[],
  pageSize: number,
  resetKey?: string | number,
): PaginatedItemsState<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length, resetKey]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    },
    [totalPages],
  );

  const goNext = useCallback(() => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }, [totalPages]);

  const goPrevious = useCallback(() => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }, []);

  const startIndex = items.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, items.length);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goNext,
    goPrevious,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
    totalItems: items.length,
    startIndex,
    endIndex,
    showPagination: items.length > pageSize,
  };
}
