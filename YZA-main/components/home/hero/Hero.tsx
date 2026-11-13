"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, CalendarDays, Compass, UserPlus } from "lucide-react";
import type { HeroContent } from "@/lib/home/hero/resolveHeroContent";
import { HERO_FALLBACK } from "@/lib/home/hero/resolveHeroContent";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";

interface HeroProps {
  content?: HeroContent;
}

function parseEyebrow(eyebrow: string): { name: string; detail: string | null } {
  const match = eyebrow.match(/^(.+?)\s*[—–-]\s*(.+)$/);
  if (match) {
    return { name: match[1].trim(), detail: match[2].trim() };
  }
  return { name: eyebrow.trim(), detail: null };
}

const SRI_LANKA_IN_NAME = " of Sri Lanka";

function splitAssociationName(name: string): { primary: string; secondary: string | null } {
  const idx = name.indexOf(SRI_LANKA_IN_NAME);
  if (idx === -1) {
    return { primary: name, secondary: null };
  }

  return {
    primary: name.slice(0, idx).trim(),
    secondary: name.slice(idx + 1).trim(),
  };
}

const headlineEase = [0.22, 1, 0.36, 1] as const;

const headlineLineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const headlineWordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: headlineEase },
  },
};

const taglineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.55 },
  },
};

const taglineWordVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: headlineEase },
  },
};

