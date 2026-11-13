"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Binoculars,
  History,
  Layers,
  Leaf,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AboutContent, AboutStatContent } from "@/lib/home/about/resolveAboutContent";
import { ABOUT_FALLBACK } from "@/lib/home/about/resolveAboutContent";

const STAT_ICONS: Record<string, LucideIcon> = {
  History,
  Users,
  Binoculars,
  Layers,
  Leaf,
};

const DEFAULT_STAT_ICON_KEYS = ["History", "Users", "Binoculars", "Layers"] as const;

function getStatIcon(iconKey: string, index: number): LucideIcon {
  if (STAT_ICONS[iconKey]) return STAT_ICONS[iconKey];
  return STAT_ICONS[DEFAULT_STAT_ICON_KEYS[index % DEFAULT_STAT_ICON_KEYS.length]] ?? History;
}

interface AboutSectionProps {
  content?: AboutContent;
}

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: AboutStatContent;
  index: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const target = stat.value;
    const duration = 1800;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, stat.value]);

  const Icon = getStatIcon(stat.iconKey, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-[#3F7A4E]/10 hover:border-[#3F7A4E]/30 shadow-sm hover:shadow-lg hover:shadow-[#3F7A4E]/10 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#3F7A4E]/10 flex items-center justify-center group-hover:bg-[#3F7A4E] transition-colors duration-300">
          <Icon className="w-5 h-5 text-[#3F7A4E] group-hover:text-white transition-colors duration-300" />
        </div>
        <div>
          <div
            className="text-3xl font-bold text-[#3F7A4E] leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {count.toLocaleString()}
            {stat.suffix}
          </div>
          <div
            className="text-[#6b7769] text-sm mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection({ content = ABOUT_FALLBACK }: AboutSectionProps) {
  const {
    eyebrow,
    titleLine1,
    titleLine2,
    paragraphs,
    image,
    badgeTitle,
    badgeSubtitle,
    stats,
  } = content;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="page-snap-section py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-[#F2A93B]" />
              <span
                className="text-[#F2A93B] text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#333A33] mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
              }}
            >
              {titleLine1}
              <br />
              <span className="text-[#3F7A4E]">{titleLine2}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="text-[#6b7769] leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
                >
                  {text}
                </p>
              ))}
            </motion.div>

            <motion.a
              href="/about"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="group inline-flex items-center gap-2 text-[#3F7A4E] font-semibold hover:text-[#F2A93B] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Read More About YZA
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Right — image + stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative mb-8 pb-6 sm:pb-0"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-[#3F7A4E]/20">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3F7A4E]/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute left-3 bottom-0 sm:-bottom-5 sm:-left-5 bg-[#F2A93B] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-xl shadow-[#F2A93B]/30 max-w-[calc(100%-1.5rem)]"
              >
                <div
                  className="text-2xl font-bold text-[#333A33] leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {badgeTitle}
                </div>
                <div
                  className="text-[#333A33]/70 text-xs mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {badgeSubtitle}
                </div>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {stats.map((stat, i) => (
                <StatCard key={`${stat.label}-${i}`} stat={stat} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
