import type { ContactUsPageData, FooterData, FooterSocialLink } from "@/lib/api/types";

export interface ContactUsPageContent {
  pageTitle: string;
  subtitle: string;
  contactTitle: string;
  address: string;
  email: string;
  phone: string;
  socialLinks: FooterSocialLink[];
}

export const CONTACT_US_PAGE_FALLBACK: ContactUsPageContent = {
  pageTitle: "Contact Us Now",
  subtitle: "Stay connected with us",
  contactTitle: "",
  address: "",
  email: "",
  phone: "",
  socialLinks: [],
};

type FooterContactSource = Pick<
  FooterData,
  "contactTitle" | "address" | "email" | "phone" | "socialLinks"
>;

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeSocialLinks(links: FooterSocialLink[] | undefined): FooterSocialLink[] {
  if (!links?.length) return [];

  return links.filter((link) => hasText(link.url) && hasText(link.label));
}

export function resolveContactUsPageContent(
  page: ContactUsPageData | null,
  footer: FooterContactSource | null = null,
): ContactUsPageContent {
  const base = page
    ? {
        pageTitle: pickText(page.pageTitle, CONTACT_US_PAGE_FALLBACK.pageTitle),
        subtitle: pickText(page.subtitle, CONTACT_US_PAGE_FALLBACK.subtitle),
      }
    : {
        pageTitle: CONTACT_US_PAGE_FALLBACK.pageTitle,
        subtitle: CONTACT_US_PAGE_FALLBACK.subtitle,
      };

  return {
    ...base,
    contactTitle: pickText(footer?.contactTitle, CONTACT_US_PAGE_FALLBACK.contactTitle),
    address: pickText(footer?.address, CONTACT_US_PAGE_FALLBACK.address),
    email: pickText(footer?.email, CONTACT_US_PAGE_FALLBACK.email),
    phone: pickText(footer?.phone, CONTACT_US_PAGE_FALLBACK.phone),
    socialLinks: normalizeSocialLinks(footer?.socialLinks),
  };
}
