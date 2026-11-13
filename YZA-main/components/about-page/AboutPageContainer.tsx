import { Suspense } from "react";
import { getAboutPage, isWordPressConfigured } from "@/lib/api";
import { resolveAboutPageContent } from "@/lib/about-page/resolveAboutPageContent";
import { AboutPage } from "./AboutPage";
import { AboutPageLoading } from "./AboutPageLoading";

async function AboutPageFetcher() {
  const fallback = resolveAboutPageContent(null);

  if (!isWordPressConfigured()) {
    return <AboutPage content={fallback} />;
  }

  try {
    const page = await getAboutPage();
    const content = resolveAboutPageContent(page);
    return <AboutPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress about page fetch failed, using fallback content.", error);
    }
    return <AboutPage content={fallback} />;
  }
}

export function AboutPageContainer() {
  return (
    <Suspense fallback={<AboutPageLoading />}>
      <AboutPageFetcher />
    </Suspense>
  );
}
