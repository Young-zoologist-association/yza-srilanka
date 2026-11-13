import { cache } from "react";
import { fetchStudyGroupsPageRaw } from "./client";
import { mapStudyGroupsPage } from "./study-groups-page-mappers";
import type { StudyGroupsPageData } from "./types";

export const getStudyGroupsPage = cache(async (): Promise<StudyGroupsPageData> => {
  const page = await fetchStudyGroupsPageRaw();
  return mapStudyGroupsPage(page);
});
