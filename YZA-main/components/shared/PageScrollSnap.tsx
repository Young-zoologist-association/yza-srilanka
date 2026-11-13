"use client";

import { useEffect, useRef } from "react";
import { isPageDialogOpen } from "@/lib/shared/useDialogPageScrollLock";

const SNAP_COOLDOWN_MS = 900;
const WHEEL_DELTA_THRESHOLD = 8;
const DEFAULT_NAVBAR_OFFSET_PX = 88;
const SECTION_EDGE_TOLERANCE_PX = 80;
const SNAP_SECTION_SELECTOR = ".page-snap-section";

function getSnapSections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(SNAP_SECTION_SELECTOR));
}

function getNavbarOffset(): number {
  const header = document.querySelector("header");
  if (!header) return DEFAULT_NAVBAR_OFFSET_PX;
  return Math.ceil(header.getBoundingClientRect().height);
}

function getSectionScrollTop(section: HTMLElement): number {
  return Math.max(0, section.offsetTop - getNavbarOffset());
}

function getActiveSectionIndex(sections: HTMLElement[]): number {
  const navbarOffset = getNavbarOffset();
  const anchor = window.scrollY + navbarOffset;
  let active = 0;

  for (let i = 0; i < sections.length; i++) {
    if (getSectionScrollTop(sections[i]) <= anchor + SECTION_EDGE_TOLERANCE_PX) {
      active = i;
    }
  }

  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top;
    if (Math.abs(top - navbarOffset) <= SECTION_EDGE_TOLERANCE_PX) {
      return i;
    }
  }

  return active;
}

function isHeroSnapZone(section: HTMLElement, index: number): boolean {
  if (index !== 0 || !isFullViewportSection(section)) return false;

  const { bottom } = section.getBoundingClientRect();
  return bottom > window.innerHeight * 0.4;
}

function isAtSectionEnd(section: HTMLElement): boolean {
  const scrollable = section.offsetHeight - window.innerHeight;

  // Fits entirely in the viewport — advance on the next wheel down from section start.
  if (scrollable <= 0) {
    return isAtSectionStart(section);
  }

  const end = getSectionScrollTop(section) + scrollable;
  const strictTolerance = 12;

  // Slightly taller than the viewport — require reaching the real bottom so users
  // can scroll to content near the section edge (e.g. pagination controls).
  if (scrollable <= SECTION_EDGE_TOLERANCE_PX) {
    return window.scrollY >= end - strictTolerance;
  }

  return window.scrollY >= end - SECTION_EDGE_TOLERANCE_PX;
}

function isFullViewportSection(section: HTMLElement): boolean {
  return section.offsetHeight >= window.innerHeight * 0.85;
}

function isAtSectionStart(section: HTMLElement): boolean {
  const navbarOffset = getNavbarOffset();
  const start = getSectionScrollTop(section);

  if (Math.abs(window.scrollY - start) <= SECTION_EDGE_TOLERANCE_PX) return true;

  const top = section.getBoundingClientRect().top;
  return top >= navbarOffset - SECTION_EDGE_TOLERANCE_PX &&
    top <= navbarOffset + SECTION_EDGE_TOLERANCE_PX;
}

function shouldSnapUp(section: HTMLElement, index: number): boolean {
  if (index <= 0) return false;
  if (isAtSectionStart(section)) return true;

  const navbarOffset = getNavbarOffset();
  const start = getSectionScrollTop(section);
  const { top } = section.getBoundingClientRect();

  if (window.scrollY <= start + SECTION_EDGE_TOLERANCE_PX) return true;

  return top >= navbarOffset - SECTION_EDGE_TOLERANCE_PX &&
    top <= navbarOffset + SECTION_EDGE_TOLERANCE_PX * 1.25;
}

function syncScrollMargins(): void {
  document.documentElement.style.setProperty(
    "--snap-navbar-offset",
    `${getNavbarOffset()}px`,
  );
}

export function PageScrollSnap() {
  const isLocked = useRef(false);
  const lockTimer = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse) and (max-width: 768px)").matches) return;

    document.documentElement.classList.add("page-scroll-snap");
    const frameId = requestAnimationFrame(syncScrollMargins);

    const releaseLock = () => {
      isLocked.current = false;
      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current);
        lockTimer.current = null;
      }
    };

    const snapTo = (index: number) => {
      const sections = getSnapSections();
      const target = sections[index];
      if (!target) return;

      syncScrollMargins();
      isLocked.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current);
      }
      lockTimer.current = window.setTimeout(releaseLock, SNAP_COOLDOWN_MS);
    };

    const onScrollEnd = () => {
      if (isLocked.current) {
        releaseLock();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (isPageDialogOpen()) return;
      if (Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD) return;

      const sections = getSnapSections();
      if (sections.length < 2) return;

      if (isLocked.current) {
        event.preventDefault();
        return;
      }

      const activeIndex = getActiveSectionIndex(sections);
      const section = sections[activeIndex];
      const scrollingDown = event.deltaY > 0;

      if (scrollingDown) {
        const inHeroSnapZone = isHeroSnapZone(section, activeIndex);
        if (inHeroSnapZone || isAtSectionEnd(section)) {
          const nextIndex = activeIndex + 1;
          if (nextIndex < sections.length) {
            event.preventDefault();
            snapTo(nextIndex);
          }
        }
        return;
      }

      if (shouldSnapUp(section, activeIndex)) {
        event.preventDefault();
        snapTo(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("scroll", syncScrollMargins, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("scroll", syncScrollMargins);
      releaseLock();
      document.documentElement.style.removeProperty("--snap-navbar-offset");
      document.documentElement.classList.remove("page-scroll-snap");
    };
  }, []);

  return null;
}
