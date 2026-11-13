"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Download,
  Eye,
  FileText,
  Leaf,
  Microscope,
  Sparkles,
} from "lucide-react";
import type { SymposiumGuidelinesData } from "@/lib/api/types";
import type { PdfResourceItemData } from "@/lib/api/types";
import type { SymposiumPageContent } from "@/lib/symposium-page/resolveSymposiumPageContent";
import { SYMPOSIUM_PAGE_FALLBACK } from "@/lib/symposium-page/resolveSymposiumPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { PdfFirstPagePreview } from "@/components/pdf-archive/PdfFirstPagePreview";
import { PdfViewerDialog } from "@/components/pdf-archive/PdfViewerDialog";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";
import { SymposiumSubmissionForm } from "@/components/SymposiumSubmissionForm";

interface SymposiumPageProps {
  content?: SymposiumPageContent;
}

const HERO_FLOATERS = [
  { Icon: Microscope, className: "top-[18%] left-[8%]", delay: 0, duration: 7 },
  { Icon: BookOpen, className: "top-[26%] right-[10%]", delay: 1, duration: 6 },
  { Icon: Leaf, className: "bottom-[32%] left-[12%]", delay: 0.5, duration: 8 },
  { Icon: Sparkles, className: "bottom-[28%] right-[7%]", delay: 1.5, duration: 9 },
] as const;

function toPdfViewerItem(guidelines: SymposiumGuidelinesData): PdfResourceItemData {
  return {
    id: "symposium-submission-guidelines",
    title: guidelines.title,
    pdfUrl: guidelines.pdfUrl,
    filename: guidelines.filename,
    filesize: guidelines.filesize,
    date: "",
  };
}

