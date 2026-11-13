"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Award,
  Handshake,
  HandHeart,
  Leaf,
  Mail,
  Sparkles,
  Star,
  TreePine,
} from "lucide-react";
import type {
  CollaborativeSectionData,
  SponsorshipSectionData,
} from "@/lib/api/types";
import type { SponsorshipPageContent } from "@/lib/sponsorship-page/resolveSponsorshipPageContent";
import { SPONSORSHIP_PAGE_FALLBACK } from "@/lib/sponsorship-page/resolveSponsorshipPageContent";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface SponsorshipPageProps {
  content?: SponsorshipPageContent;
}

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-md shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)] px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.28em] uppercase font-semibold inline-flex items-center gap-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Handshake className="w-3.5 h-3.5" />
            {subtitle}
          </span>
          <h1
            className="mt-6 text-white flex flex-wrap justify-center gap-x-3 gap-y-1 leading-[1.1]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
              fontWeight: 700,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className={i === words.length - 1 ? "text-[#F2A93B] italic font-normal" : undefined}
              >
                {word}
              </motion.span>
            ))}
          </h1>
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

function PartnerCalloutSection({
  callout,
}: {
  callout: SponsorshipPageContent["partnerCallout"];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="page-snap-section py-10 md:py-14 bg-[#f4f7f4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl md:rounded-[1.75rem] border-2 border-[#F2A93B]/50 bg-gradient-to-br from-[#F2A93B]/12 via-white to-[#3F7A4E]/10 shadow-[0_24px_60px_-24px_rgba(242,169,59,0.4)] ring-1 ring-[#3F7A4E]/10"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2A93B]/20 blur-3xl pointer-events-none" aria-hidden />
          <div className="relative p-6 md:p-9 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#d4911f] flex items-center justify-center text-white shadow-lg">
              <HandHeart className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A93B] text-[#1a2e1f] text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Sparkles className="w-3 h-3" />
                {callout.eyebrow}
              </span>
              <h2
                className="mt-3 text-[#333A33] leading-snug"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.35rem, 3vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                {callout.title}
              </h2>
              <p
                className="mt-3 text-[#4a5548] text-sm md:text-base leading-relaxed [text-wrap:pretty]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {callout.message}
              </p>
            </div>
            <a
              href={callout.contactHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#3F7A4E] hover:bg-[#2d5a38] text-white font-semibold px-6 py-3 text-sm shadow-lg shadow-[#3F7A4E]/25 transition-all hover:-translate-y-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Mail className="w-4 h-4" />
              {callout.contactLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getSponsorInitials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function SponsorCard({ name, index, inView }: { name: string; index: number; inView: boolean }) {
  const initials = getSponsorInitials(name);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.25 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full w-full list-none"
    >
      <div className="relative flex h-full w-full flex-col rounded-2xl p-[1px] bg-gradient-to-br from-[#F2A93B]/70 via-white/30 to-[#3F7A4E]/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
        <div className="relative flex h-full min-h-[15.5rem] flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-gradient-to-br from-white/[0.14] via-white/[0.08] to-[#3F7A4E]/10 px-5 py-6 backdrop-blur-md">
          <div className="relative flex flex-1 flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#3F7A4E] shadow-lg">
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {initials}
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2D9A0]">
              <Award className="h-3 w-3" />
              Sponsor
            </span>
            <p
              className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function SponsorshipSection({ sponsorship }: { sponsorship: SponsorshipSectionData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const paragraphs = splitDescriptionParagraphs(sponsorship.description);
  const sponsorNames = sponsorship.sponsorNames ?? [];

  return (
    <section id="sponsorships" ref={ref} className="page-snap-section relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#142318]">
        <img
          src={PAGE_HERO_IMAGES.eventsAndProjects}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#1a2e1f]/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3F7A4E]/30 via-transparent to-[#F2A93B]/15" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="rounded-[2rem] p-[1px] bg-gradient-to-br from-[#F2A93B]/50 via-white/20 to-[#3F7A4E]/50 shadow-2xl"
        >
          <div className="rounded-[calc(2rem-1px)] bg-white/[0.07] backdrop-blur-md border border-white/10 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#3F7A4E] flex items-center justify-center">
                <Handshake className="w-7 h-7 text-white" />
              </div>
              <h2
                className="text-white leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.35rem, 2.8vw, 1.875rem)",
                  fontWeight: 700,
                }}
              >
                {sponsorship.title}
              </h2>
            </div>

            <div className="space-y-3">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-[0.9375rem] leading-relaxed text-white/88"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {sponsorNames.length > 0 ? (
              <div className="relative mt-12 pt-10 border-t border-white/10">
                <p
                  className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#F2D9A0] mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Proud Sponsors
                </p>
                <h3
                  className="text-center text-white mb-8"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2.8vw, 1.75rem)", fontWeight: 700 }}
                >
                  Partners Who Power Our Mission
                </h3>
                <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto">
                  {sponsorNames.map((name, index) => (
                    <SponsorCard key={`${name}-${index}`} name={name} index={index} inView={inView} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CollaborativeSection({ collaborative }: { collaborative: CollaborativeSectionData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const paragraphs = splitDescriptionParagraphs(collaborative.description);

  return (
    <section
      id="partnerships"
      ref={ref}
      className="page-snap-section relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-[#f4f7f4] via-[#fafaf8] to-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="relative max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div className="rounded-[2rem] p-[1px] bg-gradient-to-br from-[#3F7A4E]/35 via-[#F2A93B]/25 to-[#3F7A4E]/35 shadow-2xl shadow-[#3F7A4E]/10">
          <div className="rounded-[calc(2rem-1px)] bg-white px-6 py-9 sm:px-10 sm:py-11 md:px-12 md:py-14">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#3F7A4E]/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-[#3F7A4E]" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/15 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-[#F2A93B]" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#3F7A4E]/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#3F7A4E]" />
                </div>
              </div>
              <h2
                className="text-[#333A33] leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                  fontWeight: 700,
                }}
              >
                {collaborative.title}
              </h2>
              <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E]" />
            </div>

            <div className="space-y-4 text-center">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-relaxed ${index === 0 ? "text-[#2a3d2f] text-base md:text-lg" : "text-[#5C7A63] text-sm md:text-[1.0625rem]"}`}
                  style={{
                    fontFamily: index === 0 ? "'Playfair Display', serif" : "'DM Sans', sans-serif",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function SponsorshipPage({ content = SPONSORSHIP_PAGE_FALLBACK }: SponsorshipPageProps) {
  return (
    <main className="bg-[#f4f7f4]">
      <PageHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <PartnerCalloutSection callout={content.partnerCallout} />
      {content.sponsorship ? <SponsorshipSection sponsorship={content.sponsorship} /> : null}
      {content.collaborative ? <CollaborativeSection collaborative={content.collaborative} /> : null}
    </main>
  );
}
