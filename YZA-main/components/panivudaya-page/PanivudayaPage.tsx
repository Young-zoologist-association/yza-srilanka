"use client";

import { Newspaper } from "lucide-react";
import { PdfResourceCardsPage } from "@/components/pdf-archive/PdfResourceCardsPage";
import type { PanivudayaPageContent } from "@/lib/panivudaya-page/resolvePanivudayaPageContent";
import { PANIVUDAYA_PAGE_FALLBACK } from "@/lib/panivudaya-page/resolvePanivudayaPageContent";

interface PanivudayaPageProps {
  content?: PanivudayaPageContent;
}

const PANIVUDAYA_CONFIG = {
  eyebrow: "Publications",
  icon: Newspaper,
  listHeading: "පණිවුඩය Editions",
  listDescription: "Explore past editions of පණිවුඩය and read each newsletter in the viewer.",
  emptyMessage: "No editions are available at the moment. Please check back soon.",
  readButtonLabel: "Read Edition",
} as const;

export function PanivudayaPage({ content = PANIVUDAYA_PAGE_FALLBACK }: PanivudayaPageProps) {
  return <PdfResourceCardsPage content={content} config={PANIVUDAYA_CONFIG} />;
}
