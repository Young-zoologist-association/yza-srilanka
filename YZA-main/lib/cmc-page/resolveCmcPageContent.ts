import type { CmcLevelData, CmcPageData } from "@/lib/api/types";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";

export interface CmcPageContent {
  eyebrow: string;
  mainHeading: string;
  year: string;
  heroImageUrl: string;
  descriptionParagraphs: string[];
  levels: CmcLevelData[];
}

export const CMC_PAGE_FALLBACK: CmcPageContent = {
  eyebrow: "Current Members of the",
  mainHeading: "Central Management Committee",
  year: "2025",
  heroImageUrl: PAGE_HERO_IMAGES.cmc,
  descriptionParagraphs: [],
  levels: [
    {
      level: 1,
      label: "Executive Leadership",
      members: [
        {
          role: "President",
          name: "H. D. C. Soysa",
          image: { url: "", alt: "H. D. C. Soysa" },
        },
      ],
    },
    {
      level: 2,
      label: "Senior Officers",
      members: [
        {
          role: "Secretary",
          name: "Sashini Paranagama",
          image: { url: "", alt: "Sashini Paranagama" },
        },
        {
          role: "Treasurer",
          name: "Ishan Dikkumbura",
          image: { url: "", alt: "Ishan Dikkumbura" },
        },
      ],
    },
    {
      level: 3,
      label: "Deputy Leadership",
      members: [
        {
          role: "Vice President (General)",
          name: "Nilanjan Vijethilaka",
          image: { url: "", alt: "Nilanjan Vijethilaka" },
        },
        {
          role: "Assistant Secretary",
          name: "Minoja Perera",
          image: { url: "", alt: "Minoja Perera" },
        },
        {
          role: "Assistant Treasurer",
          name: "Sakuni Perera",
          image: { url: "", alt: "Sakuni Perera" },
        },
      ],
    },
    {
      level: 4,
      label: "Vice Presidents — Committee Heads",
      members: [
        {
          role: "Vice President — Education Committee",
          name: "Chalani Dewmini",
          image: { url: "", alt: "Chalani Dewmini" },
        },
        {
          role: "Vice President — Environmental Action Committee",
          name: "Manusha Fernando",
          image: { url: "", alt: "Manusha Fernando" },
        },
        {
          role: "Vice President — Publication Committee",
          name: "Yasith Yuran",
          image: { url: "", alt: "Yasith Yuran" },
        },
        {
          role: "Vice President — Public Relations Committee",
          name: "Senura Perera",
          image: { url: "", alt: "Senura Perera" },
        },
        {
          role: "Vice President — Research Committee",
          name: "Hasitha Katugaha",
          image: { url: "", alt: "Hasitha Katugaha" },
        },
      ],
    },
    {
      level: 5,
      label: "Committee Secretaries",
      members: [
        {
          role: "Secretary — Education Committee",
          name: "Piruni Sisara",
          image: { url: "", alt: "Piruni Sisara" },
        },
        {
          role: "Secretary — Environmental Action Committee",
          name: "Lahiru Sampath",
          image: { url: "", alt: "Lahiru Sampath" },
        },
        {
          role: "Secretary — Publication Committee",
          name: "Vihansa Jayasinghe",
          image: { url: "", alt: "Vihansa Jayasinghe" },
        },
        {
          role: "Secretary — Public Relations Committee",
          name: "Pumudu Kalara",
          image: { url: "", alt: "Pumudu Kalara" },
        },
        {
          role: "Secretary — Research Committee",
          name: "K.M.V. Sankalana",
          image: { url: "", alt: "K.M.V. Sankalana" },
        },
      ],
    },
    {
      level: 6,
      label: "Committee Members",
      members: [
        {
          role: "Committee Member — Education Committee",
          name: "Yethmin Perera",
          image: { url: "", alt: "Yethmin Perera" },
        },
        {
          role: "Committee Member — Environmental Action Committee",
          name: "Siyapath Kithulgodage",
          image: { url: "", alt: "Siyapath Kithulgodage" },
        },
        {
          role: "Committee Member — Publication Committee",
          name: "Indusara Senanayake",
          image: { url: "", alt: "Indusara Senanayake" },
        },
        {
          role: "Committee Member — Public Relations Committee",
          name: "Buwanajith Anupa",
          image: { url: "", alt: "Buwanajith Anupa" },
        },
        {
          role: "Committee Member — Research Committee",
          name: "Tharana Alwis",
          image: { url: "", alt: "Tharana Alwis" },
        },
      ],
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function pickLevels(
  levels: CmcLevelData[] | undefined,
  fallback: CmcLevelData[],
): CmcLevelData[] {
  if (!levels?.length) return fallback;

  return levels.map((level, index) => {
    const fallbackLevel = fallback[index];
    const members = level.members?.length
      ? level.members.map((member, memberIndex) => {
          const fallbackMember = fallbackLevel?.members[memberIndex];
          return {
            role: pickText(member.role, fallbackMember?.role ?? ""),
            name: pickText(member.name, fallbackMember?.name ?? ""),
            image: member.image?.url?.trim()
              ? {
                  url: member.image.url,
                  alt: pickText(member.image.alt, member.name),
                }
              : (fallbackMember?.image ?? { url: "", alt: member.name }),
          };
        })
      : (fallbackLevel?.members ?? []);

    return {
      level: level.level || fallbackLevel?.level || index + 1,
      label: pickText(level.label, fallbackLevel?.label ?? `Level ${index + 1}`),
      members,
    };
  });
}

export function resolveCmcPageContent(data: CmcPageData | null): CmcPageContent {
  if (!data) return CMC_PAGE_FALLBACK;

  const heroFromWp = data.heroImage?.url?.trim();

  return {
    eyebrow: pickText(data.eyebrow, CMC_PAGE_FALLBACK.eyebrow),
    mainHeading: pickText(data.mainHeading, CMC_PAGE_FALLBACK.mainHeading),
    year: pickText(data.year, CMC_PAGE_FALLBACK.year),
    heroImageUrl: heroFromWp || CMC_PAGE_FALLBACK.heroImageUrl,
    descriptionParagraphs:
      data.descriptionParagraphs?.length > 0
        ? data.descriptionParagraphs
        : CMC_PAGE_FALLBACK.descriptionParagraphs,
    levels: pickLevels(data.levels, CMC_PAGE_FALLBACK.levels),
  };
}
