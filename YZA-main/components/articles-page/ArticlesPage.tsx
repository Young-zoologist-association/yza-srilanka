"use client";

import { BookOpen } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { ArticlesPageContent } from "@/lib/articles-page/resolveArticlesPageContent";
import { ARTICLES_PAGE_FALLBACK } from "@/lib/articles-page/resolveArticlesPageContent";

interface ArticlesPageProps {
  content?: ArticlesPageContent;
}

const ARTICLES_CONFIG = {
  eyebrow: "Publications",
  icon: BookOpen,
  listHeading: "All Articles",
  listDescription: "Select an article below to read the full publication in the viewer.",
  emptyMessage: "No articles are available at the moment. Please check back soon.",
  readButtonLabel: "Read Article",
} as const;

export function ArticlesPage({ content = ARTICLES_PAGE_FALLBACK }: ArticlesPageProps) {
  return <PdfResourceCardsPage content={content} config={ARTICLES_CONFIG} />;
}
