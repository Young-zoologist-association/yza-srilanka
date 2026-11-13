import { cache } from "react";
import { fetchAbstractBooksPageRaw } from "./client";
import { mapAbstractBooksPage } from "./abstract-books-page-mappers";
import type { AbstractBooksPageData } from "./types";

export const getAbstractBooksPage = cache(async (): Promise<AbstractBooksPageData> => {
  const page = await fetchAbstractBooksPageRaw();
  return mapAbstractBooksPage(page);
});
