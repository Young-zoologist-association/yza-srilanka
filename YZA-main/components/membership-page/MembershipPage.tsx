"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CircleDollarSign, MapPin, Star } from "lucide-react";
import type {
  MainBranchNoticeContent,
  MembershipCategory,
  MembershipPageContent,
} from "@/lib/membership-page/membershipPageContent";
import { MEMBERSHIP_PAGE_CONTENT } from "@/lib/membership-page/membershipPageContent";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";
import { ActiveMembersSection } from "@/components/membership-page/ActiveMembersSection";

interface MembershipPageProps {
  content?: MembershipPageContent;
}

const CATEGORY_ACCENTS = [
  { bar: "from-[#3F7A4E] to-[#5C9A6E]", badge: "bg-[#3F7A4E]/10 text-[#3F7A4E]", fee: "from-[#3F7A4E]/10 to-[#3F7A4E]/5 border-[#3F7A4E]/20 text-[#2a4a35]" },
  { bar: "from-[#2D6A4F] to-[#40916C]", badge: "bg-[#2D6A4F]/10 text-[#2D6A4F]", fee: "from-[#2D6A4F]/10 to-[#2D6A4F]/5 border-[#2D6A4F]/20 text-[#234a38]" },
  { bar: "from-[#F2A93B] to-[#e09530]", badge: "bg-[#F2A93B]/15 text-[#b87a1a]", fee: "from-[#F2A93B]/12 to-[#F2A93B]/5 border-[#F2A93B]/25 text-[#7a5510]" },
  { bar: "from-[#5C7A63] to-[#3F7A4E]", badge: "bg-[#5C7A63]/12 text-[#5C7A63]", fee: "from-[#5C7A63]/10 to-[#5C7A63]/5 border-[#5C7A63]/20 text-[#3d5244]" },
] as const;

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

function MembershipHero({
  pageTitle,
  subtitle,
}: Pick<MembershipPageContent, "pageTitle" | "subtitle">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = pageTitle.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="page-snap-section relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#1a2e1f]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #3F7A4E 0%, transparent 45%), radial-gradient(circle at 80% 70%, #F2A93B 0%, transparent 40%)",
          }}
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
              Join YZA
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
        <path
          d="M0,48 C360,24 720,64 1080,36 C1260,22 1380,52 1440,44 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

function MainBranchNoticeSection({ notice }: { notice: MainBranchNoticeContent }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="page-snap-section pt-10 pb-2 md:pt-14 md:pb-4 bg-[#f4f7f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl md:rounded-[1.75rem] border-2 border-[#F2A93B]/55 bg-gradient-to-br from-[#F2A93B]/14 via-white to-[#3F7A4E]/10 shadow-[0_20px_50px_-20px_rgba(242,169,59,0.45)] ring-1 ring-[#3F7A4E]/10"
        >
          <div
            className="absolute top-0 right-0 w-40 h-40 md:w-52 md:h-52 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(circle, #F2A93B 0%, transparent 70%)" }}
            aria-hidden
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #3F7A4E 0%, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative p-6 md:p-8 lg:p-9">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 md:gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#d4911f] flex items-center justify-center text-white shadow-lg shadow-[#F2A93B]/35"
              >
                <MapPin className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.75} />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A93B] text-[#1a2e1f] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-md shadow-[#F2A93B]/25"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Star className="w-3 h-3 fill-current" aria-hidden />
                    {notice.eyebrow}
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full border border-[#3F7A4E]/25 bg-[#3F7A4E]/8 text-[#3F7A4E] text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Main branch
                  </span>
                </div>

                <h2
                  className="text-[#333A33] leading-snug mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.35rem, 3.2vw, 1.85rem)",
                    fontWeight: 700,
                  }}
                >
                  {notice.title}
                </h2>

                <p
                  className="text-[#4a5548] text-sm md:text-base leading-relaxed [text-wrap:pretty]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {notice.message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
  inView,
}: {
  category: MembershipCategory;
  index: number;
  inView: boolean;
}) {
  const accent = CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length];
  const numberLabel = String(index + 1).padStart(2, "0");
  const paragraphs = splitDescriptionParagraphs(category.description);
  const fee = category.fee.trim();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-[#3F7A4E]/8 ring-1 ring-[#3F7A4E]/10 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#3F7A4E]/12 group-hover:ring-[#3F7A4E]/18">
        <div className={`h-1.5 bg-gradient-to-r ${accent.bar}`} />

        <div className="flex flex-1 flex-col p-6 md:p-7 lg:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${accent.badge}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Membership Category
              </span>
              <h3
                className="mt-3 text-[#333A33] text-xl md:text-[1.35rem] font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category.name}
              </h3>
            </div>
            <span
              className="shrink-0 text-[#3F7A4E]/12 text-3xl md:text-4xl font-bold leading-none select-none transition-colors duration-300 group-hover:text-[#3F7A4E]/22"
              style={{ fontFamily: "'Playfair Display', serif" }}
              aria-hidden
            >
              {numberLabel}
            </span>
          </div>

          <div className="flex-1 space-y-3.5 md:space-y-4">
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={`${paragraphIndex}-${paragraph.slice(0, 24)}`}
                className="text-[#4a5548] text-sm md:text-[0.98rem] leading-[1.82] md:leading-[1.88]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {fee ? (
            <div
              className={`mt-6 md:mt-7 flex items-start gap-3 rounded-xl border bg-gradient-to-r px-4 py-3.5 md:px-5 md:py-4 ${accent.fee}`}
            >
              <CircleDollarSign
                className="mt-0.5 h-4 w-4 shrink-0 opacity-70"
                strokeWidth={2}
                aria-hidden
              />
              <p
                className="text-sm md:text-[0.9375rem] font-semibold leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {fee}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function CategoriesSection({
  categoriesTitle,
  categoriesIntro,
  categories,
}: Pick<MembershipPageContent, "categoriesTitle" | "categoriesIntro" | "categories">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-gradient-to-b from-white via-[#f8fbf8] to-[#f4f7f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <h2
            className="text-[#333A33] leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            {categoriesTitle}
          </h2>
          {categoriesIntro ? (
            <p
              className="mt-4 text-[#5C7A63] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {categoriesIntro}
            </p>
          ) : null}
        </motion.div>

        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MembershipPage({ content = MEMBERSHIP_PAGE_CONTENT }: MembershipPageProps) {
  return (
    <main className="bg-[#f4f7f4]">
      <MembershipHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <MainBranchNoticeSection notice={content.mainBranchNotice} />
      <CategoriesSection
        categoriesTitle={content.categoriesTitle}
        categoriesIntro={content.categoriesIntro}
        categories={content.categories}
      />
      {content.activeMembers ? (
        <ActiveMembersSection section={content.activeMembers} />
      ) : null}
    </main>
  );
}
