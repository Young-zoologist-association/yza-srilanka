"use client";

import { useEffect } from "react";

/** Ensures the viewport starts at the top on full page load / refresh. */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Preserve hash deep links (e.g. /study-groups#birds from navbar).
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
