export interface Cf7InvalidField {
  field: string;
  message: string;
  idref?: string | null;
  error_id?: string;
}

export interface Cf7FeedbackResponse {
  status: "mail_sent" | "validation_failed" | "spam" | "aborted" | "mail_failed" | string;
  message: string;
  posted_data_hash?: string;
  invalid_fields?: Cf7InvalidField[];
}

export interface SymposiumSubmissionResult {
  ok: boolean;
  message: string;
  invalidFields?: Cf7InvalidField[];
}

export type Cf7SubmissionResult = SymposiumSubmissionResult;

export const SYMPOSIUM_FORM_FIELD_NAMES = [
  "full-name",
  "institute",
  "country",
  "email",
  "presentation-type",
  "contact",
  "whatsapp-number",
  "document-upload",
] as const;

export type SymposiumFormFieldName = (typeof SYMPOSIUM_FORM_FIELD_NAMES)[number];

export interface SymposiumFormValues {
  fullName: string;
  institute: string;
  country: string;
  email: string;
  presentationType: "" | "Virtual" | "In-Person";
  contact: string;
  whatsappNumber: string;
}

export const SYMPOSIUM_FORM_INITIAL_VALUES: SymposiumFormValues = {
  fullName: "",
  institute: "",
  country: "",
  email: "",
  presentationType: "",
  contact: "",
  whatsappNumber: "",
};

export const SYMPOSIUM_ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const SYMPOSIUM_MAX_FILE_BYTES = 10 * 1024 * 1024;

export const SYMPOSIUM_ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export interface NaturalistFormValues {
  fullName: string;
  institute: string;
  country: string;
  email: string;
  contact: string;
  whatsappNumber: string;
}

export const NATURALIST_FORM_INITIAL_VALUES: NaturalistFormValues = {
  fullName: "",
  institute: "",
  country: "",
  email: "",
  contact: "",
  whatsappNumber: "",
};

export interface ContactFormValues {
  fullName: string;
  email: string;
  message: string;
}

export const CONTACT_FORM_INITIAL_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  message: "",
};
