"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Building2, MapPin, Sparkles, Star, TreePine, type LucideIcon } from "lucide-react";
import type { BranchesPageContent, BranchCard } from "@/lib/branches-page/resolveBranchesPageContent";
import { BRANCHES_PAGE_FALLBACK } from "@/lib/branches-page/resolveBranchesPageContent";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import {
  isBranchSectionSnapped,
  resolveBranchSlug,
  scrollToBranchSection,
  waitForBranchSection,
  waitForScrollSettled,
} from "@/lib/branches-page/branchNavigation";

interface BranchesPageProps {
  content?: BranchesPageContent;
}

const BRANCH_ICONS: Record<string, LucideIcon> = {
  dehiwala: Building2,
  pinnawala: Sparkles,
  ridiyagama: TreePine,
};

function getBranchIcon(slug: string): LucideIcon {
  return BRANCH_ICONS[slug] ?? MapPin;
}

function BranchesHero({
  pageTitle,
  heroImageUrl,
}: Pick<BranchesPageContent, "pageTitle" | "heroImageUrl">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden"
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
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccent}`} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
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
              Islandwide Presence
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
            className="mt-6 max-w-2xl mx-auto text-white/65 text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Discover YZA&apos;s branches across Sri Lanka — each one nurturing conservation
            education and community engagement in its region.
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

function BranchJumpNav({
  branches,
  activeSlug,
  onSelect,
}: {
  branches: BranchCard[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [navbarOffset, setNavbarOffset] = useState(88);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateNavbarOffset = () => {
      setNavbarOffset(Math.ceil(header.getBoundingClientRect().height));
    };

    updateNavbarOffset();
    const resizeObserver = new ResizeObserver(updateNavbarOffset);
    resizeObserver.observe(header);
    window.addEventListener("scroll", updateNavbarOffset, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateNavbarOffset);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateHeight = () => setBarHeight(bar.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(bar);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPinned(!entry.isIntersecting),
      { rootMargin: `-${navbarOffset}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [navbarOffset]);

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
      {isPinned && <div style={{ height: barHeight }} aria-hidden />}
      <div
        ref={barRef}
        className={`${
          isPinned ? "fixed left-0 right-0 bg-[#f4f7f4]" : "relative bg-[#f4f7f4]/95"
        } z-40 backdrop-blur-md border-b border-[#3F7A4E]/10 shadow-sm`}
        style={isPinned ? { top: navbarOffset } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <p
            className="text-[#5C7A63] text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold mb-3 text-center md:text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Jump to a branch
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {branches.map((branch) => {
              const Icon = getBranchIcon(branch.slug);
              const isActive = activeSlug === branch.slug;
              return (
                <motion.button
                  key={branch.slug}
                  type="button"
                  onClick={() => onSelect(branch.slug)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-[#3F7A4E] border-[#3F7A4E] text-white shadow-md shadow-[#3F7A4E]/25"
                      : "bg-white border-[#3F7A4E]/15 text-[#333A33] hover:border-[#3F7A4E]/35 hover:bg-[#3F7A4E]/5"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                  {branch.name}
                  {branch.isMain ? (
                    <Star className="w-3 h-3 text-[#F2A93B] fill-[#F2A93B]" aria-hidden />
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function BranchSection({
  branch,
  index,
  animateNow = false,
}: {
  branch: BranchCard;
  index: number;
  animateNow?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.45,
    margin: "-88px 0px -30% 0px",
  });
  const shouldAnimate = inView || animateNow;
  const isReversed = index % 2 === 1;
  const Icon = getBranchIcon(branch.slug);
  const hasBranchImage = Boolean(branch.image?.url?.trim());

  return (
    <section
      id={branch.slug}
      ref={ref}
      className={`page-snap-section relative py-12 sm:py-14 md:py-20 ${
        index % 2 === 0 ? "bg-[#f4f7f4]" : "bg-white"
      }`}
    >
      {index > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#3F7A4E]/12 to-transparent" />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 36 }}
          animate={shouldAnimate ? { y: 0 } : { y: 36 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
            isReversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          <motion.div
            initial={{ x: isReversed ? 32 : -32, opacity: 0 }}
            animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: isReversed ? 32 : -32, opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className={`relative lg:[direction:ltr] group ${isReversed ? "lg:order-1" : ""}`}
          >
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-[#3F7A4E]/15 ring-1 ${
                branch.isMain ? "ring-[#F2A93B]/40 ring-2" : "ring-[#3F7A4E]/10"
              }`}
            >
              <div
                className={`w-full aspect-[4/3] relative overflow-hidden ${
                  hasBranchImage ? "bg-[#1a2e1f]" : `bg-gradient-to-br ${branch.gradient}`
                } flex items-center justify-center`}
              >
                {hasBranchImage ? (
                  <>
                    <img
                      src={branch.image.url}
                      alt={branch.image.alt || branch.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/55 via-[#1a2e1f]/15 to-transparent" />
                    <motion.div
                      animate={shouldAnimate ? { y: [0, -5, 0] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg z-[1]"
                      style={{ background: branch.accentColor }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 30%, #fff 0%, transparent 50%), radial-gradient(circle at 70% 70%, #F2A93B 0%, transparent 45%)",
                      }}
                    />
                    <motion.div
                      animate={shouldAnimate ? { y: [0, -8, 0], rotate: [0, 3, -3, 0] } : {}}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center text-white shadow-2xl"
                      style={{ background: branch.accentColor }}
                    >
                      <Icon className="w-11 h-11 md:w-12 md:h-12" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div
                      animate={shouldAnimate ? { rotate: 360 } : {}}
                      transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-dashed border-white/15 pointer-events-none"
                    />
                  </>
                )}
              </div>
              {branch.isMain ? (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2A93B] text-[#333A33] text-xs font-bold uppercase tracking-wide shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Main Branch
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: isReversed ? -32 : 32, opacity: 0 }}
            animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: isReversed ? -32 : 32, opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className={`lg:[direction:ltr] space-y-5 ${isReversed ? "lg:order-2" : ""}`}
          >
            <span
              className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              YZA Branch
            </span>
            <h2
              className="text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              {branch.name}
            </h2>
            <div
              className="h-1 w-16 rounded-full"
              style={{ background: branch.accentColor }}
            />
            <p
              className="text-[#5C7A63] leading-relaxed text-sm md:text-base"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {branch.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function BranchesPage({ content = BRANCHES_PAGE_FALLBACK }: BranchesPageProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [animateSlug, setAnimateSlug] = useState<string | null>(null);

  const navigateToBranch = useCallback(
    async (rawSlug: string, options: { behavior?: ScrollBehavior } = {}) => {
      const slug = resolveBranchSlug(rawSlug, content.branches);
      if (!slug) return;

      setActiveSlug(slug);
      setAnimateSlug(null);

      if (typeof window !== "undefined") {
        const newUrl = `${window.location.pathname}${window.location.search}#${slug}`;
        window.history.replaceState(null, "", newUrl);
      }

      const element = await waitForBranchSection(slug);
      if (!element) return;

      const alreadySnapped = isBranchSectionSnapped(element);
      if (!alreadySnapped) {
        scrollToBranchSection(slug, { behavior: options.behavior ?? "smooth" });
        await waitForScrollSettled();
      }

      setAnimateSlug(slug);
    },
    [content.branches],
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    void navigateToBranch(hash, { behavior: "smooth" });
  }, [navigateToBranch]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        void navigateToBranch(hash, { behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [navigateToBranch]);

  const scrollToBranch = useCallback(
    (slug: string) => {
      void navigateToBranch(slug, { behavior: "smooth" });
    },
    [navigateToBranch],
  );

  return (
    <main className="bg-[#f4f7f4]">
      <BranchesHero pageTitle={content.pageTitle} heroImageUrl={content.heroImageUrl} />
      <BranchJumpNav
        branches={content.branches}
        activeSlug={activeSlug}
        onSelect={scrollToBranch}
      />
      {content.branches.map((branch, index) => (
        <BranchSection
          key={branch.slug}
          branch={branch}
          index={index}
          animateNow={animateSlug === branch.slug}
        />
      ))}
    </main>
  );
}
