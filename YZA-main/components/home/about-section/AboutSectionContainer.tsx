import { Suspense } from "react";
import { getHomePage, isWordPressConfigured } from "@/lib/api";
import { resolveAboutContent } from "@/lib/home/about/resolveAboutContent";
import { AboutSection } from "./AboutSection";
import { AboutLoading } from "./AboutLoading";

async function AboutFetcher() {
  if (!isWordPressConfigured()) {
    return <AboutSection content={resolveAboutContent(null)} />;
  }

  try {
    const home = await getHomePage();
    const content = resolveAboutContent(home.about);
    return <AboutSection content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress about fetch failed, using fallback content.", error);
    }
    return <AboutSection content={resolveAboutContent(null)} />;
  }
}

export function AboutSectionContainer() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutFetcher />
    </Suspense>
  );
}
