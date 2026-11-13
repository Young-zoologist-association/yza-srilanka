"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import { YzaLogo } from "@/components/shared/YzaLogo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Study Groups", href: "/study-groups" },
  { label: "Events & Projects", href: "/events-and-projects" },
  { label: "Store", href: "/store" },
  { label: "Membership", href: "/membership" },
  { label: "About Us", href: "/about" },
];

const resources = [
  { label: "Articles", href: "/articles" },
  { label: "Leaflets", href: "/leaflets" },
  { label: "Booklets", href: "/booklets" },
  { label: "Abstract Books", href: "/abstract-books" },
  { label: "Naturalist Books", href: "/naturalist" },
  { label: "Symposium", href: "/symposium" },
];

const FOOTER_ADDRESS =
  "National Zoological Gardens, Anagarika Dharmapala Mawatha, Dehiwala, Sri Lanka";
const FOOTER_EMAIL = "srilankayza@gmail.com";
const FOOTER_PHONE = "+94 74 234 6463";
const FOOTER_PHONE_HREF = "tel:+94742346463";

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const className =
    "flex items-center gap-2 text-white/55 hover:text-[#F2A93B] text-sm transition-colors duration-200 group";
  const inner = (
    <>
      <span className="w-1 h-1 rounded-full bg-[#3F7A4E] group-hover:bg-[#F2A93B] transition-colors duration-200" />
      {label}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {inner}
    </a>
  );
}

const social = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer style={{ background: "#1a2e1f" }}>
      {/* Contact CTA strip */}
      <div style={{ background: "#3F7A4E" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3
              className="text-white mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              We&apos;d Love to Hear From You
            </h3>
            <p
              className="text-white/70 text-sm max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Questions about membership, study groups, events, or our conservation work?
              Reach out to the YZA team — we&apos;re here to help.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-[#F2A93B] hover:bg-[#d4911f] text-[#333A33] font-semibold px-6 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-lg whitespace-nowrap shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
          >
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5 inline-block rounded-xl overflow-hidden ring-1 ring-white/15 shadow-lg shadow-black/25">
              <YzaLogo variant="footer" />
            </div>
            <p
              className="text-white/55 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Inspiring the next generation of wildlife conservationists through education,
              research, and field-based experiences across Sri Lanka.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#F2A93B] flex items-center justify-center transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-white/60 group-hover:text-[#333A33] transition-colors duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-semibold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F2A93B] flex-shrink-0 mt-0.5" />
                <span
                  className="text-white/55 text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {FOOTER_ADDRESS}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F2A93B] flex-shrink-0" />
                <a
                  href={`mailto:${FOOTER_EMAIL}`}
                  className="text-white/55 hover:text-[#F2A93B] text-sm transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {FOOTER_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F2A93B] flex-shrink-0" />
                <a
                  href={FOOTER_PHONE_HREF}
                  className="text-white/55 hover:text-[#F2A93B] text-sm transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {FOOTER_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/35 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} Young Zoologists' Association Sri Lanka. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
