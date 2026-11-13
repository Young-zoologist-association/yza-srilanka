import { Suspense } from "react";
import { getPanivudayaPage, isWordPressConfigured } from "@/lib/api";
import { resolvePanivudayaPageContent } from "@/lib/panivudaya-page/resolvePanivudayaPageContent";
import { PdfResourceCardsPageLoading } from "@/components/pdf-archive/PdfResourceCardsPage";
import { PanivudayaPage } from "./PanivudayaPage";

async function PanivudayaPageFetcher() {
  const fallback = resolvePanivudayaPageContent(null);

  if (!isWordPressConfigured()) {
    return <PanivudayaPage content={fallback} />;
  }

  try {
    const page = await getPanivudayaPage();
    const content = resolvePanivudayaPageContent(page);
    return <PanivudayaPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress panivudaya page fetch failed, using fallback content.", error);
    }
    return <PanivudayaPage content={fallback} />;
  }
}

export function PanivudayaPageContainer() {
  return (
    <Suspense fallback={<PdfResourceCardsPageLoading />}>
      <PanivudayaPageFetcher />
    </Suspense>
  );
}
