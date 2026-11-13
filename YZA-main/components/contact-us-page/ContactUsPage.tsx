"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import type { ContactUsPageContent } from "@/lib/contact-us-page/resolveContactUsPageContent";
import { CONTACT_US_PAGE_FALLBACK } from "@/lib/contact-us-page/resolveContactUsPageContent";
import { ContactForm } from "@/components/ContactForm";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { PAGE_HERO_OVERLAY } from "@/lib/constants/page-hero-overlay";

interface ContactUsPageProps {
  content?: ContactUsPageContent;
}

const DM_SANS = { fontFamily: "'DM Sans', sans-serif" } as const;
const PLAYFAIR = { fontFamily: "'Playfair Display', serif" } as const;

const HERO_FLOATERS = [
  { Icon: Mail, className: "top-[18%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Phone, className: "top-[24%] right-[9%]", delay: 0.7, duration: 6.5 },
  { Icon: MapPin, className: "bottom-[30%] left-[10%]", delay: 0.3, duration: 8 },
  { Icon: MessageCircle, className: "bottom-[26%] right-[7%]", delay: 1.1, duration: 9 },
] as const;

function getSocialIcon(iconKey: string, label: string) {
  const key = `${iconKey} ${label}`.toLowerCase();

  if (key.includes("facebook")) return Facebook;
  if (key.includes("instagram")) return Instagram;
  if (key.includes("linkedin")) return Linkedin;
  if (key.includes("twitter") || key.includes("x.com") || key === "x") return Twitter;
  return MessageCircle;
}

function ContactHero({ pageTitle, subtitle }: Pick<ContactUsPageContent, "pageTitle" | "subtitle">) {
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
          src={PAGE_HERO_IMAGES.contact}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${PAGE_HERO_OVERLAY.image}`}
        />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientVertical}`} />
        <div className={`absolute inset-0 ${PAGE_HERO_OVERLAY.gradientAccentWarm}`} />
      </div>

      {HERO_FLOATERS.map(({ Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden md:flex text-white/20 ${className}`}
          animate={
            inView
              ? { y: [0, -12, 0, 8, 0], opacity: [0.15, 0.3, 0.15] }
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
            className="inline-flex items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-4 py-1.5 mb-6"
          >
            <Mail className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span
              className="text-[#F2A93B] text-xs tracking-[0.22em] uppercase font-semibold"
              style={DM_SANS}
            >
              Get in Touch
            </span>
          </motion.div>

          <h1
            className="text-white flex flex-wrap justify-center gap-x-3 gap-y-1 leading-[1.1]"
            style={{
              ...PLAYFAIR,
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              fontWeight: 700,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.25 + i * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  i >= words.length - 2 ? "text-[#F2A93B] italic font-normal" : undefined
                }
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
            style={DM_SANS}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 text-[#fafaf8] pointer-events-none"
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

function ContactCard({
  icon: Icon,
  title,
  children,
  href,
  delay,
  inView,
}: {
  icon: typeof Mail;
  title: string;
  children: ReactNode;
  href?: string;
  delay: number;
  inView: boolean;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative h-full rounded-[1.5rem] bg-white p-6 sm:p-7 shadow-lg shadow-[#3F7A4E]/8 ring-1 ring-[#3F7A4E]/10 transition-shadow hover:shadow-xl hover:shadow-[#3F7A4E]/12 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F7A4E] via-[#F2A93B] to-[#3F7A4E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3F7A4E]/10 text-[#3F7A4E] mb-5 group-hover:bg-[#3F7A4E] group-hover:text-white transition-colors duration-300">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <h3
        className="text-[#1a2e1f] text-lg font-bold mb-2"
        style={PLAYFAIR}
      >
        {title}
      </h3>
      <div className="text-[#5C7A63] text-sm leading-relaxed" style={DM_SANS}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

function ContactDetailsSection({
  contactTitle,
  address,
  email,
  phone,
}: Pick<ContactUsPageContent, "contactTitle" | "address" | "email" | "phone">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const hasContactInfo = Boolean(address || email || phone);
  if (!hasContactInfo) return null;

  const phoneHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;
  const emailHref = email ? `mailto:${email}` : undefined;

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#fafaf8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span
            className="text-[#3F7A4E] text-xs tracking-[0.25em] uppercase font-semibold"
            style={DM_SANS}
          >
            Reach Out
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              ...PLAYFAIR,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            {contactTitle || "How to Reach Us"}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {address ? (
            <ContactCard icon={MapPin} title="Visit Us" delay={0.1} inView={inView}>
              {address}
            </ContactCard>
          ) : null}

          {email ? (
            <ContactCard
              icon={Mail}
              title="Email Us"
              href={emailHref}
              delay={0.2}
              inView={inView}
            >
              <span className="text-[#3F7A4E] font-medium group-hover:underline">{email}</span>
            </ContactCard>
          ) : null}

          {phone ? (
            <ContactCard
              icon={Phone}
              title="Call Us"
              href={phoneHref}
              delay={0.3}
              inView={inView}
            >
              <span className="text-[#3F7A4E] font-medium group-hover:underline">{phone}</span>
            </ContactCard>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SocialLinksSection({
  socialLinks,
}: Pick<ContactUsPageContent, "socialLinks">) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!socialLinks.length) return null;

  return (
    <section ref={ref} className="page-snap-section py-14 md:py-20 bg-[#f4f7f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span
            className="text-[#F2A93B] text-xs tracking-[0.25em] uppercase font-semibold"
            style={DM_SANS}
          >
            Follow YZA
          </span>
          <h2
            className="mt-3 text-[#1a2e1f] leading-tight"
            style={{
              ...PLAYFAIR,
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontWeight: 700,
            }}
          >
            Connect on Social Media
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link, index) => {
            const Icon = getSocialIcon(link.iconKey, link.label);

            return (
              <motion.a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="inline-flex items-center gap-3 rounded-full border border-[#3F7A4E]/20 bg-white px-5 py-3 text-sm font-semibold text-[#1a2e1f] shadow-md shadow-[#3F7A4E]/8 transition-colors hover:border-[#3F7A4E]/40 hover:bg-[#3F7A4E]/5"
                style={DM_SANS}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3F7A4E]/10 text-[#3F7A4E]">
                  <Icon className="w-4 h-4" />
                </span>
                {link.label}
                <ArrowUpRight className="w-4 h-4 text-[#3F7A4E]/50" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="page-snap-section py-12 sm:py-14 bg-gradient-to-b from-white to-[#fafaf8]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="w-4 h-4 text-[#3F7A4E]/40" />
          <MessageCircle className="w-4 h-4 text-[#F2A93B]/50" />
          <Phone className="w-4 h-4 text-[#3F7A4E]/30" />
        </div>
        <p
          className="text-[#5C7A63] text-sm md:text-base italic leading-relaxed"
          style={DM_SANS}
        >
          Whether you have questions about membership, events, or conservation work — our team
          is ready to help you connect with the YZA community.
        </p>
      </motion.div>
    </section>
  );
}

export function ContactUsPage({ content = CONTACT_US_PAGE_FALLBACK }: ContactUsPageProps) {
  return (
    <main className="bg-white">
      <ContactHero pageTitle={content.pageTitle} subtitle={content.subtitle} />
      <ContactDetailsSection
        contactTitle={content.contactTitle}
        address={content.address}
        email={content.email}
        phone={content.phone}
      />
      <ContactForm />
      <SocialLinksSection socialLinks={content.socialLinks} />
      <ClosingSection />
    </main>
  );
}
