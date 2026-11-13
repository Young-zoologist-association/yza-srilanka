import { cache } from "react";
import { fetchCommitteesPageRaw } from "./client";
import { mapCommitteesPage } from "./committees-page-mappers";
import type { CommitteesPageData } from "./types";

/**
 * Fetches and maps the WordPress Committees page with all ACF committee entries.
 */
export const getCommitteesPage = cache(async (): Promise<CommitteesPageData> => {
  const page = await fetchCommitteesPageRaw();
  return mapCommitteesPage(page);
});
