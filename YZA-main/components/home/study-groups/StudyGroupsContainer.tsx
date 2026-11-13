import { Suspense } from "react";
import { getHomePage, getStudyGroups, isWordPressConfigured } from "@/lib/api";
import { resolveStudyGroupsContent } from "@/lib/home/study-groups/resolveStudyGroupsContent";
import { StudyGroups } from "./StudyGroups";
import { StudyGroupsLoading } from "./StudyGroupsLoading";

async function StudyGroupsFetcher() {
  const fallback = resolveStudyGroupsContent(null, null);

  if (!isWordPressConfigured()) {
    return <StudyGroups content={fallback} />;
  }

  let section = null;
  let groups = null;

  try {
    const home = await getHomePage();
    section = home.studyGroups;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress study groups section fetch failed.", error);
    }
  }

  try {
    groups = await getStudyGroups();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress study groups CPT fetch failed.", error);
    }
  }

  return <StudyGroups content={resolveStudyGroupsContent(section, groups)} />;
}

export function StudyGroupsContainer() {
  return (
    <Suspense fallback={<StudyGroupsLoading />}>
      <StudyGroupsFetcher />
    </Suspense>
  );
}
