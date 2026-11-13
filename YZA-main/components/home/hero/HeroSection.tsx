import { Suspense } from "react";
import { getHomePage, isWordPressConfigured } from "@/lib/api";
import { resolveHeroContent } from "@/lib/home/hero/resolveHeroContent";
import { Hero } from "./Hero";
import { HeroLoading } from "./HeroLoading";

async function HeroFetcher() {
  if (!isWordPressConfigured()) {
    return <Hero content={resolveHeroContent(null)} />;
  }

  try {
    const home = await getHomePage();
    const content = resolveHeroContent(home.hero);
    return <Hero content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress hero fetch failed, using fallback content.", error);
    }
    return <Hero content={resolveHeroContent(null)} />;
  }
}

export function HeroSection() {
  return (
    <Suspense fallback={<HeroLoading />}>
      <HeroFetcher />
    </Suspense>
  );
}
