/** Preview length matched to the Sinharaja home-page event example. */
export const HOME_EVENT_DESCRIPTION_MAX_LENGTH = 168;

export function truncateEventDescription(
  text: string,
  maxLength = HOME_EVENT_DESCRIPTION_MAX_LENGTH,
): string {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length <= maxLength) return trimmed;

  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice;

  return `${cut.trim()}…`;
}

export function buildEventsSectionUrl(): string {
  return "/events-and-projects#events";
}
