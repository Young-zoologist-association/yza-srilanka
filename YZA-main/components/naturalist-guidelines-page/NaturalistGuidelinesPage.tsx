"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Compass, Leaf } from "lucide-react";
import type { NaturalistGuidelinesData, PdfResourceItemData } from "@/lib/api/types";
import { GuidelinesDownloadCard } from "./GuidelinesDownloadCard";
import { PdfViewerDialog } from "@/components/pdf-archive/PdfViewerDialog";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import type { NaturalistGuidelinesPageContent } from "@/lib/naturalist-guidelines-page/resolveNaturalistGuidelinesPageContent";

interface NaturalistGuidelinesPageProps {
  content: NaturalistGuidelinesPageContent;
}

function toPdfViewerItem(guidelines: NaturalistGuidelinesData): PdfResourceItemData {
  return {
    id: "naturalist-guidelines",
    title: guidelines.title,
    pdfUrl: guidelines.pdfUrl,
    filename: guidelines.filename,
    filesize: guidelines.filesize,
    date: "",
  };
}

function GuidelinesHero({ pageTitle, subtitle }: Pick<NaturalistGuidelinesPageContent, "pageTitle" | "subtitle">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#142318]">
        <img
          src={PAGE_HERO_IMAGES.naturalist}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a2e1f]/85 via-transparent to-[#2D5A3D]/35" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-14"
        >
          <span
            className="inline-flex items-center gap-2 text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Leaf className="w-3.5 h-3.5" />
            Research · Field Guide
          </span>
          <h1
            className="mt-5 text-white leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              fontWeight: 700,
            }}
          >
            {pageTitle}
          </h1>
          <p
            className="mt-5 max-w-2xl mx-auto text-white/70 text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#f4f7f4] pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,48 C360,24 720,64 1080,36 C1260,22 1380,52 1440,44 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

function EmptyGuidelinesState() {
  return (
    <section className="page-snap-section py-20 bg-[#f4f7f4]">
      <div className="max-w-lg mx-auto px-4 text-center">
        <Compass className="w-10 h-10 text-[#3F7A4E]/40 mx-auto mb-4" />
        <p className="text-[#5C7A63]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Guidelines will be published here soon. Please check back or contact YZA for the latest
          field guide.
        </p>
      </div>
    </section>
  );
}

export function NaturalistGuidelinesPage({ content }: NaturalistGuidelinesPageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleView = useCallback(() => setViewerOpen(true), []);
  const handleCloseViewer = useCallback(() => setViewerOpen(false), []);

  const viewerItem = content.guidelines ? toPdfViewerItem(content.guidelines) : null;

  return (
    <main className="bg-[#f4f7f4]">
      <GuidelinesHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      {content.guidelines ? (
        <GuidelinesDownloadCard guidelines={content.guidelines} onView={handleView} />
      ) : (
        <EmptyGuidelinesState />
      )}

      <AnimatePresence>
        {viewerOpen && viewerItem ? (
          <PdfViewerDialog item={viewerItem} onClose={handleCloseViewer} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
