import type { PdfResourceItemData } from "@/lib/api/types";
import {
  resolvePdfArchiveContent,
  type PdfArchivePageContent,
} from "@/lib/pdf-archive/resolvePdfArchiveContent";
import type { AbstractBooksPageData } from "@/lib/api/types";

const FALLBACK_BOOKS: PdfResourceItemData[] = [
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

export const ABSTRACT_BOOKS_PAGE_FALLBACK: PdfArchivePageContent = {
  pageTitle: "Abstract Books",
  subtitle:
    "Browse a collection of abstract books featuring research summaries, scientific findings, and educational contributions by YZA Sri Lanka.",
  heroImageUrl: "",
  items: FALLBACK_BOOKS,
};

export function resolveAbstractBooksPageContent(
  data: AbstractBooksPageData | null,
): PdfArchivePageContent {
  if (!data) return ABSTRACT_BOOKS_PAGE_FALLBACK;

  return resolvePdfArchiveContent(
    {
      pageTitle: data.pageTitle,
      subtitle: data.subtitle,
      heroImage: { url: "" },
      items: data.books,
    },
    ABSTRACT_BOOKS_PAGE_FALLBACK,
  );
}

export type AbstractBooksPageContent = PdfArchivePageContent;
