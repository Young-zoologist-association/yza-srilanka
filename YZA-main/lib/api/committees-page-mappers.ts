import type { CommitteeData, CommitteesPageData } from "./types";
import type { CommitteeItemAcf, CommitteesPageAcf, WpCommitteesPageResponse } from "./wordpress-types";
import { mapAcfImage } from "./mappers";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mapCommittee(item: CommitteeItemAcf): CommitteeData | null {
  const title = asString(item.committee_title).trim();
  const description = asString(item.committee_description).trim();

  if (!title && !description) return null;

  return {
    title: title || "Committee",
    description,
    image: mapAcfImage(item.committee_image, title),
  };
}

export function mapCommitteesPage(page: WpCommitteesPageResponse): CommitteesPageData {
  const acf = asRecord(page.acf) as CommitteesPageAcf & AcfRecord;
  const committees = asArray<CommitteeItemAcf>(acf.committees)
    .map(mapCommittee)
    .filter((item): item is CommitteeData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.committees_page_title, "COMMITTEES"),
    committees,
  };
}
