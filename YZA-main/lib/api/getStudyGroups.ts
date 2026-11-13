import { cache } from "react";
import { fetchCustomPostsRaw, isWordPressConfigured } from "./client";
import { WordPressApiError } from "./errors";
import { mapStudyGroupFromPost } from "./mappers";
import type { StudyGroup } from "./types";

const DEFAULT_STUDY_GROUPS_ENDPOINT = "study-group";

function getStudyGroupsEndpoint(): string {
  return (
    process.env.WORDPRESS_STUDY_GROUPS_ENDPOINT?.trim() ||
    DEFAULT_STUDY_GROUPS_ENDPOINT
  );
}

/**
 * Fetches study group cards from the Study Groups custom post type.
 */
export const getStudyGroups = cache(async (): Promise<StudyGroup[]> => {
  if (!isWordPressConfigured()) {
    return [];
  }

  try {
    const posts = await fetchCustomPostsRaw(getStudyGroupsEndpoint());
    return posts.map(mapStudyGroupFromPost);
  } catch (error) {
    if (error instanceof WordPressApiError) {
      throw error;
    }

    throw new WordPressApiError(
      error instanceof Error
        ? `Failed to fetch study groups: ${error.message}`
        : "Failed to fetch study groups.",
    );
  }
});
