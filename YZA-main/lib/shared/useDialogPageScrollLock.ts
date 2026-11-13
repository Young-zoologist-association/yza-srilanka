"use client";

import { useLayoutEffect, type MutableRefObject } from "react";

export const DIALOG_OPEN_CLASS = "dialog-open";

export function isPageDialogOpen(): boolean {
  if (typeof document === "undefined") return false;

  return (
    document.documentElement.classList.contains(DIALOG_OPEN_CLASS) ||
    Boolean(document.querySelector('[data-slot="dialog-overlay"][data-state="open"]'))
  );
}

/**
 * Locks page scroll while a dialog is open without position:fixed (preserves blur + scroll position).
 * Pair with `modal={false}` on Radix Dialog to avoid duplicate/conflicting scroll locks.
 */
export function useDialogPageScrollLock(
  open: boolean,
  scrollYRef: MutableRefObject<number>,
) {
  useLayoutEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const { documentElement: html, body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.classList.add(DIALOG_OPEN_CLASS);
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      const scrollY = scrollYRef.current;

      html.classList.remove(DIALOG_OPEN_CLASS);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.style.scrollBehavior = "auto";

      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
        html.style.scrollBehavior = previousScrollBehavior;
      });
    };
  }, [open, scrollYRef]);
}
