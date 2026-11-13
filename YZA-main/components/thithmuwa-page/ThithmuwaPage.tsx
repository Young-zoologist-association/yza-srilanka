"use client";

import { BookOpen } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { ThithmuwaPageContent } from "@/lib/thithmuwa-page/resolveThithmuwaPageContent";
import { THITHMUWA_PAGE_FALLBACK } from "@/lib/thithmuwa-page/resolveThithmuwaPageContent";

interface ThithmuwaPageProps {
  content?: ThithmuwaPageContent;
}

const THITHMUWA_CONFIG = {
  eyebrow: "Publications",
  icon: BookOpen,
  listHeading: "තිත්මුවා Issues",
  listDescription: "Browse archived issues of තිත්මුවා and open any edition in the PDF viewer.",
  emptyMessage: "No issues are available at the moment. Please check back soon.",
  readButtonLabel: "Read Issue",
} as const;

export function ThithmuwaPage({ content = THITHMUWA_PAGE_FALLBACK }: ThithmuwaPageProps) {
  return <PdfResourceCardsPage content={content} config={THITHMUWA_CONFIG} />;
}
