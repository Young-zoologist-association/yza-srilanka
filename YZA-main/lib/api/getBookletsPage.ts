import { cache } from "react";
import { fetchBookletsPageRaw } from "./client";
import { mapBookletsPage } from "./booklets-page-mappers";
import type { BookletsPageData } from "./types";

export const getBookletsPage = cache(async (): Promise<BookletsPageData> => {
  const page = await fetchBookletsPageRaw();
  return mapBookletsPage(page);
});
