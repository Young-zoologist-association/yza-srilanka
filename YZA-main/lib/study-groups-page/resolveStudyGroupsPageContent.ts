import type { StudyGroup, StudyGroupsPageData } from "@/lib/api/types";
import {
  resolveStudyGroupsContent,
  type StudyGroupCardContent,
} from "@/lib/home/study-groups/resolveStudyGroupsContent";

export type StudyGroupPageCard = StudyGroupCardContent;

export interface StudyGroupsPageContent {
  pageTitle: string;
  eyebrow: string;
  description: string;
  groups: StudyGroupPageCard[];
}

export function resolveStudyGroupsPageContent(
  page: StudyGroupsPageData | null,
  section: Parameters<typeof resolveStudyGroupsContent>[0],
  groups: StudyGroup[] | null,
): StudyGroupsPageContent {
  const merged = resolveStudyGroupsContent(section, groups);

  return {
    pageTitle: page?.pageTitle?.trim() || "Study Groups",
    eyebrow: merged.eyebrow,
    description: merged.description,
    groups: merged.cards,
  };
}
