import { cache } from "react";
import { fetchPresidentsPageRaw } from "./client";
import { mapPresidentsPage } from "./presidents-page-mappers";
import type { PresidentsPageData } from "./types";

/**
 * Fetches and maps the WordPress Presidents page with all ACF president entries.
 */
export const getPresidentsPage = cache(async (): Promise<PresidentsPageData> => {
  const page = await fetchPresidentsPageRaw();
  return mapPresidentsPage(page);
});
