import { Suspense } from "react";
import { getSanrakshanaPage, isWordPressConfigured } from "@/lib/api";
import { resolveSanrakshanaPageContent } from "@/lib/sanrakshana-page/resolveSanrakshanaPageContent";
import { PdfResourceCardsPageLoading } from "@/components/pdf-archive/PdfResourceCardsPage";
import { SanrakshanaPage } from "./SanrakshanaPage";

async function SanrakshanaPageFetcher() {
  const fallback = resolveSanrakshanaPageContent(null);

  if (!isWordPressConfigured()) {
    return <SanrakshanaPage content={fallback} />;
  }

  try {
    const page = await getSanrakshanaPage();
    const content = resolveSanrakshanaPageContent(page);
    return <SanrakshanaPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress sanrakshana page fetch failed, using fallback content.", error);
    }
    return <SanrakshanaPage content={fallback} />;
  }
}

export function SanrakshanaPageContainer() {
  return (
    <Suspense fallback={<PdfResourceCardsPageLoading />}>
      <SanrakshanaPageFetcher />
    </Suspense>
  );
}
