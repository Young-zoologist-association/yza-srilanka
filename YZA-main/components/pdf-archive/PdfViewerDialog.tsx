"use client";

import { useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Download, ExternalLink, FileText, X } from "lucide-react";
import type { PdfResourceItemData } from "@/lib/api/types";
import { formatFileSize, getPdfPreviewUrl, getPdfProxyUrl } from "@/lib/pdf-archive/pdfPreview";

interface PdfViewerDialogProps {
  item: PdfResourceItemData;
  onClose: () => void;
}

export function PdfViewerDialog({ item, onClose }: PdfViewerDialogProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const sizeLabel = formatFileSize(item.filesize);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#1a2e1f]/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col w-full max-w-6xl h-[min(92vh,900px)] rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-white/10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#3F7A4E]/10 bg-[#f4f7f4] shrink-0">
          <div className="min-w-0 flex-1 pr-2">
            <h2
              id="pdf-viewer-title"
              className="text-lg sm:text-xl text-[#1a2e1f] leading-snug"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              {item.title}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#5C7A63]">
              {item.date ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#3F7A4E]" />
                  {item.date}
                </span>
              ) : null}
              {sizeLabel ? (
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#3F7A4E]" />
                  {sizeLabel}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={item.pdfUrl}
              download={item.filename}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#3F7A4E] text-white text-xs sm:text-sm font-medium hover:bg-[#2D5A3D] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#3F7A4E]/25 text-[#3F7A4E] text-xs sm:text-sm font-medium hover:bg-[#3F7A4E]/5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#3F7A4E]/10 text-[#3F7A4E] hover:bg-[#3F7A4E]/20 transition-colors"
              aria-label="Close article viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 bg-[#f8faf8]">
          <iframe
            title={`${item.title} — PDF viewer`}
            src={getPdfPreviewUrl(getPdfProxyUrl(item.pdfUrl))}
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