/** Renders "Let's Protect Nature" with entrance + continuous homepage-style motion. */
function PrimaryHeadline({ text }: { text: string }) {
  const protectMatch = text.match(/^Let's\s+Protect\s+Nature$/i);

  const playfair = "'Playfair Display', serif";
  const size = "clamp(2.25rem, 5.5vw, 5rem)";

  if (protectMatch) {
    return (
      <motion.div
        className="hero-headline-live"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.h1
          className="relative leading-[1.06] tracking-tight [perspective:800px] overflow-hidden"
          style={{ fontFamily: playfair, fontSize: size, fontWeight: 900 }}
          variants={headlineLineVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-headline-live__shimmer" aria-hidden />

          <motion.span variants={headlineWordVariants} className="relative z-[1] inline-block">
            <motion.span
              className="inline-block text-white"
              animate={{
                opacity: [0.9, 1, 0.9],
                textShadow: [
                  "0 0 0 rgba(255,255,255,0)",
                  "0 0 24px rgba(255,255,255,0.2)",
                  "0 0 0 rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              Let&apos;s{" "}
            </motion.span>
          </motion.span>

          <motion.span variants={headlineWordVariants} className="relative z-[1] inline-block">
            <span className="inline-block hero-protect-gradient-flow">Protect</span>
          </motion.span>

          <motion.span variants={headlineWordVariants} className="relative z-[1] inline-block">
            <motion.span
              className="inline-block text-white font-normal italic"
              style={{ fontWeight: 450 }}
              animate={{
                y: [0, -4, 0],
                rotate: [-0.6, 0.6, -0.6],
                opacity: [0.94, 1, 0.94],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              {" "}
              Nature
            </motion.span>
          </motion.span>
        </motion.h1>
      </motion.div>
    );
  }

  return (
    <motion.h1
      className="text-white leading-[1.06] tracking-tight"
      style={{ fontFamily: playfair, fontSize: size, fontWeight: 900 }}
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: headlineEase }}
    >
      {text}
    </motion.h1>
  );
}

function AnimatedTagline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <motion.p
      className="text-white/92 leading-snug [text-wrap:balance]"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.3rem, 2.85vw, 2.05rem)",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
      variants={taglineContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={taglineWordVariants} className="inline-block mr-[0.28em]">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function Hero({ content = HERO_FALLBACK }: HeroProps) {
  const { eyebrow, headlineLine1, headlineLine2, subheadline, backgroundSlides, ctas } = content;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { name: associationName, detail: associationDetail } = parseEyebrow(eyebrow);
  const { primary: nameLine1, secondary: nameLine2 } = splitAssociationName(associationName);
  const nameFontSize = nameLine2
    ? "clamp(1.25rem, 2.65vw, 2.15rem)"
    : "clamp(1.5rem, 3.2vw, 2.5rem)";

  return (
    <section ref={ref} className="page-snap-section relative min-h-[100svh] sm:h-screen sm:min-h-[680px] overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0 bg-[#1a2e1f]" style={{ y: bgY }}>
        <HeroBackgroundSlider slides={backgroundSlides} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F7A4E]/55 via-transparent to-transparent" />
      </motion.div>

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full min-h-[100svh] sm:h-full sm:min-h-0 flex flex-col pt-[8.75rem] sm:pt-[11rem] md:pt-[11.5rem] pb-36 sm:pb-48 md:pb-52 lg:pb-56"
        style={{ opacity: contentOpacity }}
      >
        {/* Top — association + headline */}
        <div className="flex-shrink-0 max-w-4xl">
          {/* Association name — primary hero highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 sm:mb-6 md:mb-7"
          >
            <div className="inline-block max-w-full rounded-2xl border border-[#F2A93B]/45 bg-white/[0.1] backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              <div className="flex items-center gap-3 mb-2.5">
                <motion.div
                  animate={{ width: ["1.5rem", "2.5rem", "1.5rem"], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="h-[2px] bg-gradient-to-r from-[#F2A93B] to-[#F2A93B]/30 rounded-full flex-shrink-0"
                />
                <motion.div
                  animate={{ width: ["1.5rem", "2.5rem", "1.5rem"], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="h-[2px] bg-gradient-to-l from-[#F2A93B] to-[#F2A93B]/30 rounded-full flex-shrink-0"
                />
              </div>

              <h2
                className="text-white leading-[1.12] sm:leading-[1.15] tracking-tight break-words"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: nameFontSize,
                  fontWeight: 700,
                  textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                }}
              >
                <span className="block">{nameLine1}</span>
                {nameLine2 && <span className="block mt-0.5">{nameLine2}</span>}
              </h2>

              {associationDetail && (
                <div className="mt-2.5 flex items-center gap-3">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2A93B] text-[#1a2e1f] text-xs font-bold tracking-[0.18em] uppercase shadow-md shadow-[#F2A93B]/30"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {associationDetail}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main headline — two lines only */}
          <div>
            <PrimaryHeadline text={headlineLine1} />
          </div>

          <div className="mt-5 sm:mt-6 md:mt-7 flex items-start sm:items-center gap-3 sm:gap-4">
            <motion.span
              className="hidden sm:block h-px w-14 md:w-20 flex-shrink-0 mt-[0.65em] sm:mt-0 bg-gradient-to-r from-[#F2A93B] to-[#F2A93B]/25"
              aria-hidden
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.72, duration: 0.85, ease: headlineEase }}
              style={{ transformOrigin: "left center" }}
            />
            <AnimatedTagline text={headlineLine2} />
          </div>
        </div>

        {/* Bottom panel — subtext + CTAs grouped above the wave */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto pt-4 sm:pt-6 md:pt-8 mb-3 sm:mb-5 md:mb-6"
        >
          <div className="w-full min-w-0 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-[#3F7A4E]/10 backdrop-blur-lg p-4 sm:p-5 md:p-6 lg:p-7 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 xl:gap-10 lg:items-end">
              <p
                className="min-w-0 text-white/85 leading-relaxed text-[0.95rem] md:text-base [text-wrap:pretty]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {subheadline}
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-start lg:justify-end shrink-0 w-full lg:w-auto">
              <a
                href={ctas.join.url}
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#F2A93B] hover:bg-[#d4911f] text-[#333A33] font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#F2A93B]/30 hover:shadow-xl hover:shadow-[#F2A93B]/40 hover:-translate-y-0.5 whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <UserPlus className="w-4 h-4" />
                {ctas.join.label}
              </a>
              <a
                href={ctas.discover.url}
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 hover:border-white/50 font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Compass className="w-4 h-4" />
                {ctas.discover.label}
              </a>
              <a
                href={ctas.events.url}
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#3F7A4E]/70 hover:bg-[#3F7A4E] text-white border border-[#3F7A4E]/80 font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <CalendarDays className="w-4 h-4" />
                {ctas.events.label}
              </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[3.25rem] sm:bottom-[4.25rem] md:bottom-[4.75rem] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          className="text-white/55 text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/55" />
        </motion.div>
      </motion.div>

      {/* Bottom white wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 70 L0 35 Q360 0 720 22 Q1080 44 1440 14 L1440 70 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
