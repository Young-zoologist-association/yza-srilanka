"use client";

import { useEffect } from "react";

interface StudyGroupHashRedirectProps {
  slug: string;
}

/** Sends legacy standalone pages to the matching study group section. */
export function StudyGroupHashRedirect({ slug }: StudyGroupHashRedirectProps) {
  useEffect(() => {
    window.location.replace(`/study-groups#${encodeURIComponent(slug)}`);
  }, [slug]);

  return (
    <main
      className="min-h-[50vh] flex items-center justify-center px-4 text-[#5C7A63]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Opening study group…
    </main>
  );
}
