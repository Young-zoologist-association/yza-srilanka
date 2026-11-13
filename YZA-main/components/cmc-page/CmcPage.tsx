"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bird, Leaf, TreePine, Sparkles } from "lucide-react";
import type { CmcLevelData, CmcMemberData } from "@/lib/api/types";
import type { CmcPageContent } from "@/lib/cmc-page/resolveCmcPageContent";
import { CMC_PAGE_FALLBACK } from "@/lib/cmc-page/resolveCmcPageContent";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface CmcPageProps {
  content?: CmcPageContent;
}

const LEVEL_BACKGROUNDS = ["bg-white", "bg-[#fafaf8]"] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberAvatar({
  member,
  size = "md",
}: {
  member: CmcMemberData;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "w-28 h-28",
    md: "w-36 h-36",
    lg: "w-44 h-44",
    xl: "w-56 h-56 md:w-64 md:h-64",
  };

  if (member.image.url) {
    return (
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden shadow-xl shadow-[#3F7A4E]/15 ring-2 ring-white`}
      >
        <img
          src={member.image.url}
          alt={member.image.alt || member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-[#3F7A4E] to-[#2D5A3D] flex items-center justify-center shadow-xl shadow-[#3F7A4E]/20 ring-2 ring-white`}
    >
      <span
        className={`font-bold text-white ${
          size === "xl" ? "text-4xl" : size === "lg" ? "text-3xl" : "text-2xl"
        }`}
      >
        {getInitials(member.name)}
      </span>
    </div>
  );
}

function MemberCard({
  member,
  variant = "standard",
  index,
  inView,
}: {
  member: CmcMemberData;
  variant?: "featured" | "standard" | "committee";
  index: number;
  inView: boolean;
}) {
  const isFeatured = variant === "featured";
  const isCommittee = variant === "committee";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col items-center text-center ${
        isFeatured ? "max-w-sm mx-auto" : ""
      }`}
    >
      <MemberAvatar
        member={member}
        size={isFeatured ? "xl" : isCommittee ? "sm" : "md"}
      />
      <div className={`mt-3 space-y-1.5 ${isFeatured ? "px-4" : "px-2"}`}>
        <h3
          className={`font-bold text-[#333A33] leading-snug ${
            isFeatured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
        >
          {member.name}
        </h3>
        <p
          className={`text-[#3F7A4E] font-medium leading-relaxed ${
            isFeatured ? "text-base" : isCommittee ? "text-xs md:text-sm" : "text-sm"
          }`}
        >
          {member.role}
        </p>
      </div>
    </motion.article>
  );
}

function LevelSection({
  level,
  index,
}: {
  level: CmcLevelData;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const memberCount = level.members.length;
  const isFirstLevel = level.level === 1;

  const gridClass =
    memberCount === 1
      ? "max-w-md mx-auto"
      : memberCount === 2
        ? "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        : memberCount === 3
          ? "grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto";

  const variant =
    level.level === 1 ? "featured" : level.level >= 4 ? "committee" : "standard";

  return (
    <section
      ref={ref}
      className={`page-snap-section relative ${isFirstLevel ? "py-8 md:py-10" : "py-6 md:py-8"} ${LEVEL_BACKGROUNDS[index % 2]}`}
    >
      {index > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#3F7A4E]/15 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={gridClass}>
          {level.members.map((member, memberIndex) => (
            <MemberCard
              key={`${member.role}-${member.name}`}
              member={member}
              variant={variant}
              index={memberIndex}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const HERO_WILDLIFE_FLOATERS = [
  { Icon: Bird, className: "top-[18%] left-[6%]", delay: 0, duration: 7, size: "w-7 h-7" },
  { Icon: Leaf, className: "top-[22%] right-[8%]", delay: 1.2, duration: 6, size: "w-6 h-6" },
  { Icon: TreePine, className: "bottom-[28%] left-[10%]", delay: 0.6, duration: 8, size: "w-8 h-8" },
  { Icon: Bird, className: "bottom-[32%] right-[7%]", delay: 2, duration: 9, size: "w-6 h-6" },
  { Icon: Leaf, className: "top-[42%] left-[3%]", delay: 1.8, duration: 5.5, size: "w-5 h-5" },
  { Icon: Leaf, className: "top-[38%] right-[4%]", delay: 0.4, duration: 7.5, size: "w-5 h-5" },
] as const;

function CmcPageHero({
  eyebrow,
  mainHeading,
  year,
  heroImageUrl,
}: {
  eyebrow: string;
  mainHeading: string;
  year: string;
  heroImageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const headingWords = mainHeading.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden"
    >
      {/* Nature backdrop */}
      <div className="absolute inset-0 bg-[#1a2e1f]">
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccent}`} />
      </div>

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Floating wildlife icons */}
      {HERO_WILDLIFE_FLOATERS.map(({ Icon, className, delay, duration, size }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-white/20 ${className}`}
          animate={
            inView
              ? {
                  y: [0, -16, 0, 10, 0],
                  x: [0, 6, 0, -5, 0],
                  rotate: [0, 5, 0, -3, 0],
                  opacity: [0.15, 0.35, 0.15],
                }
              : {}
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + i * 0.12,
          }}
        >
          <Icon className={size} strokeWidth={1.25} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)] px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16 text-center overflow-hidden"
        >
          <motion.div
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-44 h-44 rounded-full border border-dashed border-white/10 pointer-events-none"
          />
          <motion.div
            animate={inView ? { rotate: -360 } : {}}
            transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full border border-dashed border-[#F2A93B]/25 pointer-events-none"
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="h-px bg-[#F2A93B] origin-right"
            />
            <span
              className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {eyebrow}
            </span>
            <motion.div
              animate={inView ? { width: ["0%", "2.5rem"] } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="h-px bg-[#F2A93B] origin-left"
            />
          </motion.div>

          {/* Main heading — Playfair Display word stagger */}
          <h1
            className="text-white leading-[1.1] flex flex-wrap justify-center gap-x-3 gap-y-1 mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
              fontWeight: 700,
            }}
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  i === headingWords.length - 1
                    ? "text-[#F2A93B] italic font-normal"
                    : undefined
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.5, type: "spring", stiffness: 200 }}
            className="mt-5 inline-flex items-center gap-2"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "1.5rem" } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="h-px bg-white/30"
            />
            <motion.span
              animate={
                inView
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(242,169,59,0)",
                        "0 0 0 10px rgba(242,169,59,0.12)",
                        "0 0 0 0 rgba(242,169,59,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F2A93B]/20 border border-[#F2A93B]/35 text-[#F2D9A0] font-bold text-lg md:text-xl tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Sparkles className="w-4 h-4 text-[#F2A93B]" />
              {year}
            </motion.span>
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: "1.5rem" } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="h-px bg-white/30"
            />
          </motion.div>

          {/* Wildlife divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mt-8 mb-7"
          >
            <motion.div
              animate={inView ? { x: [-3, 3, -3] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="w-4 h-4 text-[#3F7A4E]/60" />
            </motion.div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-[#F2A93B]/50"
                  animate={inView ? { scale: [1, 1.5, 1], opacity: [0.35, 1, 0.35] } : {}}
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
              animate={inView ? { x: [3, -3, 3], y: [-2, 2, -2] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bird className="w-5 h-5 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedDescriptionParagraph({
  paragraph,
  index,
  inView,
}: {
  paragraph: string;
  index: number;
  inView: boolean;
}) {
  const words = paragraph.split(/\s+/).filter(Boolean);

  return (
    <motion.div
      animate={inView ? { y: [0, -7, 0, 5, 0] } : {}}
      transition={{
        duration: 9 + index * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-white/92 text-base sm:text-[1.125rem] md:text-lg leading-[1.85] md:leading-[1.92]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={`${wordIndex}-${word}`}
            className="inline-block mr-[0.28em]"
            animate={inView ? { scale: [1, 1.05, 1], opacity: [0.88, 1, 0.88] } : {}}
            transition={{
              duration: 3.2 + (wordIndex % 5) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25 + wordIndex * 0.06,
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}

function CmcDescriptionSection({
  paragraphs,
  backgroundImageUrl,
}: {
  paragraphs: string[];
  backgroundImageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!paragraphs.length) return null;

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-6 pb-16 sm:pt-8 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#142318]">
        <img
          src={backgroundImageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[#1a2e1f]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a2e1f]/55" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 bg-gradient-to-b from-transparent to-white pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <div className="space-y-7 md:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <AnimatedDescriptionParagraph
              key={`${index}-${paragraph.slice(0, 24)}`}
              paragraph={paragraph}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CmcPage({ content = CMC_PAGE_FALLBACK }: CmcPageProps) {
  return (
    <main className="bg-white">
      <CmcPageHero
        eyebrow={content.eyebrow}
        mainHeading={content.mainHeading}
        year={content.year}
        heroImageUrl={content.heroImageUrl}
      />

      <CmcDescriptionSection
        paragraphs={content.descriptionParagraphs}
        backgroundImageUrl={content.heroImageUrl}
      />

      {content.levels.map((level, index) => (
        <LevelSection key={level.level} level={level} index={index} />
      ))}

      <section className="page-snap-section py-12 sm:py-16 bg-gradient-to-b from-[#fafaf8] to-[#f4f7f4]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <p className="text-[#5C7A63] text-sm md:text-base italic">
            Serving conservation through education — the YZA Central Management Committee
            leads our mission across all branches and study groups.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
