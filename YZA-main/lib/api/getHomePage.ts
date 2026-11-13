import { cache } from "react";
import { fetchHomePageRaw } from "./client";
import { mapHomePage } from "./mappers";
import type { HomePageData } from "./types";

/**
 * Fetches and maps the WordPress home page (front page) with all ACF sections.
 */
export const getHomePage = cache(async (): Promise<HomePageData> => {
  const page = await fetchHomePageRaw();
  return mapHomePage(page);
});
