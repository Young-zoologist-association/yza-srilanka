import { cache } from "react";
import { fetchNewsAndUpdatesPageRaw } from "./client";
import { mapNewsAndUpdatesPage } from "./news-and-updates-page-mappers";
import type { NewsAndUpdatesPageData } from "./types";

/**
 * Fetches and maps the WordPress News and Updates page with all ACF news entries.
 */
export const getNewsAndUpdatesPage = cache(async (): Promise<NewsAndUpdatesPageData> => {
  const page = await fetchNewsAndUpdatesPageRaw();
  return mapNewsAndUpdatesPage(page);
});
