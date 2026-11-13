import { cache } from "react";
import { fetchInstructorsPageRaw } from "./client";
import { mapInstructorsPage } from "./instructors-page-mappers";
import type { InstructorsPageData } from "./types";

/**
 * Fetches and maps the WordPress Instructors page with all ACF instructor entries.
 */
export const getInstructorsPage = cache(async (): Promise<InstructorsPageData> => {
  const page = await fetchInstructorsPageRaw();
  return mapInstructorsPage(page);
});
