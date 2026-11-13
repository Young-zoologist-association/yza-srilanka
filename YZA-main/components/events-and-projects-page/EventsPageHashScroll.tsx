"use client";

import { useEffect } from "react";
import { scrollToHashSectionWhenReady } from "@/lib/shared/scrollToSection";

interface EventsPageHashScrollProps {
  targetId?: string;
}

/** Scrolls to a hash section as soon as the page shell loads (before Suspense content). */
export function EventsPageHashScroll({ targetId = "events" }: EventsPageHashScrollProps) {
  useEffect(() => {
    const hash = `#${targetId}`;
    if (window.location.hash !== hash) return;

    let cancelPending = scrollToHashSectionWhenReady(hash, "smooth");

    const onHashChange = () => {
      cancelPending();
      if (window.location.hash === hash) {
        cancelPending = scrollToHashSectionWhenReady(hash, "smooth");
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelPending();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [targetId]);

  return null;
}
