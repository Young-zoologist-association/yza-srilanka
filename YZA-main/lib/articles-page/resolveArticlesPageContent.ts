import type { PdfResourceItemData } from "@/lib/api/types";
import {
  resolvePdfArchiveContent,
  type PdfArchivePageContent,
} from "@/lib/pdf-archive/resolvePdfArchiveContent";
import type { ArticlesPageData } from "@/lib/api/types";

const FALLBACK_ARTICLES: PdfResourceItemData[] = [
  {
    id: "seagrass-day-sinhala-2026",
    title: "ලෝක මුහුදු තෘණ දිනය 2026",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/seagrassday-sinhala1.pdf",
    filename: "seagrassday-sinhala1.pdf",
    filesize: 21658535,
    date: "27/06/2026",
  },
  {
    id: "world-seagrass-day-2026",
    title: "World Seagrass Day 2026",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/Seagrass-day1.pdf",
    filename: "Seagrass-day1.pdf",
    filesize: 22343221,
    date: "27/06/2026",
  },
  {
    id: "world-sloth-bear-day-2025",
    title: "World Sloth Bear Day 2025",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/Sloth-bear-day-ENG.pdf",
    filename: "Sloth-bear-day-ENG.pdf",
    filesize: 38445078,
    date: "27/06/2026",
  },
  {
    id: "sloth-bear-day-sinhala-2025",
    title: "ලෝක මන්ද වලසුන්ගේ දිනය 2025",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/Sloth-bear-day-SIN.pdf",
    filename: "Sloth-bear-day-SIN.pdf",
    filesize: 37670222,
    date: "27/06/2026",
  },
];

export const ARTICLES_PAGE_FALLBACK: PdfArchivePageContent = {
  pageTitle: "Articles",
  subtitle:
    "Explore articles covering wildlife, biodiversity, environmental conservation, and educational insights published by YZA Sri Lanka.",
  heroImageUrl: "",
  items: FALLBACK_ARTICLES,
};

export function resolveArticlesPageContent(data: ArticlesPageData | null): PdfArchivePageContent {
  if (!data) return ARTICLES_PAGE_FALLBACK;

  return resolvePdfArchiveContent(
    {
      pageTitle: data.pageTitle,
      subtitle: data.subtitle,
      heroImage: data.heroImage,
      items: data.articles,
    },
    ARTICLES_PAGE_FALLBACK,
  );
}

export type ArticlesPageContent = PdfArchivePageContent;
