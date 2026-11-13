"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Bird,
  Leaf,
  Newspaper,
  Sparkles,
  TreePine,
} from "lucide-react";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";
import { NewsDetailsDialog } from "@/components/news-and-updates-page/NewsDetailsDialog";
import type { NewsItemData } from "@/lib/api/types";
import type { NewsAndUpdatesPageContent } from "@/lib/news-and-updates-page/resolveNewsAndUpdatesPageContent";
import { NEWS_AND_UPDATES_PAGE_FALLBACK } from "@/lib/news-and-updates-page/resolveNewsAndUpdatesPageContent";
import { truncateNewsDescription } from "@/lib/news-and-updates-page/newsDescriptionUtils";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { NEWS_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";

interface NewsAndUpdatesPageProps {
  content?: NewsAndUpdatesPageContent;
}

const HERO_FLOATERS = [
  { Icon: Newspaper, className: "top-[18%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Sparkles, className: "top-[26%] right-[10%]", delay: 1, duration: 6 },
  { Icon: Leaf, className: "bottom-[32%] left-[12%]", delay: 0.5, duration: 8 },
  { Icon: Bird, className: "bottom-[28%] right-[7%]", delay: 1.5, duration: 9 },
] as const;

const CARD_ACCENTS = [
  { ring: "ring-[#3F7A4E]/20", glow: "shadow-[#3F7A4E]/15", badge: "bg-[#3F7A4E]" },
  { ring: "ring-[#4A8F5C]/20", glow: "shadow-[#4A8F5C]/15", badge: "bg-[#4A8F5C]" },
  { ring: "ring-[#F2A93B]/25", glow: "shadow-[#F2A93B]/20", badge: "bg-[#F2A93B]" },
  { ring: "ring-[#2D5A3D]/20", glow: "shadow-[#2D5A3D]/15", badge: "bg-[#2D5A3D]" },
] as const;

function NewsHero({
  pageTitle,
  subtitle,
}: {
  pageTitle: string;
  subtitle: string;
}) {
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
          src={PAGE_HERO_IMAGES.newsAndUpdates}
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
            className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full border border-dashed border-white/10 pointer-events-none"
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
              <Newspaper className="w-3.5 h-3.5" />
              {subtitle}
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
                className={i === words.length - 1 ? "text-[#F2A93B] italic font-normal" : undefined}
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
            Stay informed with the latest stories, exhibitions, and milestones from the
            Young Zoologists&apos; Association of Sri Lanka.
          </motion.p>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-white pointer-events-none"
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

function NewsCard({
  item,
  index,
  onReadMore,
}: {
  item: NewsItemData;
  index: number;
  onReadMore: (item: NewsItemData) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const preview = truncateNewsDescription(item.description);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      <div
        className={`flex h-full flex-col rounded-[1.75rem] overflow-hidden bg-white border border-[#e8efe9] shadow-lg ${accent.glow} ring-1 ${accent.ring} transition-shadow duration-500 group-hover:shadow-2xl`}
      >
        <div className="relative aspect-[16/10] overflow-hidden shrink-0">
          {item.image.url ? (
            <>
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/50 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3F7A4E] to-[#1a2e1f] flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-white/40" strokeWidth={1.25} />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + (index % 6) * 0.08, duration: 0.4 }}
            className={`absolute top-4 left-4 w-9 h-9 rounded-xl ${accent.badge} flex items-center justify-center shadow-lg`}
          >
            <Newspaper className="w-4 h-4 text-white" strokeWidth={2} />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6 min-h-[220px]">
          <h3
            className="text-[#1a2e1f] leading-snug line-clamp-2 mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.125rem",
              fontWeight: 700,
            }}
          >
            {item.title}
          </h3>

          {item.author ? (
            <p
              className="text-[#5C7A63] text-xs tracking-wide mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              By {item.author}
            </p>
          ) : null}

          <p
            className="text-[#6b7769] text-sm leading-relaxed line-clamp-4 flex-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {preview || "Read the full story for more details."}
          </p>

          <button
            type="button"
            onClick={() => onReadMore(item)}
            className="mt-5 inline-flex items-center gap-1.5 text-[#3F7A4E] text-sm font-semibold tracking-wide transition-colors hover:text-[#2D5A3D] group/btn"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        <motion.div
          className="h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E] origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + (index % 6) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.article>
  );
}

function NewsGrid({
  news,
  subtitle,
}: {
  news: NewsItemData[];
  subtitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [selectedItem, setSelectedItem] = useState<NewsItemData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogScrollYRef = useRef(0);

  const pagination = usePaginatedItems(news, NEWS_PAGE_SIZE);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openNewsDetails = (item: NewsItemData) => {
    dialogScrollYRef.current = window.scrollY;
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      dialogScrollYRef.current = window.scrollY;
      setDialogOpen(true);
      return;
    }
    setDialogOpen(false);
  };

  if (!news.length) return null;

  return (
    <section ref={sectionRef} className="page-snap-section relative py-14 md:py-20 bg-[#fafaf8]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={inView ? { opacity: [0.04, 0.08, 0.04] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-[#3F7A4E]/10 blur-3xl"
        />
        <motion.div
          animate={inView ? { opacity: [0.03, 0.07, 0.03] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -left-24 w-80 h-80 rounded-full bg-[#F2A93B]/10 blur-3xl"
        />
      </div>

      <div ref={listRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
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
              {subtitle}
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
            Discover exhibitions, publications, and conservation milestones from across YZA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {pagination.paginatedItems.map((item, index) => (
            <NewsCard
              key={`${item.id}-${item.title}`}
              item={item}
              index={index}
              onReadMore={openNewsDetails}
            />
          ))}
        </div>

        {pagination.showPagination ? (
          <PdfArchivePagination
            pagination={pagination}
            onPageChange={scrollToList}
            variant="compact"
          />
        ) : null}
      </div>

      <NewsDetailsDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        scrollYRef={dialogScrollYRef}
      />
    </section>
  );
}

export function NewsAndUpdatesPage({
  content = NEWS_AND_UPDATES_PAGE_FALLBACK,
}: NewsAndUpdatesPageProps) {
  return (
    <main className="bg-white">
      <NewsHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <NewsGrid news={content.news} subtitle={content.subtitle} />
      <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-[#fafaf8] to-[#f4f7f4]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-4 h-4 text-[#3F7A4E]/40" />
            <Sparkles className="w-4 h-4 text-[#F2A93B]/50" />
            <TreePine className="w-4 h-4 text-[#3F7A4E]/30" />
          </div>
          <p
            className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            From wildlife art exhibitions to junior publications, YZA continues to share
            stories that inspire the next generation of Sri Lankan naturalists.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
