"use client";

import { Leaf } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { SanrakshanaPageContent } from "@/lib/sanrakshana-page/resolveSanrakshanaPageContent";
import { SANRAKSHANA_PAGE_FALLBACK } from "@/lib/sanrakshana-page/resolveSanrakshanaPageContent";

interface SanrakshanaPageProps {
  content?: SanrakshanaPageContent;
}

const SANRAKSHANA_CONFIG = {
  eyebrow: "Publications",
  icon: Leaf,
  listHeading: "සංරක්ෂණ Volumes",
  listDescription: "Discover conservation publications from සංරක්ෂණ and read each volume online.",
  emptyMessage: "No volumes are available at the moment. Please check back soon.",
  readButtonLabel: "Read Volume",
} as const;

export function SanrakshanaPage({ content = SANRAKSHANA_PAGE_FALLBACK }: SanrakshanaPageProps) {
  return <PdfResourceCardsPage content={content} config={SANRAKSHANA_CONFIG} />;
}
