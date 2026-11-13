import { Suspense } from "react";
import { getAbstractBooksPage, isWordPressConfigured } from "@/lib/api";
import { resolveAbstractBooksPageContent } from "@/lib/abstract-books-page/resolveAbstractBooksPageContent";
import { PdfResourceCardsPageLoading } from "@/components/pdf-archive/PdfResourceCardsPage";
import { AbstractBooksPage } from "./AbstractBooksPage";

async function AbstractBooksPageFetcher() {
  const fallback = resolveAbstractBooksPageContent(null);

  if (!isWordPressConfigured()) {
    return <AbstractBooksPage content={fallback} />;
  }

  try {
    const page = await getAbstractBooksPage();
    const content = resolveAbstractBooksPageContent(page);
    return <AbstractBooksPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress abstract books page fetch failed, using fallback content.", error);
    }
    return <AbstractBooksPage content={fallback} />;
  }
}

export function AbstractBooksPageContainer() {
  return (
    <Suspense fallback={<PdfResourceCardsPageLoading />}>
      <AbstractBooksPageFetcher />
    </Suspense>
  );
}
