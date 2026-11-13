import type { PdfResourceItemData } from "@/lib/api/types";
import {
  resolvePdfArchiveContent,
  type PdfArchivePageContent,
} from "@/lib/pdf-archive/resolvePdfArchiveContent";
import type { BookletsPageData } from "@/lib/api/types";

const FALLBACK_BOOKLETS: PdfResourceItemData[] = [
  {
    id: "citizen-scientist-symposium-2024",
    title: "Abstract Book – Citizen Scientist' Symposium 2024",
    pdfUrl:
      "http://yzasrilanka.local/wp-content/uploads/2026/06/Abstract-Book-Citizen-Scientist-Symposium-2024.pdf",
    filename: "Abstract-Book-Citizen-Scientist-Symposium-2024.pdf",
    filesize: 5535099,
    date: "27/06/2026",
  },
];

export const BOOKLETS_PAGE_FALLBACK: PdfArchivePageContent = {
  pageTitle: "Booklets",
  subtitle:
    "Explore educational booklets covering wildlife, biodiversity, conservation, and environmental awareness published by YZA Sri Lanka.",
  heroImageUrl: "",
  items: FALLBACK_BOOKLETS,
};

export function resolveBookletsPageContent(data: BookletsPageData | null): PdfArchivePageContent {
  if (!data) return BOOKLETS_PAGE_FALLBACK;

  return resolvePdfArchiveContent(
    {
      pageTitle: data.pageTitle,
      subtitle: data.subtitle,
      heroImage: { url: "" },
      items: data.booklets,
    },
    BOOKLETS_PAGE_FALLBACK,
  );
}

export type BookletsPageContent = PdfArchivePageContent;
