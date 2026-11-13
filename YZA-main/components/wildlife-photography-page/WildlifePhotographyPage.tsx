"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  Aperture,
  Camera,
  ImageIcon,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import type { GalleryPhotoContent } from "@/lib/home/gallery/resolveGalleryContent";
import type { WildlifePhotographyPageContent } from "@/lib/wildlife-photography-page/resolveWildlifePhotographyPageContent";
import { WILDLIFE_PHOTOGRAPHY_PAGE_FALLBACK } from "@/lib/wildlife-photography-page/resolveWildlifePhotographyPageContent";
import { GALLERY_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";

interface WildlifePhotographyPageProps {
  content?: WildlifePhotographyPageContent;
}

const HERO_FLOATERS = [
  { Icon: Camera, className: "top-[20%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Aperture, className: "top-[24%] right-[10%]", delay: 1.1, duration: 6.5 },
  { Icon: Sparkles, className: "bottom-[30%] left-[11%]", delay: 0.5, duration: 8 },
  { Icon: ImageIcon, className: "bottom-[26%] right-[8%]", delay: 1.6, duration: 9 },
] as const;

const ASPECT_CLASSES = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/6]",
  "aspect-[4/5]",
  "aspect-[3/4]",
] as const;

function PhotographyHero({
  pageTitle,
  subtitle,
  eyebrow,
  photoCount,
  heroImageUrl,
}: Pick<
  WildlifePhotographyPageContent,
  "pageTitle" | "subtitle" | "eyebrow" | "heroImageUrl"
> & { photoCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 overflow-hidden"
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
              ? {
                  y: [0, -12, 0, 6, 0],
                  rotate: [0, 8, 0, -6, 0],
                  opacity: [0.15, 0.35, 0.15],
                }
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
              {eyebrow}
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

          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-6 max-w-2xl mx-auto text-white/65 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.45 }}
            className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Camera className="w-4 h-4 text-[#F2A93B]" />
            {photoCount} {photoCount === 1 ? "Photograph" : "Photographs"}
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

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryPhotoContent;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className="group relative w-full mb-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F7A4E] focus-visible:ring-offset-2 rounded-2xl overflow-hidden"
    >
      <div
        className={`relative w-full overflow-hidden ${ASPECT_CLASSES[index % ASPECT_CLASSES.length]}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/80 via-[#1a2e1f]/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="w-5 h-5 text-white" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <span
            className="inline-block text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full mb-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: photo.tagColor,
            }}
          >
            {photo.tag}
          </span>
          <p
            className="text-white/90 text-sm font-medium line-clamp-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {photo.alt}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function PhotoGallery({
  photos,
  titlePlain,
  titleHighlight,
  onOpen,
}: {
  photos: GalleryPhotoContent[];
  titlePlain: string;
  titleHighlight: string;
  onOpen: (photo: GalleryPhotoContent) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [mounted, setMounted] = useState(false);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = useMemo(() => {
    const unique = Array.from(new Set(photos.map((photo) => photo.tag).filter(Boolean)));
    return ["All", ...unique.sort()];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeTag === "All") return photos;
    return photos.filter((photo) => photo.tag === activeTag);
  }, [activeTag, photos]);

  const pagination = usePaginatedItems(filteredPhotos, GALLERY_PAGE_SIZE, activeTag);

  const scrollToGallery = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const photoItems = pagination.paginatedItems.map((photo, i) => (
    <PhotoCard key={photo.id} photo={photo} index={i} onOpen={() => onOpen(photo)} />
  ));

  return (
    <section ref={ref} className="page-snap-section relative py-12 md:py-20 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-px bg-[#F2A93B]"
            />
            <span
              className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Full Collection
            </span>
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-px bg-[#F2A93B]"
            />
          </div>
          <h2
            className="text-[#333A33] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
            }}
          >
            {titlePlain}{" "}
            <span className="text-[#3F7A4E]">{titleHighlight}</span>
          </h2>
        </motion.div>

        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12 scroll-mt-28"
        >
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <motion.button
                key={tag}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-[#3F7A4E] text-white shadow-md shadow-[#3F7A4E]/25"
                    : "bg-white text-[#333A33] border border-[#3F7A4E]/15 hover:border-[#3F7A4E]/35 hover:bg-[#3F7A4E]/5"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {tag}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTag}-${pagination.currentPage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {mounted ? (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 3, 1280: 4 }}
              >
                <Masonry>{photoItems}</Masonry>
              </ResponsiveMasonry>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {photoItems}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filteredPhotos.length === 0 ? (
          <p
            className="text-center text-[#5C7A63] py-16"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No photographs found for this category.
          </p>
        ) : (
          <PdfArchivePagination
            pagination={pagination}
            onPageChange={scrollToGallery}
            className="pt-8 sm:flex-row sm:justify-between"
          />
        )}
      </div>
    </section>
  );
}

export function WildlifePhotographyPage({
  content = WILDLIFE_PHOTOGRAPHY_PAGE_FALLBACK,
}: WildlifePhotographyPageProps) {
  const [lightbox, setLightbox] = useState<GalleryPhotoContent | null>(null);

  return (
    <main className="bg-[#f4f7f4]">
      <PhotographyHero
        pageTitle={content.pageTitle}
        subtitle={content.subtitle}
        eyebrow={content.eyebrow}
        heroImageUrl={content.heroImageUrl}
        photoCount={content.photos.length}
      />

      <PhotoGallery
        photos={content.photos}
        titlePlain={content.titlePlain}
        titleHighlight={content.titleHighlight}
        onOpen={setLightbox}
      />

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl max-h-[92vh] w-full overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace("w=500", "w=1600")}
                alt={lightbox.alt}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-6">
                <span
                  className="inline-block text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full mb-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: lightbox.tagColor,
                  }}
                >
                  {lightbox.tag}
                </span>
                <p
                  className="text-white/90 text-sm md:text-base"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {lightbox.alt}
                </p>
              </div>
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
    </main>
  );
}
