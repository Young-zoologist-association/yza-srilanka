import { cache } from "react";
import { WordPressApiError } from "./errors";
import type { WpPageResponse, WpPostResponse } from "./types";
import type { WpAboutPageResponse, WpAbstractBooksPageResponse, WpArticlesPageResponse, WpBookletsPageResponse, WpBranchesPageResponse, WpCmcPageResponse, WpCommitteesPageResponse, WpContactUsPageResponse, WpEventsAndProjectsPageResponse, WpInstructorsPageResponse, WpJuniorYzaPageResponse, WpLeafletsPageResponse, WpMembershipPageResponse, WpNaturalistPageResponse, WpNewsAndUpdatesPageResponse, WpPresidentsPageResponse, WpPublicationPageResponse, WpStorePageResponse, WpStudyGroupsPageResponse, WpSymposiumPageResponse, WpVideosPageResponse, WpWildlifeArtPageResponse, WpWildlifePhotographyPageResponse } from "./wordpress-types";

const DEFAULT_REVALIDATE_SECONDS = 60;

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Returns true when WORDPRESS_API_URL is set in the environment. */
export function isWordPressConfigured(): boolean {
  return Boolean(process.env.WORDPRESS_API_URL?.trim());
}

export function getWordPressApiUrl(): string {
  const url = process.env.WORDPRESS_API_URL?.trim();

  if (!url) {
    throw new WordPressApiError(
      "WORDPRESS_API_URL environment variable is not set. Copy .env.example to .env.local and add your WordPress URL.",
    );
  }

  return trimTrailingSlash(url);
}

function getVideosPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_VIDEOS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_VIDEOS_PAGE_SLUG ?? "videos-page",
  };
}

function getArticlesPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_ARTICLES_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_ARTICLES_PAGE_SLUG ?? "articles-page",
  };
}

function getLeafletsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_LEAFLETS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_LEAFLETS_PAGE_SLUG ?? "leaflets-page",
  };
}

function getAbstractBooksPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_ABSTRACT_BOOKS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_ABSTRACT_BOOKS_PAGE_SLUG ?? "abstract-books-page",
  };
}

function getBookletsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_BOOKLETS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_BOOKLETS_PAGE_SLUG ?? "booklets-page",
  };
}

function getThithmuwaPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_THITHMUWA_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_THITHMUWA_PAGE_SLUG ?? "තිත්මුවා-page",
  };
}

function getPanivudayaPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_PANIVUDAYA_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_PANIVUDAYA_PAGE_SLUG ?? "පණිවුඩය-page",
  };
}

function getSanrakshanaPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_SANRAKSHANA_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_SANRAKSHANA_PAGE_SLUG ?? "සංරක්ෂණ-page",
  };
}

function getBranchesPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_BRANCHES_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_BRANCHES_PAGE_SLUG ?? "branches-page",
  };
}

function getMembershipPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_MEMBERSHIP_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_MEMBERSHIP_PAGE_SLUG ?? "membership-page",
  };
}

function getJuniorYzaPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_JUNIOR_YZA_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_JUNIOR_YZA_PAGE_SLUG ?? "junior-yza-page",
  };
}

function getWildlifePhotographyPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_WILDLIFE_PHOTOGRAPHY_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value:
      process.env.WORDPRESS_WILDLIFE_PHOTOGRAPHY_PAGE_SLUG ?? "wildlife-photography-page",
  };
}

function getWildlifeArtPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_WILDLIFE_ART_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_WILDLIFE_ART_PAGE_SLUG ?? "wildlife-art-page",
  };
}

function getStudyGroupsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_STUDY_GROUPS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_STUDY_GROUPS_PAGE_SLUG ?? "study-groups-page",
  };
}

function getPresidentsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_PRESIDENTS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_PRESIDENTS_PAGE_SLUG ?? "presidents-page",
  };
}

function getInstructorsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_INSTRUCTORS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_INSTRUCTORS_PAGE_SLUG ?? "instructors-page",
  };
}

function getEventsAndProjectsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_EVENTS_AND_PROJECTS_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value:
      process.env.WORDPRESS_EVENTS_AND_PROJECTS_PAGE_SLUG ?? "events-and-projects-page",
  };
}

function getNewsAndUpdatesPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_NEWS_AND_UPDATES_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_NEWS_AND_UPDATES_PAGE_SLUG ?? "news-and-updates-page",
  };
}

function getSymposiumPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_SYMPOSIUM_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_SYMPOSIUM_PAGE_SLUG ?? "symposium-page",
  };
}

function getStorePageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_STORE_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_STORE_PAGE_SLUG ?? "store",
  };
}

function getNaturalistPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_NATURALIST_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_NATURALIST_PAGE_SLUG ?? "naturalist-page",
  };
}

function getContactUsPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_CONTACT_US_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_CONTACT_US_PAGE_SLUG ?? "contact-us-page",
  };
}

function getCommitteesPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_COMMITTEES_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_COMMITTEES_PAGE_SLUG ?? "committees-page",
  };
}

function getCmcPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_CMC_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_CMC_PAGE_SLUG ?? "cmc-page",
  };
}

function getAboutPageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_ABOUT_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_ABOUT_PAGE_SLUG ?? "about-page",
  };
}

function getHomePageIdentifier(): { type: "id" | "slug"; value: string } {
  const pageId = process.env.WORDPRESS_HOME_PAGE_ID;
  if (pageId) {
    return { type: "id", value: pageId };
  }

  return {
    type: "slug",
    value: process.env.WORDPRESS_HOME_PAGE_SLUG ?? "home-page",
  };
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const base = getWordPressApiUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

export async function wordpressFetch<T>(
  path: string,
  params?: Record<string, string>,
  init?: RequestInit,
): Promise<T> {
  const url = buildUrl(path, params);
  const method = (init?.method ?? "GET").toUpperCase();
  const headers = new Headers(init?.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (method !== "GET" && method !== "HEAD" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(url, {
      ...init,
      headers,
      next: {
        revalidate:
          Number(process.env.WORDPRESS_REVALIDATE_SECONDS) ||
          DEFAULT_REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new WordPressApiError(
        `WordPress API request failed (${response.status}): ${body || response.statusText}`,
        response.status,
        url,
      );
    }

    const text = await response.text();
    if (!text.trim()) {
      throw new WordPressApiError("WordPress API returned an empty response.", response.status, url);
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof WordPressApiError) {
      throw error;
    }

    throw new WordPressApiError(
      error instanceof Error ? error.message : "Unknown WordPress fetch error",
      undefined,
      url,
    );
  }
}

export const fetchHomePageRaw = cache(async (): Promise<WpPageResponse> => {
  const identifier = getHomePageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpPageResponse>(`/wp-json/wp/v2/pages/${identifier.value}`, {
      acf_format: "standard",
    });
  }

  const pages = await wordpressFetch<WpPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Home page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchAboutPageRaw = cache(async (): Promise<WpAboutPageResponse> => {
  const identifier = getAboutPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpAboutPageResponse>(`/wp-json/wp/v2/pages/${identifier.value}`, {
      acf_format: "standard",
    });
  }

  const pages = await wordpressFetch<WpAboutPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `About page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchCmcPageRaw = cache(async (): Promise<WpCmcPageResponse> => {
  const identifier = getCmcPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpCmcPageResponse>(`/wp-json/wp/v2/pages/${identifier.value}`, {
      acf_format: "standard",
    });
  }

  const pages = await wordpressFetch<WpCmcPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `CMC page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchCommitteesPageRaw = cache(async (): Promise<WpCommitteesPageResponse> => {
  const identifier = getCommitteesPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpCommitteesPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpCommitteesPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Committees page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchPresidentsPageRaw = cache(async (): Promise<WpPresidentsPageResponse> => {
  const identifier = getPresidentsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpPresidentsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpPresidentsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Presidents page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchInstructorsPageRaw = cache(async (): Promise<WpInstructorsPageResponse> => {
  const identifier = getInstructorsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpInstructorsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpInstructorsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Instructors page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchNewsAndUpdatesPageRaw = cache(
  async (): Promise<WpNewsAndUpdatesPageResponse> => {
    const identifier = getNewsAndUpdatesPageIdentifier();

    if (identifier.type === "id") {
      return wordpressFetch<WpNewsAndUpdatesPageResponse>(
        `/wp-json/wp/v2/pages/${identifier.value}`,
        { acf_format: "standard" },
      );
    }

    const pages = await wordpressFetch<WpNewsAndUpdatesPageResponse[]>(
      "/wp-json/wp/v2/pages",
      {
        slug: identifier.value,
        acf_format: "standard",
      },
    );

    if (!pages.length) {
      throw new WordPressApiError(
        `News and Updates page not found for slug "${identifier.value}".`,
        404,
      );
    }

    return pages[0];
  },
);

export const fetchSymposiumPageRaw = cache(async (): Promise<WpSymposiumPageResponse> => {
  const identifier = getSymposiumPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpSymposiumPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpSymposiumPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Symposium page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchNaturalistPageRaw = cache(async (): Promise<WpNaturalistPageResponse> => {
  const identifier = getNaturalistPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpNaturalistPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpNaturalistPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Naturalist page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchContactUsPageRaw = cache(async (): Promise<WpContactUsPageResponse> => {
  const identifier = getContactUsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpContactUsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpContactUsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Contact Us page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchEventsAndProjectsPageRaw = cache(
  async (): Promise<WpEventsAndProjectsPageResponse> => {
    const identifier = getEventsAndProjectsPageIdentifier();

    if (identifier.type === "id") {
      return wordpressFetch<WpEventsAndProjectsPageResponse>(
        `/wp-json/wp/v2/pages/${identifier.value}`,
        { acf_format: "standard" },
      );
    }

    const pages = await wordpressFetch<WpEventsAndProjectsPageResponse[]>(
      "/wp-json/wp/v2/pages",
      {
        slug: identifier.value,
        acf_format: "standard",
      },
    );

    if (!pages.length) {
      throw new WordPressApiError(
        `Events and projects page not found for slug "${identifier.value}".`,
        404,
      );
    }

    return pages[0];
  },
);

export const fetchWildlifePhotographyPageRaw = cache(
  async (): Promise<WpWildlifePhotographyPageResponse> => {
    const identifier = getWildlifePhotographyPageIdentifier();

    if (identifier.type === "id") {
      return wordpressFetch<WpWildlifePhotographyPageResponse>(
        `/wp-json/wp/v2/pages/${identifier.value}`,
        { acf_format: "standard" },
      );
    }

    const pages = await wordpressFetch<WpWildlifePhotographyPageResponse[]>(
      "/wp-json/wp/v2/pages",
      {
        slug: identifier.value,
        acf_format: "standard",
      },
    );

    if (!pages.length) {
      throw new WordPressApiError(
        `Wildlife photography page not found for slug "${identifier.value}".`,
        404,
      );
    }

    return pages[0];
  },
);

export const fetchJuniorYzaPageRaw = cache(async (): Promise<WpJuniorYzaPageResponse> => {
  const identifier = getJuniorYzaPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpJuniorYzaPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpJuniorYzaPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Junior YZA page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchMembershipPageRaw = cache(async (): Promise<WpMembershipPageResponse> => {
  const identifier = getMembershipPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpMembershipPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpMembershipPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Membership page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

/** PDF (and other file) attachments uploaded to a page in the Media Library. */
export async function fetchPagePdfAttachments(
  pageId: number,
): Promise<import("./wordpress-types").WpMediaAttachmentResponse[]> {
  try {
    const items = await wordpressFetch<
      import("./wordpress-types").WpMediaAttachmentResponse[]
    >("/wp-json/wp/v2/media", {
      parent: String(pageId),
      per_page: "100",
    });

    return items.filter(
      (item) =>
        item.mime_type === "application/pdf" ||
        item.source_url?.toLowerCase().includes(".pdf"),
    );
  } catch {
    return [];
  }
}

export const fetchBranchesPageRaw = cache(async (): Promise<WpBranchesPageResponse> => {
  const identifier = getBranchesPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpBranchesPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpBranchesPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Branches page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchVideosPageRaw = cache(async (): Promise<WpVideosPageResponse> => {
  const identifier = getVideosPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpVideosPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpVideosPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Videos page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchArticlesPageRaw = cache(async (): Promise<WpArticlesPageResponse> => {
  const identifier = getArticlesPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpArticlesPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpArticlesPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Articles page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchLeafletsPageRaw = cache(async (): Promise<WpLeafletsPageResponse> => {
  const identifier = getLeafletsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpLeafletsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpLeafletsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Leaflets page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchAbstractBooksPageRaw = cache(async (): Promise<WpAbstractBooksPageResponse> => {
  const identifier = getAbstractBooksPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpAbstractBooksPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpAbstractBooksPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Abstract books page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchBookletsPageRaw = cache(async (): Promise<WpBookletsPageResponse> => {
  const identifier = getBookletsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpBookletsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpBookletsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Booklets page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchThithmuwaPageRaw = cache(async (): Promise<WpPublicationPageResponse> => {
  const identifier = getThithmuwaPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpPublicationPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpPublicationPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Thithmuwa page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchPanivudayaPageRaw = cache(async (): Promise<WpPublicationPageResponse> => {
  const identifier = getPanivudayaPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpPublicationPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpPublicationPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Panivudaya page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchSanrakshanaPageRaw = cache(async (): Promise<WpPublicationPageResponse> => {
  const identifier = getSanrakshanaPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpPublicationPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpPublicationPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Sanrakshana page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchWildlifeArtPageRaw = cache(async (): Promise<WpWildlifeArtPageResponse> => {
  const identifier = getWildlifeArtPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpWildlifeArtPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpWildlifeArtPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Wildlife art page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchStudyGroupsPageRaw = cache(async (): Promise<WpStudyGroupsPageResponse> => {
  const identifier = getStudyGroupsPageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpStudyGroupsPageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpStudyGroupsPageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Study groups page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export const fetchStorePageRaw = cache(async (): Promise<WpStorePageResponse> => {
  const identifier = getStorePageIdentifier();

  if (identifier.type === "id") {
    return wordpressFetch<WpStorePageResponse>(
      `/wp-json/wp/v2/pages/${identifier.value}`,
      { acf_format: "standard" },
    );
  }

  const pages = await wordpressFetch<WpStorePageResponse[]>("/wp-json/wp/v2/pages", {
    slug: identifier.value,
    acf_format: "standard",
  });

  if (!pages.length) {
    throw new WordPressApiError(
      `Store page not found for slug "${identifier.value}".`,
      404,
    );
  }

  return pages[0];
});

export async function fetchCustomPostsRaw(
  endpoint: string,
): Promise<WpPostResponse[]> {
  return wordpressFetch<WpPostResponse[]>(`/wp-json/wp/v2/${endpoint}`, {
    acf_format: "standard",
    per_page: "100",
    orderby: "date",
    order: "desc",
  });
}
