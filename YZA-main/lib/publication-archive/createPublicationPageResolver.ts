import type { PublicationArchivePageData } from "@/lib/api/types";
import type { PdfArchivePageContent } from "@/lib/pdf-archive/resolvePdfArchiveContent";
import { resolvePdfArchiveContent } from "@/lib/pdf-archive/resolvePdfArchiveContent";

export function createPublicationPageResolver(fallback: PdfArchivePageContent) {
  return (data: PublicationArchivePageData | null): PdfArchivePageContent => {
    if (!data) return fallback;

    return resolvePdfArchiveContent(
      {
        pageTitle: data.pageTitle,
        subtitle: data.subtitle,
        heroImage: { url: "" },
        items: data.items,
      },
      fallback,
    );
  };
}

export type PublicationPageContent = PdfArchivePageContent;
