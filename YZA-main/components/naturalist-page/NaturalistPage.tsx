"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Binoculars, Bird, Compass, Leaf, TreePine } from "lucide-react";
import type { NaturalistPageContent } from "@/lib/naturalist-page/resolveNaturalistPageContent";
import { NATURALIST_PAGE_FALLBACK } from "@/lib/naturalist-page/resolveNaturalistPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { NaturalistSubmissionForm } from "@/components/NaturalistSubmissionForm";

interface NaturalistPageProps {
  content?: NaturalistPageContent;
}

const HERO_FLOATERS = [
  { Icon: Binoculars, className: "top-[16%] left-[7%]", delay: 0, duration: 7 },
  { Icon: TreePine, className: "top-[24%] right-[9%]", delay: 0.8, duration: 6.5 },
  { Icon: Bird, className: "bottom-[30%] left-[11%]", delay: 0.4, duration: 8 },
  { Icon: Compass, className: "bottom-[26%] right-[6%]", delay: 1.2, duration: 9 },
] as const;

function NaturalistHero({
  pageTitle,
  subtitle,
}: Pick<NaturalistPageContent, "pageTitle" | "subtitle">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-24 sm:pt-32 sm:pb-28 md:pt-40 md:pb-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#142318]">
        <img
          src={PAGE_HERO_IMAGES.naturalist}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a2e1f]/80 via-transparent to-[#2D5A3D]/40" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-2 8-8 14-16 16 8 2 14 8 16 16 2-8 8-14 16-16-8-2-14-8-16-16z' fill='%23fff' fill-opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "48px 48px",
        }}
      />

      {HERO_FLOATERS.map(({ Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-white/25 ${className}`}
          animate={
            inView
              ? { y: [0, -12, 0, 10, 0], rotate: [0, 5, 0, -5, 0], opacity: [0.2, 0.35, 0.2] }
              : {}
          }
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-7 h-7" strokeWidth={1.25} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-4 py-1.5 mb-6"
            >
              <Leaf className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span
                className="text-[#F2A93B] text-xs tracking-[0.22em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Young Naturalists
              </span>
            </motion.div>

            <h1
              className="text-white leading-[1.08]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.25rem, 6vw, 4rem)",
                fontWeight: 700,
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.3em] last:mr-0 text-[#F2A93B] italic font-normal"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="mt-6 max-w-xl text-white/70 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex relative w-48 h-48 items-center justify-center"
          >
            <motion.div
              animate={inView ? { rotate: 360 } : {}}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/15"
            />
            <motion.div
              animate={inView ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-28 h-28 rounded-full bg-[#3F7A4E]/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(63,122,78,0.35)]"
            >
              <Binoculars className="w-12 h-12 text-[#F2A93B]" strokeWidth={1.25} />
            </motion.div>
          </motion.div>
        </div>
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
                    "M0,48 C240,72 480,24 720,48 C960,72 1200,32 1440,48 L1440,80 L0,80 Z",
                    "M0,56 C240,32 480,64 720,40 C960,16 1200,56 1440,40 L1440,80 L0,80 Z",
                    "M0,48 C240,72 480,24 720,48 C960,72 1200,32 1440,48 L1440,80 L0,80 Z",
                  ],
                }
              : {}
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          d="M0,48 C240,72 480,24 720,48 C960,72 1200,32 1440,48 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-[#f4f7f4] to-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Binoculars className="w-4 h-4 text-[#3F7A4E]/40" />
          <Leaf className="w-4 h-4 text-[#F2A93B]/50" />
          <TreePine className="w-4 h-4 text-[#3F7A4E]/30" />
        </div>
        <p
          className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Step into the field, sharpen your senses, and become a steward of Sri
          Lanka&apos;s extraordinary natural heritage.
        </p>
      </motion.div>
    </section>
  );
}

export function NaturalistPage({ content = NATURALIST_PAGE_FALLBACK }: NaturalistPageProps) {
  return (
    <main className="bg-white">
      <NaturalistHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <NaturalistSubmissionForm />
      <ClosingSection />
    </main>
  );
}
