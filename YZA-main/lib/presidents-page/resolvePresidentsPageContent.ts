import type { PresidentData, PresidentsPageData } from "@/lib/api/types";

export interface PresidentsPageContent {
  pageTitle: string;
  currentPresident: PresidentData | null;
  pastPresidents: PresidentData[];
}

export const PRESIDENTS_PAGE_FALLBACK: PresidentsPageContent = {
  pageTitle: "Our Presidents",
  currentPresident: {
    name: "H. D. C. Soysa",
    year: "2026",
    image: { url: "", alt: "H. D. C. Soysa" },
    isCurrent: true,
  },
  pastPresidents: [
    { name: "Shositha Liyanage", year: "2025", image: { url: "", alt: "Shositha Liyanage" }, isCurrent: false },
    { name: "Shositha Liyanage", year: "2024", image: { url: "", alt: "Shositha Liyanage" }, isCurrent: false },
    { name: "Ishanda Senevirathna", year: "2023", image: { url: "", alt: "Ishanda Senevirathna" }, isCurrent: false },
    { name: "Hasantha Wijetunga", year: "2022", image: { url: "", alt: "Hasantha Wijetunga" }, isCurrent: false },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function parseYear(year: string): number {
  const parsed = Number(year.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizePresident(president: PresidentData): PresidentData {
  return {
    name: pickText(president.name, "President"),
    year: pickText(president.year, ""),
    image: president.image?.url?.trim()
      ? {
          url: president.image.url,
          alt: pickText(president.image.alt, president.name),
        }
      : { url: "", alt: president.name },
    isCurrent: president.isCurrent,
  };
}

function sortPresidents(presidents: PresidentData[]): {
  currentPresident: PresidentData | null;
  pastPresidents: PresidentData[];
} {
  const currentPresident = presidents.find((p) => p.isCurrent) ?? null;
  const pastPresidents = presidents
    .filter((p) => !p.isCurrent)
    .sort((a, b) => parseYear(b.year) - parseYear(a.year));

  return { currentPresident, pastPresidents };
}

export function resolvePresidentsPageContent(
  data: PresidentsPageData | null,
): PresidentsPageContent {
  if (!data?.presidents?.length) return PRESIDENTS_PAGE_FALLBACK;

  const presidents = data.presidents
    .map(normalizePresident)
    .filter((p) => p.name || p.year);

  if (!presidents.length) return PRESIDENTS_PAGE_FALLBACK;

  const { currentPresident, pastPresidents } = sortPresidents(presidents);

  return {
    pageTitle: pickText(data.pageTitle, PRESIDENTS_PAGE_FALLBACK.pageTitle),
    currentPresident,
    pastPresidents,
  };
}
