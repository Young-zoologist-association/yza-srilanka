import { cache } from "react";
import { fetchMembershipPageRaw, fetchPagePdfAttachments } from "./client";
import { mapMembershipPage } from "./membership-page-mappers";
import type { MembershipPageData } from "./types";

export const getMembershipPage = cache(async (): Promise<MembershipPageData> => {
  const page = await fetchMembershipPageRaw();
  const pdfAttachments = await fetchPagePdfAttachments(page.id);
  return mapMembershipPage(page, pdfAttachments);
});
