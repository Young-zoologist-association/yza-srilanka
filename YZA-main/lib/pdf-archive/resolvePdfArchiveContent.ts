import type { PdfResourceItemData } from "@/lib/api/types";

export interface PdfArchivePageContent {
  pageTitle: string;
  subtitle: string;
  heroImageUrl: string;
  items: PdfResourceItemData[];
}

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

export function resolvePdfArchiveContent(
  data: {
    pageTitle: string;
    subtitle: string;
    heroImage?: { url?: string };
    items: PdfResourceItemData[];
  } | null,
  fallback: PdfArchivePageContent,
): PdfArchivePageContent {
  if (!data) return fallback;

  const heroFromWp = data.heroImage?.url?.trim();

  return {
    pageTitle: pickText(data.pageTitle, fallback.pageTitle),
    subtitle: pickText(data.subtitle, fallback.subtitle),
    heroImageUrl: heroFromWp || fallback.heroImageUrl,
    items: data.items.length > 0 ? data.items : fallback.items,
  };
}
