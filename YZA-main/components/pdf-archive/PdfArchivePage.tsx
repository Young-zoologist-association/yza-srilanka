"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { PdfResourceItemData } from "@/lib/api/types";
import type { PdfArchivePageContent } from "@/lib/pdf-archive/resolvePdfArchiveContent";
import { formatFileSize, getPdfPreviewUrl } from "@/lib/pdf-archive/pdfPreview";
import { PDF_ARCHIVE_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { PdfArchiveHero } from "@/components/pdf-archive/PdfArchiveHero";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";

export interface PdfArchivePageConfig {
  eyebrow: string;
  icon: LucideIcon;
  listHeading: string;
  emptyMessage: string;
  listPosition?: "left" | "right";
}

interface PdfArchivePageProps {
  content: PdfArchivePageContent;
  config: PdfArchivePageConfig;
}

function PdfPreviewPanel({ item }: { item: PdfResourceItemData }) {
  const sizeLabel = formatFileSize(item.filesize);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="min-w-0 flex-1">
          <h2
            className="text-xl md:text-2xl text-[#1a2e1f] leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            {item.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#5C7A63]">
            {item.date ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#3F7A4E]" />
                {item.date}
              </span>
            ) : null}
            {sizeLabel ? (
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#3F7A4E]" />
                {sizeLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={item.pdfUrl}
            download={item.filename}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3F7A4E] text-white text-sm font-medium hover:bg-[#2D5A3D] transition-colors shadow-md shadow-[#3F7A4E]/20"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#3F7A4E]/25 text-[#3F7A4E] text-sm font-medium hover:bg-[#3F7A4E]/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
        </div>
      </div>

      <div className="relative flex-1 min-h-[420px] md:min-h-[520px] rounded-2xl overflow-hidden border border-[#3F7A4E]/15 bg-white shadow-[0_24px_60px_-20px_rgba(26,46,31,0.18)]">
        <iframe
          title={`Preview: ${item.title}`}
          src={getPdfPreviewUrl(item.pdfUrl)}
          className="absolute inset-0 w-full h-full border-0 bg-[#f8faf8]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
      </div>
    </motion.div>
  );
}

function ArchiveListItem({
  item,
  index,
  isSelected,
  onSelect,
}: {
  item: PdfResourceItemData;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const sizeLabel = formatFileSize(item.filesize);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full text-left rounded-2xl border p-4 md:p-5 transition-all duration-300 group ${
        isSelected
          ? "border-[#3F7A4E] bg-[#3F7A4E]/8 shadow-lg shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/20"
          : "border-[#3F7A4E]/10 bg-white hover:border-[#3F7A4E]/30 hover:shadow-md hover:shadow-[#3F7A4E]/5"
      }`}
    >
      <div className="flex gap-4">
        <div
          className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-[#3F7A4E] text-white"
              : "bg-[#3F7A4E]/10 text-[#3F7A4E] group-hover:bg-[#3F7A4E]/15"
          }`}
        >
          <FileText className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm md:text-base leading-snug font-semibold transition-colors ${
              isSelected ? "text-[#1a2e1f]" : "text-[#333A33] group-hover:text-[#1a2e1f]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#5C7A63]">
            {item.date ? <span>{item.date}</span> : null}
            {sizeLabel ? <span>{sizeLabel}</span> : null}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ArchiveSection({
  items,
  listHeading,
  emptyMessage,
  listPosition = "left",
}: Pick<PdfArchivePageConfig, "listHeading" | "emptyMessage" | "listPosition"> & {
  items: PdfResourceItemData[];
}) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pagination = usePaginatedItems(items, PDF_ARCHIVE_PAGE_SIZE);
  const pageItems = pagination.paginatedItems;
  const selectedItem = pageItems[selectedIndex] ?? pageItems[0] ?? null;

  useEffect(() => {
    setSelectedIndex(0);
  }, [pagination.currentPage]);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const listOnLeft = listPosition === "left";
  const gridClass = listOnLeft
    ? "lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]"
    : "lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]";

  if (!items.length) {
    return (
      <section ref={ref} className="page-snap-section py-16 md:py-24 bg-[#f4f7f4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#5C7A63]">{emptyMessage}</p>
        </div>
      </section>
    );
  }

  const listAside = (
    <aside ref={listRef} className="lg:sticky lg:top-28 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <h2
          className="text-lg text-[#1a2e1f] mb-4 px-1"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          {listHeading}
          <span className="ml-2 text-sm font-normal text-[#5C7A63]">({items.length})</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={pagination.currentPage}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {pageItems.map((item, index) => (
              <ArchiveListItem
                key={item.id}
                item={item}
                index={index}
                isSelected={index === selectedIndex}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <PdfArchivePagination
          pagination={pagination}
          onPageChange={scrollToList}
          variant="compact"
        />
      </motion.div>
    </aside>
  );

  const previewPanel = (
    <div className="min-w-0">
      <AnimatePresence mode="wait">
        {selectedItem ? <PdfPreviewPanel key={selectedItem.id} item={selectedItem} /> : null}
      </AnimatePresence>
    </div>
  );

  return (
    <section ref={ref} className="page-snap-section py-16 md:py-24 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`grid ${gridClass} gap-8 lg:gap-10 items-start`}
        >
          {listOnLeft ? (
            <>
              {listAside}
              {previewPanel}
            </>
          ) : (
            <>
              {previewPanel}
              {listAside}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function PdfArchivePage({ content, config }: PdfArchivePageProps) {
  return (
    <main>
      <PdfArchiveHero
        pageTitle={content.pageTitle}
        subtitle={content.subtitle}
        heroImageUrl={content.heroImageUrl}
        eyebrow={config.eyebrow}
        icon={config.icon}
      />
      <ArchiveSection
        items={content.items}
        listHeading={config.listHeading}
        emptyMessage={config.emptyMessage}
        listPosition={config.listPosition}
      />
    </main>
  );
}
