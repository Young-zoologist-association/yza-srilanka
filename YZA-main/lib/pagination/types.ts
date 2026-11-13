export interface PaginatedItemsState<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  goToPage: (page: number) => void;
  goNext: () => void;
  goPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  showPagination: boolean;
}
