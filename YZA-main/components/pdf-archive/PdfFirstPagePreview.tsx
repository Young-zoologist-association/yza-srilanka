"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { FileText } from "lucide-react";
import { getPdfProxyUrl, getPdfThumbnailUrl } from "@/lib/pdf-archive/pdfPreview";

interface PdfFirstPagePreviewProps {
  pdfUrl: string;
  title: string;
  className?: string;
  /** Portrait A4-style frame for article cards. */
  variant?: "portrait" | "default";
}

/** Embeds the first page of a PDF inside a card thumbnail area. */
export function PdfFirstPagePreview({
  pdfUrl,
  title,
  className,
  variant = "default",
}: PdfFirstPagePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });
  const previewSrc = inView ? getPdfThumbnailUrl(getPdfProxyUrl(pdfUrl), 1) : undefined;
  const isPortrait = variant === "portrait";

  return (
    <div ref={ref} className={`relative overflow-hidden bg-white ${className ?? ""}`}>
      {previewSrc ? (
        <iframe
          title={`${title} — first page preview`}
          src={previewSrc}
          scrolling="no"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none bg-white"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3F7A4E]/10 to-[#F2A93B]/10 animate-pulse">
          <FileText className="w-10 h-10 text-[#3F7A4E]/40" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#3F7A4E]/10" />
      {!isPortrait ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
      ) : null}
    </div>
  );
}
