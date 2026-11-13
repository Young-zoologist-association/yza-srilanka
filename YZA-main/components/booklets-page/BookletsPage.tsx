"use client";

import { BookMarked } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { BookletsPageContent } from "@/lib/booklets-page/resolveBookletsPageContent";
import { BOOKLETS_PAGE_FALLBACK } from "@/lib/booklets-page/resolveBookletsPageContent";

interface BookletsPageProps {
  content?: BookletsPageContent;
}

const BOOKLETS_CONFIG = {
  eyebrow: "Publications",
  icon: BookMarked,
  listHeading: "All Booklets",
  listDescription: "Select a booklet below to read the full publication in the viewer.",
  emptyMessage: "No booklets are available at the moment. Please check back soon.",
  readButtonLabel: "Read Booklet",
} as const;

export function BookletsPage({ content = BOOKLETS_PAGE_FALLBACK }: BookletsPageProps) {
  return <PdfResourceCardsPage content={content} config={BOOKLETS_CONFIG} />;
}
