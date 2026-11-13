import { Suspense } from "react";
import { getLeafletsPage, isWordPressConfigured } from "@/lib/api";
import { resolveLeafletsPageContent } from "@/lib/leaflets-page/resolveLeafletsPageContent";
import { PdfArchivePageLoading } from "@/components/pdf-archive/PdfArchivePageLoading";
import { LeafletsPage } from "./LeafletsPage";

async function LeafletsPageFetcher() {
  const fallback = resolveLeafletsPageContent(null);

  if (!isWordPressConfigured()) {
    return <LeafletsPage content={fallback} />;
  }

  try {
    const page = await getLeafletsPage();
    const content = resolveLeafletsPageContent(page);
    return <LeafletsPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress leaflets page fetch failed, using fallback content.", error);
    }
    return <LeafletsPage content={fallback} />;
  }
}

export function LeafletsPageContainer() {
  return (
    <Suspense fallback={<PdfArchivePageLoading />}>
      <LeafletsPageFetcher />
    </Suspense>
  );
}