function SymposiumHero({
  pageTitle,
  subtitle,
}: Pick<SymposiumPageContent, "pageTitle" | "subtitle">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-24 sm:pt-32 sm:pb-28 md:pt-40 md:pb-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#1a2e1f]">
        <img
          src={PAGE_HERO_IMAGES.symposium}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccent}`} />
      </div>

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {HERO_FLOATERS.map(({ Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-white/20 ${className}`}
          animate={
            inView
              ? { y: [0, -14, 0, 8, 0], x: [0, 5, 0, -4, 0], opacity: [0.15, 0.3, 0.15] }
              : {}
          }
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-7 h-7" strokeWidth={1.25} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)] px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16 overflow-hidden"
        >
          <motion.div
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full border border-dashed border-white/10 pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={inView ? { width: ["0%", "2rem"] } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-px bg-[#F2A93B] origin-right"
            />
            <span
              className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold inline-flex items-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Microscope className="w-3.5 h-3.5" />
              Research & Science
            </span>
            <motion.div
              animate={inView ? { width: ["0%", "2rem"] } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-px bg-[#F2A93B] origin-left"
            />
          </motion.div>

          <h1
            className="text-white flex flex-wrap justify-center gap-x-3 gap-y-1 leading-[1.1]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              fontWeight: 700,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.25 + i * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  i >= words.length - 2 ? "text-[#F2A93B] italic font-normal" : undefined
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-6 max-w-2xl mx-auto text-white/65 text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#fafaf8] pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          fill="currentColor"
          animate={
            inView
              ? {
                  d: [
                    "M0,40 C360,64 720,16 1080,40 C1260,52 1380,44 1440,40 L1440,80 L0,80 Z",
                    "M0,48 C360,24 720,56 1080,32 C1260,20 1380,56 1440,44 L1440,80 L0,80 Z",
                    "M0,40 C360,64 720,16 1080,40 C1260,52 1380,44 1440,40 L1440,80 L0,80 Z",
                  ],
                }
              : {}
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          d="M0,40 C360,64 720,16 1080,40 C1260,52 1380,44 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}

function SymposiumDescriptionSection({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!paragraphs.length) return null;

  return (
    <section
      ref={ref}
      className="page-snap-section relative overflow-hidden bg-gradient-to-b from-[#fafaf8] via-white to-[#f4f7f4] py-14 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 4c-1.5 6-6 10.5-12 12 6 1.5 10.5 6 12 12 1.5-6 6-10.5 12-12-6-1.5-10.5-6-12-12z' fill='%233F7A4E' fill-opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-[#3F7A4E]/10 bg-white/90 p-6 shadow-xl shadow-[#3F7A4E]/8 backdrop-blur-sm sm:p-8 md:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F2A93B]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#3F7A4E]/10 blur-3xl" />

          <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
            <div className="lg:sticky lg:top-28">
              <span
                className="text-[#F2A93B] text-xs font-semibold uppercase tracking-[0.24em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                About the Symposium
              </span>
              <h2
                className="mt-3 text-[#1a2e1f] leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                A Platform for Citizen Science
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E] origin-left"
              />

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { Icon: Microscope, label: "Research" },
                  { Icon: BookOpen, label: "Knowledge Sharing" },
                  { Icon: Sparkles, label: "Annual Event" },
                ].map(({ Icon, label }, index) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + index * 0.08, duration: 0.45 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#3F7A4E]/15 bg-[#3F7A4E]/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3F7A4E]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="space-y-5 md:space-y-6">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.55 }}
                  className={`leading-[1.88] md:leading-[1.92] ${
                    index === 0
                      ? "text-[#2a3d2f] text-base md:text-lg"
                      : "text-[#5C7A63] text-sm md:text-[1.0625rem]"
                  }`}
                  style={{
                    fontFamily:
                      index === 0 ? "'Playfair Display', serif" : "'DM Sans', sans-serif",
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="relative mt-8 h-1 rounded-full bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E] origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
}

function GuidelinesDownloadCard({
  guidelines,
  onView,
}: {
  guidelines: SymposiumGuidelinesData;
  onView: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const sizeLabel = formatFileSize(guidelines.filesize);

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#f4f7f4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Call for Papers
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Submission Guidelines
          </h2>
          <p
            className="mt-4 text-[#5C7A63] text-sm md:text-base max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Download the official guidelines document to prepare your abstract or research
            submission for the symposium.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group relative rounded-[1.75rem] overflow-hidden bg-white shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10 hover:shadow-2xl hover:shadow-[#3F7A4E]/15 transition-shadow duration-500"
        >
          <div className="absolute inset-0 rounded-[1.75rem] p-[1px] bg-gradient-to-br from-[#3F7A4E]/30 via-[#F2A93B]/20 to-[#3F7A4E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-0">
            <div className="relative bg-gradient-to-br from-[#3F7A4E]/5 to-[#1a2e1f]/5 p-6 sm:p-8 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="relative w-full max-w-[220px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-[#1a2e1f]/20 ring-1 ring-[#3F7A4E]/15"
              >
                <PdfFirstPagePreview
                  pdfUrl={guidelines.pdfUrl}
                  title={guidelines.title}
                  variant="portrait"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#3F7A4E] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
                  <FileText className="w-3 h-3" />
                  PDF
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#3F7A4E]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3F7A4E] mb-4">
                <BookOpen className="w-3 h-3" />
                Official Document
              </div>

              <h3
                className="text-[#1a2e1f] leading-snug capitalize"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  fontWeight: 700,
                }}
              >
                {guidelines.title.replace(/-/g, " ")}
              </h3>

              <p
                className="mt-3 text-[#5C7A63] text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Review formatting requirements, submission deadlines, and presentation
                criteria before submitting your work to the symposium committee.
              </p>

              {sizeLabel ? (
                <p
                  className="mt-4 inline-flex items-center gap-2 text-[#3F7A4E] text-xs font-semibold uppercase tracking-wide"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <FileText className="w-4 h-4" />
                  {sizeLabel} · PDF Document
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href={guidelines.pdfUrl}
                  download={guidelines.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3F7A4E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3F7A4E]/25 transition-colors hover:bg-[#2D5A3D]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Download className="w-4 h-4" />
                  Download Guidelines
                </motion.a>

                <motion.button
                  type="button"
                  onClick={onView}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#3F7A4E]/25 bg-white px-5 py-3 text-sm font-semibold text-[#3F7A4E] transition-colors hover:bg-[#3F7A4E]/5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Eye className="w-4 h-4" />
                  View Online
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div
            className="h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E] origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-[#f4f7f4] to-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Microscope className="w-4 h-4 text-[#3F7A4E]/40" />
          <Leaf className="w-4 h-4 text-[#F2A93B]/50" />
          <BookOpen className="w-4 h-4 text-[#3F7A4E]/30" />
        </div>
        <p
          className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join researchers and young naturalists in advancing wildlife science and
          biodiversity conservation across Sri Lanka.
        </p>
      </motion.div>
    </section>
  );
}

export function SymposiumPage({ content = SYMPOSIUM_PAGE_FALLBACK }: SymposiumPageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleView = useCallback(() => {
    setViewerOpen(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const viewerItem = content.submissionGuidelines
    ? toPdfViewerItem(content.submissionGuidelines)
    : null;

  return (
    <main className="bg-white">
      <SymposiumHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <SymposiumDescriptionSection paragraphs={content.descriptionParagraphs} />
      {content.submissionGuidelines ? (
        <GuidelinesDownloadCard
          guidelines={content.submissionGuidelines}
          onView={handleView}
        />
      ) : null}
      <SymposiumSubmissionForm />
      <ClosingSection />

      <AnimatePresence>
        {viewerOpen && viewerItem ? (
          <PdfViewerDialog item={viewerItem} onClose={handleCloseViewer} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
