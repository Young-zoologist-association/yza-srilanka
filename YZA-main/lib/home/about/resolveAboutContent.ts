import type { AboutData } from "@/lib/api/types";

export interface AboutStatContent {
  value: number;
  suffix: string;
  label: string;
  iconKey: string;
}

export interface AboutContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  paragraphs: string[];
  image: {
    url: string;
    alt: string;
  };
  badgeTitle: string;
  badgeSubtitle: string;
  stats: AboutStatContent[];
}

export const ABOUT_FALLBACK: AboutContent = {
  eyebrow: "Who We Are",
  titleLine1: "Young Zoologists'",
  titleLine2: "Association",
  paragraphs: [
    "A passionate youth-based conservation organization dedicated to protecting Sri Lanka's extraordinary biodiversity.",
    "We promote wildlife education, field-based research, and community-driven conservation initiatives across the island.",
    "Through study groups, events, and hands-on fieldwork, we inspire the next generation of naturalists and conservationists.",
  ],
  image: {
    url: "https://images.unsplash.com/photo-1679348181038-e68f4ca9f3f4?w=700&h=525&fit=crop&auto=format",
    alt: "YZA members on a field study in the forest",
  },
  badgeTitle: "Est. 1972",
  badgeSubtitle: "Sri Lanka",
  stats: [
    { value: 52, suffix: "+", label: "Years of Conservation", iconKey: "History" },
    { value: 2000, suffix: "+", label: "Active Members", iconKey: "Users" },
    { value: 150, suffix: "+", label: "Field Studies", iconKey: "Binoculars" },
    { value: 7, suffix: "", label: "Study Groups", iconKey: "Layers" },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function pickParagraphs(paragraphs: string[] | undefined): string[] {
  const filtered = (paragraphs ?? []).filter((p) => p.trim());
  return filtered.length > 0 ? filtered : ABOUT_FALLBACK.paragraphs;
}

function pickImage(
  image: AboutData["image"] | undefined,
  fallback: AboutContent["image"],
): AboutContent["image"] {
  if (!image?.url?.trim()) {
    return fallback;
  }

  return {
    url: image.url,
    alt: pickText(image.alt, fallback.alt),
  };
}

function pickStats(stats: AboutData["stats"] | undefined): AboutStatContent[] {
  const mapped = (stats ?? [])
    .filter((stat) => stat.label.trim())
    .map((stat, index) => ({
      value: stat.value > 0 ? stat.value : 0,
      suffix: stat.suffix,
      label: stat.label,
      iconKey: hasText(stat.iconKey)
        ? stat.iconKey
        : (ABOUT_FALLBACK.stats[index]?.iconKey ?? "History"),
    }));

  return mapped.length > 0 ? mapped : ABOUT_FALLBACK.stats;
}

export function resolveAboutContent(cmsAbout?: AboutData | null): AboutContent {
  if (!cmsAbout) {
    return ABOUT_FALLBACK;
  }

  return {
    eyebrow: pickText(cmsAbout.eyebrow, ABOUT_FALLBACK.eyebrow),
    titleLine1: pickText(cmsAbout.titleLine1, ABOUT_FALLBACK.titleLine1),
    titleLine2: pickText(cmsAbout.titleLine2, ABOUT_FALLBACK.titleLine2),
    paragraphs: pickParagraphs(cmsAbout.paragraphs),
    image: pickImage(cmsAbout.image, ABOUT_FALLBACK.image),
    badgeTitle: pickText(cmsAbout.badgeTitle, ABOUT_FALLBACK.badgeTitle),
    badgeSubtitle: pickText(cmsAbout.badgeSubtitle, ABOUT_FALLBACK.badgeSubtitle),
    stats: pickStats(cmsAbout.stats),
  };
}
