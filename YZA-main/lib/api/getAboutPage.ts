import { cache } from "react";
import { fetchAboutPageRaw } from "./client";
import { mapAboutPage } from "./about-page-mappers";
import type { AboutPageData } from "./types";

/**
 * Fetches and maps the WordPress About page with all ACF sections.
 */
export const getAboutPage = cache(async (): Promise<AboutPageData> => {
  const page = await fetchAboutPageRaw();
  return mapAboutPage(page);
});
