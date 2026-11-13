import type { NaturalistGuidelinesData, NaturalistPageData } from "@/lib/api/types";

export interface NaturalistPageContent {
  pageTitle: string;
  subtitle: string;
  guidelines: NaturalistGuidelinesData | null;
}

export const NATURALIST_PAGE_FALLBACK: NaturalistPageContent = {
  pageTitle: "Naturalist",
  subtitle:
    "A gateway to exploring Sri Lanka's rich biodiversity, where young nature enthusiasts learn to observe, appreciate, and protect the incredible species and ecosystems that make our island unique.",
  guidelines: null,
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeGuidelines(
  guidelines: NaturalistGuidelinesData | null,
): NaturalistGuidelinesData | null {
  if (!guidelines?.pdfUrl?.trim()) return null;

  return {
    title: pickText(guidelines.title, "Naturalist Guidelines"),
    pdfUrl: guidelines.pdfUrl.trim(),
    filename: pickText(guidelines.filename, "naturalist-guidelines.pdf"),
    filesize: guidelines.filesize,
  };
}

export function resolveNaturalistPageContent(
  data: NaturalistPageData | null,
): NaturalistPageContent {
  if (!data) return NATURALIST_PAGE_FALLBACK;

  return {
    pageTitle: pickText(data.pageTitle, NATURALIST_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, NATURALIST_PAGE_FALLBACK.subtitle),
    guidelines: normalizeGuidelines(data.guidelines),
  };
}
