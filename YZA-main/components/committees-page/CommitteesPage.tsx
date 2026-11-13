"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Bird,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Leaf,
  Megaphone,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import type { CommitteeData } from "@/lib/api/types";
import type { CommitteesPageContent } from "@/lib/committees-page/resolveCommitteesPageContent";
import { COMMITTEES_PAGE_FALLBACK } from "@/lib/committees-page/resolveCommitteesPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface CommitteesPageProps {
  content?: CommitteesPageContent;
}

const COMMITTEE_ICONS: Record<string, LucideIcon> = {
  Education: GraduationCap,
  "Public Relations": Megaphone,
  Publications: BookOpen,
  Research: FlaskConical,
  Environmental: Leaf,
};

const COMMITTEE_ACCENTS = [
  { gradient: "from-[#3F7A4E] to-[#2D5A3D]", light: "bg-[#3F7A4E]/8", border: "border-[#3F7A4E]/15" },
  { gradient: "from-[#4A8F5C] to-[#3F7A4E]", light: "bg-[#4A8F5C]/8", border: "border-[#4A8F5C]/15" },
  { gradient: "from-[#5C7A3A] to-[#3F7A4E]", light: "bg-[#5C7A3A]/8", border: "border-[#5C7A3A]/15" },
  { gradient: "from-[#2D5A3D] to-[#1a2e1f]", light: "bg-[#2D5A3D]/8", border: "border-[#2D5A3D]/15" },
  { gradient: "from-[#F2A93B] to-[#3F7A4E]", light: "bg-[#F2A93B]/8", border: "border-[#F2A93B]/20" },
] as const;

const HERO_FLOATERS = [
  { Icon: Bird, className: "top-[20%] left-[7%]", delay: 0, duration: 7 },
  { Icon: Leaf, className: "top-[25%] right-[9%]", delay: 1, duration: 6 },
  { Icon: TreePine, className: "bottom-[30%] left-[11%]", delay: 0.5, duration: 8 },
  { Icon: Bird, className: "bottom-[35%] right-[6%]", delay: 1.8, duration: 9 },
] as const;

function getCommitteeIcon(title: string): LucideIcon {
  const key = Object.keys(COMMITTEE_ICONS).find((k) => title.includes(k));
  return key ? COMMITTEE_ICONS[key] : Leaf;
}

function CommitteesHero({ pageTitle }: { pageTitle: string }) {
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
          src={PAGE_HERO_IMAGES.committees}
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
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-16 -right-16 w-36 h-36 rounded-full border border-dashed border-white/10 pointer-events-none"
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
              className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              YZA Sri Lanka
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
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
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
            Five dedicated committees driving education, outreach, publications, research,
            and environmental action across the association.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <motion.div animate={inView ? { x: [-3, 3, -3] } : {}} transition={{ duration: 4, repeat: Infinity }}>
              <Leaf className="w-4 h-4 text-[#3F7A4E]/50" />
            </motion.div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-[#F2A93B]/50"
                  animate={inView ? { scale: [1, 1.4, 1], opacity: [0.35, 1, 0.35] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: dot * 0.3 }}
                />
              ))}
            </div>
            <motion.div animate={inView ? { x: [3, -3, 3] } : {}} transition={{ duration: 5, repeat: Infinity }}>
              <Bird className="w-5 h-5 text-white/45" />
            </motion.div>
          </motion.div>
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

function CommitteeCard({
  committee,
  index,
}: {
  committee: CommitteeData;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isReversed = index % 2 === 1;
  const accent = COMMITTEE_ACCENTS[index % COMMITTEE_ACCENTS.length];
  const Icon = getCommitteeIcon(committee.title);

  return (
    <section
      ref={ref}
      className={`page-snap-section relative py-12 sm:py-16 md:py-24 ${index % 2 === 0 ? "bg-white" : "bg-[#fafaf8]"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            isReversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`relative lg:[direction:ltr] ${isReversed ? "lg:order-1" : ""}`}
          >
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-[#3F7A4E]/15 ring-1 ${accent.border}`}
            >
              {committee.image.url ? (
                <img
                  src={committee.image.url}
                  alt={committee.image.alt || committee.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              ) : (
                <div
                  className={`w-full aspect-[4/3] bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-20 h-20 text-white/30" strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/40 via-transparent to-transparent" />
              <motion.div
                animate={inView ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
            <motion.div
              animate={inView ? { rotate: 360 } : {}}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-dashed border-[#3F7A4E]/15 pointer-events-none hidden md:block"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`lg:[direction:ltr] space-y-5 ${isReversed ? "lg:order-2" : ""}`}
          >
            <span
              className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Committee
            </span>

            <h2
              className="text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 700,
              }}
            >
              {committee.title}
            </h2>

            <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${accent.gradient}`} />

            <p
              className="text-[#5C7A63] leading-relaxed text-sm md:text-base"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {committee.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function CommitteesPage({ content = COMMITTEES_PAGE_FALLBACK }: CommitteesPageProps) {
  return (
    <main className="bg-white">
      <CommitteesHero pageTitle={content.pageTitle} />

      {content.committees.map((committee, index) => (
        <CommitteeCard key={`${committee.title}-${index}`} committee={committee} index={index} />
      ))}

      <section className="page-snap-section py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#fafaf8] to-[#f4f7f4]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-4 h-4 text-[#3F7A4E]/40" />
            <TreePine className="w-5 h-5 text-[#3F7A4E]/30" />
            <Bird className="w-4 h-4 text-[#F2A93B]/50" />
          </div>
          <p
            className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Together, these committees form the backbone of YZA&apos;s mission —
            conservation through education, research, and community action.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
