"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Bird,
  GraduationCap,
  Leaf,
  Quote,
  TreePine,
  User,
} from "lucide-react";
import type { AboutPageContent } from "@/lib/about-page/resolveAboutPageContent";
import { ABOUT_PAGE_FALLBACK } from "@/lib/about-page/resolveAboutPageContent";
import { ABOUT_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface AboutPageProps {
  content?: AboutPageContent;
}

function SectionImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl shadow-2xl shadow-[#3F7A4E]/15 ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3F7A4E]/30 via-transparent to-transparent" />
    </div>
  );
}

const WILDLIFE_FLOATERS = [
  { Icon: Bird, className: "top-[12%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Leaf, className: "top-[18%] right-[12%]", delay: 1.2, duration: 6 },
  { Icon: TreePine, className: "bottom-[22%] left-[14%]", delay: 0.6, duration: 8 },
  { Icon: Bird, className: "bottom-[28%] right-[10%]", delay: 2, duration: 9 },
  { Icon: Leaf, className: "top-[42%] left-[4%]", delay: 1.8, duration: 5.5 },
  { Icon: Leaf, className: "top-[35%] right-[5%]", delay: 0.4, duration: 7.5 },
] as const;

function VisionSection({
  title,
  statement,
  inView,
}: {
  title: string;
  statement: string;
  inView: boolean;
}) {
  const words = statement.replace(/\.$/, "").split(" ");

  return (
    <section className="page-snap-section relative py-10 sm:py-14 md:py-16 overflow-hidden bg-[#fafaf8]">
      {/* Soft ambient light — no heavy green */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafaf8] to-[#f4f7f4]" />

      <motion.div
        animate={inView ? { opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#F2A93B]/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={inView ? { opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-[#3F7A4E]/8 blur-3xl pointer-events-none"
      />

      {/* Floating wildlife icons */}
      {WILDLIFE_FLOATERS.map(({ Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-[#3F7A4E]/15 ${className}`}
          animate={
            inView
              ? {
                  y: [0, -18, 0, 12, 0],
                  x: [0, 8, 0, -6, 0],
                  rotate: [0, 6, 0, -4, 0],
                }
              : {}
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + i * 0.15,
          }}
        >
          <Icon className="w-8 h-8" strokeWidth={1.25} />
        </motion.div>
      ))}

      {/* Organic horizon line */}
      <svg
        className="absolute bottom-0 left-0 w-full h-12 text-[#f4f7f4] opacity-80"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0,64 C240,32 480,80 720,48 C960,16 1200,72 1440,40 L1440,96 L0,96 Z"
          fill="currentColor"
          animate={inView ? { d: [
            "M0,64 C240,32 480,80 720,48 C960,16 1200,72 1440,40 L1440,96 L0,96 Z",
            "M0,56 C240,40 480,72 720,56 C960,40 1200,64 1440,48 L1440,96 L0,96 Z",
            "M0,64 C240,32 480,80 720,48 C960,16 1200,72 1440,40 L1440,96 L0,96 Z",
          ] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-[#3F7A4E]/10 bg-white/70 backdrop-blur-md shadow-[0_24px_80px_-20px_rgba(63,122,78,0.15)] px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 text-center overflow-hidden"
        >
          {/* Inner decorative ring */}
          <motion.div
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full border border-dashed border-[#3F7A4E]/10 pointer-events-none"
          />
          <motion.div
            animate={inView ? { rotate: -360 } : {}}
            transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full border border-dashed border-[#F2A93B]/20 pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4 md:mb-5"
          >
            <motion.span
              animate={inView ? { width: ["0%", "100%"] } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-px w-10 md:w-14 bg-[#F2A93B] origin-left"
            />
            <h2
              className="text-[#F2A93B] font-bold tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              }}
            >
              {title}
            </h2>
            <motion.span
              animate={inView ? { width: ["0%", "100%"] } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-px w-10 md:w-14 bg-[#F2A93B] origin-right"
            />
          </motion.div>

          <p
            className="text-[#333A33] leading-[1.15] flex flex-wrap justify-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 700,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.35 + i * 0.12,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={i === words.length - 1 ? "text-[#3F7A4E]" : undefined}
              >
                {word}{i < words.length - 1 ? "" : "."}
              </motion.span>
            ))}
          </p>

          {/* Wildlife motif divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-4 mt-6 md:mt-8"
          >
            <motion.div
              animate={inView ? { x: [-4, 4, -4] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="w-4 h-4 text-[#3F7A4E]/40" />
            </motion.div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-[#3F7A4E]/30"
                  animate={inView ? { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: dot * 0.35,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <motion.div
              animate={inView ? { x: [4, -4, 4], y: [-2, 2, -2] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bird className="w-5 h-5 text-[#F2A93B]/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutPage({ content = ABOUT_PAGE_FALLBACK }: AboutPageProps) {
  const { overview, founder, education, vision } = content;

  const founderRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const founderInView = useInView(founderRef, { once: true, margin: "-80px" });
  const educationInView = useInView(educationRef, { once: true, margin: "-80px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });

  return (
    <main className="bg-white">
      {/* Hero / Overview */}
      <section className="page-snap-section relative min-h-[72vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={overview.image.url}
            alt={overview.image.alt}
            className="w-full h-full object-cover scale-105"
          />
          <div className={`absolute inset-0 ${ABOUT_HERO_OVERLAY.gradientVertical}`} />
          <div className={`absolute inset-0 ${ABOUT_HERO_OVERLAY.gradientLeft}`} />
          <div className={`absolute inset-0 ${ABOUT_HERO_OVERLAY.gradientBottom}`} />
          <div className={`absolute inset-0 ${ABOUT_HERO_OVERLAY.gradientAccent}`} />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2A93B]" />
              <span
                className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {overview.eyebrow}
              </span>
            </div>

            <h1
              className="text-white leading-tight mb-6 max-w-4xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
              }}
            >
              {overview.title}
            </h1>

            <p
              className="text-white/90 leading-relaxed max-w-3xl text-lg [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {overview.content}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 70" fill="none" className="w-full block">
            <path d="M0 70 L0 35 Q360 0 720 22 Q1080 44 1440 14 L1440 70 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Founder */}
      <section ref={founderRef} className="page-snap-section py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="relative">
                <div className="w-44 h-56 rounded-2xl overflow-hidden shadow-xl shadow-[#3F7A4E]/20 border-4 border-white ring-2 ring-[#3F7A4E]/10">
                  <img
                    src={founder.image.url}
                    alt={founder.image.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-[#F2A93B] flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-[#333A33]" />
                </div>
              </div>
              <div className="mt-6 text-center lg:text-left">
                <p
                  className="text-[#3F7A4E] text-sm font-semibold uppercase tracking-wider mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {founder.title}
                </p>
                <h2
                  className="text-[#333A33] text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {founder.name}
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="space-y-5">
                {founder.paragraphs.map((paragraph, i) => {
                  const isQuote =
                    paragraph.startsWith('"') || paragraph.startsWith("\u201c");

                  if (isQuote) {
                    return (
                      <div
                        key={i}
                        className="relative bg-[#f4f7f4] rounded-2xl p-6 border-l-4 border-[#F2A93B] mt-8"
                      >
                        <Quote className="w-8 h-8 text-[#3F7A4E]/20 absolute top-4 right-4" />
                        <p
                          className="text-[#333A33] leading-relaxed italic text-lg pr-8"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {paragraph}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-[#6b7769] leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem" }}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section ref={educationRef} className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={educationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3F7A4E]/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#3F7A4E]" />
                </div>
                <h2
                  className="text-[#333A33] leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 700,
                  }}
                >
                  {education.title}
                </h2>
              </div>

              <p
                className="text-[#6b7769] leading-relaxed text-lg"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {education.content}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={educationInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <SectionImage
                src={education.image.url}
                alt={education.image.alt}
                className="aspect-square max-w-lg mx-auto lg:ml-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <div ref={visionRef}>
        <VisionSection
          title={vision.title}
          statement={vision.statement}
          inView={visionInView}
        />
      </div>
    </main>
  );
}
