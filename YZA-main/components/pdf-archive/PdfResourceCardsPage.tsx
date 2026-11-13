"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, Download, type LucideIcon } from "lucide-react";
import type { PdfResourceItemData } from "@/lib/api/types";
import type { PdfArchivePageContent } from "@/lib/pdf-archive/resolvePdfArchiveContent";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";
import { PDF_ARCHIVE_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { PdfArchiveHero } from "@/components/pdf-archive/PdfArchiveHero";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";
import { PdfFirstPagePreview } from "@/components/pdf-archive/PdfFirstPagePreview";
import { PdfViewerDialog } from "@/components/pdf-archive/PdfViewerDialog";

export interface PdfResourceCardsPageConfig {
  eyebrow: string;
  icon: LucideIcon;
  listHeading: string;
  listDescription: string;
  emptyMessage: string;
  readButtonLabel: string;
}

interface PdfResourceCardsPageProps {
  content: PdfArchivePageContent;
  config: PdfResourceCardsPageConfig;
  pageSize?: number;
}

function ResourceCard({
  item,
  index,
  readButtonLabel,
  onRead,
}: {
  item: PdfResourceItemData;
  index: number;
  readButtonLabel: string;
  onRead: () => void;
}) {
  const sizeLabel = formatFileSize(item.filesize);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full rounded-2xl border border-[#3F7A4E]/10 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#3F7A4E]/10 hover:border-[#3F7A4E]/25 transition-all duration-300"
    >
      <button
        type="button"
        onClick={onRead}
        className="relative block w-full aspect-[210/297] text-left cursor-pointer group/preview bg-[#f8faf8]"
        aria-label={`Preview ${item.title}`}
      >
        <PdfFirstPagePreview
          pdfUrl={item.pdfUrl}
          title={item.title}
          variant="portrait"
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover/preview:scale-[1.01]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#3F7A4E]/0 group-hover/preview:bg-[#3F7A4E]/5 transition-colors duration-300" />
      </button>

      <div className="flex flex-col flex-1 p-5 sm:p-6 border-t border-[#3F7A4E]/8">
        <h2
          className="text-base sm:text-lg text-[#1a2e1f] leading-snug line-clamp-3 group-hover:text-[#3F7A4E] transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          {item.title}
        </h2>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5C7A63]">
          {item.date ? (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#3F7A4E]" />
              {item.date}
            </span>
          ) : null}
          {sizeLabel ? <span>{sizeLabel}</span> : null}
        </div>

        <div className="mt-auto pt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRead}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3F7A4E] text-white text-sm font-medium hover:bg-[#2D5A3D] transition-colors shadow-md shadow-[#3F7A4E]/20"
          >
            {readButtonLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <a
            href={item.pdfUrl}
            download={item.filename}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#3F7A4E]/20 text-[#3F7A4E] text-sm font-medium hover:bg-[#3F7A4E]/5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ResourceListSection({
  items,
  config,
  pageSize,
}: {
  items: PdfResourceItemData[];
  config: PdfResourceCardsPageConfig;
  pageSize: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeItem, setActiveItem] = useState<PdfResourceItemData | null>(null);
  const pagination = usePaginatedItems(items, pageSize);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!items.length) {
    return (
      <section ref={ref} className="page-snap-section py-16 md:py-24 bg-[#f4f7f4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#5C7A63]">{config.emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="page-snap-section py-16 md:py-24 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12 text-center md:text-left scroll-mt-28"
        >
          <h2
            className="text-2xl md:text-3xl text-[#1a2e1f]"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            {config.listHeading}
            <span className="ml-2 text-lg font-normal text-[#5C7A63]">({items.length})</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#5C7A63] max-w-2xl">{config.listDescription}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pagination.currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6"
          >
            {pagination.paginatedItems.map((item, index) => (
              <ResourceCard
                key={item.id}
                item={item}
                index={index}
                readButtonLabel={config.readButtonLabel}
                onRead={() => setActiveItem(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <PdfArchivePagination pagination={pagination} onPageChange={scrollToList} />
      </div>

      <AnimatePresence>
        {activeItem ? (
          <PdfViewerDialog item={activeItem} onClose={() => setActiveItem(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export function PdfResourceCardsPage({
  content,
  config,
  pageSize = PDF_ARCHIVE_PAGE_SIZE,
}: PdfResourceCardsPageProps) {
  return (
    <main>
      <PdfArchiveHero
        pageTitle={content.pageTitle}
        subtitle={content.subtitle}
        heroImageUrl={content.heroImageUrl}
        eyebrow={config.eyebrow}
        icon={config.icon}
      />
      <ResourceListSection items={content.items} config={config} pageSize={pageSize} />
    </main>
  );
}

export function PdfResourceCardsPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="h-8 w-48 rounded bg-[#3F7A4E]/10 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/80">
              <div className="aspect-[210/297] bg-[#3F7A4E]/10" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 rounded bg-[#3F7A4E]/10" />
                <div className="h-10 rounded bg-[#3F7A4E]/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
