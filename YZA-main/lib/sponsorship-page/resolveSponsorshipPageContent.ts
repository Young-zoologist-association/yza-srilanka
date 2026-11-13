import type {
  CollaborativeSectionData,
  EventsAndProjectsPageData,
  SponsorshipSectionData,
} from "@/lib/api/types";

export interface PartnerCalloutContent {
  eyebrow: string;
  title: string;
  message: string;
  contactHref: string;
  contactLabel: string;
}

export interface SponsorshipPageContent {
  pageTitle: string;
  subtitle: string;
  partnerCallout: PartnerCalloutContent;
  sponsorship: SponsorshipSectionData | null;
  collaborative: CollaborativeSectionData | null;
}

const DEFAULT_SPONSORSHIP: SponsorshipSectionData = {
  title: "Sponsorships",
  description:
    "YZA conducts its conservation and educational initiatives with the valuable support of sponsors and partners. The Young Zoologists' Association welcomes partnerships and sponsorships from organizations and individuals who share its commitment to biodiversity conservation and environmental education.",
  sponsorNames: [],
};

const DEFAULT_COLLABORATIVE: CollaborativeSectionData = {
  title: "Collaborative and Partnership",
  description:
    "The association's work is directed at a wide spectrum of stakeholders, but young people and students remain the primary audience. Most of its public outreach projects are carried out in collaboration with government authorities and NGOs.",
};

export const SPONSORSHIP_PAGE_FALLBACK: SponsorshipPageContent = {
  pageTitle: "Sponsorship",
  subtitle: "Partners & Supporters",
  partnerCallout: {
    eyebrow: "Partner With Us",
    title: "Invest in Sri Lanka's next generation of conservationists",
    message:
      "Align your brand with one of the country's most trusted youth-led conservation organisations. Sponsorship helps fund field programmes, exhibitions, education, and community outreach that reach thousands each year.",
    contactHref: "/contact",
    contactLabel: "Discuss sponsorship",
  },
  sponsorship: DEFAULT_SPONSORSHIP,
  collaborative: DEFAULT_COLLABORATIVE,
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeSponsorship(
  sponsorship: SponsorshipSectionData | null | undefined,
): SponsorshipSectionData | null {
  if (!sponsorship) return SPONSORSHIP_PAGE_FALLBACK.sponsorship;

  const title = pickText(sponsorship.title, DEFAULT_SPONSORSHIP.title);
  const description = sponsorship.description?.trim() ?? "";
  const sponsorNames = (sponsorship.sponsorNames ?? []).filter(Boolean);

  if (!description && sponsorNames.length === 0) {
    return SPONSORSHIP_PAGE_FALLBACK.sponsorship;
  }

  return { title, description, sponsorNames };
}

function normalizeCollaborative(
  collaborative: CollaborativeSectionData | null | undefined,
): CollaborativeSectionData | null {
  if (!collaborative) return SPONSORSHIP_PAGE_FALLBACK.collaborative;

  const title = pickText(collaborative.title, DEFAULT_COLLABORATIVE.title);
  const description = collaborative.description?.trim() ?? "";
  if (!description) return SPONSORSHIP_PAGE_FALLBACK.collaborative;

  return { title, description };
}

export function resolveSponsorshipPageContent(
  data: EventsAndProjectsPageData | null,
): SponsorshipPageContent {
  if (!data) return SPONSORSHIP_PAGE_FALLBACK;

  return {
    pageTitle: SPONSORSHIP_PAGE_FALLBACK.pageTitle,
    subtitle: SPONSORSHIP_PAGE_FALLBACK.subtitle,
    partnerCallout: SPONSORSHIP_PAGE_FALLBACK.partnerCallout,
    sponsorship: normalizeSponsorship(data.sponsorship),
    collaborative: normalizeCollaborative(data.collaborative),
  };
}
