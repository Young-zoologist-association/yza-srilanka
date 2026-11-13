import { cache } from "react";
import { fetchSymposiumPageRaw } from "./client";
import { mapSymposiumPage } from "./symposium-page-mappers";
import type { SymposiumPageData } from "./types";

/**
 * Fetches and maps the WordPress Symposium page with submission guidelines PDF.
 */
export const getSymposiumPage = cache(async (): Promise<SymposiumPageData> => {
  const page = await fetchSymposiumPageRaw();
  return mapSymposiumPage(page);
});
