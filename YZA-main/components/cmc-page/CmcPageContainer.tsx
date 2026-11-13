import { Suspense } from "react";
import { getCmcPage, isWordPressConfigured } from "@/lib/api";
import { resolveCmcPageContent } from "@/lib/cmc-page/resolveCmcPageContent";
import { CmcPage } from "./CmcPage";
import { CmcPageLoading } from "./CmcPageLoading";

async function CmcPageFetcher() {
  const fallback = resolveCmcPageContent(null);

  if (!isWordPressConfigured()) {
    return <CmcPage content={fallback} />;
  }

  try {
    const page = await getCmcPage();
    const content = resolveCmcPageContent(page);
    return <CmcPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress CMC page fetch failed, using fallback content.", error);
    }
    return <CmcPage content={fallback} />;
  }
}

export function CmcPageContainer() {
  return (
    <Suspense fallback={<CmcPageLoading />}>
      <CmcPageFetcher />
    </Suspense>
  );
}
