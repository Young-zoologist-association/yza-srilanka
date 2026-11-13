import type { JuniorYzaPageData, JuniorYzaPageImageData } from "@/lib/api/types";

export interface JuniorYzaPageContent {
  pageTitle: string;
  subtitle: string;
  paragraphs: string[];
  images: JuniorYzaPageImageData[];
}

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function splitParagraphs(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const blocks = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (blocks.length > 1) return blocks;

  return normalized
    .split(/\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export const JUNIOR_YZA_PAGE_FALLBACK: JuniorYzaPageContent = {
  pageTitle: "Junior YZA",
  subtitle: "Future in the Making",
  paragraphs: [
    "The Junior Young Zoologists' Association (JYZA) is a special membership category for children aged 6 to 12 years. It is designed to foster an early appreciation for wildlife, biodiversity, nature, and environmental conservation through age-appropriate educational and recreational activities.",
    "Membership applications for JYZA are accepted only through the Dehiwala Branch. Through this program, young members are encouraged to develop a lifelong interest in nature and conservation from an early age.",
    "JYZA educational sessions are conducted every other Saturday from 10.00 a.m. onwards at the Young Zoologists' Association premises, National Zoological Gardens, Dehiwala.",
  ],
  images: [],
};

function normalizeImage(item: JuniorYzaPageImageData): JuniorYzaPageImageData {
  return {
    id: item.id,
    image: item.image?.url?.trim()
      ? {
          url: item.image.url,
          alt: pickText(item.image.alt, "Junior YZA activity"),
        }
      : { url: "", alt: "Junior YZA activity" },
  };
}

export function resolveJuniorYzaPageContent(
  data: JuniorYzaPageData | null,
): JuniorYzaPageContent {
  if (!data) return JUNIOR_YZA_PAGE_FALLBACK;

  const paragraphs = splitParagraphs(data.description);
  const images = data.images.map(normalizeImage).filter((item) => item.image.url);

  return {
    pageTitle: pickText(data.pageTitle, JUNIOR_YZA_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, JUNIOR_YZA_PAGE_FALLBACK.subtitle),
    paragraphs: paragraphs.length > 0 ? paragraphs : JUNIOR_YZA_PAGE_FALLBACK.paragraphs,
    images,
  };
}
