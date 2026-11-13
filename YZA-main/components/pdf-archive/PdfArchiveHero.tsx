"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface PdfArchiveHeroProps {
  pageTitle: string;
  subtitle: string;
  heroImageUrl: string;
  eyebrow: string;
  icon: LucideIcon;
}

export function PdfArchiveHero({
  pageTitle,
  subtitle,
  heroImageUrl,
  eyebrow,
  icon: Icon,
}: PdfArchiveHeroProps) {
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
        ) : (
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 25%, #3F7A4E 0%, transparent 42%), radial-gradient(circle at 85% 75%, #F2A93B 0%, transparent 38%)",
            }}
          />
        )}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F2A93B] text-[#333A33] mb-6 shadow-lg shadow-[#F2A93B]/30"
          >
            <Icon className="w-7 h-7" />
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
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#f4f7f4] pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}
