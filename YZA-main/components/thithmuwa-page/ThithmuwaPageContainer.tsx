import { Suspense } from "react";
import { getThithmuwaPage, isWordPressConfigured } from "@/lib/api";
import { resolveThithmuwaPageContent } from "@/lib/thithmuwa-page/resolveThithmuwaPageContent";
import { PdfResourceCardsPageLoading } from "@/components/pdf-archive/PdfResourceCardsPage";
import { ThithmuwaPage } from "./ThithmuwaPage";

async function ThithmuwaPageFetcher() {
  const fallback = resolveThithmuwaPageContent(null);

  if (!isWordPressConfigured()) {
    return <ThithmuwaPage content={fallback} />;
  }

  try {
    const page = await getThithmuwaPage();
    const content = resolveThithmuwaPageContent(page);
    return <ThithmuwaPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress thithmuwa page fetch failed, using fallback content.", error);
    }
    return <ThithmuwaPage content={fallback} />;
  }
}

export function ThithmuwaPageContainer() {
  return (
    <Suspense fallback={<PdfResourceCardsPageLoading />}>
      <ThithmuwaPageFetcher />
    </Suspense>
  );
}
