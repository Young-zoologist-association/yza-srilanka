"use client";

import { Library } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { AbstractBooksPageContent } from "@/lib/abstract-books-page/resolveAbstractBooksPageContent";
import { ABSTRACT_BOOKS_PAGE_FALLBACK } from "@/lib/abstract-books-page/resolveAbstractBooksPageContent";

interface AbstractBooksPageProps {
  content?: AbstractBooksPageContent;
}

const ABSTRACT_BOOKS_CONFIG = {
  eyebrow: "Research",
  icon: Library,
  listHeading: "All Abstract Books",
  listDescription: "Select a book below to read the full publication in the viewer.",
  emptyMessage: "No abstract books are available at the moment. Please check back soon.",
  readButtonLabel: "Read Book",
} as const;

export function AbstractBooksPage({
  content = ABSTRACT_BOOKS_PAGE_FALLBACK,
}: AbstractBooksPageProps) {
  return <PdfResourceCardsPage content={content} config={ABSTRACT_BOOKS_CONFIG} />;
}
