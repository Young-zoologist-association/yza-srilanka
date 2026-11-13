import type { StudyGroupsPageData } from "./types";
import type { StudyGroupsPageAcf, WpStudyGroupsPageResponse } from "./wordpress-types";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function mapStudyGroupsPage(page: WpStudyGroupsPageResponse): StudyGroupsPageData {
  const acf = asRecord(page.acf) as StudyGroupsPageAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.study_groups_page_title, "Study Groups"),
  };
}
