import type {
  ActiveMembersListData,
  ActiveMembersSectionData,
  MembershipCategoryData,
  MembershipPageData,
} from "./types";
import type {
  ActiveMembersListItemAcf,
  MembershipBranchAcf,
  MembershipCategoryAcf,
  MembershipPageAcf,
  WpMediaAttachmentResponse,
  WpMembershipPageResponse,
} from "./wordpress-types";
import { mapAcfFile } from "./mappers";

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
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function mapBranch(item: MembershipBranchAcf): string | null {
  const label = asString(item.htbm_section_branch_labels).trim();
  return label || null;
}

const ACTIVE_MEMBERS_GROUP_KEYS = [
  "active_members_section",
  "active_member_section",
  "membership_active_members_section",
  "active_members",
] as const;

function getActiveMembersAcf(acf: AcfRecord): AcfRecord {
  for (const key of ACTIVE_MEMBERS_GROUP_KEYS) {
    const grouped = asRecord(acf[key]);
    if (Object.keys(grouped).length > 0) {
      return grouped;
    }
  }
  return acf;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function mapActiveMembersFromAttachments(
  attachments: WpMediaAttachmentResponse[],
  acf: AcfRecord,
): ActiveMembersSectionData | null {
  const pdfs = [...attachments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lists = pdfs
    .map((item, index): ActiveMembersListData | null => {
      const url = asString(item.source_url).trim();
      if (!url) return null;

      const title =
        stripHtml(asString(item.title?.rendered)).trim() ||
        asString(item.filename).replace(/\.pdf$/i, "") ||
        `Active members list ${index + 1}`;

      const filesize = item.filesize ?? item.media_details?.filesize;

      return {
        id: `attachment-${item.id}`,
        title,
        pdfUrl: url,
        filename: asString(item.filename, `${slugify(title) || "members"}.pdf`),
        filesize: typeof filesize === "number" ? filesize : undefined,
      };
    })
    .filter((item): item is ActiveMembersListData => item !== null);

  if (lists.length === 0) return null;

  const metaSource = getActiveMembersAcf(acf);

  return {
    title: asString(
      metaSource.active_members_section_title ??
        acf.active_members_section_title ??
        acf.active_members_title,
      "Active Members",
    ).trim(),
    description: asString(
      metaSource.active_members_section_description ??
        acf.active_members_section_description,
    ).trim(),
    lists,
  };
}

function mapActiveMembersListItem(
  item: ActiveMembersListItemAcf | AcfRecord,
  index: number,
): ActiveMembersListData | null {
  const record = asRecord(item);
  const title = asString(
    record.active_members_list_title ??
      record.active_member_list_title ??
      record.list_title ??
      record.title,
  ).trim();
  const pdf = mapAcfFile(
    record.active_members_list_pdf ??
      record.active_member_list_pdf ??
      record.list_pdf ??
      record.pdf,
  );

  if (!pdf.url.trim()) return null;

  const resolvedTitle =
    title || pdf.filename.replace(/\.pdf$/i, "") || `Active members list ${index + 1}`;

  return {
    id: slugify(resolvedTitle) || `active-members-${index + 1}`,
    title: resolvedTitle,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
  };
}

function mapActiveMembersSection(acf: AcfRecord): ActiveMembersSectionData | null {
  const section = getActiveMembersAcf(acf);

  const repeaterRaw =
    section.active_members_lists ??
    section.active_members_list ??
    section.active_members ??
    [];

  const listsFromRepeater = asArray<ActiveMembersListItemAcf>(repeaterRaw)
    .map(mapActiveMembersListItem)
    .filter((item): item is ActiveMembersListData => item !== null);

  const lists = [...listsFromRepeater];

  if (lists.length === 0) {
    const single = mapActiveMembersListItem(section, 0);
    if (single) lists.push(single);
  }

  if (lists.length === 0) return null;

  const title = asString(
    section.active_members_section_title ?? section.active_members_title,
    "Active Members",
  ).trim();

  const description = asString(
    section.active_members_section_description ??
      section.active_members_section_subtitle ??
      section.active_members_description,
  ).trim();

  return {
    title: title || "Active Members",
    description,
    lists,
  };
}

function mapCategory(item: MembershipCategoryAcf, index: number): MembershipCategoryData | null {
  const name = asString(item.membership_category_name).trim();
  const description = asString(item.membership_category_description).trim();
  if (!name) return null;

  return {
    id: slugify(name) || `category-${index + 1}`,
    name,
    description,
    fee: asString(item.membership_category_fee).trim(),
  };
}

export function mapMembershipPage(
  page: WpMembershipPageResponse,
  pdfAttachments: WpMediaAttachmentResponse[] = [],
): MembershipPageData {
  const acf = asRecord(page.acf) as MembershipPageAcf & AcfRecord;
  const htbm = asRecord(acf.htbm_section);
  const categoriesSection = asRecord(acf.membership_categories_section);

  const branches = asArray<MembershipBranchAcf>(htbm.htbm_section_branches)
    .map(mapBranch)
    .filter((branch): branch is string => branch !== null);

  const categories = asArray<MembershipCategoryAcf>(
    categoriesSection.membership_categories,
  )
    .map(mapCategory)
    .filter((category): category is MembershipCategoryData => category !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.membership_page_title, "Membership").trim(),
    subtitle: asString(acf.membership_page_subtitle).trim(),
    howToTitle: asString(htbm.htbm_section_title, "How to Become a Member?").trim(),
    howToSubtitle: asString(htbm.htbm_section_subtitle).trim(),
    howToIntro: asString(htbm.htbm_section_description).trim(),
    branches,
    instructionsEyebrow: "General Membership",
    instructionsHtml: asString(htbm.htbm_section_general_instructions).trim(),
    categoriesTitle: asString(
      categoriesSection.membership_categories_section_title,
      "Membership Categories",
    ).trim(),
    categories,
    activeMembers:
      mapActiveMembersSection(acf) ??
      mapActiveMembersFromAttachments(pdfAttachments, acf),
  };
}
