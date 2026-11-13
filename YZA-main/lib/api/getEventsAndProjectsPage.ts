import { cache } from "react";
import { fetchEventsAndProjectsPageRaw } from "./client";
import { mapEventsAndProjectsPage } from "./events-and-projects-page-mappers";
import type { EventsAndProjectsPageData } from "./types";

/**
 * Fetches and maps the WordPress Events & Projects page with all ACF sections.
 */
export const getEventsAndProjectsPage = cache(async (): Promise<EventsAndProjectsPageData> => {
  const page = await fetchEventsAndProjectsPageRaw();
  return mapEventsAndProjectsPage(page);
});
