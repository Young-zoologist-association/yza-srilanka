"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Compass, Download, Eye, FileText } from "lucide-react";
import type { NaturalistGuidelinesData } from "@/lib/api/types";
import { PdfFirstPagePreview } from "@/components/pdf-archive/PdfFirstPagePreview";
import { formatFileSize } from "@/lib/pdf-archive/pdfPreview";

interface GuidelinesDownloadCardProps {
  guidelines: NaturalistGuidelinesData;
  onView: () => void;
}

export function GuidelinesDownloadCard({ guidelines, onView }: GuidelinesDownloadCardProps) {
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
            className="text-[#3F7A4E] text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get Started
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Naturalist Guidelines
          </h2>
          <p
            className="mt-4 text-[#5C7A63] text-sm md:text-base max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Download the official guidelines to begin your journey as a young naturalist
            and learn how to observe and document Sri Lanka&apos;s wildlife.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group relative rounded-[1.75rem] overflow-hidden bg-white shadow-xl shadow-[#3F7A4E]/10 ring-1 ring-[#3F7A4E]/10 hover:shadow-2xl hover:shadow-[#3F7A4E]/15 transition-shadow duration-500"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#3F7A4E]/5 rounded-br-[4rem] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#F2A93B]/5 rounded-tl-[4rem] pointer-events-none" />

          <div className="grid md:grid-cols-[1fr_minmax(0,280px)] gap-0">
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 order-2 md:order-1">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F2A93B]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b87a1a] mb-4">
                <Compass className="w-3 h-3" />
                Field Guide
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
                Explore observation techniques, field ethics, and documentation tips
                designed for aspiring naturalists discovering Sri Lanka&apos;s ecosystems.
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

            <div className="relative bg-gradient-to-bl from-[#3F7A4E]/8 to-[#1a2e1f]/6 p-6 sm:p-8 flex items-center justify-center order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.5 }}
                whileHover={{ rotate: -2, scale: 1.02 }}
                className="relative w-full max-w-[220px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-[#1a2e1f]/25 ring-1 ring-[#3F7A4E]/20"
              >
                <PdfFirstPagePreview
                  pdfUrl={guidelines.pdfUrl}
                  title={guidelines.title}
                  variant="portrait"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#F2A93B] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
                  <FileText className="w-3 h-3" />
                  PDF
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="h-1 bg-gradient-to-r from-[#F2A93B] via-[#3F7A4E] to-[#F2A93B] origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
}
