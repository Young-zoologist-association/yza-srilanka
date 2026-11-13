"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, X, ZoomIn } from "lucide-react";
import type {
  GalleryContent,
  GalleryPhotoContent,
} from "@/lib/home/gallery/resolveGalleryContent";
import { GALLERY_FALLBACK } from "@/lib/home/gallery/resolveGalleryContent";

const HOME_GALLERY_DISPLAY_LIMIT = 10;

interface GallerySectionProps {
  content?: GalleryContent;
}

function PhotoItem({
  photo,
  index,
  inView,
  onClick,
}: {
  photo: GalleryPhotoContent;
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#3F7A4E]/0 group-hover:bg-[#3F7A4E]/50 transition-all duration-400 flex items-center justify-center">
        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100" />
      </div>
      {/* Tag */}
      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span
          className="text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: photo.tagColor,
          }}
        >
          {photo.tag}
        </span>
      </div>
    </motion.div>
  );
}

export function GallerySection({ content = GALLERY_FALLBACK }: GallerySectionProps) {
  const { eyebrow, titlePlain, titleHighlight, photos } = content;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<GalleryPhotoContent | null>(null);

  const visiblePhotos = photos.slice(0, HOME_GALLERY_DISPLAY_LIMIT);

  return (
    <section id="gallery" className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-[#F2A93B]" />
              <span
                className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {eyebrow}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
              }}
            >
              {titlePlain} <span className="text-[#3F7A4E]">{titleHighlight}</span>
            </motion.h2>
          </div>

          <motion.a
            href="/study-groups#wildlife-photography"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-[#3F7A4E] font-semibold hover:text-[#F2A93B] transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {visiblePhotos.map((photo, i) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              index={i}
              inView={inView}
              onClick={() => setLightbox(photo)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace("w=500", "w=1200")}
                alt={lightbox.alt}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-5">
                <span
                  className="text-white/80 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {lightbox.alt}
                </span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
