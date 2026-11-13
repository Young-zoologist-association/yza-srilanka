"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Download, Eye, FileText, Users } from "lucide-react";
import type { ActiveMembersSectionContent } from "@/lib/membership-page/membershipPageContent";
import type { PdfResourceItemData } from "@/lib/api/types";
import { PdfFirstPagePreview } from "@/components/pdf-archive/PdfFirstPagePreview";
import { PdfViewerDialog } from "@/components/pdf-archive/PdfViewerDialog";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";

interface ActiveMembersSectionProps {
  section: ActiveMembersSectionContent;
}

function toViewerItem(list: ActiveMembersSectionContent["lists"][number]): PdfResourceItemData {
  return {
    id: list.id,
    title: list.title,
    pdfUrl: list.pdfUrl,
    filename: list.filename,
    filesize: list.filesize,
    date: "",
  };
}

function ActiveMembersCard({
  list,
  index,
  inView,
  onView,
  featured,
}: {
  list: ActiveMembersSectionContent["lists"][number];
  index: number;
  inView: boolean;
  onView: () => void;
  featured?: boolean;
}) {
  const sizeLabel = formatFileSize(list.filesize);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-[1.75rem] overflow-hidden bg-white shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10 hover:shadow-2xl hover:shadow-[#3F7A4E]/15 transition-shadow duration-500"
      >
        <div className="absolute top-0 left-0 w-36 h-36 bg-[#3F7A4E]/5 rounded-br-[4rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#F2A93B]/8 rounded-tl-[4rem] pointer-events-none" />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] gap-0">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 order-2 lg:order-1">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#3F7A4E]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3F7A4E] mb-4">
              <FileText className="w-3 h-3" />
              Official list
            </div>

            <h3
              className="text-[#1a2e1f] leading-snug"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)",
                fontWeight: 700,
              }}
            >
              {list.title}
            </h3>

            {sizeLabel ? (
              <p
                className="mt-3 text-[#5C7A63] text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                PDF document · {sizeLabel}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onView}
                className="inline-flex items-center gap-2 rounded-full bg-[#3F7A4E] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#3F7A4E]/25 transition-colors hover:bg-[#2D5A3D]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Eye className="w-4 h-4" />
                View list
              </button>
              <a
                href={list.pdfUrl}
                download={list.filename}
                className="inline-flex items-center gap-2 rounded-full border border-[#3F7A4E]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#3F7A4E] transition-colors hover:bg-[#3F7A4E]/5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={onView}
            className="relative order-1 lg:order-2 aspect-[210/297] lg:aspect-auto lg:min-h-[320px] bg-[#f0f4f0] text-left cursor-pointer group/preview border-b lg:border-b-0 lg:border-l border-[#3F7A4E]/10"
            aria-label={`Preview ${list.title}`}
          >
            <PdfFirstPagePreview
              pdfUrl={list.pdfUrl}
              title={list.title}
              variant="portrait"
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover/preview:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#1a2e1f]/0 group-hover/preview:bg-[#1a2e1f]/5 transition-colors duration-300" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#3F7A4E]/10 bg-white shadow-sm transition-all duration-300 hover:border-[#3F7A4E]/25 hover:shadow-xl hover:shadow-[#3F7A4E]/10"
    >
      <button
        type="button"
        onClick={onView}
        className="relative block aspect-[210/297] w-full cursor-pointer bg-[#f8faf8] text-left group/preview"
        aria-label={`Preview ${list.title}`}
      >
        <PdfFirstPagePreview
          pdfUrl={list.pdfUrl}
          title={list.title}
          variant="portrait"
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover/preview:scale-[1.01]"
        />
      </button>

      <div className="flex flex-1 flex-col border-t border-[#3F7A4E]/8 p-5 sm:p-6">
        <h3
          className="line-clamp-2 text-base font-bold leading-snug text-[#1a2e1f] sm:text-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {list.title}
        </h3>
        {sizeLabel ? (
          <p
            className="mt-2 text-xs text-[#5C7A63]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {sizeLabel}
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3F7A4E] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#3F7A4E]/20 transition-colors hover:bg-[#2D5A3D]"
          >
            View
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={list.pdfUrl}
            download={list.filename}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#3F7A4E]/20 px-3 py-2.5 text-sm font-medium text-[#3F7A4E] transition-colors hover:bg-[#3F7A4E]/5"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ActiveMembersSection({ section }: ActiveMembersSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [viewerItem, setViewerItem] = useState<PdfResourceItemData | null>(null);

  const { lists } = section;
  const isSingle = lists.length === 1;

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#1a2e1f] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, #3F7A4E 0%, transparent 45%), radial-gradient(circle at 90% 80%, #F2A93B 0%, transparent 38%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F2A93B]/20 text-[#F2A93B] mb-5 ring-1 ring-[#F2A93B]/30">
            <Users className="w-7 h-7" strokeWidth={1.75} />
          </div>
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our community
          </span>
          <h2
            className="mt-3 text-white leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            {section.title}
          </h2>
          {section.description ? (
            <p
              className="mt-4 text-white/65 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {section.description}
            </p>
          ) : null}
        </motion.div>

        {isSingle ? (
          <ActiveMembersCard
            list={lists[0]}
            index={0}
            inView={inView}
            featured
            onView={() => setViewerItem(toViewerItem(lists[0]))}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map((list, index) => (
              <ActiveMembersCard
                key={list.id}
                list={list}
                index={index}
                inView={inView}
                onView={() => setViewerItem(toViewerItem(list))}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewerItem ? (
          <PdfViewerDialog item={viewerItem} onClose={() => setViewerItem(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
