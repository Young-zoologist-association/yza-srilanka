import { cache } from "react";
import { fetchStorePageRaw } from "./client";
import { mapStorePage } from "./store-page-mappers";
import type { StorePageData } from "./types";

/**
 * Fetches and maps the WordPress Store page with product listings.
 */
export const getStorePage = cache(async (): Promise<StorePageData> => {
  const page = await fetchStorePageRaw();
  return mapStorePage(page);
});
