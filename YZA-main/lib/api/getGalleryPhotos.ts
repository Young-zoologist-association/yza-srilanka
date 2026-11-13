import { cache } from "react";
import { fetchCustomPostsRaw, isWordPressConfigured } from "./client";
import { WordPressApiError } from "./errors";
import { mapGalleryPhotoFromPost } from "./mappers";
import type { GalleryPhoto } from "./types";

const DEFAULT_GALLERY_ENDPOINT = "gallery-photo";

function getGalleryEndpoint(): string {
  return (
    process.env.WORDPRESS_GALLERY_ENDPOINT?.trim() || DEFAULT_GALLERY_ENDPOINT
  );
}

/**
 * Fetches gallery photos from the Gallery Photos custom post type.
 */
export const getGalleryPhotos = cache(async (): Promise<GalleryPhoto[]> => {
  if (!isWordPressConfigured()) {
    return [];
  }

  try {
    const posts = await fetchCustomPostsRaw(getGalleryEndpoint());
    return posts.map(mapGalleryPhotoFromPost);
  } catch (error) {
    if (error instanceof WordPressApiError) {
      throw error;
    }

    throw new WordPressApiError(
      error instanceof Error
        ? `Failed to fetch gallery photos: ${error.message}`
        : "Failed to fetch gallery photos.",
    );
  }
});
