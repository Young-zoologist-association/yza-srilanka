import { Suspense } from "react";
import { getPresidentsPage, isWordPressConfigured } from "@/lib/api";
import { resolvePresidentsPageContent } from "@/lib/presidents-page/resolvePresidentsPageContent";
import { PresidentsPage } from "./PresidentsPage";
import { PresidentsPageLoading } from "./PresidentsPageLoading";

async function PresidentsPageFetcher() {
  const fallback = resolvePresidentsPageContent(null);

  if (!isWordPressConfigured()) {
    return <PresidentsPage content={fallback} />;
  }

  try {
    const page = await getPresidentsPage();
    const content = resolvePresidentsPageContent(page);
    return <PresidentsPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress presidents page fetch failed, using fallback content.", error);
    }
    return <PresidentsPage content={fallback} />;
  }
}

export function PresidentsPageContainer() {
  return (
    <Suspense fallback={<PresidentsPageLoading />}>
      <PresidentsPageFetcher />
    </Suspense>
  );
}
