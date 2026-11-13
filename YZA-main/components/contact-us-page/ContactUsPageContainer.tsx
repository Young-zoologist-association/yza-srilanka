import { Suspense } from "react";
import { getContactUsPage, getHomePage, isWordPressConfigured } from "@/lib/api";
import { resolveContactUsPageContent } from "@/lib/contact-us-page/resolveContactUsPageContent";
import { ContactUsPage } from "./ContactUsPage";
import { ContactUsPageLoading } from "./ContactUsPageLoading";

async function ContactUsPageFetcher() {
  const fallback = resolveContactUsPageContent(null);

  if (!isWordPressConfigured()) {
    return <ContactUsPage content={fallback} />;
  }

  try {
    const [page, home] = await Promise.all([
      getContactUsPage(),
      getHomePage().catch(() => null),
    ]);

    const content = resolveContactUsPageContent(page, home?.footer ?? null);
    return <ContactUsPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress contact page fetch failed, using fallback content.", error);
    }
    return <ContactUsPage content={fallback} />;
  }
}

export function ContactUsPageContainer() {
  return (
    <Suspense fallback={<ContactUsPageLoading />}>
      <ContactUsPageFetcher />
    </Suspense>
  );
}
