"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import type {
  StudyGroupCardContent,
  StudyGroupsContent,
} from "@/lib/home/study-groups/resolveStudyGroupsContent";
import { STUDY_GROUPS_FALLBACK } from "@/lib/home/study-groups/resolveStudyGroupsContent";

interface StudyGroupsProps {
  content?: StudyGroupsContent;
}

const HOVER_DESCRIPTION_WORD_LIMIT = 20;

function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function GroupCard({
  group,
  index,
  inView,
}: {
  group: StudyGroupCardContent;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{ background: "#1a1a1a" }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={group.image}
          alt={`${group.name} study group`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: group.accentColor }}
        />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-white/80 text-[10px] tracking-widest uppercase bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {group.tag}
          </span>
        </div>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 group-hover:-translate-y-12 transition-transform duration-400 [@media(hover:none)]:hidden">
          <h3
            className="text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 4vw, 1.6rem)", fontWeight: 700 }}
          >
            {group.name}
          </h3>
        </div>
      </div>

      {/* Hover description panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:none)]:!relative [@media(hover:none)]:!translate-y-0">
        <h3
          className="text-[#333A33] mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700 }}
        >
          {group.name}
        </h3>
        <p
          className="text-[#6b7769] text-sm leading-relaxed mb-3 line-clamp-4 h-[5.75rem] overflow-hidden"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {truncateWords(group.description, HOVER_DESCRIPTION_WORD_LIMIT)}
        </p>
        <a
          href={`/study-groups#${group.slug}`}
          className="inline-flex items-center gap-1.5 text-[#3F7A4E] hover:text-[#F2A93B] text-sm font-semibold transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export function StudyGroups({ content = STUDY_GROUPS_FALLBACK }: StudyGroupsProps) {
  const { eyebrow, titlePlain, titleHighlight, description, cards } = content;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="study-groups" className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-[#F2A93B]" />
            <span
              className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {eyebrow}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#333A33] leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            {titlePlain} <span className="text-[#3F7A4E]">{titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-[#6b7769] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {description}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cards.map((group, i) => (
            <GroupCard key={group.id} group={group} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="/study-groups"
            className="inline-flex items-center justify-center gap-2 bg-[#3F7A4E] hover:bg-[#2d5a38] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#3F7A4E]/25 hover:shadow-[#3F7A4E]/40 hover:scale-105 max-w-full text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Explore All Study Groups <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
