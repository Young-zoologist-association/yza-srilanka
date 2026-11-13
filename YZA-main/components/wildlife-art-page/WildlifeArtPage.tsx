"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Brush, Feather, Palette, Sparkles, X, ZoomIn } from "lucide-react";
import type { WildlifeArtItemData } from "@/lib/api/types";
import type { WildlifeArtPageContent } from "@/lib/wildlife-art-page/resolveWildlifeArtPageContent";
import { WILDLIFE_ART_PAGE_FALLBACK } from "@/lib/wildlife-art-page/resolveWildlifeArtPageContent";
import { GALLERY_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";

interface WildlifeArtPageProps {
  content?: WildlifeArtPageContent;
}

const HERO_FLOATERS = [
  { Icon: Palette, className: "top-[18%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Brush, className: "top-[22%] right-[10%]", delay: 1.2, duration: 6 },
  { Icon: Feather, className: "bottom-[28%] left-[12%]", delay: 0.6, duration: 8 },
  { Icon: Sparkles, className: "bottom-[32%] right-[7%]", delay: 1.8, duration: 9 },
] as const;

function WildlifeArtHero({ pageTitle, artCount }: { pageTitle: string; artCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section ref={ref} className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a2e1f]">
        <img
          src={PAGE_HERO_IMAGES.wildlifeArt}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccentWarm}`} />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {HERO_FLOATERS.map(({ Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-white/20 ${className}`}
          animate={
            inView
              ? { y: [0, -12, 0, 6, 0], rotate: [0, 8, 0, -6, 0], opacity: [0.15, 0.35, 0.15] }
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
              className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Creative Conservation
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
              fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
              fontWeight: 700,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.25 + i * 0.1,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  i === words.length - 1 ? "text-[#F2A93B] italic font-normal" : undefined
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
            className="mt-6 max-w-xl mx-auto text-white/60 text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Celebrating the artistry of YZA members who capture Sri Lanka&apos;s wildlife
            through paint, pencil, and passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.45 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Palette className="w-4 h-4 text-[#F2A93B]" />
            {artCount} {artCount === 1 ? "Artwork" : "Artworks"}
          </motion.div>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#f4f7f4] pointer-events-none"
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

function ArtCard({
  art,
  index,
  inView,
  onOpen,
}: {
  art: WildlifeArtItemData;
  index: number;
  inView: boolean;
  onOpen: () => void;
}) {
  const rotation = index % 2 === 0 ? -1.2 : 1.2;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 36, rotate: rotation }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: rotation * 0.5 }}
      onClick={onOpen}
      className="group relative w-full text-left mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F7A4E] focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="relative bg-white p-3 md:p-3.5 rounded-2xl shadow-md shadow-[#3F7A4E]/8 ring-1 ring-[#3F7A4E]/8 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#3F7A4E]/15 group-hover:ring-[#F2A93B]/30">
        <div className="relative overflow-hidden rounded-xl">
          {art.image.url ? (
            <img
              src={art.image.url}
              alt={art.image.alt || art.title}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#3F7A4E]/15 to-[#F2A93B]/15 flex items-center justify-center">
              <Palette className="w-12 h-12 text-[#3F7A4E]/35" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/75 via-[#1a2e1f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
              <ZoomIn className="w-5 h-5 text-white" />
            </span>
          </div>
        </div>

        <div className="pt-3 px-1 pb-1">
          <h3
            className="text-[#333A33] font-semibold text-sm md:text-base leading-snug group-hover:text-[#3F7A4E] transition-colors duration-300"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {art.title}
          </h3>
          <p
            className="mt-1 text-[#5C7A63] text-xs md:text-sm flex items-center gap-1.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Brush className="w-3 h-3 text-[#F2A93B]" />
            {art.artistName}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function ArtGallery({
  arts,
  onOpen,
}: {
  arts: WildlifeArtItemData[];
  onOpen: (art: WildlifeArtItemData) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [mounted, setMounted] = useState(false);
  const pagination = usePaginatedItems(arts, GALLERY_PAGE_SIZE);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToGallery = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const artItems = pagination.paginatedItems.map((art, i) => (
    <ArtCard key={art.id} art={art} index={i} inView={inView} onOpen={() => onOpen(art)} />
  ));

  return (
    <section ref={ref} className="page-snap-section relative py-12 md:py-16 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 scroll-mt-28"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-px bg-[#3F7A4E]/30"
            />
            <span
              className="text-[#3F7A4E] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The Collection
            </span>
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-px bg-[#3F7A4E]/30"
            />
          </div>
          <p
            className="text-[#5C7A63] text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Click any piece to view it in full detail
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pagination.currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {mounted ? (
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 520: 2, 900: 3, 1200: 3 }}>
                <Masonry gutter="20px">{artItems}</Masonry>
              </ResponsiveMasonry>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{artItems}</div>
            )}
          </motion.div>
        </AnimatePresence>

        <PdfArchivePagination
          pagination={pagination}
          onPageChange={scrollToGallery}
          className="pt-8 sm:flex-row sm:justify-between"
        />
      </div>
    </section>
  );
}

function ArtLightbox({
  art,
  onClose,
}: {
  art: WildlifeArtItemData;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#1a2e1f]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white p-3 md:p-4 rounded-2xl shadow-2xl overflow-hidden">
          {art.image.url ? (
            <img
              src={art.image.url}
              alt={art.image.alt || art.title}
              className="w-full max-h-[75vh] object-contain rounded-xl bg-[#fafaf8]"
            />
          ) : (
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[#3F7A4E]/15 to-[#F2A93B]/15 flex items-center justify-center">
              <Palette className="w-20 h-20 text-[#3F7A4E]/35" />
            </div>
          )}

          <div className="mt-4 px-2 pb-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3
                className="text-[#333A33] text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {art.title}
              </h3>
              <p
                className="mt-1 text-[#5C7A63] text-sm md:text-base flex items-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Brush className="w-4 h-4 text-[#F2A93B]" />
                {art.artistName}
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3F7A4E]/10 text-[#3F7A4E] text-xs font-semibold tracking-wide uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Feather className="w-3 h-3" />
              YZA Wildlife Art
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 md:top-4 md:right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors shadow-lg"
          aria-label="Close artwork view"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function WildlifeArtPage({ content = WILDLIFE_ART_PAGE_FALLBACK }: WildlifeArtPageProps) {
  const [lightboxArt, setLightboxArt] = useState<WildlifeArtItemData | null>(null);

  return (
    <main className="bg-[#f4f7f4]">
      <WildlifeArtHero pageTitle={content.pageTitle} artCount={content.arts.length} />
      <ArtGallery arts={content.arts} onOpen={setLightboxArt} />

      <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-[#f4f7f4] to-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-4 h-4 text-[#F2A93B]/60" />
            <Brush className="w-4 h-4 text-[#3F7A4E]/50" />
            <Feather className="w-4 h-4 text-[#F2A93B]/40" />
          </div>
          <p
            className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Through brush and pencil, YZA artists bring Sri Lanka&apos;s wildlife to life —
            inspiring conservation one masterpiece at a time.
          </p>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightboxArt && (
          <ArtLightbox art={lightboxArt} onClose={() => setLightboxArt(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
