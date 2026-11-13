import { cache } from "react";
import { fetchCustomPostsRaw, isWordPressConfigured } from "./client";
import { WordPressApiError } from "./errors";
import { mapEventFromPost } from "./mappers";
import type { EventItem } from "./types";

const DEFAULT_EVENTS_ENDPOINT = "event";

function getEventsEndpoint(): string {
  return process.env.WORDPRESS_EVENTS_ENDPOINT?.trim() || DEFAULT_EVENTS_ENDPOINT;
}

/**
 * Fetches event cards from the Events custom post type.
 */
export const getEvents = cache(async (): Promise<EventItem[]> => {
  if (!isWordPressConfigured()) {
    return [];
  }

  try {
    const posts = await fetchCustomPostsRaw(getEventsEndpoint());
    return posts.map(mapEventFromPost);
  } catch (error) {
    if (error instanceof WordPressApiError) {
      throw error;
    }

    throw new WordPressApiError(
      error instanceof Error
        ? `Failed to fetch events: ${error.message}`
        : "Failed to fetch events.",
    );
  }
});
