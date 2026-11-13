import { cache } from "react";
import { fetchCmcPageRaw } from "./client";
import { mapCmcPage } from "./cmc-page-mappers";
import type { CmcPageData } from "./types";

/**
 * Fetches and maps the WordPress CMC page with all ACF committee levels.
 */
export const getCmcPage = cache(async (): Promise<CmcPageData> => {
  const page = await fetchCmcPageRaw();
  return mapCmcPage(page);
});
