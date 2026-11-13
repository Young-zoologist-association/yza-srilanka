/** Contact Form 7 — Symposium Submission Form (WordPress post ID 521). */
export const SYMPOSIUM_CF7_FORM_ID =
  process.env.WORDPRESS_SYMPOSIUM_CF7_FORM_ID?.trim() || "521";

/** Contact Form 7 — Naturalist Submission Form (WordPress post ID 551). */
export const NATURALIST_CF7_FORM_ID =
  process.env.WORDPRESS_NATURALIST_CF7_FORM_ID?.trim() || "551";

/** Contact Form 7 — Contact Form (WordPress post ID 520). */
export const CONTACT_CF7_FORM_ID =
  process.env.WORDPRESS_CONTACT_CF7_FORM_ID?.trim() || "520";

export function getCf7FeedbackPath(formId: string): string {
  return `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
}

export function getCf7FeedbackUrl(baseUrl: string, formId: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  return `${normalizedBase}${getCf7FeedbackPath(formId)}`;
}

export function getSymposiumCf7FeedbackPath(formId = SYMPOSIUM_CF7_FORM_ID): string {
  return getCf7FeedbackPath(formId);
}

export function getSymposiumCf7FeedbackUrl(baseUrl: string, formId = SYMPOSIUM_CF7_FORM_ID): string {
  return getCf7FeedbackUrl(baseUrl, formId);
}

/** Client-side submission endpoint (proxies to Contact Form 7). */
export const SYMPOSIUM_SUBMISSION_API_PATH = "/api/symposium-submission";

export const CF7_SUBMISSION_API_PATH = SYMPOSIUM_SUBMISSION_API_PATH;
