import { getWordPressApiUrl } from "@/lib/api/client";
import { WordPressApiError } from "@/lib/api/errors";
import { getCf7FeedbackUrl, SYMPOSIUM_CF7_FORM_ID } from "./config";
import type { Cf7FeedbackResponse, Cf7SubmissionResult } from "./types";

function appendCf7MetaFields(formData: FormData, formId: string): FormData {
  const payload = new FormData();

  formData.forEach((value, key) => {
    payload.append(key, value);
  });

  payload.set("_wpcf7", formId);
  payload.set("_wpcf7_version", "6.0");
  payload.set("_wpcf7_locale", "en_US");
  payload.set("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);

  return payload;
}

function stripHtml(message: string): string {
  return message.replace(/<[^>]*>/g, "").trim();
}

export async function submitSymposiumSubmission(
  formData: FormData,
  formId: string = SYMPOSIUM_CF7_FORM_ID,
): Promise<Cf7SubmissionResult> {
  const baseUrl = getWordPressApiUrl();
  const url = getCf7FeedbackUrl(baseUrl, formId);
  const payload = appendCf7MetaFields(formData, formId);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      body: payload,
      cache: "no-store",
    });
  } catch (error) {
    throw new WordPressApiError(
      error instanceof Error ? error.message : "Failed to reach WordPress Contact Form 7 API.",
      undefined,
      url,
    );
  }

  let data: Cf7FeedbackResponse;

  try {
    data = (await response.json()) as Cf7FeedbackResponse;
  } catch {
    throw new WordPressApiError(
      "Contact Form 7 returned an invalid response.",
      response.status,
      url,
    );
  }

  const message = stripHtml(data.message || "Submission failed. Please try again.");

  if (data.status === "mail_sent") {
    return { ok: true, message };
  }

  return {
    ok: false,
    message,
    invalidFields: data.invalid_fields,
  };
}
