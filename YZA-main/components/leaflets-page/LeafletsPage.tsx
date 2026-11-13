"use client";

import { Leaf } from "lucide-react";
import { PdfArchivePage } from "@/components/pdf-archive/PdfArchivePage";
import type { LeafletsPageContent } from "@/lib/leaflets-page/resolveLeafletsPageContent";
import { LEAFLETS_PAGE_FALLBACK } from "@/lib/leaflets-page/resolveLeafletsPageContent";

interface LeafletsPageProps {
  content?: LeafletsPageContent;
}

const LEAFLETS_CONFIG = {
  eyebrow: "Resources",
  icon: Leaf,
  listHeading: "All Leaflets",
  emptyMessage: "No leaflets are available at the moment. Please check back soon.",
  listPosition: "left" as const,
};

export function LeafletsPage({ content = LEAFLETS_PAGE_FALLBACK }: LeafletsPageProps) {
  return <PdfArchivePage content={content} config={LEAFLETS_CONFIG} />;
}
