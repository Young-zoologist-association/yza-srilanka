import { Suspense } from "react";
import { getEventsAndProjectsPage, isWordPressConfigured } from "@/lib/api";
import { resolveSponsorshipPageContent } from "@/lib/sponsorship-page/resolveSponsorshipPageContent";
import { SponsorshipPage } from "./SponsorshipPage";
import { SponsorshipPageLoading } from "./SponsorshipPageLoading";

async function SponsorshipPageFetcher() {
  const fallback = resolveSponsorshipPageContent(null);

  if (!isWordPressConfigured()) {
    return <SponsorshipPage content={fallback} />;
  }

  try {
    const page = await getEventsAndProjectsPage();
    return <SponsorshipPage content={resolveSponsorshipPageContent(page)} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress sponsorship content fetch failed, using fallback.", error);
    }
    return <SponsorshipPage content={fallback} />;
  }
}

export function SponsorshipPageContainer() {
  return (
    <Suspense fallback={<SponsorshipPageLoading />}>
      <SponsorshipPageFetcher />
    </Suspense>
  );
}
