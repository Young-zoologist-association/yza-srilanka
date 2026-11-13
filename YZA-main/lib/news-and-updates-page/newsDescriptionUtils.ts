/** Card preview length — keeps news cards a consistent height. */
export const NEWS_CARD_DESCRIPTION_MAX_LENGTH = 140;

export function truncateNewsDescription(
  text: string,
  maxLength = NEWS_CARD_DESCRIPTION_MAX_LENGTH,
): string {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length <= maxLength) return trimmed;

  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice;

  return `${cut.trim()}…`;
}

/** Normalizes WordPress line breaks for display. */
export function formatNewsDescription(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

/** Splits article body into paragraphs for editorial layout. */
export function splitNewsParagraphs(text: string): string[] {
  return formatNewsDescription(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);
}
