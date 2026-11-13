import {
  CONTACT_CF7_FORM_ID,
  NATURALIST_CF7_FORM_ID,
  SYMPOSIUM_CF7_FORM_ID,
} from "./config";
import {
  SYMPOSIUM_ALLOWED_FILE_EXTENSIONS,
  SYMPOSIUM_MAX_FILE_BYTES,
} from "./types";

export type Cf7FormKind = "symposium" | "naturalist" | "contact";

export function resolveCf7FormKind(formData: FormData): Cf7FormKind {
  const submissionType = formData.get("submission-type");

  if (submissionType === "Naturalist") return "naturalist";
  if (submissionType === "Contact") return "contact";
  return "symposium";
}

export function resolveCf7FormId(kind: Cf7FormKind): string {
  switch (kind) {
    case "naturalist":
      return NATURALIST_CF7_FORM_ID;
    case "contact":
      return CONTACT_CF7_FORM_ID;
    default:
      return SYMPOSIUM_CF7_FORM_ID;
  }
}

function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return SYMPOSIUM_ALLOWED_FILE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function requireStringField(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  if (typeof value !== "string" || !value.trim()) {
    return `Missing required field: ${field}.`;
  }
  return null;
}

function validateDocumentUpload(formData: FormData): string | null {
  const file = formData.get("document-upload");
  if (!(file instanceof File) || file.size === 0) {
    return "A document upload is required.";
  }

  if (file.size > SYMPOSIUM_MAX_FILE_BYTES) {
    return "Document must be 10 MB or smaller.";
  }

  if (!hasAllowedExtension(file.name)) {
    return "Document must be a PDF, DOC, or DOCX file.";
  }

  return null;
}

function validateSymposium(formData: FormData): string | null {
  for (const field of [
    "full-name",
    "institute",
    "country",
    "email",
    "presentation-type",
    "contact",
    "whatsapp-number",
  ] as const) {
    const error = requireStringField(formData, field);
    if (error) return error;
  }

  const documentError = validateDocumentUpload(formData);
  if (documentError) return documentError;

  const presentationType = formData.get("presentation-type");
  if (presentationType !== "Virtual" && presentationType !== "In-Person") {
    return "Presentation type must be Virtual or In-Person.";
  }

  return null;
}

function validateNaturalist(formData: FormData): string | null {
  for (const field of [
    "full-name",
    "institute",
    "country",
    "email",
    "contact",
    "whatsapp-number",
  ] as const) {
    const error = requireStringField(formData, field);
    if (error) return error;
  }

  const submissionType = formData.get("submission-type");
  if (submissionType !== "Naturalist") {
    return "Invalid submission type for Naturalist form.";
  }

  return validateDocumentUpload(formData);
}

function validateContact(formData: FormData): string | null {
  for (const field of ["full-name", "email", "message"] as const) {
    const error = requireStringField(formData, field);
    if (error) return error;
  }

  const submissionType = formData.get("submission-type");
  if (submissionType !== "Contact") {
    return "Invalid submission type for Contact form.";
  }

  return null;
}

export function validateCf7Submission(formData: FormData, kind: Cf7FormKind): string | null {
  switch (kind) {
    case "naturalist":
      return validateNaturalist(formData);
    case "contact":
      return validateContact(formData);
    default:
      return validateSymposium(formData);
  }
}
