import type { SocialLinkData, VideoItemData, VideosPageData } from "./types";
import type {
  SocialLinkItemAcf,
  VideoItemAcf,
  VideosPageAcf,
  WpVideosPageResponse,
} from "./wordpress-types";
import {
  extractYouTubeVideoId,
  getYouTubeThumbnailUrl,
} from "@/lib/videos-page/youtube";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapVideo(item: VideoItemAcf, index: number): VideoItemData | null {
  const title = asString(item.video_title).trim();
  const videoUrl = asString(item.video_url).trim();
  if (!title || !videoUrl) return null;

  const youtubeId = extractYouTubeVideoId(videoUrl);
  const id = slugify(title) || `video-${index + 1}`;

  return {
    id,
    title,
    description: asString(item.video_description).trim(),
    videoUrl,
    youtubeId,
    thumbnailUrl: youtubeId ? getYouTubeThumbnailUrl(youtubeId) : null,
  };
}

function mapSocialLink(item: SocialLinkItemAcf, index: number): SocialLinkData | null {
  const platformName = asString(item.platform_name).trim();
  const platformUrl = asString(item.platform_url).trim();
  if (!platformName || !platformUrl) return null;

  return {
    id: slugify(platformName) || `social-${index + 1}`,
    platformName,
    platformUrl,
  };
}

export function mapVideosPage(page: WpVideosPageResponse): VideosPageData {
  const acf = asRecord(page.acf) as VideosPageAcf & AcfRecord;

  const videos = asArray<VideoItemAcf>(acf.videos)
    .map(mapVideo)
    .filter((video): video is VideoItemData => video !== null);

  const socialLinks = asArray<SocialLinkItemAcf>(acf.social_links)
    .map(mapSocialLink)
    .filter((link): link is SocialLinkData => link !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.videos_page_title, "Videos & Social Media").trim(),
    description: asString(acf.videos_page_description).trim(),
    videos,
    socialLinks,
  };
}
