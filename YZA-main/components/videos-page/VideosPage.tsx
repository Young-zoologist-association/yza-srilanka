"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Play,
  Share2,
  Twitter,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import type { SocialLinkData, VideoItemData } from "@/lib/api/types";
import type { VideosPageContent } from "@/lib/videos-page/resolveVideosPageContent";
import { VIDEOS_PAGE_FALLBACK } from "@/lib/videos-page/resolveVideosPageContent";
import { VIDEOS_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { getYouTubeEmbedUrl } from "@/lib/videos-page/youtube";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { PdfArchivePagination } from "@/components/pdf-archive/PdfArchivePagination";

interface VideosPageProps {
  content?: VideosPageContent;
}

type SocialPlatformIcon = LucideIcon | typeof TikTokIcon;

interface SocialPlatformStyle {
  Icon: SocialPlatformIcon;
  /** Lucide stroke icons vs filled brand marks (e.g. TikTok) */
  iconFilled?: boolean;
  accentClass: string;
  iconClass: string;
}

function getSocialPlatformStyle(platformName: string): SocialPlatformStyle {
  const key = platformName.toLowerCase().trim();

  if (key.includes("youtube")) {
    return {
      Icon: Youtube,
      accentClass: "from-[#FF0000]/10 to-[#FF0000]/5 ring-[#FF0000]/15 hover:ring-[#FF0000]/30",
      iconClass: "bg-[#FF0000] text-white",
    };
  }

  if (key.includes("instagram")) {
    return {
      Icon: Instagram,
      accentClass: "from-[#E1306C]/10 to-[#F77737]/5 ring-[#E1306C]/15 hover:ring-[#E1306C]/30",
      iconClass: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white",
    };
  }

  if (key.includes("facebook")) {
    return {
      Icon: Facebook,
      accentClass: "from-[#1877F2]/10 to-[#1877F2]/5 ring-[#1877F2]/15 hover:ring-[#1877F2]/30",
      iconClass: "bg-[#1877F2] text-white",
    };
  }

  if (key.includes("linkedin")) {
    return {
      Icon: Linkedin,
      accentClass: "from-[#0A66C2]/10 to-[#0A66C2]/5 ring-[#0A66C2]/15 hover:ring-[#0A66C2]/30",
      iconClass: "bg-[#0A66C2] text-white",
    };
  }

  if (key.includes("twitter") || key === "x" || key.startsWith("x ")) {
    return {
      Icon: Twitter,
      accentClass: "from-[#14171A]/10 to-[#14171A]/5 ring-[#14171A]/15 hover:ring-[#14171A]/30",
      iconClass: "bg-[#14171A] text-white",
    };
  }

  if (key.includes("tiktok") || key.includes("threads")) {
    return {
      Icon: TikTokIcon,
      iconFilled: true,
      accentClass:
        "from-[#00F2EA]/12 via-[#1a2e1f]/5 to-[#FF0050]/12 ring-[#00F2EA]/20 hover:ring-[#FF0050]/35 hover:shadow-[#FF0050]/10",
      iconClass:
        "bg-gradient-to-br from-[#00F2EA] via-[#121212] to-[#FF0050] text-white shadow-md shadow-black/25",
    };
  }

  return {
    Icon: Share2,
    accentClass: "from-[#3F7A4E]/10 to-[#3F7A4E]/5 ring-[#3F7A4E]/15 hover:ring-[#3F7A4E]/30",
    iconClass: "bg-[#3F7A4E] text-white",
  };
}

function VideosHero({
  pageTitle,
  description,
}: Pick<VideosPageContent, "pageTitle" | "description">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#1a2e1f]">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #3F7A4E 0%, transparent 42%), radial-gradient(circle at 85% 75%, #F2A93B 0%, transparent 38%)",
          }}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccent}`} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)] px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F2A93B] text-[#333A33] mb-6 shadow-lg shadow-[#F2A93B]/30"
          >
            <Play className="w-7 h-7 fill-current" />
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
                  delay: 0.25 + i * 0.08,
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
            className="mt-6 max-w-2xl mx-auto text-white/65 text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {description}
          </motion.p>
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

function VideoLightbox({
  video,
  onClose,
}: {
  video: VideoItemData;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const embedUrl = video.youtubeId ? getYouTubeEmbedUrl(video.youtubeId) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#1a2e1f]/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-top-14 sm:-right-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
          {embedUrl ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="p-8 text-center text-white">
              <p className="mb-4">Unable to embed this video.</p>
              <Link
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F2A93B] font-semibold"
              >
                Watch on YouTube <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="mt-4 px-1">
          <h3
            className="text-white text-lg md:text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {video.title}
          </h3>
          {video.description ? (
            <p
              className="mt-2 text-white/70 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {video.description}
            </p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({
  video,
  index,
  inView,
  onPlay,
}: {
  video: VideoItemData;
  index: number;
  inView: boolean;
  onPlay: (video: VideoItemData) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group h-full flex"
    >
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="flex flex-col w-full h-full text-left rounded-2xl overflow-hidden bg-white shadow-md shadow-[#3F7A4E]/8 ring-1 ring-[#3F7A4E]/10 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#3F7A4E]/15 group-hover:ring-[#3F7A4E]/20"
      >
        <div className="relative w-full aspect-video shrink-0 overflow-hidden bg-[#1a2e1f]">
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={(event) => {
                const target = event.currentTarget;
                if (video.youtubeId && !target.dataset.fallbackApplied) {
                  target.dataset.fallbackApplied = "true";
                  target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#3F7A4E] to-[#1a2e1f]" />
          )}
          <div className="absolute inset-0 bg-[#1a2e1f]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/80 via-[#1a2e1f]/20 to-[#1a2e1f]/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#F2A93B] text-[#333A33] flex items-center justify-center shadow-xl shadow-black/30 ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 md:p-6">
          <h3
            className="text-[#333A33] text-lg font-bold line-clamp-2 min-h-[3.5rem] leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {video.title}
          </h3>
          <p
            className="mt-3 text-[#5C7A63] text-sm leading-relaxed line-clamp-3 min-h-[4.125rem]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {video.description || "\u00A0"}
          </p>
        </div>
      </button>
    </motion.article>
  );
}

function VideosSection({
  videos,
  onPlay,
}: {
  videos: VideoItemData[];
  onPlay: (video: VideoItemData) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pagination = usePaginatedItems(videos, VIDEOS_PAGE_SIZE);

  const scrollToVideos = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#f4f7f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14 scroll-mt-28"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Watch & Learn
          </span>
          <h2
            className="mt-3 text-[#333A33] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Featured Videos
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pagination.currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
          >
            {pagination.paginatedItems.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                inView={inView}
                onPlay={onPlay}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <PdfArchivePagination
          pagination={pagination}
          onPageChange={scrollToVideos}
          className="pt-8 sm:flex-row sm:justify-between"
        />
      </div>
    </section>
  );
}

function SocialLinkCard({
  link,
  index,
  inView,
}: {
  link: SocialLinkData;
  index: number;
  inView: boolean;
}) {
  const { Icon, iconFilled, accentClass, iconClass } = getSocialPlatformStyle(link.platformName);

  return (
    <motion.a
      href={link.platformUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-br ${accentClass} p-5 md:p-6 ring-1 transition-all duration-300 hover:shadow-lg`}
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${iconClass}`}
      >
        {iconFilled ? (
          <Icon className="w-[1.35rem] h-[1.35rem]" />
        ) : (
          <Icon className="w-6 h-6" strokeWidth={1.75} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[#333A33] font-bold text-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {link.platformName}
        </p>
        <p
          className="text-[#5C7A63] text-sm truncate"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Follow YZA on {link.platformName}
        </p>
      </div>
      <ArrowUpRight className="w-5 h-5 text-[#3F7A4E]/50 group-hover:text-[#3F7A4E] transition-colors flex-shrink-0" />
    </motion.a>
  );
}

function SocialLinksSection({ socialLinks }: { socialLinks: SocialLinkData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!socialLinks.length) return null;

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Stay Connected
          </span>
          <h2
            className="mt-3 text-[#333A33] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Follow Us Online
          </h2>
          <p
            className="mt-4 text-[#5C7A63] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Connect with YZA on social media for the latest videos, field highlights, and
            conservation updates.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {socialLinks.map((link, index) => (
            <SocialLinkCard key={link.id} link={link} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideosPage({ content = VIDEOS_PAGE_FALLBACK }: VideosPageProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItemData | null>(null);

  const handlePlay = useCallback((video: VideoItemData) => {
    setActiveVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <main className="bg-[#f4f7f4]">
      <VideosHero pageTitle={content.pageTitle} description={content.description} />
      <VideosSection videos={content.videos} onPlay={handlePlay} />
      <SocialLinksSection socialLinks={content.socialLinks} />

      <AnimatePresence>
        {activeVideo ? <VideoLightbox video={activeVideo} onClose={handleClose} /> : null}
      </AnimatePresence>
    </main>
  );
}
