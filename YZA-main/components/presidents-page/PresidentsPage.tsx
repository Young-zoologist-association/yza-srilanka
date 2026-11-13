"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bird, Crown, Leaf, TreePine } from "lucide-react";
import type { PresidentData } from "@/lib/api/types";
import type { PresidentsPageContent } from "@/lib/presidents-page/resolvePresidentsPageContent";
import { PRESIDENTS_PAGE_FALLBACK } from "@/lib/presidents-page/resolvePresidentsPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface PresidentsPageProps {
  content?: PresidentsPageContent;
}

const HERO_FLOATERS = [
  { Icon: Bird, className: "top-[20%] left-[7%]", delay: 0, duration: 7 },
  { Icon: Leaf, className: "top-[24%] right-[9%]", delay: 1, duration: 6 },
  { Icon: TreePine, className: "bottom-[30%] left-[10%]", delay: 0.5, duration: 8 },
  { Icon: Bird, className: "bottom-[34%] right-[6%]", delay: 1.8, duration: 9 },
] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function PresidentAvatar({
  president,
  size = "sm",
}: {
  president: PresidentData;
  size?: "sm" | "lg";
}) {
  const sizeClass = size === "lg" ? "w-48 h-48 md:w-56 md:h-56" : "w-full aspect-square";

  if (president.image.url) {
    return (
      <div
        className={`relative ${sizeClass} rounded-2xl overflow-hidden shadow-xl shadow-[#3F7A4E]/15 ring-2 ring-white`}
      >
        <img
          src={president.image.url}
          alt={president.image.alt || president.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/30 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-2xl bg-gradient-to-br from-[#3F7A4E] to-[#2D5A3D] flex items-center justify-center shadow-xl shadow-[#3F7A4E]/20 ring-2 ring-white`}
    >
      <span className={`font-bold text-white ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
        {getInitials(president.name)}
      </span>
    </div>
  );
}

function PresidentsHero({ pageTitle }: { pageTitle: string }) {
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
          src={PAGE_HERO_IMAGES.presidents}
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
              Leadership Legacy
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
            Honouring the leaders who have guided the Young Zoologists&apos; Association
            of Sri Lanka through the years.
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

function CurrentPresidentSection({ president }: { president: PresidentData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="page-snap-section relative py-12 md:py-16 bg-gradient-to-b from-white to-[#fafaf8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative rounded-[2rem] border border-[#F2A93B]/25 bg-white shadow-[0_24px_80px_-24px_rgba(242,169,59,0.25)] px-8 py-10 md:px-12 md:py-12 text-center overflow-hidden"
        >
          <motion.div
            animate={inView ? { opacity: [0.3, 0.5, 0.3] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#F2A93B]/10 blur-2xl pointer-events-none"
          />
          <motion.div
            animate={inView ? { opacity: [0.2, 0.4, 0.2] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#3F7A4E]/10 blur-2xl pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2A93B]/15 border border-[#F2A93B]/30 text-[#B87A1A] text-xs font-semibold tracking-[0.2em] uppercase mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Crown className="w-3.5 h-3.5" />
            Current President
          </motion.div>

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.6, type: "spring", stiffness: 180 }}
            >
              <PresidentAvatar president={president} size="lg" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 inline-block px-4 py-1 rounded-full bg-[#3F7A4E]/10 text-[#3F7A4E] font-bold text-sm tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {president.year}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-[#333A33] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 700,
              }}
            >
              {president.name}
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PastPresidentCard({
  president,
  index,
}: {
  president: PresidentData;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative w-full max-w-[200px]">
        <PresidentAvatar president={president} size="sm" />
        <span
          className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-[#F2A93B] text-white text-xs font-bold shadow-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {president.year}
        </span>
      </div>
      <h3
        className="mt-4 text-[#333A33] font-semibold text-sm md:text-base leading-snug px-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {president.name}
      </h3>
    </motion.article>
  );
}

function PastPresidentsSection({ presidents }: { presidents: PresidentData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!presidents.length) return null;

  return (
    <section ref={ref} className="page-snap-section relative py-12 md:py-16 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
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
              Past Presidents
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
            Listed by year, most recent first
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10">
          {presidents.map((president, index) => (
            <PastPresidentCard
              key={`${president.year}-${president.name}-${index}`}
              president={president}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PresidentsPage({ content = PRESIDENTS_PAGE_FALLBACK }: PresidentsPageProps) {
  return (
    <main className="bg-white">
      <PresidentsHero pageTitle={content.pageTitle} />
      {content.currentPresident && (
        <CurrentPresidentSection president={content.currentPresident} />
      )}
      <PastPresidentsSection presidents={content.pastPresidents} />
      <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-[#fafaf8] to-[#f4f7f4]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-4 h-4 text-[#3F7A4E]/40" />
            <Crown className="w-4 h-4 text-[#F2A93B]/50" />
            <Bird className="w-4 h-4 text-[#3F7A4E]/30" />
          </div>
          <p
            className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Each president has carried forward YZA&apos;s mission of conservation
            through education — building on decades of wildlife leadership in Sri Lanka.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
