import { Suspense } from "react";
import { getMembershipPage, isWordPressConfigured } from "@/lib/api";
import { resolveMembershipPageContent } from "@/lib/membership-page/resolveMembershipPageContent";
import { MembershipPage } from "./MembershipPage";
import { MembershipPageLoading } from "./MembershipPageLoading";

async function MembershipPageFetcher() {
  const fallback = resolveMembershipPageContent(null);

  if (!isWordPressConfigured()) {
    return <MembershipPage content={fallback} />;
  }

  try {
    const page = await getMembershipPage();
    const content = resolveMembershipPageContent(page);
    return <MembershipPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress membership page fetch failed, using fallback content.", error);
    }
    return <MembershipPage content={fallback} />;
  }
}

export function MembershipPageContainer() {
  return (
    <Suspense fallback={<MembershipPageLoading />}>
      <MembershipPageFetcher />
    </Suspense>
  );
}
