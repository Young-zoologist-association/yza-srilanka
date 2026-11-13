"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Bird,
  CalendarDays,
  Compass,
  Leaf,
  Megaphone,
  PawPrint,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { EventsSection } from "@/components/home/events/EventsSection";
import type { EventsContent } from "@/lib/home/events/resolveEventsContent";
import { EVENTS_PAGE_SIZE } from "@/lib/pagination";
import type { ProjectSectionData } from "@/lib/api/types";
import type { EventsAndProjectsPageContent } from "@/lib/events-and-projects-page/resolveEventsAndProjectsPageContent";
import { EVENTS_AND_PROJECTS_PAGE_FALLBACK } from "@/lib/events-and-projects-page/resolveEventsAndProjectsPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface EventsAndProjectsPageProps {
  content?: EventsAndProjectsPageContent;
  eventsContent?: EventsContent;
}

const HERO_FLOATERS = [
  { Icon: CalendarDays, className: "top-[18%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Compass, className: "top-[26%] right-[10%]", delay: 1, duration: 6 },
  { Icon: Leaf, className: "bottom-[32%] left-[12%]", delay: 0.5, duration: 8 },
  { Icon: Bird, className: "bottom-[28%] right-[7%]", delay: 1.5, duration: 9 },
] as const;

const SECTION_META: Record<
  string,
  {
    icon: LucideIcon;
    label: string;
    titleColor: string;
    textColor: string;
    accentText: string;
    accentBg: string;
    borderAccent: string;
    iconGradient: string;
    bar: string;
    sectionBg: string;
    panelBg: string;
  }
> = {
  "zoo-based-programs": {
    icon: PawPrint,
    label: "Zoo Programs",
    titleColor: "text-[#1f4d32]",
    textColor: "text-[#3f5246]",
    accentText: "text-[#3F7A4E]",
    accentBg: "bg-[#3F7A4E]/10",
    borderAccent: "border-[#3F7A4E]",
    iconGradient: "from-[#3F7A4E] to-[#2D5A3D]",
    bar: "from-[#3F7A4E] to-[#5C9A6B]",
    sectionBg: "bg-white",
    panelBg: "bg-[#3F7A4E]/[0.04]",
  },
  "field-based-projects": {
    icon: Compass,
    label: "Field Work",
    titleColor: "text-[#1a4f47]",
    textColor: "text-[#3a4f49]",
    accentText: "text-[#2A7B6F]",
    accentBg: "bg-[#2A7B6F]/10",
    borderAccent: "border-[#2A7B6F]",
    iconGradient: "from-[#2A7B6F] to-[#1a5c52]",
    bar: "from-[#2A7B6F] to-[#4A9A8C]",
    sectionBg: "bg-[#f2f8f6]",
    panelBg: "bg-[#2A7B6F]/[0.05]",
  },
  "event-programs": {
    icon: Sparkles,
    label: "Events",
    titleColor: "text-[#7a4f0f]",
    textColor: "text-[#5c4a36]",
    accentText: "text-[#b87a1a]",
    accentBg: "bg-[#F2A93B]/15",
    borderAccent: "border-[#F2A93B]",
    iconGradient: "from-[#F2A93B] to-[#d4881f]",
    bar: "from-[#F2A93B] to-[#e8b84a]",
    sectionBg: "bg-[#fffaf2]",
    panelBg: "bg-[#F2A93B]/[0.06]",
  },
  "awareness-programs": {
    icon: Megaphone,
    label: "Awareness",
    titleColor: "text-[#3d5248]",
    textColor: "text-[#4a5c52]",
    accentText: "text-[#5C7A63]",
    accentBg: "bg-[#5C7A63]/12",
    borderAccent: "border-[#5C7A63]",
    iconGradient: "from-[#5C7A63] to-[#3F7A4E]",
    bar: "from-[#5C7A63] to-[#7A9A82]",
    sectionBg: "bg-[#f6f8f6]",
    panelBg: "bg-[#5C7A63]/[0.05]",
  },
};

function splitDescriptionParagraphs(description: string): string[] {
  const normalized = description.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const blocks = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (blocks.length > 1) return blocks;

  return normalized
    .split(/\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function PageHero({ pageTitle, subtitle }: { pageTitle: string; subtitle: string }) {
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
          src={PAGE_HERO_IMAGES.eventsAndProjects}
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
              className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold inline-flex items-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <CalendarDays className="w-3.5 h-3.5" />
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

function ProjectArticleParagraphs({
  paragraphs,
  meta,
  inView,
}: {
  paragraphs: string[];
  meta: (typeof SECTION_META)[string];
  inView: boolean;
}) {
  if (!paragraphs.length) return null;

  return (
    <div className="space-y-3 md:space-y-3.5">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={`${index}-${paragraph.slice(0, 24)}`}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 + index * 0.04, duration: 0.45 }}
          className={`text-[0.8125rem] md:text-sm leading-[1.72] md:leading-[1.78] ${meta.textColor} ${
            index === 0 ? "font-medium" : ""
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}

function ProjectSectionBlock({
  section,
  index,
}: {
  section: ProjectSectionData;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const meta = SECTION_META[section.id] ?? SECTION_META["zoo-based-programs"];
  const Icon = meta.icon;
  const paragraphs = splitDescriptionParagraphs(section.description);
  const reverse = index % 2 === 1;

  return (
    <section
      id={section.id}
      ref={ref}
      className={`relative overflow-hidden py-8 md:py-10 ${meta.sectionBg}`}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 w-1.5 ${meta.borderAccent.replace("border-", "bg-")} ${
          reverse ? "right-0" : "left-0"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute top-0 h-32 w-32 rounded-full blur-3xl opacity-70 ${meta.panelBg} ${
          reverse ? "-left-10" : "-right-10"
        }`}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10"
      >
        <div
          className={`grid items-start gap-6 md:gap-8 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-x-12 ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          <header className={`lg:[direction:ltr] ${reverse ? "lg:pt-2" : "lg:sticky lg:top-24"}`}>
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.iconGradient} shadow-md shadow-black/10`}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <span
                  className={`mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${meta.accentBg} ${meta.accentText}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {meta.label}
                </span>
                <h3
                  className={`leading-snug ${meta.titleColor}`}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)",
                    fontWeight: 700,
                  }}
                >
                  {section.title}
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className={`mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r ${meta.bar} origin-left`}
                />
              </div>
            </div>
          </header>

          <div className={`lg:[direction:ltr] ${reverse ? "lg:pr-2" : "lg:pl-2"}`}>
            <div className={`rounded-2xl border ${meta.borderAccent}/20 ${meta.panelBg} p-5 sm:p-6 md:p-7`}>
              <ProjectArticleParagraphs paragraphs={paragraphs} meta={meta} inView={inView} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="border-b border-[#e8efe9] bg-white py-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 text-left"
      >
        <span
          className="text-[#3F7A4E] text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          What We Do
        </span>
        <h2
          className="mt-2 max-w-2xl text-[#1a2e1f]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
            fontWeight: 700,
          }}
        >
          Our Programs & Projects
        </h2>
        <p
          className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6b7769]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          From zoo sessions to field conservation, events, and public outreach — each program plays
          its own role in YZA&apos;s mission.
        </p>
      </motion.div>
    </div>
  );
}

function ProjectsSection({ sections }: { sections: ProjectSectionData[] }) {
  if (!sections.length) return null;

  return (
    <div id="projects" className="page-snap-section relative overflow-hidden">
      <ProjectsIntro />
      {sections.map((section, index) => (
        <ProjectSectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

export function EventsAndProjectsPage({
  content = EVENTS_AND_PROJECTS_PAGE_FALLBACK,
  eventsContent,
}: EventsAndProjectsPageProps) {
  return (
    <main className="bg-white">
      <PageHero pageTitle={content.pageTitle} subtitle={content.subtitle} />

      {eventsContent ? (
        <EventsSection
          content={eventsContent}
          cardsPageSize={EVENTS_PAGE_SIZE}
          detailsBehavior="dialog"
          focusHashOnMount
          hideViewAllLink
          sectionId="events"
        />
      ) : null}

      <ProjectsSection sections={content.projectSections} />
    </main>
  );
}
