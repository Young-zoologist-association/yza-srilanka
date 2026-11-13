"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sparkles,
  Star,
  TreePine,
  X,
} from "lucide-react";
import type { JuniorYzaPageImageData } from "@/lib/api/types";
import type { JuniorYzaPageContent } from "@/lib/junior-yza-page/resolveJuniorYzaPageContent";
import { JUNIOR_YZA_PAGE_FALLBACK } from "@/lib/junior-yza-page/resolveJuniorYzaPageContent";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface JuniorYzaPageProps {
  content?: JuniorYzaPageContent;
}

const HERO_FLOATERS = [
  { Icon: Star, className: "top-[18%] left-[10%] text-[#F2A93B]", delay: 0 },
  { Icon: Leaf, className: "top-[22%] right-[12%] text-[#F2A93B]", delay: 0.4 },
  { Icon: TreePine, className: "bottom-[28%] left-[14%] text-white/30", delay: 0.8 },
  { Icon: Sparkles, className: "bottom-[24%] right-[10%] text-[#F2A93B]", delay: 1.2 },
] as const;

function JuniorYzaHero({
  pageTitle,
  subtitle,
  heroImageUrl,
}: {
  pageTitle: string;
  subtitle: string;
  heroImageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const titleWords = pageTitle.split(/\s+/).filter(Boolean);
  const subtitleWords = subtitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#1a2e1f]">
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt=""
            aria-hidden
            className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
          />
        ) : null}
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccentWarm}`} />
      </div>

      {HERO_FLOATERS.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex ${className}`}
          animate={
            inView
              ? { y: [0, -14, 0, 8, 0], rotate: [0, 12, 0, -8, 0], scale: [1, 1.1, 1] }
              : {}
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] border-2 border-white/15 bg-white/[0.08] backdrop-blur-md shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)] px-5 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16"
        >
          <motion.div
            animate={inView ? { rotate: [0, 6, -6, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F2A93B] text-[#333A33] mb-6 shadow-lg shadow-[#F2A93B]/30"
          >
            <TreePine className="w-7 h-7" />
          </motion.div>

          <h1
            className="text-white flex flex-wrap justify-center gap-x-3 gap-y-1 leading-[1.05] uppercase tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 700,
            }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 30, rotate: -8 }}
                animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.12,
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                }}
                className={i === titleWords.length - 1 ? "text-[#F2A93B]" : undefined}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p
            className="mt-4 flex flex-wrap justify-center gap-x-2 text-white/85 italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
            }}
          >
            {subtitleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3F7A4E] text-white text-sm font-semibold shadow-lg shadow-[#3F7A4E]/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Sparkles className="w-4 h-4 text-[#F2A93B]" />
            Est. 1999 — Growing Young Conservationists
          </motion.div>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#fff8ef] pointer-events-none"
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

function DescriptionSection({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!paragraphs.length) return null;

  return (
    <section
      ref={ref}
      className="page-snap-section relative py-14 md:py-20 overflow-hidden bg-gradient-to-b from-[#fff8ef] via-white to-[#f4f7f4]"
    >
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 4c-1.5 6-6 10.5-12 12 6 1.5 10.5 6 12 12 1.5-6 6-10.5 12-12-6-1.5-10.5-6-12-12z' fill='%23F2A93B' fill-opacity='0.12'/%3E%3C/svg%3E\")",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[1.75rem] border border-[#3F7A4E]/10 bg-white/90 backdrop-blur-sm px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 shadow-lg shadow-[#3F7A4E]/8"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E]" />

          <div className="space-y-5 md:space-y-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={`${index}-${paragraph.slice(0, 24)}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.55 }}
                className={`text-[#4a5548] leading-[1.88] md:leading-[1.92] ${
                  index === 0
                    ? "text-base md:text-lg text-center"
                    : "text-sm md:text-[1.0625rem] text-center md:text-left"
                }`}
                style={{
                  fontFamily: index === 0 ? "'Playfair Display', serif" : "'DM Sans', sans-serif",
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhotoGallery({ images }: { images: JuniorYzaPageImageData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<JuniorYzaPageImageData | null>(null);

  if (!images.length) return null;

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <section
      ref={ref}
      className="page-snap-section bg-[#fff8ef] min-h-[calc(100dvh-var(--snap-navbar-offset,5.5rem))] pt-2 pb-6 sm:pt-3 sm:pb-8 flex flex-col"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="rounded-[2rem] bg-white ring-1 ring-[#3F7A4E]/10 shadow-lg shadow-[#3F7A4E]/8 px-5 py-5 sm:px-8 sm:py-6 flex flex-col flex-1 min-h-0"
        >
          <div className="text-center mb-4 sm:mb-5 shrink-0">
            <span
              className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Snapshots
            </span>
            <h2
              className="mt-2 text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 700,
              }}
            >
              Adventures in <span className="text-[#3F7A4E]">Nature</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto w-full flex-1 min-h-[clamp(280px,46vh,480px)] rounded-[1.75rem] overflow-hidden shadow-xl shadow-[#3F7A4E]/12 ring-4 ring-[#f4f7f4] bg-[#eef3ee]">
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[activeIndex].id}
                  src={images[activeIndex].image.url}
                  alt={images[activeIndex].image.alt}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer px-2 py-2"
                  onClick={() => setLightbox(images[activeIndex])}
                />
              </AnimatePresence>
            </div>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#333A33] flex items-center justify-center shadow-lg hover:bg-[#F2A93B] transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#333A33] flex items-center justify-center shadow-lg hover:bg-[#F2A93B] transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="flex justify-center gap-2 mt-3 sm:mt-4 shrink-0">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-8 bg-[#3F7A4E]" : "w-2 bg-[#3F7A4E]/25"
                  }`}
                  aria-label={`Show photo ${i + 1}`}
                />
              ))}
            </div>
          ) : null}

          {images.length > 1 ? (
            <div className="flex justify-center gap-2.5 mt-3 sm:mt-4 flex-wrap shrink-0">
              {images.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -2, scale: 1.04 }}
                  onClick={() => {
                    setActiveIndex(i);
                    setLightbox(item);
                  }}
                  className={`relative flex-shrink-0 w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-xl overflow-hidden ring-2 transition-all duration-300 focus:outline-none focus-visible:ring-[#F2A93B] ${
                    i === activeIndex ? "ring-[#F2A93B] shadow-md" : "ring-[#3F7A4E]/10"
                  }`}
                >
                  <img
                    src={item.image.url}
                    alt={item.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image.url}
                alt={lightbox.image.alt}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function JoinCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#3F7A4E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            animate={inView ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F2A93B] text-[#333A33] mb-6 shadow-xl"
          >
            <Star className="w-8 h-8" fill="currentColor" />
          </motion.div>
          <h2
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Ready to Join the Adventure?
          </h2>
          <p
            className="text-white/80 text-sm md:text-base leading-relaxed mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            If you&apos;re between 6 and 12 years old and love nature, send in your application
            and become part of the Junior YZA family.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F2A93B] hover:bg-[#d4911f] text-[#333A33] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get in Touch <Sparkles className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function JuniorYzaPage({ content = JUNIOR_YZA_PAGE_FALLBACK }: JuniorYzaPageProps) {
  const heroImageUrl = content.images[0]?.image.url ?? content.images[2]?.image.url ?? "";

  return (
    <main className="bg-[#fff8ef]">
      <JuniorYzaHero
        pageTitle={content.pageTitle}
        subtitle={content.subtitle}
        heroImageUrl={heroImageUrl}
      />
      <DescriptionSection paragraphs={content.paragraphs} />
      <PhotoGallery images={content.images} />
      <JoinCta />
    </main>
  );
}
