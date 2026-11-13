"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { YzaLogo } from "@/components/shared/YzaLogo";

export interface NavNode {
  label: string;
  href?: string;
  header?: boolean;
  children?: NavNode[];
}

export interface NavItem {
  label: string;
  href?: string;
  highlight?: boolean;
  children?: NavNode[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Management",
        children: [
          { label: "CMC", href: "/cmc" },
          { label: "Committees", href: "/committees" },
        ],
      },
      { label: "Presidents", href: "/presidents" },
      { label: "Instructors", href: "/instructors" },
      { label: "Sponsorship", href: "/sponsorship" },
      {
        label: "Branches",
        href: "/branches",
        children: [
          { label: "Dehiwala", href: "/branches#dehiwala" },
          { label: "Pinnawala", href: "/branches#pinnawala" },
          { label: "Ridiyagama", href: "/branches#ridiyagama" },
        ],
      },
      {
        label: "Study Groups",
        href: "/study-groups",
        children: [
          { label: "Amphibians", href: "/study-groups#amphibians" },
          { label: "Aquatic Life", href: "/study-groups#aquatic-life" },
          { label: "Birds", href: "/study-groups#birds" },
          { label: "Butterfly", href: "/study-groups#butterflies" },
          { label: "Flora", href: "/study-groups#flora" },
          { label: "Mammals", href: "/study-groups#mammals" },
          { label: "Reptiles", href: "/study-groups#reptiles" },
          { label: "Wildlife Art", href: "/study-groups#wildlife-art" },
          { label: "Wildlife Photography", href: "/study-groups#wildlife-photography" },
          { label: "Junior YZA", href: "/study-groups#junior-yza" },
        ],
      },
    ],
  },
  { label: "Membership", href: "/membership" },
  { label: "Events & Projects", href: "/events-and-projects" },
  { label: "Videos", href: "/videos" },
  {
    label: "Resources",
    href: "#resources",
    children: [
      {
        label: "Archive",
        children: [
          { label: "Articles", href: "/articles" },
          { label: "Leaflets", href: "/leaflets" },
        ],
      },
      {
        label: "Publications",
        children: [
          { label: "තිත්මුවා", href: "/thithmuwa" },
          { label: "පණිවුඩය", href: "/panivudaya" },
          { label: "සංරක්ෂණ", href: "/sanrakshana" },
          { label: "History Book", href: "/history-book" },
          { label: "Booklets", href: "/booklets" },
          { label: "Abstract Books", href: "/abstract-books" },
          { label: "Naturalist Books", href: "/naturalist" },
        ],
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Research",
    href: "#research",
    children: [
      { label: "Symposium", href: "/symposium" },
      { label: "Naturalist", href: "/naturalist-guidelines" },
    ],
  },
];

function nodeHref(node: NavNode): string {
  return node.href ?? "#";
}

function DesktopDropdownLink({
  node,
  depth = 0,
}: {
  node: NavNode;
  depth?: number;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const hasChildren = Boolean(node.children?.length);

  if (node.header) {
    return (
      <li className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#3F7A4E]/60 border-t border-[#3F7A4E]/10 mt-1 first:mt-0 first:border-t-0">
        {node.label}
      </li>
    );
  }

  if (!hasChildren) {
    return (
      <li>
        <a
          href={nodeHref(node)}
          className="flex items-center px-4 py-2.5 text-[#333A33] hover:bg-[#3F7A4E]/8 hover:text-[#3F7A4E] text-sm transition-colors duration-150"
          style={{ fontFamily: "'DM Sans', sans-serif", paddingLeft: `${16 + depth * 8}px` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3F7A4E]/30 mr-2.5 flex-shrink-0" />
          {node.label}
        </a>
      </li>
    );
  }

  const rowClassName =
    "flex items-center justify-between px-4 py-2.5 text-[#333A33] hover:bg-[#3F7A4E]/8 hover:text-[#3F7A4E] text-sm transition-colors duration-150";
  const rowStyle = { fontFamily: "'DM Sans', sans-serif", paddingLeft: `${16 + depth * 8}px` };

  return (
    <li
      className="relative"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      {node.href ? (
        <a href={nodeHref(node)} className={rowClassName} style={rowStyle}>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F7A4E]/30 mr-2.5 flex-shrink-0" />
            {node.label}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#3F7A4E]/50 flex-shrink-0 ml-3" />
        </a>
      ) : (
        <span className={`${rowClassName} cursor-default`} style={rowStyle}>
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F7A4E]/30 mr-2.5 flex-shrink-0" />
            {node.label}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#3F7A4E]/50 flex-shrink-0 ml-3" />
        </span>
      )}

      <AnimatePresence>
        {subOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-full top-0 ml-1 bg-white rounded-xl shadow-2xl shadow-black/15 border border-[#3F7A4E]/10 min-w-[200px] py-1 overflow-visible z-50"
          >
            {node.children!.map((child) => (
              <DesktopDropdownLink key={child.label} node={child} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileNavNode({
  node,
  depth = 0,
  onNavigate,
}: {
  node: NavNode;
  depth?: number;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(node.children?.length);

  if (node.header) {
    return (
      <li
        className="pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#F2A93B]/70"
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        {node.label}
      </li>
    );
  }

  if (!hasChildren) {
    return (
      <li>
        <a
          href={nodeHref(node)}
          className="block text-white/80 hover:text-[#F2A93B] py-2 text-sm transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif", paddingLeft: `${12 + depth * 12}px` }}
          onClick={onNavigate}
        >
          {node.label}
        </a>
      </li>
    );
  }

  return (
    <li>
      {node.href ? (
        <div
          className="flex items-center"
          style={{ paddingLeft: `${12 + depth * 12}px` }}
        >
          <a
            href={nodeHref(node)}
            className="flex-1 text-white/90 hover:text-[#F2A93B] py-2 text-sm transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={onNavigate}
          >
            {node.label}
          </a>
          <button
            type="button"
            className="p-2 text-white/70 hover:text-[#F2A93B] transition-colors"
            aria-label={`Expand ${node.label} submenu`}
            onClick={() => setOpen(!open)}
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex w-full items-center justify-between text-white/90 hover:text-[#F2A93B] py-2 text-sm transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif", paddingLeft: `${12 + depth * 12}px` }}
          onClick={() => setOpen(!open)}
        >
          {node.label}
          <ChevronDown
            className={`w-3.5 h-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <MobileNavNode
                key={child.label}
                node={child}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Utility bar */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
        style={{ background: "rgba(45, 90, 56, 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-end gap-6">
          <a
            href="/news-and-updates"
            className="text-white hover:text-[#F2A93B] text-sm font-semibold tracking-wide transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            News & Updates
          </a>
          <span className="text-white/25 text-sm">│</span>
          <a
            href="/store"
            className="text-white hover:text-[#F2A93B] text-sm font-semibold tracking-wide transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Store
          </a>
        </div>
      </div>

      {/* Main nav bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#3F7A4E] shadow-2xl shadow-black/25 py-2.5"
            : "bg-gradient-to-b from-black/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group shrink-0" aria-label="YZA Sri Lanka — Home">
            <div
              className={`overflow-hidden ring-1 ring-white/20 shadow-lg shadow-black/30 transition-all duration-500 group-hover:scale-[1.02] ${
                scrolled ? "rounded-md shadow-md" : "rounded-lg"
              }`}
            >
              <YzaLogo variant="navbar" compact={scrolled} />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href ?? "#"}
                  className={`flex items-center gap-1 px-2.5 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    item.highlight
                      ? "bg-[#F2A93B] text-[#333A33] hover:bg-[#d4911f] ml-2"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl shadow-black/15 border border-[#3F7A4E]/10 min-w-[220px] py-1 overflow-visible"
                    >
                      {item.children.map((node) => (
                        <DesktopDropdownLink key={node.label} node={node} />
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden bg-[#2d5a38] overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <ul className="px-6 py-5 space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between text-white/90 hover:text-[#F2A93B] py-2.5 text-sm border-b border-white/10 transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        onClick={() =>
                          setExpandedMobile(expandedMobile === item.label ? null : item.label)
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-50 transition-transform ${
                            expandedMobile === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobile === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pb-2"
                          >
                            {item.children.map((node) => (
                              <MobileNavNode
                                key={node.label}
                                node={node}
                                onNavigate={closeMobile}
                              />
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href ?? "#"}
                      className="flex items-center justify-between text-white/90 hover:text-[#F2A93B] py-2.5 text-sm border-b border-white/10 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-4 flex gap-4 border-t border-white/10 mt-2">
                <a
                  href="/news-and-updates"
                  className="text-[#F2A93B] text-sm font-semibold hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={closeMobile}
                >
                  News & Updates
                </a>
                <a
                  href="/store"
                  className="text-[#F2A93B] text-sm font-semibold hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={closeMobile}
                >
                  Store
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
