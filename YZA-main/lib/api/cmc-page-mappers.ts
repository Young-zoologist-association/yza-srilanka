import type { CmcLevelData, CmcMemberData, CmcPageData } from "./types";
import type { CmcPageAcf, WpCmcPageResponse } from "./wordpress-types";
import { mapAcfImage } from "./mappers";

type AcfRecord = Record<string, unknown>;

interface RoleDefinition {
  key: string;
  imageKey: string;
  nameKey: string;
  title: string;
}

interface LevelDefinition {
  level: number;
  acfKey: keyof CmcPageAcf;
  label: string;
  roles: RoleDefinition[];
}

const CMC_LEVEL_DEFINITIONS: LevelDefinition[] = [
  {
    level: 1,
    acfKey: "cmc_level_one",
    label: "Executive Leadership",
    roles: [
      {
        key: "president",
        imageKey: "president_image",
        nameKey: "president_name",
        title: "President",
      },
    ],
  },
  {
    level: 2,
    acfKey: "cmc_level_two",
    label: "Senior Officers",
    roles: [
      {
        key: "secretary",
        imageKey: "secretary_image",
        nameKey: "secretary_name",
        title: "Secretary",
      },
      {
        key: "treasurer",
        imageKey: "treasurer_image",
        nameKey: "treasurer_name",
        title: "Treasurer",
      },
    ],
  },
  {
    level: 3,
    acfKey: "cmc_level_three",
    label: "Deputy Leadership",
    roles: [
      {
        key: "vice_president_general",
        imageKey: "vice_president_general_image",
        nameKey: "vice_president_general_name",
        title: "Vice President (General)",
      },
      {
        key: "assistant_secretary",
        imageKey: "assistant_secretary_image",
        nameKey: "assistant_secretary_name",
        title: "Assistant Secretary",
      },
      {
        key: "assistant_treasurer",
        imageKey: "assistant_treasurer_image",
        nameKey: "assistant_treasurer_name",
        title: "Assistant Treasurer",
      },
    ],
  },
  {
    level: 4,
    acfKey: "cmc_level_four",
    label: "Vice Presidents — Committee Heads",
    roles: [
      {
        key: "vice_president_education_committee",
        imageKey: "vice_president_education_committee_image",
        nameKey: "vice_president_education_committee_name",
        title: "Vice President — Education Committee",
      },
      {
        key: "vice_president_environmental_action_committee",
        imageKey: "vice_president_environmental_action_committee_image",
        nameKey: "vice_president_environmental_action_committee_name",
        title: "Vice President — Environmental Action Committee",
      },
      {
        key: "vice_president_publication_committee",
        imageKey: "vice_president_publication_committee_image",
        nameKey: "vice_president_publication_committee_name",
        title: "Vice President — Publication Committee",
      },
      {
        key: "vice_president_public_relation_committee",
        imageKey: "vice_president_public_relation_committee_image",
        nameKey: "vice_president_public_relation_committee_name",
        title: "Vice President — Public Relations Committee",
      },
      {
        key: "vice_precident_research_committee",
        imageKey: "vice_precident_research_committee_image",
        nameKey: "vice_precident_research_committee_name",
        title: "Vice President — Research Committee",
      },
    ],
  },
  {
    level: 5,
    acfKey: "cmc_level_five",
    label: "Committee Secretaries",
    roles: [
      {
        key: "secretary_education_committee",
        imageKey: "secretary_education_committee_image",
        nameKey: "secretary_education_committee_name",
        title: "Secretary — Education Committee",
      },
      {
        key: "secretary_environmental_action_committee",
        imageKey: "secretary_environmental_action_committee_image",
        nameKey: "secretary_environmental_action_committee_name",
        title: "Secretary — Environmental Action Committee",
      },
      {
        key: "secretary_publication_committee",
        imageKey: "secretary_publication_committee_image",
        nameKey: "secretary_publication_committee_name",
        title: "Secretary — Publication Committee",
      },
      {
        key: "secretary_public_relations_committee",
        imageKey: "secretary_public_relations_committee_image",
        nameKey: "secretary_public_relations_committee_name",
        title: "Secretary — Public Relations Committee",
      },
      {
        key: "secretary_research_committee",
        imageKey: "secretary_research_committee_image",
        nameKey: "secretary_research_committee_name",
        title: "Secretary — Research Committee",
      },
    ],
  },
  {
    level: 6,
    acfKey: "cmc_level_six",
    label: "Committee Members",
    roles: [
      {
        key: "education_committee_committee_member",
        imageKey: "education_committee_committee_member_image",
        nameKey: "education_committee_committee_member_name",
        title: "Committee Member — Education Committee",
      },
      {
        key: "committee_member_environmental_action_committee",
        imageKey: "committee_member_environmental_action_committee_image",
        nameKey: "committee_member_environmental_action_committee_name",
        title: "Committee Member — Environmental Action Committee",
      },
      {
        key: "committee_member_publication_committee",
        imageKey: "committee_member_publication_committee_image",
        nameKey: "committee_member_publication_committee_name",
        title: "Committee Member — Publication Committee",
      },
      {
        key: "committee_member_public_relation_committee",
        imageKey: "committee_member_public_relation_committee_image",
        nameKey: "committee_member_public_relation_committee_name",
        title: "Committee Member — Public Relations Committee",
      },
      {
        key: "committee_member_research_committee",
        imageKey: "committee_member_research_committee_image",
        nameKey: "committee_member_research_committee_name",
        title: "Committee Member — Research Committee",
      },
    ],
  },
];

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function parseDescriptionParagraphs(value: unknown): string[] {
  const text = asString(value)
    .replace(/\r\n/g, "\n")
    .trim();

  if (!text) return [];

  const blocks = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (blocks.length > 1) return blocks;

  return text
    .split(/\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mapMember(
  roleGroup: AcfRecord,
  role: RoleDefinition,
): CmcMemberData | null {
  const name = asString(roleGroup[role.nameKey]).trim();
  if (!name) return null;

  return {
    role: role.title,
    name,
    image: mapAcfImage(roleGroup[role.imageKey], name),
  };
}

function mapLevel(acf: CmcPageAcf, definition: LevelDefinition): CmcLevelData {
  const levelGroup = asRecord(acf[definition.acfKey]);
  const members: CmcMemberData[] = [];

  for (const role of definition.roles) {
    const roleGroup = asRecord(levelGroup[role.key]);
    const member = mapMember(roleGroup, role);
    if (member) members.push(member);
  }

  return {
    level: definition.level,
    label: definition.label,
    members,
  };
}

export function mapCmcPage(page: WpCmcPageResponse): CmcPageData {
  const acf = asRecord(page.acf) as CmcPageAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    eyebrow: asString(acf.cmc_section_eyebrow_text, "Current Members of the"),
    mainHeading: asString(acf.cmc_main_heading, "Central Management Committee"),
    year: asString(acf.cmc_year, new Date().getFullYear().toString()),
    heroImage: mapAcfImage(
      acf.cmc_page_hero_background_image,
      "Central Management Committee",
    ),
    descriptionParagraphs: parseDescriptionParagraphs(acf.cmc_page_description),
    levels: CMC_LEVEL_DEFINITIONS.map((definition) => mapLevel(acf, definition)),
  };
}

export { CMC_LEVEL_DEFINITIONS };
