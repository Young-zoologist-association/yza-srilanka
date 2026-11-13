import { Suspense } from "react";
import { getHomePage, getStudyGroups, getStudyGroupsPage, isWordPressConfigured } from "@/lib/api";
import { resolveStudyGroupsPageContent } from "@/lib/study-groups-page/resolveStudyGroupsPageContent";
import { StudyGroupsPage } from "./StudyGroupsPage";
import { StudyGroupsPageLoading } from "./StudyGroupsPageLoading";

async function StudyGroupsPageFetcher() {
  const fallback = resolveStudyGroupsPageContent(null, null, null);

  if (!isWordPressConfigured()) {
    return <StudyGroupsPage content={fallback} />;
  }

  let page = null;
  let section = null;
  let groups = null;

  try {
    page = await getStudyGroupsPage();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress study groups page fetch failed.", error);
    }
  }

  try {
    const home = await getHomePage();
    section = home.studyGroups;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress home study groups section fetch failed.", error);
    }
  }

  try {
    groups = await getStudyGroups();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress study groups CPT fetch failed.", error);
    }
  }

  return (
    <StudyGroupsPage content={resolveStudyGroupsPageContent(page, section, groups)} />
  );
}

export function StudyGroupsPageContainer() {
  return (
    <Suspense fallback={<StudyGroupsPageLoading />}>
      <StudyGroupsPageFetcher />
    </Suspense>
  );
}
