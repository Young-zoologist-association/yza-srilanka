import type { BranchData, BranchesPageData } from "./types";
import type { BranchItemAcf, BranchesPageAcf, WpBranchesPageResponse } from "./wordpress-types";
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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapBranchImage(item: BranchItemAcf, name: string): ReturnType<typeof mapAcfImage> {
  const record = item as BranchItemAcf & AcfRecord;
  const raw =
    item.branch_image ??
    record.image ??
    record.branch_photo ??
    record.branch_picture ??
    false;

  return mapAcfImage(raw, name);
}

function mapBranch(item: BranchItemAcf, index: number): BranchData | null {
  const name = asString(item.branch_name).trim();
  const description = asString(item.branch_description).trim();
  if (!name) return null;

  const slug = slugify(name) || `branch-${index + 1}`;

  return {
    id: slug,
    slug,
    name,
    description,
    isMain: Boolean(item.main_branch_or_not),
    image: mapBranchImage(item, name),
  };
}

export function mapBranchesPage(page: WpBranchesPageResponse): BranchesPageData {
  const acf = asRecord(page.acf) as BranchesPageAcf & AcfRecord;

  const branches = asArray<BranchItemAcf>(acf.branches)
    .map(mapBranch)
    .filter((branch): branch is BranchData => branch !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.branches_page_title, "Our Branches").trim(),
    heroImage: mapAcfImage(acf.branches_page_hero_background, "YZA Branches"),
    branches,
  };
}
