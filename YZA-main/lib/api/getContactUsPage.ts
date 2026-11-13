import { cache } from "react";
import { fetchContactUsPageRaw } from "./client";
import { mapContactUsPage } from "./contact-us-page-mappers";
import type { ContactUsPageData } from "./types";

/**
 * Fetches and maps the WordPress Contact Us page.
 */
export const getContactUsPage = cache(async (): Promise<ContactUsPageData> => {
  const page = await fetchContactUsPageRaw();
  return mapContactUsPage(page);
});
