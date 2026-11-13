import type { SocialLinkData, VideoItemData, VideosPageData } from "@/lib/api/types";

export interface VideosPageContent {
  pageTitle: string;
  description: string;
  videos: VideoItemData[];
  socialLinks: SocialLinkData[];
}

const FALLBACK_VIDEOS: VideoItemData[] = [
  {
    id: "kanneliya-field-visit-2023",
    title: "Kanneliya Field Visit 2023",
    description:
      "A field visit to Kanneliya was organized by the Birds group of YZA on 22nd April 2023.",
    videoUrl: "https://youtu.be/SXGgzZBVzyU",
    youtubeId: "SXGgzZBVzyU",
    thumbnailUrl: "https://img.youtube.com/vi/SXGgzZBVzyU/maxresdefault.jpg",
  },
  {
    id: "mannar-field-workshop",
    title: "Mannar Field Workshop",
    description:
      "A field workshop to Mannar was organized by the Birds group of YZA from 23rd to 26th December 2022.",
    videoUrl: "https://youtu.be/ZbAnfCKU5Ek",
    youtubeId: "ZbAnfCKU5Ek",
    thumbnailUrl: "https://img.youtube.com/vi/ZbAnfCKU5Ek/maxresdefault.jpg",
  },
  {
    id: "wetland-conservation-and-restoration",
    title: "Wetland Conservation and Restoration",
    description:
      "A wetland is an ecosystem that is either covered by water or saturated water, that stores and purifies water quality, store flood water, and provides a home for many fauna and flora species.",
    videoUrl: "https://youtu.be/sL7CZBvoPmQ",
    youtubeId: "sL7CZBvoPmQ",
    thumbnailUrl: "https://img.youtube.com/vi/sL7CZBvoPmQ/maxresdefault.jpg",
  },
];

const FALLBACK_SOCIAL_LINKS: SocialLinkData[] = [
  {
    id: "youtube",
    platformName: "YouTube",
    platformUrl: "https://youtube.com/@yzasrilanka",
  },
  {
    id: "instagram",
    platformName: "Instagram",
    platformUrl: "https://www.instagram.com/srilankayza/",
  },
  {
    id: "facebook",
    platformName: "Facebook",
    platformUrl: "https://www.facebook.com/share/1HmvJ1ZDpY/",
  },
  {
    id: "linkedin",
    platformName: "LinkedIn",
    platformUrl: "https://www.linkedin.com/company/young-zoologists-association-of-sri-lanka/",
  },
  {
    id: "x-twitter",
    platformName: "X (Twitter)",
    platformUrl: "https://x.com/yzasrilanka",
  },
  {
    id: "tiktok",
    platformName: "TikTok",
    platformUrl: "https://www.tiktok.com/@srilankayza",
  },
];

export const VIDEOS_PAGE_FALLBACK: VideosPageContent = {
  pageTitle: "Videos & Social Media",
  description:
    "Discover YZA's video collection featuring wildlife education, conservation awareness, and highlights from our programs and events.",
  videos: FALLBACK_VIDEOS,
  socialLinks: FALLBACK_SOCIAL_LINKS,
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

export function resolveVideosPageContent(data: VideosPageData | null): VideosPageContent {
  if (!data) return VIDEOS_PAGE_FALLBACK;

  return {
    pageTitle: pickText(data.pageTitle, VIDEOS_PAGE_FALLBACK.pageTitle),
    description: pickText(data.description, VIDEOS_PAGE_FALLBACK.description),
    videos: data.videos.length > 0 ? data.videos : VIDEOS_PAGE_FALLBACK.videos,
    socialLinks:
      data.socialLinks.length > 0 ? data.socialLinks : VIDEOS_PAGE_FALLBACK.socialLinks,
  };
}
