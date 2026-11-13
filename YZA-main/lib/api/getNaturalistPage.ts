import { cache } from "react";
import { fetchNaturalistPageRaw } from "./client";
import { mapNaturalistPage } from "./naturalist-page-mappers";
import type { NaturalistPageData } from "./types";

/**
 * Fetches and maps the WordPress Naturalist page with guidelines PDF.
 */
export const getNaturalistPage = cache(async (): Promise<NaturalistPageData> => {
  const page = await fetchNaturalistPageRaw();
  return mapNaturalistPage(page);
});
