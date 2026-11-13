import { Suspense } from "react";
import { getBookletsPage, isWordPressConfigured } from "@/lib/api";
import { resolveBookletsPageContent } from "@/lib/booklets-page/resolveBookletsPageContent";
import { PdfResourceCardsPageLoading } from "@/components/pdf-archive/PdfResourceCardsPage";
import { BookletsPage } from "./BookletsPage";

async function BookletsPageFetcher() {
  const fallback = resolveBookletsPageContent(null);

  if (!isWordPressConfigured()) {
    return <BookletsPage content={fallback} />;
  }

  try {
    const page = await getBookletsPage();
    const content = resolveBookletsPageContent(page);
    return <BookletsPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress booklets page fetch failed, using fallback content.", error);
    }
    return <BookletsPage content={fallback} />;
  }
}

export function BookletsPageContainer() {
  return (
    <Suspense fallback={<PdfResourceCardsPageLoading />}>
      <BookletsPageFetcher />
    </Suspense>
  );
}
